import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

function initAdmin() {
  if (getApps().length > 0) return;

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // dotenv may or may not expand \n in quoted values depending on version.
  // Replace literal \n sequences just in case they weren't expanded.
  const raw = process.env.FIREBASE_PRIVATE_KEY ?? "";
  const privateKey = raw.includes("\\n") ? raw.replace(/\\n/g, "\n") : raw;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin credentials. Set FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY in .env.local"
    );
  }

  initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

initAdmin();

export const adminDb = getFirestore();
export const adminAuth = getAuth();
