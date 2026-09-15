"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/cn";

/*
 * One small, technically faithful illustration per AnalyseImpacte step (terms from the
 * internship report: C code V1/V2, SRD, SDDD, No Impact/Minor/Major/Complex,
 * Refined/Extended/Derived, Calls, Input/Output Data). Driven by variants from the parent:
 * "hidden" → "show" plays the sequence once. Decorative: the step text carries the meaning.
 */

const appear = (delay: number) => ({
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { delay, duration: 0.4, ease: easeOutExpo } },
});

const growX = (delay: number, duration = 0.45) => ({
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { delay, duration, ease: easeOutExpo } },
});

const draw = (delay: number, duration = 0.5) => ({
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { delay, duration, ease: "easeInOut" as const } },
});

function Box({ children, className, delay }: { children: ReactNode; className?: string; delay: number }) {
  return (
    <motion.div
      data-reveal
      variants={appear(delay)}
      className={cn("rounded-lg border border-white/10 bg-ink-850/90 px-2.5 py-1.5 font-mono text-[10px] leading-tight text-mist-300", className)}
    >
      {children}
    </motion.div>
  );
}

function Wire({ delay, className }: { delay: number; className?: string }) {
  return (
    <motion.span
      data-reveal
      aria-hidden="true"
      variants={growX(delay, 0.3)}
      style={{ transformOrigin: "left" }}
      className={cn("block h-px w-4 shrink-0 bg-azure-400/60", className)}
    />
  );
}

/** A → B → C flow: drawn wires on wide containers, compact wrapping arrows on phones. */
function Chain({ nodes, step = 0.22 }: { nodes: { label: string; className?: string }[]; step?: number }) {
  return (
    <div className="flex flex-wrap items-center gap-y-1.5 sm:flex-nowrap">
      {nodes.map((node, index) => (
        <span key={node.label} className="flex items-center sm:flex-1 sm:last:flex-none">
          <Box delay={0.05 + index * step} className={cn("whitespace-nowrap", node.className)}>
            {node.label}
          </Box>
          {index < nodes.length - 1 ? (
            <>
              <Wire delay={0.2 + index * step} className="hidden flex-1 sm:block" />
              <motion.span
                data-reveal
                aria-hidden="true"
                variants={appear(0.2 + index * step)}
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

function Label({ children, delay, tone = "mist" }: { children: ReactNode; delay: number; tone?: "mist" | "ok" | "iris" }) {
  return (
    <motion.p
      data-reveal
      variants={appear(delay)}
      className={cn(
        "font-mono text-[10px] tracking-[0.14em] uppercase",
        tone === "ok" && "text-ok-400",
        tone === "iris" && "text-iris-400",
        tone === "mist" && "text-mist-500",
      )}
    >
      {children}
    </motion.p>
  );
}

function DiffLines({ delay, rows }: { delay: number; rows: ("same" | "add" | "del")[] }) {
  return (
    <span className="mt-2 flex flex-col gap-1">
      {rows.map((row, index) => (
        <motion.span
          data-reveal
          key={index}
          variants={growX(delay + index * 0.06, 0.35)}
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
    { name: "Code C", version: "V1 → V2", rows: ["same", "del", "add", "same"] as const },
    { name: "SRD", version: "V1 → V2", rows: ["same", "same", "add", "same"] as const },
    { name: "SDDD", version: "v02", rows: ["same", "same", "same", "same"] as const },
  ];
  return (
    <div className="flex h-full flex-col justify-between gap-3">
      <div className="grid grid-cols-3 gap-2">
        {files.map((file, index) => (
          <Box key={file.name} delay={0.05 + index * 0.12} className="px-3 py-2.5">
            <span className="flex items-center justify-between gap-1">
              <span className="text-snow">{file.name}</span>
              <span className="text-mist-500">{file.version}</span>
            </span>
            <DiffLines delay={0.25 + index * 0.12} rows={[...file.rows]} />
          </Box>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-1">
        <Label delay={0.7} tone="ok">
          ✓ Change detected
        </Label>
        <Label delay={0.85} tone="ok">
          ✓ 3 artefacts imported
        </Label>
      </div>
    </div>
  );
}

/* 02 — Deterministic AST parsing */
function AstVisual() {
  const leaves = ["signature", "calls", "globals IN/OUT"];
  return (
    <div className="flex h-full flex-col justify-between gap-2">
      <div className="relative">
        <svg aria-hidden="true" viewBox="0 0 300 60" preserveAspectRatio="none" className="absolute inset-x-0 top-6 h-10 w-full">
          {[50, 150, 250].map((x, index) => (
            <motion.path
              key={x}
              d={`M150 0 C150 30 ${x} 20 ${x} 60`}
              stroke="rgb(124 157 255 / 0.55)"
              strokeWidth="1"
              fill="none"
              vectorEffect="non-scaling-stroke"
              variants={draw(0.3 + index * 0.1)}
            />
          ))}
        </svg>
        <div className="flex justify-center">
          <Box delay={0.05} className="text-snow">
            function_v2( ) <span className="text-mist-500">· AST</span>
          </Box>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-2 text-center">
          {leaves.map((leaf, index) => (
            <Box key={leaf} delay={0.55 + index * 0.1}>
              {leaf}
            </Box>
          ))}
        </div>
      </div>
      <Label delay={0.9}>Deterministic parser · no AI in this step</Label>
    </div>
  );
}

/* 03 — Cross-impact: code change → requirement → SDDD, classified */
function ImpactVisual() {
  const levels = ["No Impact", "Minor", "Major", "Complex"];
  return (
    <div className="flex h-full flex-col justify-between gap-3">
      <Chain
        step={0.25}
        nodes={[
          { label: "Changed function", className: "border-amber-300/40 text-amber-200" },
          { label: "SRD requirement" },
          { label: "SDDD" },
        ]}
      />
      <div className="grid grid-cols-4 gap-1">
        {levels.map((level, index) => (
          <motion.span
            data-reveal
            key={level}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { delay: 0.7 + index * 0.06, duration: 0.3 } },
            }}
            className={cn(
              "rounded-md border px-1 py-1 text-center font-mono text-[9px]",
              level === "Major" ? "border-amber-300/50 bg-amber-300/10 text-amber-200" : "border-white/8 text-mist-500",
            )}
          >
            {level}
          </motion.span>
        ))}
      </div>
      <Box delay={1.05} className="flex flex-wrap items-center gap-x-3 gap-y-0.5 border-azure-400/25">
        <span className="text-ok-400">✓ Impact detected</span>
        <span>
          Severity: <span className="text-amber-200">Major</span>
        </span>
        <span>
          Traceability: <span className="text-azure-200">Extended</span>
        </span>
      </Box>
    </div>
  );
}

/* 04 — Grounded AI: AST → facts → local LLM → validation */
function GroundedAiVisual() {
  return (
    <div className="flex h-full flex-col justify-between gap-3">
      <Chain
        nodes={[
          { label: "AST" },
          { label: "Facts" },
          { label: "qwen2.5-coder", className: "border-iris-400/40 text-iris-400" },
          { label: "Draft" },
        ]}
      />
      <div className="flex items-center gap-2">
        <Box delay={1} className="flex-1 border-ok-400/30">
          <span className="text-ok-400">✓ grounded</span>
          <span className="block text-mist-500">matches the code → kept</span>
        </Box>
        <Box delay={1.15} className="flex-1 border-rose-400/25">
          <span className="text-rose-300">✕ not in source</span>
          <span className="block text-mist-500">rejected</span>
        </Box>
      </div>
      <Label delay={1.3} tone="iris">
        Ollama · local · validated against the AST
      </Label>
    </div>
  );
}

/* 05 — SDDD proposal with traceability reclassification */
function SdddVisual() {
  const sections = [
    { name: "Function signature", value: "updated" },
    { name: "Calls", value: "updated" },
    { name: "Input/Output Data", value: "IN · OUT · IN_OUT" },
    { name: "Traceability", value: "Refined · Extended" },
  ];
  return (
    <motion.div data-reveal variants={appear(0.05)} className="flex h-full flex-col rounded-lg border border-white/10 bg-ink-850/90 p-3 font-mono text-[10px]">
      <p className="flex items-center justify-between border-b border-white/8 pb-2 text-mist-300">
        <span className="text-snow">SDDD</span>
        <span>
          version <span className="text-mist-500 line-through">02</span> → <span className="text-azure-200">03</span>
        </span>
      </p>
      <ul className="mt-2 space-y-1.5">
        {sections.map((section, index) => (
          <motion.li
            data-reveal
            key={section.name}
            variants={appear(0.3 + index * 0.18)}
            className="relative flex items-center justify-between gap-2 overflow-hidden rounded px-1.5 py-0.5"
          >
            <motion.span
              aria-hidden="true"
              variants={growX(0.35 + index * 0.18, 0.5)}
              style={{ transformOrigin: "left" }}
              className="absolute inset-0 bg-azure-400/8"
            />
            <span className="relative text-mist-300">{section.name}</span>
            <span className="relative text-azure-200">{section.value}</span>
          </motion.li>
        ))}
      </ul>
      <motion.p data-reveal variants={appear(1.1)} className="mt-auto pt-2 text-ok-400">
        ✓ DO-178C traceability kept · PDF & CSV
      </motion.p>
    </motion.div>
  );
}

/* 06 — Validation: quality, load, security */
function TestingVisual() {
  const checks = [
    { tool: "SonarQube", result: "Quality gate passed", fill: 1 },
    { tool: "JMeter", result: "100% success · 50 users", fill: 1 },
    { tool: "OWASP ZAP", result: "1,686 requests · 0 critical", fill: 1 },
  ];
  return (
    <ul className="flex h-full flex-col justify-center gap-3">
      {checks.map((check, index) => (
        <motion.li data-reveal key={check.tool} variants={appear(0.05 + index * 0.3)} className="font-mono text-[10px]">
          <span className="flex items-center justify-between gap-2">
            <span className="text-snow">{check.tool}</span>
            <span className="text-ok-400">✓ {check.result}</span>
          </span>
          <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-white/8">
            <motion.span
              className="block h-full rounded-full bg-linear-to-r from-azure-400 to-ok-400"
              style={{ transformOrigin: "left" }}
              variants={growX(0.15 + index * 0.3, 0.6)}
            />
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

/* 07 — Jenkins, 9 stages */
function PipelineVisual() {
  const stages = ["Checkout", "Tests", "Gate", "Build", "Trivy", "Backup", "Nexus", "Deploy", "Smoke"];
  return (
    <div className="flex h-full flex-col justify-between gap-3">
      <p className="font-mono text-[10px] text-mist-400">
        <span className="text-snow">Jenkinsfile</span> · 9 stages · automatic rollback
      </p>
      <ol className="grid grid-cols-9 gap-1">
        {stages.map((stage, index) => (
          <li key={stage} className="flex flex-col items-center gap-1.5">
            <span className="block h-1.5 w-full overflow-hidden rounded-full bg-white/8">
              <motion.span
                className="block h-full bg-ok-400/80"
                style={{ transformOrigin: "left" }}
                variants={growX(0.1 + index * 0.1, 0.25)}
              />
            </span>
            <span className="font-mono text-[8px] text-mist-500">{stage}</span>
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <Label delay={1.05} tone="ok">
          ✓ Gate · scan · registry · deploy
        </Label>
        <Label delay={1.2}>↓ Full run below</Label>
      </div>
    </div>
  );
}

/* 08 — Containers in production, monitored, with a rollback tag ready */
function DeployVisual() {
  return (
    <div className="flex h-full flex-col gap-2">
    <div className="grid flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-3">
      <div className="flex flex-col justify-between gap-2">
        <Box delay={0.05}>
          <span className="text-snow">docker</span> backend <span className="text-ok-400">● up</span>
        </Box>
        <Box delay={0.2}>
          <span className="text-snow">docker</span> frontend <span className="text-ok-400">● up</span>
        </Box>
        <Box delay={0.35} className="border-azure-400/25">
          ↺ rollback tag ready
        </Box>
      </div>
      <motion.div data-reveal variants={appear(0.3)} className="flex flex-col rounded-lg border border-white/10 bg-ink-850/90 p-2.5">
        <p className="font-mono text-[10px] text-mist-400">
          <span className="text-snow">Prometheus</span> → Grafana
        </p>
        <svg aria-hidden="true" viewBox="0 0 120 40" className="mt-auto h-12 w-full" preserveAspectRatio="none">
          <motion.path
            d="M0 30 L15 26 L28 28 L40 20 L55 23 L68 14 L82 18 L95 11 L108 15 L120 9"
            fill="none"
            stroke="rgb(74 222 128 / 0.8)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            variants={draw(0.55, 0.9)}
          />
        </svg>
        <p className="font-mono text-[9px] text-ok-400">✓ smoke tests passed</p>
      </motion.div>
    </div>
      <motion.p
        data-reveal
        variants={appear(1.4)}
        className="rounded-md border border-ok-400/30 bg-ok-400/10 py-1 text-center font-mono text-[10px] font-semibold tracking-[0.2em] text-ok-400 uppercase"
      >
        Production ready
      </motion.p>
    </div>
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
      className={cn("min-h-[150px] min-w-0 select-none", trigger === "mount" && "h-[168px]", className)}
      initial="hidden"
      {...play}
    >
      <Visual />
    </motion.div>
  );
}
