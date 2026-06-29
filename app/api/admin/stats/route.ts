import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createHash } from "crypto";
import { adminDb } from "../../../lib/firebase-admin";

function makeToken(password: string): string {
  const secret = process.env.ADMIN_SECRET ?? "hooktap-admin-fallback";
  return createHash("sha256").update(password + secret).digest("hex");
}

function isAuthorized(sessionCookie: string | undefined): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !sessionCookie) return false;
  return sessionCookie === makeToken(expected);
}

async function countCollection(collection: string): Promise<number> {
  const snap = await adminDb.collection(collection).count().get();
  return snap.data().count;
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (!isAuthorized(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // devices has one doc per userId → best user count without Auth Admin API
    const [users, linkedDevices, webhooks, events] = await Promise.all([
      countCollection("devices"),
      countCollection("linkedDevices"),
      countCollection("webhooks"),
      countCollection("events"),
    ]);

    return NextResponse.json({
      users,
      linkedDevices,
      webhooks,
      events,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Admin stats error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
