"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/cn";

/*
 * One small, technically faithful illustration per AnalyseImpacte step, all built from the same
 * grammar so the eight steps read as one system:
 *   header  — "input → output"; each step's output is the next step's input
 *   body    — nodes (boxes) joined by connectors, bars for progress
 *   footer  — one status line (✓ passed · ✕ rejected · neutral note)
 * Terms come from the internship report (C code V1/V2, SRD, SDDD, No Impact/Minor/Major/Complex,
 * Refined/Extended, Calls, Input/Output Data). Decorative: the step text carries the meaning.
 */

type Tone = "default" | "active" | "ai" | "ok" | "fail";

const appear = (delay: number) => ({
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { delay, duration: 0.4, ease: easeOutExpo } },
});

const grow = (delay: number, axis: "x" | "y" = "x", duration = 0.35) => ({
  hidden: axis === "x" ? { scaleX: 0 } : { scaleY: 0 },
  show: { ...(axis === "x" ? { scaleX: 1 } : { scaleY: 1 }), transition: { delay, duration, ease: easeOutExpo } },
});

const toneClasses: Record<Tone, string> = {
  default: "border-white/10 text-mist-300",
  active: "border-azure-400/45 text-azure-200",
  ai: "border-iris-400/45 text-iris-400",
  ok: "border-ok-400/40 text-ok-400",
  fail: "border-rose-400/40 text-rose-300",
};

function Node({ children, delay, tone = "default", className }: { children: ReactNode; delay: number; tone?: Tone; className?: string }) {
  return (
    <motion.div
      data-reveal
      variants={appear(delay)}
      className={cn("rounded-lg border bg-ink-850/90 px-2.5 py-1.5 font-mono text-[10px] leading-snug", toneClasses[tone], className)}
    >
      {children}
    </motion.div>
  );
}

function Connector({ delay, axis = "x", className }: { delay: number; axis?: "x" | "y"; className?: string }) {
  return (
    <motion.span
      data-reveal
      aria-hidden="true"
      variants={grow(delay, axis, 0.3)}
      style={{ transformOrigin: axis === "x" ? "left" : "top" }}
      className={cn("block shrink-0 bg-azure-400/55", axis === "x" ? "h-px w-4" : "h-3 w-px", className)}
    />
  );
}

/** A → B → C: drawn connectors on wide containers, wrapping arrows on phones. */
function Chain({ nodes, step = 0.2, start = 0.05 }: { nodes: { label: string; tone?: Tone }[]; step?: number; start?: number }) {
  return (
    <div className="flex flex-wrap items-center gap-y-1.5 sm:flex-nowrap">
      {nodes.map((node, index) => (
        <span key={node.label} className="flex items-center sm:flex-1 sm:last:flex-none">
          <Node delay={start + index * step} tone={node.tone} className="whitespace-nowrap">
            {node.label}
          </Node>
          {index < nodes.length - 1 ? (
            <>
              <Connector delay={start + 0.15 + index * step} className="hidden flex-1 sm:block" />
              <motion.span
                data-reveal
                aria-hidden="true"
                variants={appear(start + 0.15 + index * step)}
                className="px-1 font-mono text-[10px] text-azure-400 sm:hidden"
              >
                →
              </motion.span>
            </>
          ) : null}
        </span>
      ))}
    </div>
  );
}

interface StatusItem {
  text: string;
  tone?: "ok" | "fail" | "neutral";
}

/** The single status-line format shared by every step. */
function Status({ items, delay }: { items: StatusItem[]; delay: number }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-white/6 pt-2">
      {items.map((item, index) => (
        <motion.p
          data-reveal
          key={item.text}
          variants={appear(delay + index * 0.12)}
          className={cn(
            "font-mono text-[10px] tracking-[0.08em] uppercase",
            item.tone === "ok" && "text-ok-400",
            item.tone === "fail" && "text-rose-300",
            (!item.tone || item.tone === "neutral") && "text-mist-400",
          )}
        >
          {item.text}
        </motion.p>
      ))}
    </div>
  );
}

function Frame({ from, to, children, status, statusDelay }: { from: string; to: string; children: ReactNode; status: StatusItem[]; statusDelay: number }) {
  return (
    <div className="flex h-full flex-col gap-2.5">
      <p className="font-mono text-[10px] text-mist-500">
        <span className="text-mist-400">{from}</span> <span className="text-azure-400">→</span>{" "}
        <span className="text-azure-200">{to}</span>
      </p>
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-2.5">{children}</div>
      <Status items={status} delay={statusDelay} />
    </div>
  );
}

function DiffLines({ delay, rows }: { delay: number; rows: ("same" | "add" | "del")[] }) {
  return (
    <span className="mt-1.5 flex flex-col gap-1">
      {rows.map((row, index) => (
        <motion.span
          data-reveal
          key={index}
          variants={grow(delay + index * 0.05)}
          style={{ transformOrigin: "left", width: `${55 + ((index * 17) % 40)}%` }}
          className={cn(
            "block h-1 rounded-full",
            row === "same" && "bg-white/12",
            row === "add" && "bg-ok-400/60",
            row === "del" && "bg-rose-400/60",
          )}
        />
      ))}
    </span>
  );
}

/* 01 — Code V1/V2, SRD V1/V2 and the existing SDDD come in */
function SourceVisual() {
  const files = [
    { name: "Code C", version: "V1→V2", rows: ["same", "del", "add"] as const },
    { name: "SRD", version: "V1→V2", rows: ["same", "add", "same"] as const },
    { name: "SDDD", version: "v02", rows: ["same", "same", "same"] as const },
  ];
  return (
    <Frame
      from="Code · SRD · SDDD"
      to="change set"
      statusDelay={0.7}
      status={[{ text: "✓ Change detected", tone: "ok" }, { text: "✓ 3 artefacts imported", tone: "ok" }]}
    >
      <div className="grid grid-cols-3 gap-2">
        {files.map((file, index) => (
          <Node key={file.name} delay={0.05 + index * 0.12} tone={index === 2 ? "default" : "active"}>
            <span className="flex flex-wrap items-baseline justify-between gap-x-1">
              <span className="text-snow">{file.name}</span>
              <span className="text-mist-500">{file.version}</span>
            </span>
            <DiffLines delay={0.25 + index * 0.12} rows={[...file.rows]} />
          </Node>
        ))}
      </div>
    </Frame>
  );
}

/* 02 — Deterministic AST parsing: one root, three extracted facts */
function AstVisual() {
  const leaves = ["signature", "calls", "globals IN/OUT"];
  return (
    <Frame from="change set" to="AST facts" statusDelay={0.85} status={[{ text: "Deterministic parser · no AI in this step" }]}>
      <div className="flex flex-col items-center">
        <Node delay={0.05} tone="active">
          <span className="text-snow">function</span> · AST
        </Node>
        <Connector delay={0.25} axis="y" />
        <motion.span
          data-reveal
          aria-hidden="true"
          variants={grow(0.35)}
          style={{ transformOrigin: "center" }}
          className="block h-px w-2/3 bg-azure-400/55"
        />
        <div className="grid w-full grid-cols-3 gap-2 text-center">
          {leaves.map((leaf, index) => (
            <div key={leaf} className="flex flex-col items-center">
              <Connector delay={0.45} axis="y" />
              <Node delay={0.5 + index * 0.1} className="w-full">
                {leaf}
              </Node>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* 03 — Cross-impact: changed function → requirement → SDDD, then classified */
function ImpactVisual() {
  const levels = ["No Impact", "Minor", "Major", "Complex"];
  return (
    <Frame
      from="AST facts"
      to="impact matrix"
      statusDelay={1}
      status={[{ text: "✓ Impact detected", tone: "ok" }, { text: "Severity: Major" }, { text: "Traceability: Extended" }]}
    >
      <Chain nodes={[{ label: "Changed function", tone: "active" }, { label: "SRD requirement" }, { label: "SDDD" }]} step={0.22} />
      <div className="grid grid-cols-4 gap-1">
        {levels.map((level, index) => (
          <Node
            key={level}
            delay={0.7 + index * 0.05}
            tone={level === "Major" ? "active" : "default"}
            className={cn("px-1 text-center", level === "Major" ? "bg-azure-400/10" : "text-mist-500")}
          >
            {level}
          </Node>
        ))}
      </div>
    </Frame>
  );
}

/* 04 — Grounded AI: the model only drafts from extracted facts, and the draft is validated */
function GroundedAiVisual() {
  return (
    <Frame
      from="facts + impacts"
      to="grounded draft"
      statusDelay={1.1}
      status={[{ text: "✓ Grounded → kept", tone: "ok" }, { text: "✕ Not in source → rejected", tone: "fail" }]}
    >
      <Chain nodes={[{ label: "AST" }, { label: "Facts" }, { label: "qwen2.5-coder", tone: "ai" }, { label: "Draft" }]} />
      <div className="flex items-center justify-center">
        <Node delay={0.9} tone="active">
          validation · grounded(draft, facts)
        </Node>
      </div>
    </Frame>
  );
}

/* 05 — SDDD proposal: version bump and updated subsections */
function SdddVisual() {
  const sections = [
    { name: "Function signature", value: "updated" },
    { name: "Calls", value: "updated" },
    { name: "Input/Output Data", value: "IN · OUT · IN_OUT" },
    { name: "Traceability", value: "Refined · Extended" },
  ];
  return (
    <Frame from="grounded draft" to="SDDD v03" statusDelay={1.05} status={[{ text: "✓ DO-178C traceability kept", tone: "ok" }]}>
      <Node delay={0.05} className="p-2">
        <p className="flex items-center justify-between border-b border-white/8 pb-1.5">
          <span className="text-snow">SDDD</span>
          <span>
            <span className="text-mist-500 line-through">v02</span> → <span className="text-azure-200">v03</span>
          </span>
        </p>
        <ul className="mt-1.5 space-y-1">
          {sections.map((section, index) => (
            <motion.li
              data-reveal
              key={section.name}
              variants={appear(0.3 + index * 0.15)}
              className="flex items-center justify-between gap-2"
            >
              <span>{section.name}</span>
              <span className="text-azure-200">{section.value}</span>
            </motion.li>
          ))}
        </ul>
      </Node>
    </Frame>
  );
}

/* 06 — Validation: quality, load, security */
function TestingVisual() {
  const checks = [
    { tool: "SonarQube", result: "Quality gate passed" },
    { tool: "JMeter", result: "100% · 50 users" },
    { tool: "OWASP ZAP", result: "1,686 req · 0 critical" },
  ];
  return (
    <Frame from="build" to="validated build" statusDelay={1.1} status={[{ text: "✓ Quality · load · security passed", tone: "ok" }]}>
      <ul className="flex flex-col gap-2.5">
        {checks.map((check, index) => (
          <motion.li data-reveal key={check.tool} variants={appear(0.05 + index * 0.25)} className="font-mono text-[10px]">
            <span className="flex items-center justify-between gap-2">
              <span className="text-snow">{check.tool}</span>
              <span className="text-ok-400">✓ {check.result}</span>
            </span>
            <span className="mt-1 block h-1 overflow-hidden rounded-full bg-white/8">
              <motion.span
                className="block h-full rounded-full bg-ok-400/70"
                style={{ transformOrigin: "left" }}
                variants={grow(0.15 + index * 0.25, "x", 0.5)}
              />
            </span>
          </motion.li>
        ))}
      </ul>
    </Frame>
  );
}

/* 07 — Jenkins, 9 stages */
function PipelineVisual() {
  const stages = ["Checkout", "Tests", "Gate", "Build", "Scan", "Backup", "Push", "Deploy", "Smoke"];
  return (
    <Frame
      from="validated build"
      to="images in Nexus"
      statusDelay={1.05}
      status={[{ text: "✓ 9 / 9 stages passed", tone: "ok" }, { text: "↓ Full run below" }]}
    >
      <p className="font-mono text-[10px] text-mist-400">
        <span className="text-snow">Jenkinsfile</span> · checkout → tests → gate → build → scan → backup → push → deploy → smoke
      </p>
      <ol className="grid grid-cols-9 gap-1">
        {stages.map((stage, index) => (
          <li key={stage} className="flex flex-col items-center gap-1">
            <span className="block h-1.5 w-full overflow-hidden rounded-full bg-white/8">
              <motion.span
                className="block h-full bg-ok-400/80"
                style={{ transformOrigin: "left" }}
                variants={grow(0.1 + index * 0.09, "x", 0.2)}
              />
            </span>
            <span className="font-mono text-[10px] text-mist-500">
              {String(index + 1).padStart(2, "0")}
            </span>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

/* 08 — Containers in production, monitored, with a rollback tag ready */
function DeployVisual() {
  const nodes: { label: ReactNode; tone: Tone }[] = [
    { label: <>docker backend <span className="text-ok-400">● up</span></>, tone: "default" },
    { label: <>docker frontend <span className="text-ok-400">● up</span></>, tone: "default" },
    { label: "↺ rollback tag ready", tone: "active" },
    { label: "Prometheus → Grafana", tone: "default" },
  ];
  return (
    <Frame
      from="images"
      to="production"
      statusDelay={0.8}
      status={[{ text: "✓ Smoke tests passed", tone: "ok" }, { text: "✓ Production ready", tone: "ok" }]}
    >
      <div className="grid grid-cols-2 gap-2">
        {nodes.map((node, index) => (
          <Node key={index} delay={0.05 + index * 0.12} tone={node.tone}>
            {node.label}
          </Node>
        ))}
      </div>
    </Frame>
  );
}

const visuals = [SourceVisual, AstVisual, ImpactVisual, GroundedAiVisual, SdddVisual, TestingVisual, PipelineVisual, DeployVisual];

interface StepVisualProps {
  index: number;
  /** "mount": plays when rendered (desktop panel). "view": plays when scrolled into view (mobile list). */
  trigger?: "mount" | "view";
  className?: string;
}

export function StepVisual({ index, trigger = "mount", className }: StepVisualProps) {
  const Visual = visuals[index];
  if (!Visual) return null;
  const play = trigger === "mount" ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.6 } };
  return (
    <motion.div
      aria-hidden="true"
      className={cn("min-w-0 select-none", trigger === "mount" && "h-[188px]", className)}
      initial="hidden"
      {...play}
    >
      <Visual />
    </motion.div>
  );
}
