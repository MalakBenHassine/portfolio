"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { easeOutExpo, inViewOnce } from "@/lib/motion";

const steps = ["Idea", "Code", "Build", "Test", "Deploy", "Production"];
const STEP_DELAY = 0.18;

/** The end of the journey: an idea travels to production, and the headline lands right after. */
export function ShipSequence() {
  const lastIndex = steps.length - 1;
  return (
    <motion.ol
      className="flex flex-wrap items-center gap-y-2 font-mono text-[10px] tracking-[0.18em] uppercase sm:text-[11px]"
      aria-label="From idea to production"
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
    >
      {steps.map((step, index) => {
        const isLast = index === lastIndex;
        return (
          <Fragment key={step}>
            {index > 0 ? (
              <motion.li
                data-reveal
                aria-hidden="true"
                className="mx-2 h-px w-5 bg-azure-400/50 sm:mx-3 sm:w-8"
                style={{ transformOrigin: "left" }}
                variants={{
                  hidden: { scaleX: 0 },
                  show: { scaleX: 1, transition: { delay: index * STEP_DELAY - 0.1, duration: 0.25, ease: easeOutExpo } },
                }}
              />
            ) : null}
            <motion.li
              data-reveal
              className={
                isLast
                  ? "inline-flex items-center gap-1.5 rounded-full border border-ok-400/40 bg-ok-400/10 px-2.5 py-1 text-ok-400"
                  : "rounded-full border border-white/10 px-2.5 py-1 text-mist-300"
              }
              variants={{
                hidden: { opacity: 0, y: 6 },
                show: { opacity: 1, y: 0, transition: { delay: index * STEP_DELAY, duration: 0.35, ease: easeOutExpo } },
              }}
            >
              {isLast ? <span aria-hidden="true">✓</span> : null}
              {step}
            </motion.li>
          </Fragment>
        );
      })}
    </motion.ol>
  );
}
