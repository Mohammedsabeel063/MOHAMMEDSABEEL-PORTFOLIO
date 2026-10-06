"use client";
import { useEffect, useRef, useState } from "react";
import { EXPERIENCE } from "@/lib/data";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const total = rect.height;
      const current = windowHeight * 0.7 - rect.top;
      const ratio = Math.max(0, Math.min(1, current / total));
      setProgress(ratio);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="experience" className="section-pad bg-[var(--paper)]" aria-label="Experience and Education Timeline">
      <div className="container-site">
        <div className="tag-line rv" style={{ "--i": 0 } as React.CSSProperties}>
          <span className="font-mono">05</span>
          <span>—</span>
          <span>Journey</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16 rv" style={{ "--i": 1 } as React.CSSProperties}>
          Education & experience as one <span className="serif-accent">path.</span>
        </h2>

        {/* Timeline container */}
        <div ref={containerRef} className="relative max-w-3xl mx-auto pl-6 md:pl-10">
          {/* Base spine line (faint) */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-[11px] md:left-[19px] w-[2px] bg-[var(--line)]"
          />

          {/* Active drawing spine line */}
          <div
            aria-hidden
            className="absolute top-0 left-[11px] md:left-[19px] w-[2px] bg-[var(--ink)] transition-all duration-150"
            style={{ height: `${progress * 100}%` }}
          />

          <div className="space-y-12 md:space-y-16">
            {EXPERIENCE.map((item, index) => {
              // Calculate threshold for lighting up
              const itemThreshold = (index + 0.5) / (EXPERIENCE.length + 1);
              const isLit = progress >= itemThreshold;

              return (
                <div
                  key={item.id}
                  className={`relative pl-8 md:pl-12 transition-all duration-500 ${
                    isLit ? "opacity-100" : "opacity-40"
                  }`}
                >
                  {/* Timeline node */}
                  <div
                    aria-hidden
                    className={`absolute left-0 -top-1 w-[24px] md:w-[40px] flex items-center justify-center`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                        isLit
                          ? "bg-[var(--ink)] border-[var(--ink)] scale-125"
                          : "bg-white border-gray-300"
                      }`}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="card p-6 md:p-8 bg-white border border-[var(--line)] shadow-sm">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                      <span className="font-mono text-xs text-[var(--mute)]">
                        {item.period}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--soft)] text-[var(--ink-2)]">
                        {item.type === "education" ? "Education" : "Experience"}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[var(--ink)] mb-1">
                      {item.title}
                    </h3>

                    <div className="text-sm font-medium text-[var(--ink-2)] mb-4">
                      {item.place}
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-xs font-mono text-[var(--mute)] hover:text-[var(--ink)] underline"
                        >
                          Visit link ↗
                        </a>
                      )}
                    </div>

                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="space-y-2 text-xs md:text-sm text-[var(--ink-2)] leading-relaxed">
                        {item.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[var(--mute)] font-mono mt-0.5">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}

            {/* End with dashed card: "Next — Your team?" */}
            <div className="relative pl-8 md:pl-12">
              <div
                aria-hidden
                className="absolute left-0 top-6 w-[24px] md:w-[40px] flex items-center justify-center"
              >
                <div className="w-3.5 h-3.5 rounded-full border-2 border-dashed border-[var(--ink)] bg-white" />
              </div>

              <div className="p-6 md:p-8 rounded-[24px] border-2 border-dashed border-[var(--line)] bg-transparent hover:border-[var(--ink)] transition-colors">
                <div className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider mb-1">
                  Upcoming Opportunity
                </div>
                <h3 className="text-xl font-bold text-[var(--ink)] mb-2">
                  Next — Your team?
                </h3>
                <p className="text-sm text-[var(--mute)] leading-relaxed">
                  Ready to contribute scalable backend architectures, clean APIs, and robust data engineering pipelines to high-impact teams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
