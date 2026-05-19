import { NextResponse } from 'next/server';
import { readLeads, updateLeadStatus } from '@/lib/leadsStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  const leads = readLeads();
  return NextResponse.json({ leads, total: leads.length });
}

export async function PATCH(request: Request) {
  const { id, status } = await request.json() as { id: string; status: string };
  const lead = updateLeadStatus(id, status as never);
  if (!lead) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, lead });
}
