import { NextResponse } from 'next/server';
import { prismadb } from '@/lib/prismadb';
import { requireAdmin } from '@/app/api/admin/_guard';

export const dynamic = 'force-dynamic';

export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json({ error: guard.error }, { status: guard.status });
  }

  const [userCount, walletAgg, paidTopups, dealerInvoiceCount] = await Promise.all([
    prismadb.user.count(),
    prismadb.creditWallet.aggregate({ _sum: { balance: true } }),
    prismadb.creditTransaction.aggregate({
      where: { type: 'topup', status: 'paid' },
      _sum: { amount: true, priceUsd: true },
      _count: true,
    }),
    prismadb.dealerInvoice.count(),
  ]);

  return NextResponse.json({
    userCount,
    creditsOutstanding: walletAgg._sum.balance ?? 0,
    paidTopupCount: paidTopups._count,
    totalRevenueInr: paidTopups._sum.amount ?? 0,
    totalRevenueUsd: paidTopups._sum.priceUsd ?? 0,
    dealerInvoiceCount,
  });
}
