"use client";

import { useEffect, useState } from "react";
import { CheckIcon } from "@/components/ui/icons/CheckIcon";
import { CopyIcon } from "@/components/ui/icons/CopyIcon";
import { cn } from "@/lib/cn";

interface CopyEmailButtonProps {
  email: string;
  /** "onColor" for use on a colored (brand) card. */
  tone?: "default" | "onColor";
}

export function CopyEmailButton({ email, tone = "default" }: CopyEmailButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timeout = window.setTimeout(() => setIsCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [isCopied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={isCopied ? "Email address copied" : "Copy email address"}
      className={cn(
        "hidden size-10 shrink-0 place-items-center rounded-xl border transition-colors sm:grid",
        tone === "onColor"
          ? isCopied
            ? "border-white bg-white text-ink-950"
            : "border-white/30 text-white hover:bg-white/15"
          : isCopied
            ? "border-ok-400/40 text-ok-400"
            : "border-white/8 text-mist-400 hover:border-white/16 hover:text-snow",
      )}
    >
      {isCopied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
      <span className="sr-only" aria-live="polite">
        {isCopied ? "Copied" : ""}
      </span>
    </button>
  );
}
