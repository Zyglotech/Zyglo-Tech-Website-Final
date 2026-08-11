import { NextResponse } from 'next/server';
import { createOtp } from '@/lib/otp';
import { sendOtpEmail } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const { email } = (await request.json().catch(() => ({}))) as { email?: string };

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'A valid email address is required' }, { status: 422 });
  }

  const code = await createOtp(email);

  try {
    await sendOtpEmail({ toEmail: email.toLowerCase().trim(), code });
  } catch {
    return NextResponse.json({ error: 'Could not send the code. Please try again.' }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
