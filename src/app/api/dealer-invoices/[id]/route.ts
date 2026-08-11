import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prismadb } from '@/lib/prismadb';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const invoice = await prismadb.dealerInvoice.findFirst({
    where: { id: params.id, userId: session.user.id },
  });
  if (!invoice) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
  }

  const seller = await prismadb.user.findUnique({
    where: { id: session.user.id },
    select: {
      sellerLogoDataUrl: true,
      sellerCompanyName: true,
      sellerAddressLine1: true,
      sellerAddressLine2: true,
      sellerCity: true,
      sellerState: true,
      sellerPostalCode: true,
      sellerCountry: true,
      sellerEmail: true,
    },
  });

  return NextResponse.json({ invoice, seller });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const invoice = await prismadb.dealerInvoice.findFirst({
    where: { id: params.id, userId: session.user.id },
  });
  if (!invoice) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
  }

  await prismadb.dealerInvoice.delete({ where: { id: invoice.id } });
  return NextResponse.json({ success: true });
}
