import { NextResponse } from 'next/server';
import { prismadb } from '@/lib/prismadb';
import { requireAdmin } from '@/app/api/admin/_guard';

export const dynamic = 'force-dynamic';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json({ error: guard.error }, { status: guard.status });
  }

  const body = (await request.json().catch(() => ({}))) as { delta?: number; reason?: string; reset?: boolean };

  const targetUser = await prismadb.user.findUnique({ where: { id: params.id }, select: { id: true } });
  if (!targetUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const wallet = await prismadb.creditWallet.findUnique({ where: { userId: params.id } });
  const currentBalance = wallet?.balance ?? 0;

  const delta = body.reset ? -currentBalance : Math.round(Number(body.delta));

  if (!Number.isFinite(delta) || delta === 0) {
    if (body.reset) {
      return NextResponse.json({ balance: 0 });
    }
    return NextResponse.json({ error: 'Provide a non-zero whole-number credit delta' }, { status: 422 });
  }

  if (delta < 0 && currentBalance + delta < 0) {
    return NextResponse.json({ error: `Cannot deduct more than the current balance (${currentBalance} credits)` }, { status: 422 });
  }

  const reason = body.reason?.trim() || null;
  const planLabel = body.reset ? 'Admin reset to 0' : reason ? `Admin adjustment: ${reason}` : 'Admin adjustment';

  const [, updatedWallet] = await prismadb.$transaction([
    prismadb.creditTransaction.create({
      data: {
        userId: params.id,
        type: delta > 0 ? 'topup' : 'usage',
        credits: Math.abs(delta),
        status: 'paid',
        paidAt: new Date(),
        planLabel,
      },
    }),
    prismadb.creditWallet.upsert({
      where: { userId: params.id },
      create: { userId: params.id, balance: Math.max(0, delta) },
      update: { balance: { increment: delta } },
    }),
  ]);

  return NextResponse.json({ balance: updatedWallet.balance });
}
