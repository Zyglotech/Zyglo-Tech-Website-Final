import { prismadb } from '@/lib/prismadb';

export class InsufficientCreditsError extends Error {
  constructor(public balance: number, public requested: number) {
    super(`Insufficient credits: have ${balance}, need ${requested}`);
    this.name = 'InsufficientCreditsError';
  }
}

/**
 * Deducts `credits` from a user's wallet and records a 'usage' transaction.
 * Hard-blocks: throws InsufficientCreditsError if the balance can't cover it —
 * the balance is never allowed to go negative.
 *
 * Wrap whatever feature actually consumes credits (a chatbot reply, an API call,
 * a workflow run, etc.) with this before doing the paid work, e.g.:
 *
 *   await spendCredits({ userId, credits: 1, description: 'Chatbot reply' });
 *   // ...now do the metered work
 */
export async function spendCredits({
  userId,
  credits,
  description,
}: {
  userId: string;
  credits: number;
  description: string;
}) {
  if (credits <= 0) {
    throw new Error('credits must be a positive number');
  }

  return prismadb.$transaction(async (tx) => {
    const wallet = await tx.creditWallet.findUnique({ where: { userId } });
    const balance = wallet?.balance ?? 0;

    if (balance < credits) {
      throw new InsufficientCreditsError(balance, credits);
    }

    const [updatedWallet] = await Promise.all([
      tx.creditWallet.update({
        where: { userId },
        data: { balance: { decrement: credits } },
      }),
      tx.creditTransaction.create({
        data: {
          userId,
          type: 'usage',
          credits,
          status: 'paid',
          planLabel: description,
          paidAt: new Date(),
        },
      }),
    ]);

    return { balance: updatedWallet.balance };
  });
}
