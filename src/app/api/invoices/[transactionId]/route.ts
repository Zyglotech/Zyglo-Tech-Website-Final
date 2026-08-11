import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prismadb } from '@/lib/prismadb';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: Promise<{ transactionId: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { transactionId } = await params;

  const transaction = await prismadb.creditTransaction.findFirst({
    where: { id: transactionId, userId: session.user.id, status: 'paid' },
  });
  if (!transaction) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
  }

  const user = await prismadb.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true, email: true, companyName: true,
      addressLine1: true, addressLine2: true, city: true, state: true, postalCode: true, country: true,
    },
  });

  return NextResponse.json({ transaction, billTo: user });
}
