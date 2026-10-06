"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export function scrollToTarget(target: string | HTMLElement) {
  if (typeof target === "string" && (target === "#" || target.trim() === "")) {
    return;
  }

  const el =
    typeof target === "string"
      ? document.querySelector(target)
      : target;

  if (!el) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(el as HTMLElement, {
      offset: -80,
      duration: 1.2,
    });
  } else {
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenisInstance = lenis;
    lenisRef.current = lenis;

    let raf: number;

    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}