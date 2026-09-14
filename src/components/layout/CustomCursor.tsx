"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";
import { cn } from "@/lib/cn";

interface CursorState {
  /** Short label shown inside the cursor (e.g. "View", "GitHub"). */
  label: string | null;
  /** Hovering something interactive. */
  interactive: boolean;
  /** Over a text field: hide the custom cursor so the caret stays visible. */
  hidden: boolean;
}

const IDLE: CursorState = { label: null, interactive: false, hidden: false };

function resolveCursor(target: EventTarget | null): CursorState {
  if (!(target instanceof Element)) return IDLE;
  if (target.closest("input, textarea, select")) return { ...IDLE, hidden: true };

  const link = target.closest("a");
  if (link) {
    if (link.hostname.endsWith("github.com")) return { label: "GitHub", interactive: true, hidden: false };
    if (link.hostname.endsWith("linkedin.com")) return { label: "LinkedIn", interactive: true, hidden: false };
  }

  const labelled = target.closest<HTMLElement>("[data-cursor]");
  if (labelled && !target.closest("a, button")) {
    return { label: labelled.dataset.cursor ?? null, interactive: true, hidden: false };
  }
  if (target.closest("a, button, [role='button'], label")) return { label: null, interactive: true, hidden: false };
  if (labelled) return { label: labelled.dataset.cursor ?? null, interactive: true, hidden: false };
  return IDLE;
}

/**
 * Desktop-only cursor: a small dot with a trailing ring that grows over interactive
 * elements and shows a label over projects, GitHub and LinkedIn links.
 * Disabled on touch devices and when reduced motion is requested.
 */
export function CustomCursor() {
  const isEnabled = useFinePointer();
  const [state, setState] = useState<CursorState>(IDLE);
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 450, damping: 38, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 450, damping: 38, mass: 0.4 });

  useEffect(() => {
    if (!isEnabled) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setIsVisible(true);
    };
    const onOver = (event: PointerEvent) => {
      const next = resolveCursor(event.target);
      setState((current) =>
        current.label === next.label && current.interactive === next.interactive && current.hidden === next.hidden
          ? current
          : next,
      );
    };
    const onLeave = () => setIsVisible(false);
    const onDown = () => setIsPressed(true);
    const onUp = () => setIsPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [isEnabled, x, y]);

  if (!isEnabled) return null;

  const showCursor = isVisible && !state.hidden;
  const ringSize = state.label ? 72 : state.interactive ? 44 : 30;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        className="absolute top-0 left-0"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className={cn(
            "grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border transition-colors duration-200",
            state.label ? "border-transparent bg-snow" : "border-white/35 bg-white/[0.02]",
            state.interactive && !state.label && "border-azure-300/70 bg-azure-400/10",
          )}
          animate={{ width: ringSize, height: ringSize, scale: isPressed ? 0.88 : 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
        >
          <AnimatePresence>
            {state.label ? (
              <motion.span
                key={state.label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.18 }}
                className="font-mono text-[10px] font-semibold tracking-[0.12em] text-ink-950 uppercase"
              >
                {state.label}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-0 left-0"
        style={{ x, y }}
        animate={{ opacity: showCursor && !state.label ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <div className="size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-snow" />
      </motion.div>
    </div>
  );
}
