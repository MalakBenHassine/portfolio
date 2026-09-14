"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

type FormStatus = "idle" | "submitting" | "sent" | "mail-client" | "error";

const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

const statusMessages: Record<Exclude<FormStatus, "idle" | "submitting">, string> = {
  sent: "Thanks! Your message has been sent — I'll get back to you soon.",
  "mail-client": "Your email app should now be open with the message ready to send.",
  error: `Something went wrong. Please email me directly at ${profile.email}.`,
};

const inputClasses =
  "mt-2 block w-full rounded-xl border border-night-600 bg-night-900/70 px-4 py-3 text-fog-50 placeholder:text-fog-500 transition-colors focus:border-mint-400 focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-mint-400/30";

function readField(data: FormData, name: string): string {
  const value = data.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!formspreeId) {
      const name = readField(data, "name");
      const email = readField(data, "email");
      const message = readField(data, "message");
      const subject = encodeURIComponent(`Portfolio contact — ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("mail-client");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Formspree responded with ${response.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-night-700 bg-night-850/70 p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium text-fog-200">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Doe"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-medium text-fog-200">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="text-sm font-medium text-fog-200">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder="Tell me about the role or project…"
          className={cn(inputClasses, "resize-y")}
        />
      </div>

      {/* Honeypot: hidden from people, filled in by bots */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="contact-gotcha">Leave this field empty</label>
        <input id="contact-gotcha" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-mint-400 px-6 py-2.5 text-sm font-semibold text-night-950 transition-colors hover:bg-mint-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending…" : "Send message"}
        </button>

        <p
          role="status"
          aria-live="polite"
          className={cn(
            "text-sm",
            status === "error" ? "text-rose-300" : "text-mint-300",
          )}
        >
          {status === "idle" || status === "submitting" ? "" : statusMessages[status]}
        </p>
      </div>
    </form>
  );
}
