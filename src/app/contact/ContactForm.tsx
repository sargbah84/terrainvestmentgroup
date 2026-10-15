"use client";

import { useState } from "react";
import Script from "next/script";
import { CheckIcon } from "@/components/icons";
import { SUBJECTS } from "./subjects";

type Status = "idle" | "submitting" | "success" | "error";

const field =
  "w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/15";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * Contact form. Submits to /api/contact, which sends the message via Mailgun.
 * Spam protection: a hidden honeypot field plus optional Cloudflare Turnstile
 * (active only when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set).
 */
export default function ContactForm({ defaultSubject }: { defaultSubject: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      organization: data.get("organization"),
      subject: data.get("subject"),
      message: data.get("message"),
      company_website: data.get("company_website"), // honeypot
      turnstileToken: (data.get("cf-turnstile-response") as string | null) ?? "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("success");
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-brand/20 bg-leaf-soft p-10 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h3 className="mt-4 text-xl font-bold text-ink">Thank you — message sent!</h3>
        <p className="mt-2 text-sm text-body">We&rsquo;ll get back to you as soon as possible.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-bold text-brand hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <>
      {SITE_KEY && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink">Full name</label>
            <input id="name" name="name" type="text" required autoComplete="name" className={field} placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">Email</label>
            <input id="email" name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="organization" className="mb-1.5 block text-sm font-semibold text-ink">
              Organization <span className="font-normal text-muted">(optional)</span>
            </label>
            <input id="organization" name="organization" type="text" autoComplete="organization" className={field} placeholder="Company or organization" />
          </div>
          <div>
            <label htmlFor="subject" className="mb-1.5 block text-sm font-semibold text-ink">Subject</label>
            <select id="subject" name="subject" className={field} defaultValue={defaultSubject}>
              {SUBJECTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink">Message</label>
          <textarea id="message" name="message" required rows={6} className={`${field} resize-y`} placeholder="Tell us how we can work together…" />
        </div>

        {/* Honeypot — hidden from humans, often filled by bots. */}
        <div className="hidden" aria-hidden>
          <label htmlFor="company_website">Leave this field empty</label>
          <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {SITE_KEY && <div className="cf-turnstile" data-sitekey={SITE_KEY} />}

        {status === "error" && (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Send Message →"}
        </button>
      </form>
    </>
  );
}
