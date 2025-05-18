import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { jwtDecode } from "jwt-decode";
const ADMIN_PATHS = ["/admin", "/contacts", "/deals"];
const CLIENT_PATHS = ["/dashboard", "/task"];
const SHARED_PATHS = ["/profile", "/change-password", "/"];

const getJwtSecret = () =>
  new TextEncoder().encode(process.env.KEYCLOAK_JWT_SECRET);

export async function middleware(req) {
  const { pathname, origin } = req.nextUrl;
  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    const response = NextResponse.redirect(redirectToKeycloakLogin(req));
    response.cookies.set("redirect_path", pathname, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });
    return response;
  }

  try {
    const payload = jwtDecode(token);
    const roles = payload?.["realm_access"]?.["roles"] || [];
    if (
      ADMIN_PATHS.some((p) => pathname.startsWith(p)) &&
      !roles.includes("Super-Admin")
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (
      CLIENT_PATHS.some((p) => pathname.startsWith(p)) &&
      !roles.includes("Client")
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (
      SHARED_PATHS.some((p) => pathname.startsWith(p)) &&
      !["Super-Admin", "Client"].some((role) => roles.includes(role))
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    return redirectToKeycloakLogin(req);
  }
}

function redirectToKeycloakLogin(req) {
  const redirectUri = encodeURIComponent(`${req.nextUrl.origin}/api/callback`);
  return `https://infin8v2-ss-layer.inadev.net/client-keycloak/auth/realms/infin8v2dev/protocol/openid-connect/auth?client_id=infin8v2DevWeb&response_type=code&redirect_uri=${redirectUri}`;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/contacts/:path*",
    "/",
    "/deals/:path*",
    "/dashboard/:path*",
    "/task/:path*",
    "/profile/:path*",
    "/change-password/:path*",
  ],
};
