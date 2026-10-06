"use client";
import { useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS } from "@/lib/data";
import TechLogo from "@/components/ui/TechLogo";

function CountUpNumber({
  target,
  suffix = "",
  active = false,
}: {
  target: string;
  suffix?: string;
  active: boolean;
}) {
  const [val, setVal] = useState(0);
  const numericPart = parseInt(target, 10) || 0;

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1400; // 1.4s
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutQuart: 1 - (1 - t)^4
      const ease = 1 - Math.pow(1 - progress, 4);
      setVal(Math.floor(ease * numericPart));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setVal(numericPart);
      }
    };

    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [active, numericPart]);

  return (
    <div className="font-bold text-4xl sm:text-5xl md:text-6xl tracking-tighter text-[var(--ink)] leading-none">
      {val}
      <span className="text-2xl sm:text-3xl font-mono text-[var(--mute)] ml-0.5">
        {suffix}
      </span>
    </div>
  );
}

export default function Achievements() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const outer = outerRef.current;
      if (!outer) return;
      const rect = outer.getBoundingClientRect();
      const totalDist = outer.offsetHeight - window.innerHeight;
      if (totalDist <= 0) return;

      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / totalDist));
      setScrollProgress(p);

      // Determine active center card
      const idx = Math.min(
        ACHIEVEMENTS.length - 1,
        Math.floor(p * ACHIEVEMENTS.length)
      );
      setCenterIndex(idx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute translateX for horizontal track
  const maxTranslate = ACHIEVEMENTS.length * 440;
  const translateX = scrollProgress * maxTranslate;

  return (
    <section
      ref={outerRef}
      id="achievements"
      className="relative bg-[var(--paper)]"
      style={{ height: "300vh" }}
      aria-label="Achievements & Milestones"
    >
      {/* Sticky full-screen viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden py-8 md:py-12">
        {/* Header with progress bar */}
        <div className="container-site w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div>
              <div className="tag-line">
                <span className="font-mono">06</span>
                <span>—</span>
                <span>Impact</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--ink)]">
                Quantified milestones &amp; <span className="serif-accent">honours.</span>
              </h2>
            </div>

            <div className="font-mono text-xs text-[var(--mute)]">
              {String(centerIndex + 1).padStart(2, "0")} / {String(ACHIEVEMENTS.length).padStart(2, "0")}
            </div>
          </div>

          {/* Thin progress bar */}
          <div className="w-full h-[2px] bg-[var(--line)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--ink)] transition-all duration-75"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>

        {/* Horizontal sliding cards track */}
        <div className="w-full overflow-hidden my-auto py-6">
          <div
            ref={trackRef}
            className="flex items-center gap-6 md:gap-8 px-6 md:px-16 transition-transform duration-100 ease-out"
            style={{ transform: `translateX(-${translateX}px)` }}
          >
            {ACHIEVEMENTS.map((item, idx) => {
              const isCenter = idx === centerIndex;

              return (
                <div
                  key={item.id}
                  className={`flex-shrink-0 bg-white rounded-[28px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                    isCenter
                      ? "-translate-y-3 shadow-2xl"
                      : "shadow-md hover:shadow-lg"
                  }`}
                  style={{
                    width: "clamp(340px, 40vw, 540px)",
                    height: "clamp(260px, 36vh, 310px)",
                    boxShadow: isCenter
                      ? "0 24px 60px rgba(13,13,13,0.14)"
                      : "0 4px 20px rgba(13,13,13,0.04)",
                  }}
                >
                  {/* Top row: 72px logo tile + index */}
                  <div className="flex items-center justify-between">
                    <div className="w-[72px] h-[72px] rounded-2xl bg-[var(--paper)] p-3 flex items-center justify-center relative overflow-hidden">
                      <TechLogo
                        name={item.platformKey}
                        size={48}
                        withGlow={isCenter}
                      />
                    </div>
                    <span className="font-mono text-xs sm:text-sm text-[var(--mute)]">
                      {item.index} / {String(ACHIEVEMENTS.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Bottom row: label/detail on left, big counter on right */}
                  <div className="flex items-end justify-between gap-4 mt-auto">
                    <div className="flex-1 pr-2">
                      <div className="text-base sm:text-lg font-bold text-[var(--ink)] tracking-tight leading-snug">
                        {item.label}
                      </div>
                      <div className="text-xs text-[var(--mute)] mt-1 line-clamp-1">
                        {item.caption}
                      </div>
                      <div className="text-[11px] font-mono text-[var(--faint)] mt-1 line-clamp-1">
                        {item.detail}
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <CountUpNumber
                        target={item.bigNumber}
                        suffix={item.numberSuffix}
                        active={scrollProgress > 0.05}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* End track card */}
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-[28px] border-2 border-dashed border-[var(--line)] text-[var(--mute)] font-mono text-sm uppercase tracking-wider px-10"
              style={{
                width: "clamp(240px, 25vw, 320px)",
                height: "clamp(260px, 36vh, 310px)",
              }}
            >
              and counting →
            </div>
          </div>
        </div>

        {/* Footer indicator note */}
        <div className="container-site w-full text-center sm:text-left text-xs font-mono text-[var(--faint)]">
          Scroll down to cycle through milestones
        </div>
      </div>
    </section>
  );
}
