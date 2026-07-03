import { NextRequest, NextResponse } from "next/server";

async function validToken(token: string | undefined) {
  if (!token) return false; const parts = token.split("."); if (parts.length !== 3) return false;
  const [role, expires, signature] = parts; if (role !== "admin" || Number(expires) < Date.now() / 1000) return false;
  const secret = process.env.AUTH_SECRET || "development-only-secret-change-me";
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signed = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${role}.${expires}`));
  const expected = btoa(String.fromCharCode(...new Uint8Array(signed))).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
  return signature === expected;
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") return NextResponse.next();
  if (!(await validToken(request.cookies.get("ai_intel_admin")?.value))) {
    const url = new URL("/admin/login", request.url); url.searchParams.set("next", request.nextUrl.pathname); return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/admin/:path*"] };
