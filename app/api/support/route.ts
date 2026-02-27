import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, subject, message, language, name, source } = await request.json();

    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields: email, subject, message" },
        { status: 400 }
      );
    }

    // Generate a ticket reference
    const ticketId = `HKT-${Date.now().toString(36).toUpperCase()}`;

    // Log the ticket server-side – replace this with your preferred
    // notification method (email via Resend/Nodemailer, Slack webhook, etc.)
    console.log("[HookTap Support Ticket]", {
      ticketId,
      email,
      subject,
      message,
      language: language ?? "unknown",
      name: name ?? "User via Chatbot",
      source: source ?? "chatbot",
      timestamp: new Date().toISOString(),
    });

    // TODO: send an email notification here, e.g.:
    // await sendEmail({ to: "support@hooktap.me", subject, body: message, replyTo: email })

    return NextResponse.json({
      success: true,
      ticketId,
      ticketNumber: ticketId,
    });
  } catch (error) {
    console.error("Support ticket error:", error);
    return NextResponse.json(
      { error: "Failed to create support ticket." },
      { status: 500 }
    );
  }
}
