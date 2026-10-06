"use client";

import { useState } from "react";
import { PROJECTS } from "@/lib/data";
import TechLogo from "@/components/ui/TechLogo";

function ProjectUI({ id }: { id: string }) {
  const UIs: Record<string, React.ReactNode> = {
    blog: (
      <div className="h-full min-w-0 bg-white rounded-2xl p-4 sm:p-5 flex flex-col gap-3 border border-gray-200 shadow-sm text-gray-800">
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-400 shrink-0" />

            <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-gray-600 truncate">
              /api/v1/generate-blog
            </span>
          </div>

          <span className="text-[8px] font-mono bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold shrink-0">
            200 OK
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gray-50 border border-gray-100 p-2 rounded-lg text-center min-w-0">
            <div className="text-[7px] sm:text-[8px] text-gray-400 uppercase font-mono">
              Framework
            </div>

            <div className="text-[9px] sm:text-[10px] font-bold text-gray-700 truncate">
              FastAPI/Flask
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 p-2 rounded-lg text-center min-w-0">
            <div className="text-[7px] sm:text-[8px] text-gray-400 uppercase font-mono">
              Auth
            </div>

            <div className="text-[9px] sm:text-[10px] font-bold text-gray-700 truncate">
              JWT Token
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 p-2 rounded-lg text-center min-w-0">
            <div className="text-[7px] sm:text-[8px] text-gray-400 uppercase font-mono">
              Host
            </div>

            <div className="text-[9px] sm:text-[10px] font-bold text-gray-700 truncate">
              Render CI/CD
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-[130px] bg-gray-50 rounded-xl p-3 border border-gray-100 flex flex-col gap-2 font-mono text-[9px] text-gray-600 overflow-hidden">
          <div className="text-gray-400 text-[8px]">
            // Multilingual Prompt Request
          </div>

          <div className="bg-white p-2 rounded border border-gray-100 truncate">
            {`{"topic": "Cloud Scalability", "lang": "es", "words": 800}`}
          </div>

          <div className="text-gray-400 text-[8px] mt-1">
            // Generated Output
          </div>

          <div className="bg-white p-2 rounded border border-gray-100 flex-1 flex flex-col gap-1.5">
            <div className="h-2 bg-gray-200 rounded w-full" />
            <div className="h-2 bg-gray-200 rounded w-5/6" />
            <div className="h-2 bg-gray-200 rounded w-3/4" />
          </div>
        </div>

        <div className="text-[9px] font-mono text-gray-400 text-center uppercase tracking-wider">
          Illustrative UI
        </div>
      </div>
    ),

    aqua: (
      <div className="h-full min-w-0 bg-white rounded-2xl p-4 sm:p-5 flex flex-col gap-3 border border-gray-200 shadow-sm text-gray-800">
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-gray-100">
          <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-gray-600 truncate">
            AquaIntel Dashboard
          </span>

          <span className="text-[8px] font-mono bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold shrink-0">
            RF + XGBoost
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-50 border border-gray-100 p-2 rounded-lg text-center">
            <div className="text-[7px] sm:text-[8px] text-gray-400 uppercase font-mono">
              Prediction Accuracy
            </div>

            <div className="text-base font-bold text-gray-800">
              ~91%
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 p-2 rounded-lg text-center">
            <div className="text-[7px] sm:text-[8px] text-gray-400 uppercase font-mono">
              Monitored Scope
            </div>

            <div className="text-base font-bold text-gray-800">
              50+ Districts
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-[130px] bg-gray-50 rounded-xl p-3 border border-gray-100 flex flex-col justify-between">
          <div className="text-[8px] font-mono text-gray-400 mb-2">
            District Potability Index
          </div>

          <div className="flex items-end gap-1.5 h-24 px-1">
            {[45, 65, 80, 91, 70, 85, 60, 94, 78, 88].map(
              (val, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gray-300 hover:bg-gray-800 rounded-sm transition-colors"
                  style={{
                    height: `${val}%`,
                  }}
                />
              )
            )}
          </div>

          <div className="flex justify-between text-[7px] font-mono text-gray-400 mt-1">
            <span>D-01</span>
            <span>D-25</span>
            <span>D-50+</span>
          </div>
        </div>

        <div className="text-[9px] font-mono text-gray-400 text-center uppercase tracking-wider">
          Illustrative UI
        </div>
      </div>
    ),

    fitness: (
      <div className="h-full min-w-0 bg-white rounded-2xl p-4 sm:p-5 flex flex-col gap-3 border border-gray-200 shadow-sm text-gray-800">
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-gray-100">
          <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-gray-600 truncate">
            CV Vision Feed
          </span>

          <span className="text-[8px] font-mono bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-bold shrink-0">
            ~30 FPS
          </span>
        </div>

        <div className="flex-1 min-h-[180px] bg-gray-900 rounded-xl p-3 relative overflow-hidden flex items-center justify-center">
          <svg
            viewBox="0 0 100 130"
            className="w-20 sm:w-24 max-w-full opacity-80"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
          >
            <circle cx="50" cy="22" r="10" />

            <line
              x1="50"
              y1="32"
              x2="50"
              y2="70"
            />

            <line
              x1="50"
              y1="42"
              x2="25"
              y2="60"
            />

            <line
              x1="50"
              y1="42"
              x2="75"
              y2="60"
            />

            <line
              x1="50"
              y1="70"
              x2="32"
              y2="105"
            />

            <line
              x1="50"
              y1="70"
              x2="68"
              y2="105"
            />

            <circle
              cx="25"
              cy="60"
              r="3"
              fill="#fff"
            />

            <circle
              cx="75"
              cy="60"
              r="3"
              fill="#fff"
            />

            <circle
              cx="32"
              cy="105"
              r="3"
              fill="#fff"
            />

            <circle
              cx="68"
              cy="105"
              r="3"
              fill="#fff"
            />
          </svg>

          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur px-2 py-0.5 rounded text-[8px] font-mono text-green-400">
            • LIVE 30 FPS
          </div>

          <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur rounded p-1.5 text-[7px] sm:text-[8px] font-mono text-gray-200 flex justify-between gap-1">
            <span>Reps: 16</span>
            <span>Squats</span>
            <span>88°</span>
          </div>
        </div>

        <div className="text-[9px] font-mono text-gray-400 text-center uppercase tracking-wider">
          Illustrative UI
        </div>
      </div>
    ),

    mf: (
      <div className="h-full min-w-0 bg-white rounded-2xl p-4 sm:p-5 flex flex-col gap-3 border border-gray-200 shadow-sm text-gray-800">
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-gray-100">
          <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-gray-600 truncate">
            mandfkitchen.me
          </span>

          <span className="text-[8px] font-mono bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold shrink-0">
            100% Uptime
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-50 border border-gray-100 p-2 rounded-lg text-center">
            <div className="text-[7px] sm:text-[8px] text-gray-400 uppercase font-mono">
              CI/CD Speedup
            </div>

            <div className="text-base font-bold text-gray-800">
              ~85% Cut
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 p-2 rounded-lg text-center">
            <div className="text-[7px] sm:text-[8px] text-gray-400 uppercase font-mono">
              Deployment
            </div>

            <div className="text-base font-bold text-gray-800">
              Zero Downtime
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-[130px] bg-gray-50 rounded-xl p-3 border border-gray-100 flex flex-col justify-between">
          <div className="h-8 bg-gray-800 rounded-lg flex items-center justify-between px-3 text-white">
            <span className="text-[9px] font-bold">
              M&F Kitchen
            </span>

            <div className="hidden sm:flex gap-2 text-[7px] text-gray-400 font-mono">
              <span>MENU</span>
              <span>ABOUT</span>
              <span>CONTACT</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1.5 my-2">
            <div className="h-10 bg-white border border-gray-200 rounded p-1 text-[7px] text-center flex items-center justify-center font-mono">
              Dishes
            </div>

            <div className="h-10 bg-white border border-gray-200 rounded p-1 text-[7px] text-center flex items-center justify-center font-mono">
              Orders
            </div>

            <div className="h-10 bg-white border border-gray-200 rounded p-1 text-[7px] text-center flex items-center justify-center font-mono">
              Reviews
            </div>
          </div>

          <div className="text-[8px] font-mono text-gray-500 text-center">
            Responsive client site live in production
          </div>
        </div>

        <div className="text-[9px] font-mono text-gray-400 text-center uppercase tracking-wider">
          Illustrative UI
        </div>
      </div>
    ),
  };

  return <>{UIs[id] ?? null}</>;
}

export default function Work() {
  const [openId, setOpenId] = useState<string>(
    PROJECTS[0].id
  );

  return (
    <section
      id="work"
      className="section-pad bg-[var(--paper)]"
      aria-label="Selected Projects"
    >
      <div className="container-site">
        {/* Heading */}
        <div
          className="tag-line rv"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          <span className="font-mono">03</span>
          <span>—</span>
          <span>Selected work</span>
        </div>

        <h2
          className="text-4xl sm:text-5xl font-bold tracking-tight mb-10 md:mb-12 leading-tight rv"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          Things I&apos;ve{" "}
          <span className="serif-accent">
            built.
          </span>
        </h2>

        {/* =================================================
            DESKTOP
        ================================================= */}

        <div
          className="hidden md:flex gap-4 rv"
          style={{
            height: "min(78svh, 600px)",
            "--i": 2,
          } as React.CSSProperties}
        >
          {PROJECTS.map((proj) => {
            const isOpen = openId === proj.id;

            return (
              <div
                key={proj.id}
                onClick={() => setOpenId(proj.id)}
                className={`relative rounded-[28px] overflow-hidden border border-[var(--line)] transition-all duration-500 cursor-pointer shadow-sm ${isOpen
                  ? "flex-[8] bg-white cursor-default"
                  : "flex-1 bg-[var(--card)] hover:border-[var(--ink-2)]"
                  }`}
                style={{
                  transition: "flex 0.5s var(--ease)",
                }}
                role="region"
                aria-label={`Project: ${proj.title}`}
              >
                {!isOpen ? (
                  <button
                    onClick={() => setOpenId(proj.id)}
                    className="w-full h-full flex flex-col items-center justify-between py-8 px-2 group focus-visible:outline-none"
                    aria-label={`Expand ${proj.title}`}
                  >
                    <span className="font-mono text-xs text-[var(--mute)]">
                      {proj.index}
                    </span>

                    <span
                      className="text-base font-bold text-[var(--ink)] tracking-tight whitespace-nowrap"
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                      }}
                    >
                      {proj.title}
                    </span>

                    <span className="w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center text-sm font-bold text-[var(--mute)] group-hover:rotate-45 group-hover:bg-[var(--ink)] group-hover:text-white transition-all">
                      +
                    </span>
                  </button>
                ) : (
                  <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden">
                    {/* Details */}
                    <div className="flex-1 p-8 lg:p-10 flex flex-col justify-between overflow-y-auto min-w-0">
                      <div className="min-w-0">
                        <div className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider mb-2">
                          {proj.index} — {proj.kicker}
                        </div>

                        <h3 className="text-3xl font-bold tracking-tight text-[var(--ink)] mb-3 leading-tight">
                          {proj.title}
                        </h3>

                        <p className="text-sm md:text-base text-[var(--ink-2)] leading-relaxed mb-6">
                          {proj.description}
                        </p>

                        {/* Features */}
                        <div className="mb-6">
                          <div className="text-xs font-mono text-[var(--mute)] uppercase tracking-wider mb-2.5">
                            Key Features
                          </div>

                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--ink-2)]">
                            {proj.features.map(
                              (feat) => (
                                <li
                                  key={feat}
                                  className="flex items-start gap-2"
                                >
                                  <span className="text-[var(--mute)] font-mono shrink-0">
                                    ✦
                                  </span>

                                  <span>{feat}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>

                        {/* Tech */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {proj.tech.map((t) => (
                            <span
                              key={t}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[var(--soft)] text-[var(--ink)] border border-[var(--line)]"
                            >
                              <TechLogo
                                name={t}
                                size={14}
                              />

                              <span>{t}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-wrap gap-3 pt-2">
                        {proj.github && (
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary text-xs"
                          >
                            View on GitHub ↗
                          </a>
                        )}

                        {proj.live && (
                          <a
                            href={proj.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline text-xs"
                          >
                            Live Demo ↗
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Preview */}
                    <div
                      className="w-full lg:w-[320px] min-w-0 bg-[var(--soft)] p-4 flex-shrink-0 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-[var(--line)]"
                      style={{
                        animation:
                          "clipWipe 0.6s var(--ease) forwards",
                      }}
                    >
                      <style>{`
                        @keyframes clipWipe {
                          from {
                            clip-path: inset(0 100% 0 0);
                          }

                          to {
                            clip-path: inset(0 0 0 0);
                          }
                        }
                      `}</style>

                      <ProjectUI id={proj.id} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* =================================================
            MOBILE
        ================================================= */}

        <div
          className="md:hidden space-y-4 rv"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {PROJECTS.map((proj) => {
            const isOpen = openId === proj.id;

            return (
              <div
                key={proj.id}
                className="card border border-[var(--line)] overflow-hidden bg-white rounded-2xl min-w-0"
              >
                {/* Accordion button */}
                <button
                  onClick={() =>
                    setOpenId(
                      isOpen ? "" : proj.id
                    )
                  }
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="min-w-0">
                    <span className="font-mono text-xs text-[var(--mute)]">
                      {proj.index}
                    </span>

                    <h3 className="text-lg font-bold text-[var(--ink)] mt-0.5 leading-tight">
                      {proj.title}
                    </h3>
                  </div>

                  <span
                    className={`w-8 h-8 shrink-0 rounded-full border border-[var(--line)] flex items-center justify-center text-sm font-bold transition-transform ${isOpen
                      ? "rotate-45 bg-[var(--ink)] text-white"
                      : ""
                      }`}
                  >
                    +
                  </span>
                </button>

                {/* Open content */}
                {isOpen && (
                  <div className="px-5 pb-6 pt-2 border-t border-[var(--line)] min-w-0">
                    <div className="font-mono text-[10px] text-[var(--mute)] uppercase tracking-wider mb-2">
                      {proj.kicker}
                    </div>

                    <p className="text-sm text-[var(--ink-2)] leading-relaxed mb-5">
                      {proj.description}
                    </p>

                    {/* Features */}
                    <div className="mb-5">
                      <div className="text-[10px] font-mono text-[var(--mute)] uppercase tracking-wider mb-2">
                        Key Features
                      </div>

                      <ul className="space-y-2 text-xs text-[var(--ink-2)]">
                        {proj.features.map(
                          (feat) => (
                            <li
                              key={feat}
                              className="flex items-start gap-2"
                            >
                              <span className="text-[var(--mute)] font-mono shrink-0">
                                ✦
                              </span>

                              <span className="min-w-0">
                                {feat}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* Tech */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono bg-[var(--soft)] text-[var(--ink)] border border-[var(--line)] max-w-full"
                        >
                          <TechLogo
                            name={t}
                            size={12}
                          />

                          <span className="truncate">
                            {t}
                          </span>
                        </span>
                      ))}
                    </div>

                    {/* Project preview */}
                    <div className="my-4 w-full min-w-0 overflow-hidden rounded-2xl">
                      <div className="w-full min-h-[230px]">
                        <ProjectUI id={proj.id} />
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-3 mt-5">
                      {proj.github && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary text-xs"
                        >
                          View on GitHub ↗
                        </a>
                      )}

                      {proj.live && (
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline text-xs"
                        >
                          Live Demo ↗
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}