import { NextResponse } from 'next/server';
import { prismadb } from '@/lib/prismadb';
import { verifyPayuResponseHash, type PayuReturnPayload } from '@/lib/payu';

export const dynamic = 'force-dynamic';

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zyglotech.com';
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const get = (k: string) => (formData.get(k)?.toString() ?? '');

  const payload: PayuReturnPayload = {
    key: get('key'),
    txnid: get('txnid'),
    amount: get('amount'),
    productinfo: get('productinfo'),
    firstname: get('firstname'),
    email: get('email'),
    status: get('status'),
    hash: get('hash'),
    mihpayid: get('mihpayid'),
    udf1: get('udf1'),
    udf2: get('udf2'),
    udf3: get('udf3'),
    udf4: get('udf4'),
    udf5: get('udf5'),
  };

  const redirectUrl = new URL('/dashboard/wallet', siteUrl());
  if (!payload.txnid) {
    return NextResponse.redirect(redirectUrl, 303);
  }
  redirectUrl.searchParams.set('order_id', payload.txnid);

  const transaction = await prismadb.creditTransaction.findUnique({
    where: { payuTxnId: payload.txnid },
  });
  if (!transaction) {
    return NextResponse.redirect(redirectUrl, 303);
  }

  // Already processed — PayU may redirect/retry, so this must be idempotent.
  if (transaction.status === 'paid') {
    return NextResponse.redirect(redirectUrl, 303);
  }

  if (!verifyPayuResponseHash(payload)) {
    console.error('[payu-return] Signature verification failed', { txnid: payload.txnid });
    await prismadb.creditTransaction.update({
      where: { id: transaction.id },
      data: { status: 'failed' },
    });
    return NextResponse.redirect(redirectUrl, 303);
  }

  if (payload.status === 'success') {
    await prismadb.$transaction([
      prismadb.creditTransaction.update({
        where: { id: transaction.id },
        data: {
          status: 'paid',
          paidAt: new Date(),
          cfPaymentId: payload.mihpayid || null,
          paymentMethodLabel: 'PayU',
        },
      }),
      prismadb.creditWallet.upsert({
        where: { userId: transaction.userId },
        create: { userId: transaction.userId, balance: transaction.credits },
        update: { balance: { increment: transaction.credits } },
      }),
    ]);
  } else {
    await prismadb.creditTransaction.update({
      where: { id: transaction.id },
      data: { status: 'failed' },
    });
  }

  return NextResponse.redirect(redirectUrl, 303);
}

export async function GET() {
  // PayU only POSTs back, but guard against stray GETs by bouncing to the wallet page.
  return NextResponse.redirect(new URL('/dashboard/wallet', siteUrl()), 303);
}
