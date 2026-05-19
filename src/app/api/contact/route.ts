export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { appendLead } from '@/lib/leadsStore';
import { sendAutoReply, sendInternalNotification, emailWrapper } from '@/lib/mailer';
import { randomUUID } from 'crypto';

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { name, email, phone, company, message } = body as ContactPayload;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return NextResponse.json({ error: 'Name must be at least 2 characters' }, { status: 422 });
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'A valid email address is required' }, { status: 422 });
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return NextResponse.json({ error: 'Message must be at least 10 characters' }, { status: 422 });
  }

  const id = randomUUID();
  const trimmedName = name.trim();
  const trimmedMessage = message.trim();

  try {
    appendLead({
      id,
      type: 'contact',
      name: trimmedName,
      email,
      phone,
      company,
      message: trimmedMessage,
      source: 'contact-form',
      status: 'new',
      createdAt: new Date().toISOString(),
    });
  } catch {
    // Storage failure is non-fatal
  }

  // Fire emails concurrently, don't block the response on failure
  Promise.all([
    sendAutoReply({
      toName: trimmedName,
      toEmail: email,
      subject: 'We received your message — Zyglo Tech Enterprise',
      bodyHtml: emailWrapper(`
        <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#ffffff;">Hi ${trimmedName}, we got your message!</h2>
        <p style="margin:0 0 20px;font-size:14px;color:rgba(255,255,255,0.6);line-height:1.7;">
          Thank you for reaching out to Zyglo Tech Enterprise. Our team will review your enquiry and respond within <strong style="color:#06CCE8;">2 business hours</strong>.
        </p>

        <div style="background:#0F1C32;border-radius:12px;padding:20px 24px;margin:0 0 24px;border-left:3px solid #06CCE8;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(6,204,232,0.7);">Your Message</p>
          <p style="margin:0;font-size:13.5px;color:rgba(255,255,255,0.8);line-height:1.7;">${trimmedMessage}</p>
        </div>

        <p style="margin:0 0 6px;font-size:13px;color:rgba(255,255,255,0.5);">In the meantime, you can also reach us directly:</p>
        <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
          <tr>
            <td style="padding:4px 0;">
              <span style="font-size:13px;color:rgba(255,255,255,0.5);">📞 </span>
              <a href="tel:+919943907643" style="font-size:13px;color:#06CCE8;text-decoration:none;">+91 9943 907 643</a>
            </td>
          </tr>
          <tr>
            <td style="padding:4px 0;">
              <span style="font-size:13px;color:rgba(255,255,255,0.5);">💬 </span>
              <a href="https://wa.me/919943907643" style="font-size:13px;color:#06CCE8;text-decoration:none;">WhatsApp Us</a>
            </td>
          </tr>
        </table>

        <a href="https://www.zyglo.tech/demo" style="display:inline-block;background:#06CCE8;color:#060B17;font-size:13px;font-weight:700;padding:12px 28px;border-radius:10px;text-decoration:none;">
          Book a Free Consultation →
        </a>
      `),
    }),

    sendInternalNotification({
      subject: `🔔 New Contact Enquiry — ${trimmedName}${company ? ` (${company})` : ''}`,
      bodyHtml: emailWrapper(`
        <h2 style="margin:0 0 20px;font-size:20px;font-weight:800;color:#ffffff;">New Contact Form Submission</h2>
        <table cellpadding="0" cellspacing="0" width="100%">
          ${[
            ['Name', trimmedName],
            ['Email', email],
            ['Phone', phone ?? '—'],
            ['Company', company ?? '—'],
          ].map(([label, value]) => `
            <tr>
              <td style="padding:8px 0;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.4);width:100px;">${label}</td>
              <td style="padding:8px 0;font-size:13.5px;color:#ffffff;">${value}</td>
            </tr>
          `).join('')}
        </table>
        <div style="background:#0F1C32;border-radius:12px;padding:20px 24px;margin:20px 0 0;border-left:3px solid #06CCE8;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(6,204,232,0.7);">Message</p>
          <p style="margin:0;font-size:13.5px;color:rgba(255,255,255,0.8);line-height:1.7;">${trimmedMessage}</p>
        </div>
        <p style="margin:20px 0 0;font-size:11px;color:rgba(255,255,255,0.3);">Lead ID: ${id}</p>
      `),
    }),
  ]).catch(() => {
    // Email errors are non-fatal — lead is already stored
  });

  return NextResponse.json(
    { success: true, message: 'Your message has been received. We will respond within 2 business hours.' },
    { status: 200 }
  );
}
