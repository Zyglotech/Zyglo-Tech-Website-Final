import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prismadb } from '@/lib/prismadb';
import { verifyOtp } from '@/lib/otp';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email OTP',
      credentials: {
        email: { label: 'Email', type: 'email' },
        code: { label: 'Code', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.code) return null;

        const email = credentials.email.toLowerCase().trim();
        const valid = await verifyOtp(email, credentials.code);
        if (!valid) return null;

        const user = await prismadb.user.upsert({
          where: { email },
          update: {},
          create: { email, creditWallet: { create: { balance: 0 } } },
        });

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
  },
};
