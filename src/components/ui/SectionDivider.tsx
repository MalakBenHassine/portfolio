"use client";

import { motion } from "framer-motion";

/** Hairline between sections that opens from the center as the new chapter arrives. */
export function SectionDivider() {
  return (
    <motion.div
      data-reveal
      aria-hidden="true"
      className="divider-x absolute inset-x-0 top-0"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
