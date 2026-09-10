import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  const isAdminRoute =
    request.nextUrl.pathname.startsWith('/dashboard/admin') || request.nextUrl.pathname.startsWith('/api/admin');

  if (isAdminRoute && token.isAdmin !== true) {
    if (request.nextUrl.pathname.startsWith('/api/admin')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return NextResponse.redirect(new URL('/dashboard/wallet', request.url));
  }

  // Admins always pass — approval/active gating only applies to regular accounts.
  const isBlocked = token.isAdmin !== true && (token.isApproved === false || token.isActive === false);
  if (isBlocked) {
    const reason = token.isActive === false ? 'inactive' : 'pending';
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json(
        {
          error:
            reason === 'inactive'
              ? 'Your account has been deactivated.'
              : 'Your account is pending admin approval.',
        },
        { status: 403 }
      );
    }
    return NextResponse.redirect(new URL(`/auth/pending?reason=${reason}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/admin/:path*',
    // NOT /api/payments/webhook or /api/payments/payu-return — those are
    // server-to-server / gateway-initiated callbacks with no session cookie;
    // they authenticate via their own signature verification, not login.
    '/api/payments/create-order',
    '/api/wallet/:path*',
    '/api/user/:path*',
  ],
};
