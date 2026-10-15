import { NextResponse } from "next/server";
import { SUBJECTS } from "@/app/contact/subjects";
import { mailgunConfigured, sendEmail } from "@/lib/mailgun";
import { verifyTurnstile } from "@/lib/turnstile";

function clean(value: unknown, max = 2000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields; humans leave them empty.
  if (clean(body.company_website)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const organization = clean(body.organization, 160);
  const subject = clean(body.subject, 120);
  const message = clean(body.message, 5000);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  }

  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (!(await verifyTurnstile(clean(body.turnstileToken, 4000), ip))) {
    return NextResponse.json({ error: "Captcha verification failed. Please try again." }, { status: 403 });
  }

  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;
  if (!mailgunConfigured() || !to || !from) {
    console.error("[contact] Mailgun / CONTACT_TO / CONTACT_FROM not configured.");
    return NextResponse.json({ error: "Email service is unavailable right now." }, { status: 503 });
  }

  const safeSubject = SUBJECTS.includes(subject) ? subject : "General inquiry";
  const text = [
    "New contact form submission — terraliberia.com",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    organization ? `Organization: ${organization}` : null,
    `Subject: ${safeSubject}`,
    "",
    message,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${organization ? `<p><strong>Organization:</strong> ${escapeHtml(organization)}</p>` : ""}
    <p><strong>Subject:</strong> ${escapeHtml(safeSubject)}</p>
    <hr />
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `;

  try {
    await sendEmail({
      to,
      from,
      subject: `[Terra Contact] ${safeSubject} — ${name}`,
      text,
      html,
      replyTo: `${name} <${email}>`,
    });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json({ error: "Could not send your message. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
