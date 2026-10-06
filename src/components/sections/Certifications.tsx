"use client";
import { CERTIFICATIONS } from "@/lib/data";

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="bg-white border-y border-[var(--line)] section-pad relative"
      aria-label="Certifications"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left sticky column */}
          <div className="md:col-span-5 md:sticky md:top-28 rv" style={{ "--i": 0 } as React.CSSProperties}>
            <div className="tag-line">
              <span className="font-mono">04</span>
              <span>—</span>
              <span>Credentials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight text-[var(--ink)]">
              Always <span className="serif-accent">learning.</span>
            </h2>
            <p className="text-sm text-[var(--mute)] font-mono">
              {String(CERTIFICATIONS.length).padStart(2, "0")} verified certifications & job simulations
            </p>
          </div>

          {/* Right numbered ink-flood index */}
          <div className="md:col-span-7 rv" style={{ "--i": 1 } as React.CSSProperties}>
            <style>{`
              .ink-row {
                position: relative;
                overflow: hidden;
                transition: color 0.3s var(--ease);
                z-index: 1;
              }
              .ink-row::before {
                content: '';
                position: absolute;
                inset: 0;
                background: var(--ink);
                transform: scaleX(0);
                transform-origin: left;
                transition: transform 0.4s var(--ease);
                z-index: -1;
              }
              .ink-row:hover::before,
              .ink-row:focus-visible::before {
                transform: scaleX(1);
              }
              .ink-row:hover,
              .ink-row:focus-visible {
                color: var(--paper);
              }
              .ink-row:hover .ink-sub,
              .ink-row:focus-visible .ink-sub {
                color: #a9a6a0;
              }
              .ink-row:hover .ink-arrow,
              .ink-row:focus-visible .ink-arrow {
                transform: translateX(0) translateY(0);
                opacity: 1;
              }
            `}</style>

            <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.id}
                  tabIndex={0}
                  className="ink-row py-6 px-4 md:px-6 flex items-center justify-between cursor-default focus-visible:outline-none"
                  aria-label={`${cert.title} by ${cert.issuer}, ${cert.year}`}
                >
                  <div className="flex items-baseline gap-4 md:gap-8">
                    <span className="font-mono text-xs md:text-sm text-[var(--mute)] ink-sub">
                      {cert.index}
                    </span>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold tracking-tight">
                        {cert.title}
                      </h3>
                      <div className="text-xs md:text-sm text-[var(--mute)] font-mono mt-1 ink-sub">
                        {cert.issuer} · {cert.year}
                      </div>
                    </div>
                  </div>

                  {/* Sliding arrow */}
                  <span
                    className="ink-arrow text-xl font-bold transition-all duration-300 opacity-0 -translate-x-2 translate-y-2 text-[var(--paper)]"
                    aria-hidden
                  >
                    ↗
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
