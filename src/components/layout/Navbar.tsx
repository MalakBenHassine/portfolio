"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "@/components/ui/icons/ArrowRightIcon";
import { CloseIcon } from "@/components/ui/icons/CloseIcon";
import { DownloadIcon } from "@/components/ui/icons/DownloadIcon";
import { MenuIcon } from "@/components/ui/icons/MenuIcon";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import { buttonClasses } from "@/lib/buttonStyles";
import { cn } from "@/lib/cn";
import { easeOutExpo } from "@/lib/motion";
import { navItems } from "@/lib/site";

const observedSections = navItems.flatMap((item) => item.sections);

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const activeSection = useActiveSection(observedSections);
  const activeItem = navItems.find((item) => activeSection && item.sections.includes(activeSection));

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstMobileLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const onChange = () => desktopQuery.matches && setIsMenuOpen(false);
    desktopQuery.addEventListener("change", onChange);
    return () => desktopQuery.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        isScrolled || isMenuOpen
          ? "border-b border-white/6 bg-ink-950/75 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <a href="#top" className="group flex items-center gap-3">
          {/* Accessible name = visible text (+ purpose), so labels and speech input stay consistent. */}
          <span className="sr-only sm:hidden">{profile.name}</span>
          <span
            aria-hidden="true"
            className="relative grid size-9 place-items-center overflow-hidden rounded-xl border border-white/10 bg-ink-850 font-mono text-xs font-semibold text-snow transition-colors group-hover:border-azure-400/50"
          >
            <span className="absolute inset-0 bg-linear-to-br from-azure-500/25 via-transparent to-iris-400/15" />
            <span className="relative">MB</span>
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold text-snow">{profile.name}</span>
            <span className="font-mono text-[10px] tracking-wider text-mist-500 uppercase">Software Engineer</span>
          </span>
          <span className="sr-only"> — back to top</span>
        </a>

        <ul className="hidden items-center gap-0.5 rounded-full border border-white/6 bg-white/[0.02] p-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeItem?.href === item.href;
            return (
              <li key={item.href} className="relative">
                {isActive ? (
                  <motion.span
                    layoutId="nav-active-pill"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border border-white/8 bg-white/[0.07]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative block rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors lg:px-4",
                    isActive ? "text-snow" : "text-mist-400 hover:text-snow",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <span className="hidden md:block">
            <a href="#contact" className={buttonClasses("primary", "min-h-9 px-4 py-1.5")}>
              Let&apos;s Talk
              <ArrowRightIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </span>
          <button
            ref={menuButtonRef}
            type="button"
            className="grid size-11 place-items-center rounded-xl text-snow md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </nav>


      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto bg-ink-950 md:hidden"
          >
            <motion.ul
              className="flex flex-col px-5 pt-6 sm:px-8"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
            >
              {navItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOutExpo } },
                  }}
                  className="border-b border-white/6"
                >
                  <a
                    ref={index === 0 ? firstMobileLinkRef : undefined}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={activeItem?.href === item.href ? "location" : undefined}
                    className="flex items-center justify-between py-4 text-2xl font-medium tracking-tight text-snow"
                  >
                    {item.label}
                    <span className="font-mono text-xs text-mist-500">0{index + 1}</span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-8 flex flex-col gap-3 px-5 sm:px-8">
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className={buttonClasses("primary")}>
                Let&apos;s Talk
              </a>
              <a href={profile.cvPath} download className={buttonClasses("secondary")}>
                <DownloadIcon className="size-4" />
                Download CV
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
