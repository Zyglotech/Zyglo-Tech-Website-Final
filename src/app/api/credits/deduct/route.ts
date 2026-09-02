import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { spendCredits, InsufficientCreditsError } from '@/lib/credits';

export const dynamic = 'force-dynamic';

/**
 * Generic credit-spend endpoint. Any feature that should consume credits
 * (a chatbot reply, an automation run, an API call, etc.) calls this —
 * server-side only, never from untrusted client code without its own
 * rate/ownership checks in front of it.
 */
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { credits, description } = (await request.json().catch(() => ({}))) as {
    credits?: number;
    description?: string;
  };

  if (!credits || credits <= 0 || !Number.isFinite(credits)) {
    return NextResponse.json({ error: 'credits must be a positive number' }, { status: 422 });
  }

  try {
    const result = await spendCredits({
      userId: session.user.id,
      credits,
      description: description?.trim() || 'Credit usage',
    });
    return NextResponse.json({ success: true, balance: result.balance });
  } catch (err) {
    if (err instanceof InsufficientCreditsError) {
      return NextResponse.json(
        { error: 'Insufficient credits', balance: err.balance, required: err.requested },
        { status: 402 }
      );
    }
    return NextResponse.json({ error: 'Could not process credit usage' }, { status: 500 });
  }
}
