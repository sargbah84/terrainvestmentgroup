/**
 * Minimal Mailgun sender using the REST API (no SDK dependency).
 *
 * Mailgun authenticates with HTTP Basic auth: username `api`, password = the
 * private API key. The messages endpoint takes form-encoded fields.
 * Server-side only — never import this into a client component.
 */

const API_BASE = process.env.MAILGUN_API_BASE ?? "https://api.mailgun.net";
const DOMAIN = process.env.MAILGUN_DOMAIN ?? "";
const KEY = process.env.MAILGUN_KEY ?? "";

export function mailgunConfigured(): boolean {
  return Boolean(DOMAIN && KEY);
}

export interface SendEmailInput {
  to: string;
  from: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

export async function sendEmail(input: SendEmailInput): Promise<void> {
  if (!mailgunConfigured()) {
    throw new Error("Mailgun is not configured (MAILGUN_DOMAIN / MAILGUN_KEY).");
  }

  const form = new URLSearchParams();
  form.set("from", input.from);
  form.set("to", input.to);
  form.set("subject", input.subject);
  form.set("text", input.text);
  if (input.html) form.set("html", input.html);
  if (input.replyTo) form.set("h:Reply-To", input.replyTo);

  const res = await fetch(`${API_BASE}/v3/${DOMAIN}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${KEY}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Mailgun send failed (${res.status}): ${detail.slice(0, 300)}`);
  }
}
