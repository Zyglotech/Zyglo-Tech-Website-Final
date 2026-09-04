import crypto from 'crypto';

const PAYU_ENV = process.env.PAYU_ENV === 'production' ? 'production' : 'test';
const PAYU_ACTION_URL = PAYU_ENV === 'production' ? 'https://secure.payu.in/_payment' : 'https://test.payu.in/_payment';

function payuCreds() {
  const key = process.env.PAYU_KEY;
  const salt = process.env.PAYU_SALT;
  if (!key || !salt) {
    throw new Error('PayU credentials are not configured (PAYU_KEY / PAYU_SALT)');
  }
  return { key, salt };
}

export function payuConfigured(): boolean {
  return Boolean(process.env.PAYU_KEY && process.env.PAYU_SALT);
}

export function payuMode() {
  return PAYU_ENV;
}

export interface BuildPayuFormInput {
  txnid: string;
  amount: number;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
}

export interface PayuFormFields {
  action: string;
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  hash: string;
}

/**
 * PayU Hosted Checkout request hash:
 * sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||salt)
 * https://docs.payu.in/docs/hash-generation
 */
const stripPipes = (s: string) => s.replace(/\|/g, ' ').trim();

export function buildPayuForm(input: BuildPayuFormInput): PayuFormFields {
  const { key, salt } = payuCreds();
  const amount = input.amount.toFixed(2);
  const productinfo = stripPipes(input.productinfo);
  const firstname = stripPipes(input.firstname);
  const email = stripPipes(input.email);

  const hashFields = [
    key,
    input.txnid,
    amount,
    productinfo,
    firstname,
    email,
    '', '', '', '', '', // udf1-udf5
    '', '', '', '', '', // reserved blanks
    salt,
  ];
  const hash = crypto.createHash('sha512').update(hashFields.join('|')).digest('hex');

  return {
    action: PAYU_ACTION_URL,
    key,
    txnid: input.txnid,
    amount,
    productinfo,
    firstname,
    email,
    phone: input.phone,
    surl: input.surl,
    furl: input.furl,
    hash,
  };
}

export interface PayuReturnPayload {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  status: string;
  hash: string;
  mihpayid?: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
}

/**
 * PayU reverse hash (response verification):
 * sha512(salt|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
 * https://docs.payu.in/docs/working-with-response-after-a-customer-checkout
 */
export function verifyPayuResponseHash(payload: PayuReturnPayload): boolean {
  const { salt } = payuCreds();

  const hashFields = [
    salt,
    payload.status,
    '', '', '', '', '', // reserved blanks
    payload.udf5 ?? '',
    payload.udf4 ?? '',
    payload.udf3 ?? '',
    payload.udf2 ?? '',
    payload.udf1 ?? '',
    payload.email,
    payload.firstname,
    payload.productinfo,
    payload.amount,
    payload.txnid,
    payload.key,
  ];
  const expected = crypto.createHash('sha512').update(hashFields.join('|')).digest('hex');

  const expectedBuf = Buffer.from(expected);
  const receivedBuf = Buffer.from(payload.hash || '');
  if (expectedBuf.length !== receivedBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, receivedBuf);
}
