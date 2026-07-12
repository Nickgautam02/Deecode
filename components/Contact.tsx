"use client";

import { useState } from "react";
import { site } from "@/content/site";
import Reveal from "./Reveal";

const inputClasses =
  "w-full rounded-xl border border-line bg-background px-4 py-3 text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent";

/** Renders the heading, painting the [bracketed] segment in the accent color. */
function Heading({ text }: { text: string }) {
  const match = text.match(/^([\s\S]*)\[(.+)\]([\s\S]*)$/);
  if (!match) return <>{text}</>;
  const [, before, highlighted, after] = match;
  return (
    <>
      {before}
      <span className="text-accent">{highlighted}</span>
      {after}
    </>
  );
}

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [role, setRole] = useState(site.contact.roles[0]);
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const webhookUrl = site.contact.sheetWebhookUrl;

    // Fallback while the Google Sheet webhook isn't connected: open the
    // visitor's email client with a pre-filled message.
    if (!webhookUrl) {
      const subject = encodeURIComponent(`${role} — enquiry from ${data.get("name")}`);
      const body = encodeURIComponent(
        `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nRole: ${role}\n\n${data.get("message")}`,
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    const payload = new URLSearchParams({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      message: String(data.get("message") ?? ""),
      role,
    });

    try {
      // Apps Script web apps don't send CORS headers, so the response is
      // opaque — "no-cors" lets the submission through and we assume
      // success unless the network itself fails.
      await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Contact
            </p>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              <Heading text={site.contact.heading} />
            </h2>
            <p className="mt-5 max-w-md text-lg text-muted">{site.contact.sub}</p>

            <div className="mt-10 space-y-4 text-muted">
              <p>
                <span className="mb-1 block text-xs uppercase tracking-[0.2em]">Email</span>
                <a href={`mailto:${site.email}`} className="text-foreground hover:text-accent">
                  {site.email}
                </a>
              </p>
              <p>
                <span className="mb-1 block text-xs uppercase tracking-[0.2em]">WhatsApp</span>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-accent"
                >
                  {site.phone}
                </a>
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            {status === "sent" ? (
              <div className="flex h-full min-h-80 flex-col items-center justify-center rounded-2xl border border-accent/40 bg-card p-10 text-center">
                <p className="font-display text-3xl font-bold text-accent">Message sent 🎉</p>
                <p className="mt-3 max-w-sm text-muted">
                  Thanks for reaching out — we&apos;ll get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-8 rounded-full border border-line px-6 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-line bg-card p-8 md:p-10"
              >
                <div className="mb-6 flex flex-wrap gap-2">
                  {site.contact.roles.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setRole(option)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        role === option
                          ? "border-accent bg-accent text-background"
                          : "border-line text-muted hover:border-accent hover:text-foreground"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    className={inputClasses}
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email address"
                    className={inputClasses}
                  />
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp number"
                    className={inputClasses}
                  />
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your goals…"
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <p className="mt-4 text-sm text-red-400">
                    Something went wrong — please try again or email us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-6 w-full rounded-full bg-accent py-3.5 font-semibold text-background transition-transform hover:scale-[1.02] disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
