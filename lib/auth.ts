import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "ai_intel_admin";
const maxAge = 60 * 60 * 24 * 7;

function secret() { return process.env.AUTH_SECRET || "development-only-secret-change-me"; }
function sign(payload: string) { return createHmac("sha256", secret()).update(payload).digest("base64url"); }

export function createSessionToken() {
  const expires = Math.floor(Date.now() / 1000) + maxAge;
  const payload = `admin.${expires}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token?: string) {
  if (!token) return false;
  const parts = token.split("."); if (parts.length !== 3) return false;
  const [role, expires, signature] = parts; const payload = `${role}.${expires}`;
  if (role !== "admin" || Number(expires) < Date.now() / 1000) return false;
  const expected = Buffer.from(sign(payload)); const actual = Buffer.from(signature);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function isAuthenticated() { return verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value); }
export const sessionMaxAge = maxAge;
