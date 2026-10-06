"use client";

import { useState } from "react";
import { PROFILE } from "@/lib/data";

function BouncingText({ text }: { text: string }) {
  return (
    <span className="inline-block">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block transition-transform duration-200 hover:-translate-y-3 cursor-default"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <footer
      id="contact"
      className="section-pad bg-white border-t border-[var(--line)] relative"
      aria-label="Contact and Footer"
    >
      <div className="container-site">
        {/* Section label */}
        <div
          className="tag-line rv"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          <span className="font-mono">07</span>
          <span>—</span>
          <span>Get in touch</span>
        </div>

        {/* Main contact */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-12 mb-16 lg:mb-20">
          <div
            className="w-full max-w-3xl rv"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            <h2 className="text-[3.2rem] sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[var(--ink)] leading-[0.95] mb-8">
              <div>
                <BouncingText text="Let's build" />
              </div>

              <div className="serif-accent mt-2">
                <BouncingText text="something together." />
              </div>
            </h2>

            {/* Email */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
              <a
                href={`mailto:${PROFILE.email}`}
                className="max-w-full text-lg sm:text-2xl md:text-3xl lg:text-4xl font-mono font-medium text-[var(--ink)] underline underline-offset-8 decoration-[var(--line)] hover:decoration-[var(--ink)] transition-colors break-mobile"
              >
                {PROFILE.email}
              </a>

              <button
                onClick={copyEmail}
                className="btn btn-outline text-xs py-2 px-4 flex items-center gap-1.5 self-start sm:self-auto shrink-0"
                aria-label="Copy email address"
              >
                <span aria-live="polite">
                  {copied ? "Copied ✓" : "Copy"}
                </span>
              </button>
            </div>

            {/* Contact channels */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-5 text-xs sm:text-sm font-mono text-[var(--ink-2)]">
              <a
                href={PROFILE.phoneHref}
                className="hover:text-[var(--ink)] underline underline-offset-4 break-mobile"
              >
                {PROFILE.phone}
              </a>

              <span className="hidden sm:inline text-[var(--faint)]">
                /
              </span>

              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--ink)] underline underline-offset-4"
              >
                GitHub ↗
              </a>

              <span className="hidden sm:inline text-[var(--faint)]">
                /
              </span>

              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--ink)] underline underline-offset-4"
              >
                LinkedIn ↗
              </a>

              <span className="hidden sm:inline text-[var(--faint)]">
                /
              </span>

              <span className="text-[var(--mute)]">
                {PROFILE.location}
              </span>
            </div>
          </div>

          {/* Spinning badge */}
          <div
            className="relative w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0 self-center lg:self-start rv"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            <style>{`
              @keyframes spinBadge {
                from {
                  transform: rotate(0deg);
                }

                to {
                  transform: rotate(360deg);
                }
              }

              .spin-badge {
                animation: spinBadge 16s linear infinite;
              }
            `}</style>

            <div className="w-full h-full spin-badge">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
              >
                <path
                  id="circlePath"
                  d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />

                <text className="text-[8.5px] font-mono uppercase tracking-[0.24em] fill-[var(--ink)] font-bold">
                  <textPath href="#circlePath">
                    SAY HELLO · GET IN TOUCH ·
                  </textPath>
                </text>
              </svg>
            </div>

            <div className="absolute inset-0 m-auto w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center font-bold text-xs sm:text-sm">
              MS
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-[var(--line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 text-xs font-mono text-[var(--mute)]">
          <div className="leading-relaxed">
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </div>

          <div>
            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="text-[var(--ink)] hover:underline cursor-pointer"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}