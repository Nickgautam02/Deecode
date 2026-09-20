"use client";

import { useState } from "react";
import { site } from "@/content/site";
import type { ContactAudience, ContactField } from "@/content/site";
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

/**
 * One field of an audience's form. Every field is uncontrolled — the
 * values are read off FormData at submit — except the select, which
 * tracks its own value only so the unchosen prompt can stay greyed out
 * like a placeholder.
 */
function Field({ field }: { field: ContactField }) {
  const [value, setValue] = useState("");

  if (field.kind === "textarea") {
    return (
      <textarea
        name={field.name}
        required
        rows={5}
        placeholder={field.placeholder}
        className={`${inputClasses} resize-none`}
      />
    );
  }

  if (field.kind === "select") {
    return (
      <div className="relative">
        <select
          name={field.name}
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`${inputClasses} appearance-none pr-10 ${
            value ? "" : "text-muted/60"
          }`}
        >
          <option value="" disabled>
            {field.placeholder}
          </option>
          {field.options?.map((option) => (
            <option key={option} value={option} className="bg-background text-foreground">
              {option}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          fill="none"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        >
          <path
            d="m5 7.5 5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <input
      name={field.name}
      type={field.kind}
      required
      placeholder={field.placeholder}
      className={inputClasses}
    />
  );
}

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const { audiences } = site.contact;
  const [audience, setAudience] = useState<ContactAudience>(audiences[0]);
  const [role, setRole] = useState(audiences[0].roles[0]);
  const [status, setStatus] = useState<Status>("idle");

  /** Switching forms starts the other one fresh rather than carrying a
   *  half-filled state — or a "sent" panel — across the toggle. */
  const selectAudience = (next: ContactAudience) => {
    setAudience(next);
    setRole(next.roles[0]);
    setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Each form posts to its own Apps Script deployment, so the two
    // audiences land in two different spreadsheets.
    const webhookUrl = audience.webhookUrl;

    // Fallback while this form's webhook isn't connected: open the
    // visitor's email client with a pre-filled message.
    if (!webhookUrl) {
      const subject = encodeURIComponent(`${role} — enquiry from ${data.get("name")}`);
      const lines = audience.fields.map(
        (field) => `${field.label}: ${data.get(field.name) ?? ""}`,
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(
        `${lines.join("\n")}\nRole: ${role}`,
      )}`;
      return;
    }

    setStatus("sending");
    // Only this audience's fields are posted. `audience` rides along so a
    // script that handles both can tell them apart — the brand endpoint
    // ignores it, since everything reaching it is a brand.
    const payload = new URLSearchParams({ role, audience: audience.id });
    for (const field of audience.fields) {
      payload.set(field.name, String(data.get(field.name) ?? ""));
    }

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
            <div className="rounded-2xl border border-line bg-card p-8 md:p-10">
              {/* The toggle stays visible either way, so someone who
                  submitted one form can start the other. */}
              <div
                role="tablist"
                aria-label="Who's getting in touch"
                className="mb-8 grid grid-cols-2 gap-1 rounded-full border border-line p-1"
              >
                {audiences.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    role="tab"
                    aria-selected={option.id === audience.id}
                    onClick={() => selectAudience(option)}
                    className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                      option.id === audience.id
                        ? "bg-accent text-background"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {option.tab}
                  </button>
                ))}
              </div>

              {status === "sent" ? (
                <div className="flex min-h-72 flex-col items-center justify-center text-center">
                  <p className="font-display text-3xl font-bold text-accent">
                    {audience.sentTitle}
                  </p>
                  <p className="mt-3 max-w-sm text-muted">{audience.sentBody}</p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-8 rounded-full border border-line px-6 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                // Keyed so switching audience remounts the fields rather
                // than reusing them by position.
                <form key={audience.id} onSubmit={handleSubmit}>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {audience.roles.map((option) => (
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
                    {audience.fields.map((field) => (
                      <Field key={field.name} field={field} />
                    ))}
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
                    {status === "sending" ? "Sending…" : audience.submitLabel}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
