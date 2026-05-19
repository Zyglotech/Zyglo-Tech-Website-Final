import { NextResponse } from 'next/server';
import { appendLead } from '@/lib/leadsStore';

export const dynamic = 'force-dynamic';
import { sendAutoReply, sendInternalNotification, emailWrapper } from '@/lib/mailer';
import { randomUUID } from 'crypto';

interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  source?: string;
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

  const { name, email, phone, company, service, budget, source } = body as LeadPayload;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return NextResponse.json({ error: 'Name is required' }, { status: 422 });
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'A valid email address is required' }, { status: 422 });
  }

  const id = randomUUID();
  const trimmedName = name.trim();

  try {
    appendLead({
      id,
      type: 'lead',
      name: trimmedName,
      email,
      phone,
      company,
      service,
      budget,
      source: source ?? 'website',
      status: 'new',
      createdAt: new Date().toISOString(),
    });
  } catch {
    // Storage failure is non-fatal
  }

  const serviceLabel = service ?? 'General Enquiry';

  Promise.all([
    sendAutoReply({
      toName: trimmedName,
      toEmail: email,
      subject: `Your free consultation request — Zyglo Tech Enterprise`,
      bodyHtml: emailWrapper(`
        <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#ffffff;">Hi ${trimmedName}! 🎉</h2>
        <p style="margin:0 0 20px;font-size:14px;color:rgba(255,255,255,0.6);line-height:1.7;">
          Thank you for your interest in <strong style="color:#06CCE8;">${serviceLabel}</strong>. Your consultation request has been received and a member of our team will contact you within <strong style="color:#06CCE8;">2 business hours</strong>.
        </p>

        <div style="background:#0F1C32;border-radius:12px;padding:20px 24px;margin:0 0 24px;">
          <p style="margin:0 0 14px;font-size:13px;font-weight:700;color:#06CCE8;">What happens next?</p>
          <table cellpadding="0" cellspacing="0">
            ${[
              ['⚡', 'Our specialist reviews your request within 2 hours'],
              ['📞', 'We schedule a free 30-minute discovery call'],
              ['📋', 'You receive a customised proposal within 24 hours'],
              ['🚀', 'Project kickoff once you approve the plan'],
            ].map(([icon, text]) => `
              <tr>
                <td style="padding:5px 10px 5px 0;font-size:15px;">${icon}</td>
                <td style="padding:5px 0;font-size:13px;color:rgba(255,255,255,0.7);line-height:1.6;">${text}</td>
              </tr>
            `).join('')}
          </table>
        </div>

        <p style="margin:0 0 16px;font-size:13px;color:rgba(255,255,255,0.5);">Need an answer sooner? Reach us directly:</p>
        <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
          <tr>
            <td style="padding:4px 0;">
              <a href="https://wa.me/919943907643" style="font-size:13px;color:#06CCE8;text-decoration:none;">💬 Chat on WhatsApp → +91 9943 907 643</a>
            </td>
          </tr>
          <tr>
            <td style="padding:4px 0;">
              <a href="tel:+919943907643" style="font-size:13px;color:#06CCE8;text-decoration:none;">📞 Call us → +91 9943 907 643</a>
            </td>
          </tr>
        </table>

        <a href="https://www.zyglo.tech" style="display:inline-block;background:#06CCE8;color:#060B17;font-size:13px;font-weight:700;padding:12px 28px;border-radius:10px;text-decoration:none;">
          Visit Zyglo.tech →
        </a>
      `),
    }),

    sendInternalNotification({
      subject: `🚀 New Lead — ${trimmedName} | ${serviceLabel}${company ? ` (${company})` : ''}`,
      bodyHtml: emailWrapper(`
        <h2 style="margin:0 0 20px;font-size:20px;font-weight:800;color:#ffffff;">New Lead Captured</h2>
        <table cellpadding="0" cellspacing="0" width="100%">
          ${[
            ['Name', trimmedName],
            ['Email', email],
            ['Phone', phone ?? '—'],
            ['Company', company ?? '—'],
            ['Service', serviceLabel],
            ['Budget', budget ?? '—'],
            ['Source', source ?? 'website'],
          ].map(([label, value]) => `
            <tr>
              <td style="padding:8px 0;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.4);width:100px;">${label}</td>
              <td style="padding:8px 0;font-size:13.5px;color:#ffffff;">${value}</td>
            </tr>
          `).join('')}
        </table>
        <div style="margin:20px 0 0;padding:16px 20px;background:rgba(6,204,232,0.08);border-radius:10px;border:1px solid rgba(6,204,232,0.2);">
          <p style="margin:0;font-size:12px;color:#06CCE8;font-weight:700;">ACTION REQUIRED: Follow up within 2 hours</p>
        </div>
        <p style="margin:16px 0 0;font-size:11px;color:rgba(255,255,255,0.3);">Lead ID: ${id}</p>
      `),
    }),
  ]).catch(() => {
    // Email errors are non-fatal — lead is already stored
  });

  return NextResponse.json(
    { success: true, message: 'Lead captured. Our team will reach out within 2 hours.' },
    { status: 201 }
  );
}
