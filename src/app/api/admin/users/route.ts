import { NextResponse } from 'next/server';
import { prismadb } from '@/lib/prismadb';
import { requireAdmin } from '@/app/api/admin/_guard';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json({ error: guard.error }, { status: guard.status });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim();
  const status = searchParams.get('status'); // 'pending' | 'inactive' | null

  const where: Record<string, unknown> = {};
  if (q) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { email: { contains: q, mode: 'insensitive' } },
      { phone: { contains: q } },
      { companyName: { contains: q, mode: 'insensitive' } },
    ];
  }
  if (status === 'pending') where.isApproved = false;
  if (status === 'inactive') where.isActive = false;

  const users = await prismadb.user.findMany({
    where,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      companyName: true,
      isAdmin: true,
      isApproved: true,
      isActive: true,
      createdAt: true,
      creditWallet: { select: { balance: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  return NextResponse.json({ users });
}
