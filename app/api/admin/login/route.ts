import { NextResponse } from "next/server";
import { createHash } from "crypto";

function makeToken(password: string): string {
  const secret = process.env.ADMIN_SECRET ?? "hooktap-admin-fallback";
  return createHash("sha256").update(password + secret).digest("hex");
}

export async function POST(request: Request) {
  const { password } = await request.json();
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return NextResponse.json({ error: "ADMIN_PASSWORD not configured" }, { status: 500 });
  }

  if (password !== expected) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = makeToken(expected);
  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
  });
  return response;
}
