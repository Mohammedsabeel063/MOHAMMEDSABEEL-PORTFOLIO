"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PROFILE } from "@/lib/data";

function IDCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  const [flipped, setFlipped] = useState(false);
  const [angle, setAngle] = useState(0);

  const velRef = useRef(0);
  const angleRef = useRef(0);
  const rafRef = useRef<number>(0);

  /* ================= IDLE SWAY ANIMATION ================= */
  useEffect(() => {
    let t = 0;

    const idle = () => {
      if (Math.abs(velRef.current) < 0.01) {
        angleRef.current = Math.sin(t) * 3;
        setAngle(angleRef.current);
        t += 0.02;
      }

      rafRef.current = requestAnimationFrame(idle);
    };

    rafRef.current = requestAnimationFrame(idle);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ================= POINTER MOVEMENT ================= */
  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();

    if (!rect) return;

    const cx = rect.left + rect.width / 2;
    const dx = (e.clientX - cx) / window.innerWidth;

    velRef.current = dx * 6;
  };

  /* ================= MOBILE CLICK FLIP ================= */
  const handleCardClick = () => {
    if (window.innerWidth < 1024) {
      setFlipped((prev) => !prev);
    }
  };

  /* ================= SPRING DAMPING ================= */
  useEffect(() => {
    let lastTime = performance.now();

    const spring = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);

      lastTime = now;

      velRef.current +=
        (-angleRef.current * 8 - velRef.current * 5) * dt;

      angleRef.current += velRef.current * dt * 60;

      setAngle(angleRef.current);

      const raf = requestAnimationFrame(spring);
      rafRef.current = raf;
    };

    const raf = requestAnimationFrame(spring);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="flex flex-col items-center w-full"
      onPointerMove={handlePointerMove}
    >
      {/* ================= LANYARD ================= */}
      <div
        aria-hidden
        className="relative flex flex-col items-center"
        style={{ marginBottom: "-4px" }}
      >
        {/* Strap */}
        <div
          className="w-7 overflow-hidden relative"
          style={{
            height: "56px",
            background: "var(--ink)",
            borderRadius: "2px 2px 0 0",
          }}
        >
          <div
            className="absolute inset-0 flex flex-col justify-center items-center"
            style={{
              writingMode: "vertical-rl",
              fontSize: "7px",
              color: "var(--paper)",
              opacity: 0.6,
              letterSpacing: "0.1em",
              fontFamily:
                "var(--font-jetbrains-mono,monospace)",
              animation: "strapScroll 6s linear infinite",
            }}
          >
            <style>{`
              @keyframes strapScroll {
                0% {
                  transform: translateY(0);
                }

                100% {
                  transform: translateY(-50%);
                }
              }
            `}</style>

            {PROFILE.name} · {PROFILE.role} · {PROFILE.name} ·{" "}
            {PROFILE.role} ·&nbsp;

            {PROFILE.name} · {PROFILE.role} · {PROFILE.name} ·{" "}
            {PROFILE.role} ·&nbsp;
          </div>
        </div>

        {/* Metal clip */}
        <div
          style={{
            width: "20px",
            height: "8px",
            background: "#aaa",
            borderRadius: "2px",
            marginBottom: "-2px",
          }}
        />
      </div>

      {/* ================= RESPONSIVE CARD AREA ================= */}
      <div
        className="
          relative
          w-[min(300px,82vw)]
          aspect-[300/404]
        "
        style={{
          perspective: "1000px",
        }}
        onPointerEnter={() => {
          /* Desktop hover only */
          if (window.innerWidth >= 1024) {
            setFlipped(true);
          }
        }}
        onPointerLeave={() => {
          /* Desktop hover only */
          if (window.innerWidth >= 1024) {
            setFlipped(false);
          }
        }}
        onClick={handleCardClick}
      >
        {/* ================= ROTATING CARD ================= */}
        <div
          ref={cardRef}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            transform: `rotateY(${flipped ? 180 : 0}deg) rotate(${angle}deg)`,
            transition:
              "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            transformOrigin: "top center",
            pointerEvents: "none",
          }}
        >
          {/* ================= FRONT ================= */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.1)",
            }}
          >
            <div className="bg-[var(--ink)] text-[var(--paper)] text-center py-3 text-xs font-mono tracking-widest uppercase">
              Developer ID
            </div>

            <div className="bg-white flex flex-col items-center px-5 sm:px-6 pb-5 sm:pb-6 h-full">
              {/* Photo */}
              <div className="mt-5 sm:mt-6 mb-4 relative">
                <div
                  className="
                    w-[110px]
                    h-[136px]
                    sm:w-[128px]
                    sm:h-[156px]
                    rounded-xl
                    overflow-hidden
                    relative
                  "
                  style={{
                    boxShadow:
                      "0 0 0 3px #eee, 0 0 0 6px #ccc, 0 8px 24px rgba(0,0,0,0.12)",
                  }}
                >
                  <Image
                    src="/portrait-bust.png"
                    alt={`Portrait of ${PROFILE.name}`}
                    fill
                    className="object-cover object-top"
                    sizes="128px"
                  />
                </div>
              </div>

              {/* Name */}
              <div className="text-center mb-3 max-w-full">
                <div className="font-bold text-sm sm:text-base tracking-tight text-[var(--ink)]">
                  {PROFILE.name}
                </div>

                <div className="text-[10px] sm:text-xs text-[var(--mute)] mt-0.5">
                  {PROFILE.role}
                </div>
              </div>

              {/* Details */}
              <div className="w-full text-[10px] sm:text-xs space-y-1.5 font-mono">
                {[
                  [
                    "ID No.",
                    "MS-" +
                    PROFILE.education.graduationYear +
                    "-063",
                  ],
                  ["Dept.", "Computer Science"],
                  ["Valid Till", PROFILE.education.graduationYear],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between gap-3 border-b border-gray-100 pb-1"
                  >
                    <span className="text-[var(--mute)]">
                      {k}
                    </span>

                    <span className="font-semibold text-[var(--ink)] text-right">
                      {v}
                    </span>
                  </div>
                ))}
              </div>

              {/* Barcode */}
              <div className="mt-auto pt-4 w-full flex flex-col items-center gap-2">
                <div
                  aria-hidden
                  className="flex gap-px h-8 items-end"
                >
                  {Array.from({ length: 40 }).map((_, i) => {
                    const widths = [
                      3, 1, 1, 1, 3, 1, 1, 3,
                    ];

                    const heights = [
                      72, 48, 86, 58, 78, 44, 68, 92,
                    ];

                    return (
                      <div
                        key={i}
                        style={{
                          width: `${widths[i % widths.length]}px`,
                          height: `${heights[i % heights.length]}%`,
                          background: "var(--ink)",
                          opacity: 0.8,
                        }}
                      />
                    );
                  })}
                </div>

                <div className="text-[7px] sm:text-[8px] font-mono text-[var(--mute)] tracking-widest">
                  *MS{PROFILE.education.graduationYear}063*
                </div>
              </div>
            </div>
          </div>

          {/* ================= BACK ================= */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden bg-[var(--soft)]"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
          >
            <div className="p-5 sm:p-6 h-full flex flex-col">
              <div className="text-[10px] sm:text-xs font-mono text-[var(--mute)] uppercase tracking-widest mb-4">
                What I am
              </div>

              <ul className="space-y-3 flex-1">
                {[
                  PROFILE.role,
                  PROFILE.education.degree +
                  " · CGPA " +
                  PROFILE.education.cgpa,
                  "Built AquaIntel Analytics with ~91% ML accuracy",
                  "Deployed AI Blog Generator with CI/CD on Render",
                  "Developed real-time fitness tracker at ~30 FPS",
                ].map((line, i) => (
                  <li
                    key={i}
                    className="text-xs sm:text-sm text-[var(--ink-2)] flex gap-2"
                  >
                    <span className="text-[var(--faint)] font-mono text-xs mt-0.5">
                      →
                    </span>

                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-[var(--line)] pt-4 mt-4">
                <div className="text-[10px] sm:text-xs text-[var(--mute)] italic font-serif">
                  If found, say hello ·
                </div>

                <a
                  href={`mailto:${PROFILE.email}`}
                  className="text-[10px] sm:text-xs text-[var(--ink)] font-mono hover:underline break-all"
                >
                  {PROFILE.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= ABOUT SECTION ================= */

export default function About() {
  return (
    <section
      id="about"
      className="section-pad bg-[var(--paper)]"
      aria-label="About Mohammed Sabeel"
    >
      <div className="container-site">
        {/* Section heading */}
        <div
          className="tag-line rv"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          <span className="font-mono">01</span>
          <span>—</span>
          <span>About me</span>
        </div>

        {/* Responsive layout */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]
            gap-14
            lg:gap-8
            items-start
          "
        >
          {/* ================= LEFT ================= */}
          <div
            className="rv min-w-0"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Hi, I&apos;m&nbsp;
              <span className="serif-accent">
                {PROFILE.firstName}.
              </span>
            </h2>

            <p className="text-[var(--ink-2)] leading-relaxed mb-6 max-w-prose">
              {PROFILE.resumeSummary}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={PROFILE.resume}
                download
                className="btn btn-primary"
              >
                Resume ↓
              </a>

              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                GitHub ↗
              </a>

              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* ================= CENTRE ================= */}
          <div
            className="
              flex
              justify-center
              pt-0
              lg:pt-8
              rv
              min-w-0
            "
            style={{ "--i": 2 } as React.CSSProperties}
          >
            <IDCard />
          </div>

          {/* ================= RIGHT ================= */}
          <div
            className="rv min-w-0"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <div className="space-y-4">
              <h3 className="text-sm font-mono text-[var(--mute)] uppercase tracking-widest mb-6">
                Quick facts
              </h3>

              {[
                {
                  label: "Location",
                  value: PROFILE.location,
                },
                {
                  label: "Education",
                  value: PROFILE.education.degree,
                },
                {
                  label: "Institution",
                  value: PROFILE.education.institution,
                },
                {
                  label: "CGPA",
                  value: PROFILE.education.cgpa,
                },
                {
                  label: "Email",
                  value: PROFILE.email,
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="border-b border-[var(--line)] pb-3"
                >
                  <div className="text-xs font-mono text-[var(--mute)] uppercase tracking-wider mb-0.5">
                    {label}
                  </div>

                  <div className="text-sm text-[var(--ink)] font-medium break-words">
                    {value}
                  </div>
                </div>
              ))}

              <blockquote className="mt-6 pl-4 border-l-2 border-[var(--ink)] italic text-[var(--mute)] text-sm">
                &ldquo;Skilled in building production-grade
                backends that process large-scale data with
                reliability and speed.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}