import { NextResponse } from 'next/server';
import { prismadb } from '@/lib/prismadb';
import { requireAdmin } from '@/app/api/admin/_guard';

export const dynamic = 'force-dynamic';

const DETAIL_SELECT = {
  id: true,
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
  isAdmin: true,
  isApproved: true,
  isActive: true,
  createdAt: true,
  creditWallet: { select: { balance: true } },
  creditTransactions: { orderBy: { createdAt: 'desc' as const }, take: 50 },
  dealerInvoices: { orderBy: { createdAt: 'desc' as const }, take: 20 },
} as const;

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json({ error: guard.error }, { status: guard.status });
  }

  const user = await prismadb.user.findUnique({ where: { id: params.id }, select: DETAIL_SELECT });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ user });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json({ error: guard.error }, { status: guard.status });
  }

  const body = (await request.json().catch(() => ({}))) as { isApproved?: boolean; isActive?: boolean };
  const data: { isApproved?: boolean; isActive?: boolean } = {};
  if (typeof body.isApproved === 'boolean') data.isApproved = body.isApproved;
  if (typeof body.isActive === 'boolean') data.isActive = body.isActive;

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: 'Provide isApproved and/or isActive as a boolean' }, { status: 422 });
  }

  const targetUser = await prismadb.user.findUnique({ where: { id: params.id }, select: { id: true, isAdmin: true } });
  if (!targetUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  if (targetUser.isAdmin && (data.isApproved === false || data.isActive === false)) {
    return NextResponse.json({ error: 'Cannot deactivate or unapprove an admin account' }, { status: 422 });
  }

  const user = await prismadb.user.update({ where: { id: params.id }, data, select: DETAIL_SELECT });
  return NextResponse.json({ user });
}
