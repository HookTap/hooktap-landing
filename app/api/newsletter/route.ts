import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const apiKey = process.env.MAILEROO_API_KEY;
    const listId = process.env.MAILEROO_LIST_ID;

    if (!apiKey) {
      console.error("MAILEROO_API_KEY is not set");
      return NextResponse.json({ error: "Newsletter service is misconfigured" }, { status: 500 });
    }

    if (!listId) {
      console.error("MAILEROO_LIST_ID is not set");
      return NextResponse.json({ error: "Newsletter list ID is missing" }, { status: 500 });
    }

    const response = await fetch(`https://manage.maileroo.app/v1/contact/${listId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({
        subscriber_email: email,
        subscriber_status: "UNCONFIRMED",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Maileroo error:", response.status, data);
      return NextResponse.json(
        { error: data.message || "Failed to subscribe" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter API Error:", error);
    return NextResponse.json(
      { error: "Failed to process subscription" },
      { status: 500 }
    );
  }
}
