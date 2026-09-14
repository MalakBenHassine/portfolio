"use client";

import { useEffect, useRef } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
}

const LINK_DISTANCE = 115;
const POINTER_RADIUS = 160;
const MAX_PARTICLES = 70;
const IDLE_TIMEOUT_MS = 2500;

/**
 * Subtle "architecture nodes" field. Particles drift and connect, and gently move away
 * from the mouse. The render loop only runs while the pointer is active and the Hero is
 * on screen, then settles into a static frame. Desktop only; off with reduced motion.
 */
export function ParticleField() {
  const isEnabled = useFinePointer();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!isEnabled || !canvas || !context) return;

    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    const pointer = { x: -9999, y: -9999 };
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let isRunning = false;
    let isOnScreen = true;
    let lastActivity = performance.now();

    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > LINK_DISTANCE) continue;
          const nearPointer = Math.max(0, 1 - Math.hypot(a.x - pointer.x, a.y - pointer.y) / (POINTER_RADIUS * 1.6));
          const alpha = (1 - distance / LINK_DISTANCE) * (0.07 + nearPointer * 0.18);
          context.strokeStyle = `rgba(124, 157, 255, ${alpha})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }
      for (const particle of particles) {
        const nearPointer = Math.max(0, 1 - Math.hypot(particle.x - pointer.x, particle.y - pointer.y) / POINTER_RADIUS);
        context.fillStyle = `rgba(199, 214, 255, ${0.22 + nearPointer * 0.5})`;
        context.beginPath();
        context.arc(particle.x, particle.y, 1.1 + nearPointer * 0.8, 0, Math.PI * 2);
        context.fill();
      }
    };

    const step = (now: number) => {
      for (const particle of particles) {
        particle.baseX += particle.vx;
        particle.baseY += particle.vy;
        if (particle.baseX < 0 || particle.baseX > width) particle.vx *= -1;
        if (particle.baseY < 0 || particle.baseY > height) particle.vy *= -1;

        const dx = particle.baseX - pointer.x;
        const dy = particle.baseY - pointer.y;
        const distance = Math.hypot(dx, dy) || 1;
        const push = distance < POINTER_RADIUS ? (1 - distance / POINTER_RADIUS) * 22 : 0;
        const targetX = particle.baseX + (dx / distance) * push;
        const targetY = particle.baseY + (dy / distance) * push;
        particle.x += (targetX - particle.x) * 0.1;
        particle.y += (targetY - particle.y) * 0.1;
      }
      draw();

      if (isOnScreen && now - lastActivity < IDLE_TIMEOUT_MS) {
        frame = requestAnimationFrame(step);
      } else {
        isRunning = false;
      }
    };

    const wake = () => {
      lastActivity = performance.now();
      if (!isRunning && isOnScreen) {
        isRunning = true;
        frame = requestAnimationFrame(step);
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(MAX_PARTICLES, Math.round((width * height) / 21000));
      particles = Array.from({ length: count }, () => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return { x, y, baseX: x, baseY: y, vx: (Math.random() - 0.5) * 0.16, vy: (Math.random() - 0.5) * 0.16 };
      });
      draw();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      wake();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isOnScreen = entry.isIntersecting;
      if (isOnScreen) wake();
    });
    visibilityObserver.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    resize();
    wake();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;
  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 size-full animate-fade-in" />;
}
