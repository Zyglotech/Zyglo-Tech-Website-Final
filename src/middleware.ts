import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

// No auth required - all routes are public
export const config = {
  matcher: [],
};
