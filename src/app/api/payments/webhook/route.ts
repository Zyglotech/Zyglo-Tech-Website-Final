import { NextResponse } from 'next/server';
import { prismadb } from '@/lib/prismadb';
import { verifyCashfreeWebhookSignature } from '@/lib/cashfree';

export const dynamic = 'force-dynamic';

function describePaymentMethod(paymentMethod: any): string {
  if (!paymentMethod) return 'Cashfree';
  if (paymentMethod.card) {
    const network = paymentMethod.card.card_network ?? 'Card';
    const last4 = (paymentMethod.card.card_number ?? '').slice(-4);
    return last4 ? `${network} - ${last4}` : network;
  }
  if (paymentMethod.upi) return 'UPI';
  if (paymentMethod.netbanking) return 'Net Banking';
  if (paymentMethod.app) return paymentMethod.app.provider ?? 'Wallet';
  return 'Cashfree';
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const timestamp = request.headers.get('x-webhook-timestamp') ?? '';
  const signature = request.headers.get('x-webhook-signature') ?? '';

  if (!timestamp || !signature || !verifyCashfreeWebhookSignature(rawBody, timestamp, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const orderId: string | undefined = payload?.data?.order?.order_id;
  const paymentStatus: string | undefined = payload?.data?.payment?.payment_status;
  const cfPaymentId: string | undefined = payload?.data?.payment?.cf_payment_id?.toString();
  const paymentMethodLabel = describePaymentMethod(payload?.data?.payment?.payment_method);

  if (!orderId) {
    return NextResponse.json({ error: 'Missing order_id' }, { status: 400 });
  }

  const transaction = await prismadb.creditTransaction.findUnique({
    where: { cashfreeOrderId: orderId },
  });
  if (!transaction) {
    return NextResponse.json({ error: 'Unknown order' }, { status: 404 });
  }

  // Already processed — Cashfree may retry webhooks, so this must be idempotent.
  if (transaction.status === 'paid') {
    return NextResponse.json({ success: true });
  }

  if (paymentStatus === 'SUCCESS') {
    await prismadb.$transaction([
      prismadb.creditTransaction.update({
        where: { id: transaction.id },
        data: { status: 'paid', paidAt: new Date(), cfPaymentId, paymentMethodLabel },
      }),
      prismadb.creditWallet.upsert({
        where: { userId: transaction.userId },
        create: { userId: transaction.userId, balance: transaction.credits },
        update: { balance: { increment: transaction.credits } },
      }),
    ]);
  } else if (paymentStatus === 'FAILED' || paymentStatus === 'CANCELLED') {
    await prismadb.creditTransaction.update({
      where: { id: transaction.id },
      data: { status: 'failed' },
    });
  }

  return NextResponse.json({ success: true });
}
