import { NextResponse } from "next/server";
import { Resend } from "resend";
import { assert } from "@/lib/assert";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 2000;
const RECIPIENT = "kareemseyi@kareemseyi.dev";

interface ContactBody {
  name: string;
  email: string;
  message: string;
}

function validateBody(
  body: unknown,
): { valid: true; data: ContactBody } | { valid: false; error: string } {
  assert(body !== null && body !== undefined, "Body must not be null");

  const b = body as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";

  if (name.length === 0 || name.length > MAX_FIELD_LENGTH) {
    return { valid: false, error: "Name is required (max 500 chars)" };
  }
  if (!EMAIL_REGEX.test(email) || email.length > MAX_FIELD_LENGTH) {
    return { valid: false, error: "Valid email is required" };
  }
  if (message.length === 0 || message.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: "Message is required (max 2000 chars)" };
  }

  return { valid: true, data: { name, email, message } };
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const result = validateBody(body);
  if (!result.valid) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const { name, email, message } = result.data;
  const resend = new Resend(apiKey);

  // Send notification to you
  const notifyResult = await resend.emails.send({
    from: "Portfolio Contact <noreply@portfolio.kareemseyi.dev>",
    to: RECIPIENT,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (notifyResult.error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
