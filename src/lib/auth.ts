import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
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

        // New accounts start unapproved and require admin sign-off; existing accounts are untouched.
        const user = await prismadb.user.upsert({
          where: { email },
          update: {},
          create: { email, isApproved: false, creditWallet: { create: { balance: 0 } } },
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isApproved: user.isApproved,
          isActive: user.isActive,
        };
      },
    }),
    CredentialsProvider({
      id: 'admin-password',
      name: 'Admin Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email.toLowerCase().trim();
        const user = await prismadb.user.findUnique({ where: { email } });
        if (!user?.isAdmin || !user.password) return null;

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isApproved: user.isApproved,
          isActive: user.isActive,
        };
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
        token.isAdmin = user.isAdmin;
        token.isApproved = user.isApproved;
        token.isActive = user.isActive;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          isAdmin: token.isAdmin === true,
          isApproved: token.isApproved !== false,
          isActive: token.isActive !== false,
        },
      };
    },
  },
};
