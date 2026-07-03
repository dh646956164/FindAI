import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";
export async function POST(request: NextRequest) { const protocol = request.headers.get("x-forwarded-proto") || request.nextUrl.protocol.replace(":", ""); const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || request.nextUrl.host; const response = NextResponse.redirect(new URL("/admin/login", `${protocol}://${host}`), 303); response.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 }); return response; }
