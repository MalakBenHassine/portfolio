"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@/components/ui/icons/ArrowRightIcon";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { easeOutExpo } from "@/lib/motion";

/** Floating "back to top" control, shown once the visitor has scrolled well past the Hero. */
export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > window.innerHeight * 1.5;
      setIsVisible((current) => (current === next ? current : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    // Move keyboard focus back to the start of the page, without a second jump.
    document.getElementById("hero-title")?.focus({ preventScroll: true });
  };

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.3, ease: easeOutExpo }}
          className="group glass fixed right-4 bottom-4 z-40 grid size-11 place-items-center rounded-full text-mist-200 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.9)] transition-[color,border-color,box-shadow] duration-300 hover:border-azure-400/50 hover:text-snow hover:shadow-[0_12px_40px_-12px_rgb(91_130_255/0.6)] sm:right-6 sm:bottom-6"
        >
          <ArrowRightIcon className="size-4 -rotate-90 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
