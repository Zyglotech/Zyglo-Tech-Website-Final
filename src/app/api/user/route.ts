import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prismadb } from '@/lib/prismadb';

export const dynamic = 'force-dynamic';

const PROFILE_SELECT = {
  name: true,
  email: true,
  phone: true,
  companyName: true,
  addressLine1: true,
  addressLine2: true,
  city: true,
  state: true,
  postalCode: true,
  country: true,
  sellerLogoDataUrl: true,
  sellerCompanyName: true,
  sellerAddressLine1: true,
  sellerAddressLine2: true,
  sellerCity: true,
  sellerState: true,
  sellerPostalCode: true,
  sellerCountry: true,
  sellerEmail: true,
} as const;

const MAX_LOGO_DATA_URL_LENGTH = 300_000; // ~220KB decoded, generous for a small logo

function isValidIndianPhone(phone: string) {
  return /^[6-9]\d{9}$/.test(phone.replace(/\D/g, '').slice(-10));
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prismadb.user.findUnique({
    where: { id: session.user.id },
    select: PROFILE_SELECT,
  });

  return NextResponse.json(user);
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    name?: string;
    phone?: string;
    companyName?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    sellerLogoDataUrl?: string | null;
    sellerCompanyName?: string;
    sellerAddressLine1?: string;
    sellerAddressLine2?: string;
    sellerCity?: string;
    sellerState?: string;
    sellerPostalCode?: string;
    sellerCountry?: string;
    sellerEmail?: string;
  };

  if (body.phone !== undefined && !isValidIndianPhone(body.phone)) {
    return NextResponse.json({ error: 'A valid 10-digit phone number is required' }, { status: 422 });
  }

  if (body.sellerLogoDataUrl !== undefined && !body.sellerLogoDataUrl) {
    body.sellerLogoDataUrl = null;
  }
  if (
    body.sellerLogoDataUrl !== undefined &&
    body.sellerLogoDataUrl !== null &&
    (!/^data:image\/(png|jpeg|jpg|svg\+xml|webp);base64,/.test(body.sellerLogoDataUrl) ||
      body.sellerLogoDataUrl.length > MAX_LOGO_DATA_URL_LENGTH)
  ) {
    return NextResponse.json({ error: 'Logo must be a PNG, JPEG, WEBP, or SVG image under ~200KB' }, { status: 422 });
  }

  const data: Record<string, string | null> = {};
  const stringField = (key: keyof typeof body) => {
    if (body[key] !== undefined) data[key] = (body[key] as string | null)?.toString().trim() || null;
  };

  if (body.phone !== undefined) data.phone = body.phone.replace(/\D/g, '').slice(-10);
  stringField('name');
  stringField('companyName');
  stringField('addressLine1');
  stringField('addressLine2');
  stringField('city');
  stringField('state');
  stringField('postalCode');
  stringField('country');
  if (body.sellerLogoDataUrl !== undefined) data.sellerLogoDataUrl = body.sellerLogoDataUrl;
  stringField('sellerCompanyName');
  stringField('sellerAddressLine1');
  stringField('sellerAddressLine2');
  stringField('sellerCity');
  stringField('sellerState');
  stringField('sellerPostalCode');
  stringField('sellerCountry');
  stringField('sellerEmail');

  const user = await prismadb.user.update({
    where: { id: session.user.id },
    data,
    select: PROFILE_SELECT,
  });

  return NextResponse.json(user);
}
