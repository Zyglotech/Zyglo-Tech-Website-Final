const CASHFREE_ENV = process.env.CASHFREE_ENV === 'production' ? 'production' : 'sandbox';
const CASHFREE_BASE_URL =
  CASHFREE_ENV === 'production' ? 'https://api.cashfree.com/pg' : 'https://sandbox.cashfree.com/pg';
const CASHFREE_API_VERSION = '2023-08-01';

function cashfreeHeaders() {
  const clientId = process.env.CASHFREE_CLIENT_ID;
  const clientSecret = process.env.CASHFREE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error('Cashfree credentials are not configured (CASHFREE_CLIENT_ID / CASHFREE_CLIENT_SECRET)');
  }
  return {
    'x-api-version': CASHFREE_API_VERSION,
    'x-client-id': clientId,
    'x-client-secret': clientSecret,
    'Content-Type': 'application/json',
  };
}

export interface CreateCashfreeOrderInput {
  orderId: string;
  orderAmount: number;
  customerId: string;
  customerEmail: string;
  customerPhone: string;
  customerName?: string;
  returnUrl: string;
}

export interface CashfreeOrderResponse {
  cf_order_id: string;
  order_id: string;
  order_status: string;
  payment_session_id: string;
}

export async function createCashfreeOrder(input: CreateCashfreeOrderInput): Promise<CashfreeOrderResponse> {
  const res = await fetch(`${CASHFREE_BASE_URL}/orders`, {
    method: 'POST',
    headers: cashfreeHeaders(),
    body: JSON.stringify({
      order_id: input.orderId,
      order_currency: 'INR',
      order_amount: input.orderAmount,
      customer_details: {
        customer_id: input.customerId,
        customer_email: input.customerEmail,
        customer_phone: input.customerPhone,
        customer_name: input.customerName,
      },
      order_meta: {
        return_url: input.returnUrl,
      },
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Cashfree create-order failed (${res.status}): ${errBody}`);
  }

  return res.json();
}

export async function getCashfreeOrder(orderId: string): Promise<{ order_status: string }> {
  const res = await fetch(`${CASHFREE_BASE_URL}/orders/${encodeURIComponent(orderId)}`, {
    method: 'GET',
    headers: cashfreeHeaders(),
  });
  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Cashfree get-order failed (${res.status}): ${errBody}`);
  }
  return res.json();
}

/**
 * Verifies a Cashfree webhook signature.
 * Per Cashfree docs: signedData = timestamp + rawBody, HMAC-SHA256 with the client secret, base64-encoded.
 * MUST be called with the raw (unparsed) request body string.
 */
export function verifyCashfreeWebhookSignature(rawBody: string, timestamp: string, signature: string): boolean {
  const clientSecret = process.env.CASHFREE_CLIENT_SECRET;
  if (!clientSecret) return false;

  const crypto = require('crypto') as typeof import('crypto');
  const signedData = timestamp + rawBody;
  const expected = crypto.createHmac('sha256', clientSecret).update(signedData).digest('base64');

  const expectedBuf = Buffer.from(expected);
  const receivedBuf = Buffer.from(signature);
  if (expectedBuf.length !== receivedBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, receivedBuf);
}

export function cashfreeMode() {
  return CASHFREE_ENV;
}
