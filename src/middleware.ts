import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from '@/lib/session';

const protectedRoutes = ['/account'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (protectedRoutes.some(path => pathname.startsWith(path))) {
    const session = await verifySession();
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
