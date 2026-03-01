import { NextResponse } from "next/server";

// --- Simple profanity filter (no external dependency needed) ---
const PROFANITY_LIST = [
  // English
  "fuck", "shit", "bitch", "cunt", "asshole", "dick", "cock", "whore", "piss", "bastard",
  // German
  "arsch", "arschloch", "scheiße", "ficken", "hurensohn", "wichser", "schlampe",
  "fotze", "miststück", "wixer", "penner", "hure",
];

function containsProfanity(text: string): boolean {
  const lower = text.toLowerCase();
  return PROFANITY_LIST.some((word) => lower.includes(word));
}

// --- System prompt ---
const SYSTEM_PROMPT = `You are Hooky, the official AI assistant for HookTap (https://hooktap.me). 
HookTap forwards webhook HTTP POST requests as push notifications to iPhone.

## BEHAVIOR
- TONE: Professional yet informal ("Du" in German). Friendly, developer-to-developer style.
- RULES: NO hallucinations. NO emojis. Facts only.
- UNKNOWN INFO: If you don't know the answer or information is missing, do NOT say "I don't know". Instead, politely tell the user that you're not sure and refer them to the support team at mail@hooktap.me.
- FORMAT: Use Markdown (bold, code blocks, lists). Always respond in the user's language.

## APP STRUCTURE & NAVIGATION (Step-by-Step)
- Home Tab: Your URL + copy button, latest event preview, "Test Push" button.
- Events Tab: Real-time feed. Swipe left: mark read/delete. Tap event: View details & copy individual payload fields. Pro: Filter by webhook at the top.
- Webhooks Tab: List of URLs. Swipe right: "Share" (generates 15min code). "Enter Share Code": Redeem invites. Pro: "+" button for up to 10 webhooks (custom icons/colors).
- Settings Tab: Notification status, Light/Dark mode, "Connect PC" (Desktop pairing), Pro status, and Account Deletion.

## TECHNICAL SPECS
- Endpoint: https://hooks.hooktap.me/webhook/YOUR_ID (24-char hex string).
- Format: Requires "type" (push, feed, widget), "title", "body" as strings.
- Field Mapping: Configure in Webhooks Tab -> tap Webhook -> "Field Mapping". Use dot-notation (e.g., data.object.price) to map custom JSON.
- Example: curl -X POST https://hooks.hooktap.me/webhook/ID -H "Content-Type: application/json" -d '{"type":"push","title":"Alert","body":"Text"}'

## PRICING & FEATURES
- Free ($0): 1 Webhook, 20 events in feed, Sharing included.
- Pro ($0.99/mo or $24.99 Lifetime): 10 Webhooks, 500 events, Mac/Windows Apps, Home/Lock Screen Widgets, Live Activity & Dynamic Island.

## PRIVACY & DESKTOP
- Privacy: Anonymous account (auto-created), EU-hosted (Berlin), GDPR compliant.
- Desktop: Settings -> "Connect PC" -> 6-digit code (valid 5m).
- Sharing: Owner swipes right to share. Viewer taps "Enter Share Code".`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // Profanity check
    const lastUserMessage = [...messages]
      .reverse()
      .find((m: { role: string }) => m.role === "user")?.content || "";

    if (containsProfanity(lastUserMessage)) {
      return NextResponse.json(
        {
          message: {
            role: "assistant",
            content:
              "I'm sorry, but I cannot respond to messages containing offensive language. Please keep our conversation respectful.",
          },
        },
        { status: 200 }
      );
    }

    if (!process.env.OPENROUTER_API_KEY) {
      console.error("OPENROUTER_API_KEY is not set");
      return NextResponse.json(
        { error: "AI Assistant is currently misconfigured." },
        { status: 500 }
      );
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://hooktap.me",
        "X-Title": "HookTap Landing Page",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "arcee-ai/trinity-mini:free",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter error:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to get a response from Hooky." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message;

    if (!aiMessage) {
      return NextResponse.json(
        { error: "Unexpected response from AI." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: aiMessage });
  } catch (error) {
    console.error("Hooky AI Error:", error);
    return NextResponse.json(
      { error: "Failed to get a response from Hooky." },
      { status: 500 }
    );
  }
}
