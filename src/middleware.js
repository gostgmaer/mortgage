import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_PATHS = ['/', '/login', '/api/auth/callback'];

const ADMIN_PATHS = ['/admin', '/contacts', '/deals'];
const CLIENT_PATHS = ['/dashboard', '/task'];
const SHARED_PATHS = ['/profile', '/change-password'];

const getJwtSecret = () => new TextEncoder().encode(process.env.KEYCLOAK_JWT_SECRET);

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get('kc-token')?.value;

  if (!token) {
    // Redirect unauthenticated users
    return NextResponse.redirect(new URL('/login', req.url));
  }

  let payload;
  try {
    const { payload: decoded } = await jwtVerify(token, getJwtSecret());
    payload = decoded;
  } catch (err) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const roles = payload?.realm_access?.roles || [];

  // Role-based routes
  if (ADMIN_PATHS.some((p) => pathname.startsWith(p)) && !roles.includes('admin')) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  if (CLIENT_PATHS.some((p) => pathname.startsWith(p)) && !roles.includes('client')) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  // Shared paths (admin or client)
  if (SHARED_PATHS.some((p) => pathname.startsWith(p)) && !['admin', 'client'].some(role => roles.includes(role))) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/admin-dashboard/:path*',
    '/customers/:path*',
    '/deals/:path*',
    '/user-dashboard/:path*',
    '/task/:path*',
    '/profile/:path*',
    '/change-password/:path*'
  ]
};