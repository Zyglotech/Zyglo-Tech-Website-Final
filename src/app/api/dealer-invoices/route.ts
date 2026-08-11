import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { randomUUID } from 'crypto';
import { authOptions } from '@/lib/auth';
import { prismadb } from '@/lib/prismadb';

export const dynamic = 'force-dynamic';

interface LineItemInput {
  description: string;
  qty: number;
  unitPrice: number;
}

function generateInvoiceNumber(): string {
  const yyyymm = new Date().toISOString().slice(0, 7).replace('-', '');
  const suffix = randomUUID().replace(/-/g, '').slice(0, 6).toUpperCase();
  return `INV-${yyyymm}-${suffix}`;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const invoices = await prismadb.dealerInvoice.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ invoices });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    currency?: string;
    customerName?: string;
    customerCompany?: string;
    customerEmail?: string;
    customerAddressLine1?: string;
    customerAddressLine2?: string;
    customerCity?: string;
    customerState?: string;
    customerPostalCode?: string;
    customerCountry?: string;
    lineItems?: LineItemInput[];
    notes?: string;
  };

  if (!body.customerName?.trim()) {
    return NextResponse.json({ error: 'Customer name is required' }, { status: 422 });
  }

  const lineItems = (body.lineItems ?? []).filter(
    (li) => li.description?.trim() && Number.isFinite(li.qty) && li.qty > 0 && Number.isFinite(li.unitPrice) && li.unitPrice >= 0
  );

  if (lineItems.length === 0) {
    return NextResponse.json({ error: 'At least one valid line item is required' }, { status: 422 });
  }

  const normalizedItems = lineItems.map((li) => ({
    description: li.description.trim(),
    qty: li.qty,
    unitPrice: li.unitPrice,
    amount: Math.round(li.qty * li.unitPrice * 100) / 100,
  }));

  const total = Math.round(normalizedItems.reduce((sum, li) => sum + li.amount, 0) * 100) / 100;

  const invoice = await prismadb.dealerInvoice.create({
    data: {
      userId: session.user.id,
      invoiceNumber: generateInvoiceNumber(),
      currency: body.currency?.trim() || 'USD',
      customerName: body.customerName.trim(),
      customerCompany: body.customerCompany?.trim() || null,
      customerEmail: body.customerEmail?.trim() || null,
      customerAddressLine1: body.customerAddressLine1?.trim() || null,
      customerAddressLine2: body.customerAddressLine2?.trim() || null,
      customerCity: body.customerCity?.trim() || null,
      customerState: body.customerState?.trim() || null,
      customerPostalCode: body.customerPostalCode?.trim() || null,
      customerCountry: body.customerCountry?.trim() || null,
      lineItems: normalizedItems,
      subtotal: total,
      total,
      notes: body.notes?.trim() || null,
    },
  });

  return NextResponse.json({ invoice });
}
