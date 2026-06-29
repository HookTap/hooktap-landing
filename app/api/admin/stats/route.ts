import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createHash } from "crypto";
import { adminDb, adminAuth } from "../../../lib/firebase-admin";

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

async function countUsers(): Promise<number> {
  let count = 0;
  let pageToken: string | undefined;
  do {
    const result = await adminAuth.listUsers(1000, pageToken);
    count += result.users.length;
    pageToken = result.pageToken;
  } while (pageToken);
  return count;
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (!isAuthorized(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [users, devices, linkedDevices, webhooks, events] = await Promise.all([
      countUsers(),
      countCollection("devices"),
      countCollection("linkedDevices"),
      countCollection("webhooks"),
      countCollection("events"),
    ]);

    return NextResponse.json({
      users,
      devices,
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
