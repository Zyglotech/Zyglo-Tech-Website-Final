import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prismadb } from '@/lib/prismadb';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [wallet, transactions] = await Promise.all([
    prismadb.creditWallet.findUnique({ where: { userId: session.user.id } }),
    prismadb.creditTransaction.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 25,
    }),
  ]);

  return NextResponse.json({
    balance: wallet?.balance ?? 0,
    transactions,
  });
}
