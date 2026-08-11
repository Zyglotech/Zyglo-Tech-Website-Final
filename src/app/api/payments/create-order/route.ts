import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { randomUUID } from 'crypto';
import { authOptions } from '@/lib/auth';
import { prismadb } from '@/lib/prismadb';
import { createCashfreeOrder } from '@/lib/cashfree';
import { getTierById, creditsForAmount, customRecharge, splitChargedInr, INR_PER_USD } from '@/data/credit-plans';

export const dynamic = 'force-dynamic';

function generateInvoiceNumber(): string {
  const yyyymm = new Date().toISOString().slice(0, 7).replace('-', '');
  const suffix = randomUUID().replace(/-/g, '').slice(0, 6).toUpperCase();
  return `ZYG-${yyyymm}-${suffix}`;
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'You must be signed in to buy credits' }, { status: 401 });
  }

  const { tierId, amountInr } = (await request.json().catch(() => ({}))) as {
    tierId?: string;
    amountInr?: number;
  };

  let orderIdPrefix: string;
  let orderAmount: number;
  let credits: number;
  let planLabel: string;
  let priceUsd: number;

  if (tierId) {
    const tier = getTierById(tierId);
    if (!tier) {
      return NextResponse.json({ error: 'Invalid credit tier' }, { status: 422 });
    }
    orderIdPrefix = tier.id;
    orderAmount = tier.priceInr;
    credits = tier.credits;
    planLabel = `${tier.credits.toLocaleString('en-IN')} Credits`;
    priceUsd = tier.priceUsd;
  } else if (amountInr) {
    if (amountInr < customRecharge.minAmountInr || amountInr > customRecharge.maxAmountInr) {
      return NextResponse.json(
        { error: `Amount must be between ₹${customRecharge.minAmountInr} and ₹${customRecharge.maxAmountInr}` },
        { status: 422 }
      );
    }
    orderIdPrefix = 'recharge';
    orderAmount = amountInr;
    credits = creditsForAmount(amountInr);
    planLabel = 'Wallet Recharge';
    priceUsd = splitChargedInr(amountInr).baseInr / INR_PER_USD;
  } else {
    return NextResponse.json({ error: 'Provide either a tierId or amountInr' }, { status: 422 });
  }

  const user = await prismadb.user.findUnique({ where: { id: session.user.id } });
  if (!user?.email) {
    return NextResponse.json({ error: 'Account is missing an email address' }, { status: 400 });
  }
  if (!user.phone) {
    return NextResponse.json({ error: 'Add a phone number to your profile before making a payment' }, { status: 422 });
  }

  const cashfreeOrderId = `zyglo_${orderIdPrefix}_${randomUUID()}`;

  await prismadb.creditTransaction.create({
    data: {
      userId: user.id,
      type: 'topup',
      credits,
      amount: orderAmount,
      priceUsd,
      currency: 'INR',
      status: 'pending',
      cashfreeOrderId,
      invoiceNumber: generateInvoiceNumber(),
      planLabel,
    },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zyglotech.com';

  try {
    const order = await createCashfreeOrder({
      orderId: cashfreeOrderId,
      orderAmount,
      customerId: user.id,
      customerEmail: user.email,
      customerPhone: user.phone,
      customerName: user.name ?? undefined,
      returnUrl: `${siteUrl}/dashboard/wallet?order_id=${cashfreeOrderId}`,
    });

    return NextResponse.json({
      paymentSessionId: order.payment_session_id,
      orderId: cashfreeOrderId,
    });
  } catch (err) {
    await prismadb.creditTransaction.update({
      where: { cashfreeOrderId },
      data: { status: 'failed' },
    });
    return NextResponse.json({ error: 'Could not start payment. Please try again.' }, { status: 502 });
  }
}
