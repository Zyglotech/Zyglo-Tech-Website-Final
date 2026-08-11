import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { prismadb } from '@/lib/prismadb';

const OTP_TTL_MINUTES = 10;
const MAX_ATTEMPTS = 5;

export function generateOtpCode(): string {
  return crypto.randomInt(0, 1_000_000).toString().padStart(6, '0');
}

export async function createOtp(email: string): Promise<string> {
  const code = generateOtpCode();
  const codeHash = await bcrypt.hash(code, 10);
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

  await prismadb.emailOtp.create({
    data: { email: email.toLowerCase().trim(), codeHash, expiresAt },
  });

  return code;
}

export async function verifyOtp(email: string, code: string): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim();

  const otp = await prismadb.emailOtp.findFirst({
    where: { email: normalizedEmail, consumedAt: null },
    orderBy: { createdAt: 'desc' },
  });

  if (!otp) return false;
  if (otp.expiresAt < new Date()) return false;
  if (otp.attempts >= MAX_ATTEMPTS) return false;

  const valid = await bcrypt.compare(code, otp.codeHash);

  await prismadb.emailOtp.update({
    where: { id: otp.id },
    data: valid ? { consumedAt: new Date() } : { attempts: { increment: 1 } },
  });

  return valid;
}
