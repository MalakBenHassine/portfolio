"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowRightIcon } from "@/components/ui/icons/ArrowRightIcon";
import { CheckIcon } from "@/components/ui/icons/CheckIcon";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

type FormStatus = "idle" | "submitting" | "sent" | "mail-client" | "error";

const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

const statusMessages: Record<Exclude<FormStatus, "idle" | "submitting">, string> = {
  sent: "Thanks — your message has been delivered. I'll get back to you soon.",
  "mail-client": "Your email app should now be open with the message ready to send.",
  error: `Something went wrong. Please email me directly at ${profile.email}.`,
};

const inputClasses =
  "peer mt-2 block w-full rounded-xl border border-white/8 bg-ink-950/60 px-4 py-3 text-snow placeholder:text-mist-500 transition-[border-color,box-shadow] duration-200 focus:border-azure-400/70 focus:shadow-[0_0_0_4px_rgb(91_130_255/0.15)] focus:outline-none focus-visible:outline-none";

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
  const isSent = status === "sent";

  return (
    <form
      onSubmit={handleSubmit}
      onChange={() => (isSent || status === "error") && setStatus("idle")}
      className="surface relative overflow-hidden rounded-3xl p-6 sm:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-azure-300/50 to-transparent"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium text-mist-200">
            Name
          </label>
          <input id="contact-name" name="name" type="text" required autoComplete="name" placeholder="Your full name" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-medium text-mist-200">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="name@company.com"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="text-sm font-medium text-mist-200">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder="A few words about the position, your team or the project"
          className={cn(inputClasses, "resize-y")}
        />
      </div>

      {/* Honeypot: hidden from people, filled in by bots */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="contact-gotcha">Leave this field empty</label>
        <input id="contact-gotcha" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-medium transition-colors duration-300 disabled:cursor-wait",
            isSent ? "bg-ok-400/15 text-ok-400" : "bg-snow text-ink-950 hover:bg-white",
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={status === "submitting" ? "submitting" : isSent ? "sent" : "idle"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span
                    aria-hidden="true"
                    className="size-4 animate-spin rounded-full border-2 border-ink-950/25 border-t-ink-950 motion-reduce:animate-none"
                  />
                  Sending…
                </>
              ) : isSent ? (
                <>
                  Sent successfully
                  <CheckIcon className="size-4" />
                </>
              ) : (
                <>
                  Send Message
                  <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </>
              )}
            </motion.span>
          </AnimatePresence>
        </button>

        <p role="status" aria-live="polite" className={cn("text-sm", status === "error" ? "text-rose-300" : "text-mist-300")}>
          {status === "idle" || status === "submitting" ? "" : statusMessages[status]}
        </p>
      </div>
    </form>
  );
}
