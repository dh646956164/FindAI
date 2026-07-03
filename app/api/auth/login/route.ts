import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, SESSION_COOKIE, sessionMaxAge } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const form = await request.formData(); const email = String(form.get("email") || "").trim(); const password = String(form.get("password") || "");
  const expectedEmail = process.env.ADMIN_EMAIL || "admin@example.com"; const expectedPassword = process.env.ADMIN_PASSWORD || "change-this-password";
  const protocol = request.headers.get("x-forwarded-proto") || request.nextUrl.protocol.replace(":", "");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || request.nextUrl.host;
  const origin = `${protocol}://${host}`;
  if (email !== expectedEmail || password !== expectedPassword) return NextResponse.redirect(new URL("/admin/login?error=1", origin), 303);
  const next = String(form.get("next") || "/admin"); const safeNext = next.startsWith("/admin") ? next : "/admin";
  const response = NextResponse.redirect(new URL(safeNext, origin), 303);
  response.cookies.set(SESSION_COOKIE, createSessionToken(), { httpOnly: true, sameSite: "lax", secure: protocol === "https", path: "/", maxAge: sessionMaxAge });
  return response;
}
