import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { randomUUID } from 'crypto';
import { authOptions } from '@/lib/auth';
import { prismadb } from '@/lib/prismadb';
import { createCashfreeOrder, cashfreeConfigured } from '@/lib/cashfree';
import { buildPayuForm, payuConfigured } from '@/lib/payu';
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zyglotech.com';

  async function tryCashfree() {
    if (!cashfreeConfigured()) return null;

    const cashfreeOrderId = `zyglo_${orderIdPrefix}_${randomUUID()}`;
    await prismadb.creditTransaction.create({
      data: {
        userId: user!.id,
        type: 'topup',
        credits,
        amount: orderAmount,
        priceUsd,
        currency: 'INR',
        status: 'pending',
        gateway: 'cashfree',
        cashfreeOrderId,
        invoiceNumber: generateInvoiceNumber(),
        planLabel,
      },
    });

    try {
      const order = await createCashfreeOrder({
        orderId: cashfreeOrderId,
        orderAmount,
        customerId: user!.id,
        customerEmail: user!.email!,
        customerPhone: user!.phone!,
        customerName: user!.name ?? undefined,
        returnUrl: `${siteUrl}/dashboard/wallet?order_id=${cashfreeOrderId}`,
      });

      return NextResponse.json({
        gateway: 'cashfree',
        paymentSessionId: order.payment_session_id,
        orderId: cashfreeOrderId,
      });
    } catch (err) {
      console.error('[create-order] Cashfree order creation failed, will try PayU fallback', {
        cashfreeOrderId,
        userId: user!.id,
        message: err instanceof Error ? err.message : String(err),
      });
      await prismadb.creditTransaction.update({
        where: { cashfreeOrderId },
        data: { status: 'failed' },
      });
      return null;
    }
  }

  async function tryPayu() {
    if (!payuConfigured()) return null;

    const payuTxnId = randomUUID().replace(/-/g, '').slice(0, 25);
    await prismadb.creditTransaction.create({
      data: {
        userId: user!.id,
        type: 'topup',
        credits,
        amount: orderAmount,
        priceUsd,
        currency: 'INR',
        status: 'pending',
        gateway: 'payu',
        payuTxnId,
        invoiceNumber: generateInvoiceNumber(),
        planLabel,
      },
    });

    const form = buildPayuForm({
      txnid: payuTxnId,
      amount: orderAmount,
      productinfo: planLabel,
      firstname: user!.name || 'Customer',
      email: user!.email!,
      phone: user!.phone!,
      surl: `${siteUrl}/api/payments/payu-return`,
      furl: `${siteUrl}/api/payments/payu-return`,
    });

    return NextResponse.json({ gateway: 'payu', form });
  }

  // Cashfree first, PayU as automatic fallback if it fails or isn't configured.
  const cashfreeResult = await tryCashfree();
  if (cashfreeResult) return cashfreeResult;

  const payuResult = await tryPayu();
  if (payuResult) return payuResult;

  return NextResponse.json(
    { error: 'Checkout is temporarily unavailable. Please contact us on WhatsApp or email and we\'ll help you complete your purchase.', unavailable: true },
    { status: 502 }
  );
}
