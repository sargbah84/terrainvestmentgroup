/**
 * Cloudflare Turnstile server-side verification.
 *
 * If TURNSTILE_SECRET_KEY is unset, verification is skipped (captcha disabled),
 * so the contact form keeps working before keys are configured. Once the secret
 * is set, a valid token is required.
 */

const SECRET = process.env.TURNSTILE_SECRET_KEY ?? "";
const VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export function turnstileEnabled(): boolean {
  return Boolean(SECRET);
}

export async function verifyTurnstile(
  token: string | undefined,
  remoteIp?: string
): Promise<boolean> {
  if (!turnstileEnabled()) return true; // captcha not configured → allow
  if (!token) return false;

  const form = new URLSearchParams();
  form.set("secret", SECRET);
  form.set("response", token);
  if (remoteIp) form.set("remoteip", remoteIp);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
    });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
