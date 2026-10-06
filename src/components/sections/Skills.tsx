"use client";
import { useState } from "react";
import { SKILL_GROUPS, type SkillFamily, type Skill } from "@/lib/data";
import TechLogo, { isBrand } from "@/components/ui/TechLogo";

const FAMILIES: SkillFamily[] = [
  "Languages",
  "Backend",
  "Databases",
  "Data and ML",
  "DevOps and Tools",
  "Concepts",
];

export default function Skills() {
  const [activeFamily, setActiveFamily] = useState<SkillFamily | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill>(SKILL_GROUPS[0]);

  return (
    <section id="skills" className="section-pad bg-[var(--card)]" aria-label="Technical Skills">
      <div className="container-site">
        <div className="tag-line rv" style={{ "--i": 0 } as React.CSSProperties}>
          <span className="font-mono">02</span>
          <span>—</span>
          <span>My tech stack</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 rv" style={{ "--i": 1 } as React.CSSProperties}>
          The periodic table of my <span className="serif-accent">stack.</span>
        </h2>

        {/* Family filter chips */}
        <div className="flex flex-wrap gap-2 mb-10 rv" style={{ "--i": 2 } as React.CSSProperties}>
          <button
            onClick={() => setActiveFamily(null)}
            className={`btn text-xs py-1.5 px-4 ${activeFamily === null ? "btn-primary" : "btn-outline"}`}
          >
            All Elements
          </button>
          {FAMILIES.map((fam) => (
            <button
              key={fam}
              onClick={() => setActiveFamily(activeFamily === fam ? null : fam)}
              className={`btn text-xs py-1.5 px-4 ${activeFamily === fam ? "btn-primary" : "btn-outline"}`}
            >
              {fam}
            </button>
          ))}
        </div>

        {/* Main interactive area: Periodic Grid + Sticky Inspector */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Periodic Grid: 8 columns desktop, 4 columns mobile */}
          <div
            className="flex-1 w-full grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3"
            role="grid"
            aria-label="Periodic table of skills"
          >
            {SKILL_GROUPS.map((skill, idx) => {
              const col = idx % 8;
              const row = Math.floor(idx / 8);
              const waveDelay = (row + col) * 40;
              const isDimmed = activeFamily !== null && skill.family !== activeFamily;
              const isCurrent = selectedSkill.symbol === skill.symbol;

              return (
                <button
                  key={skill.symbol}
                  onClick={() => setSelectedSkill(skill)}
                  onMouseEnter={() => setSelectedSkill(skill)}
                  onFocus={() => setSelectedSkill(skill)}
                  className={`aspect-square p-2 rounded-2xl border transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden group focus-visible:ring-2 focus-visible:ring-[var(--ink)] ${
                    isDimmed
                      ? "opacity-25 border-[var(--line)] bg-[var(--paper)] scale-95"
                      : isCurrent
                      ? "border-[var(--ink)] bg-white shadow-lg -translate-y-1"
                      : "border-[var(--line)] bg-white hover:border-[var(--ink-2)] hover:shadow-sm"
                  }`}
                  style={{ animationDelay: `${waveDelay}ms` }}
                  aria-label={`${skill.name} (${skill.symbol}), Atomic #${skill.atomicNo}, Family: ${skill.family}`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="font-mono text-[9px] text-[var(--mute)]">
                      {String(skill.atomicNo).padStart(2, "0")}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)] opacity-20 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="my-auto">
                    <div className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] leading-none mb-1">
                      {skill.symbol}
                    </div>
                    <div className="text-[10px] font-medium text-[var(--ink-2)] truncate leading-tight">
                      {skill.name}
                    </div>
                  </div>

                  <div className="text-[8px] font-mono text-[var(--faint)] uppercase tracking-wider truncate">
                    {skill.family.split(" ")[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Inspector panel: 320px sticky on desktop, below on mobile */}
          <aside
            aria-live="polite"
            className="w-full lg:w-[320px] flex-shrink-0 lg:sticky lg:top-24"
          >
            <div className="card p-6 border border-[var(--line)] shadow-sm bg-white">
              <style>{`
                @keyframes logoPop {
                  0% { transform: scale(0.85); opacity: 0; }
                  70% { transform: scale(1.05); }
                  100% { transform: scale(1); opacity: 1; }
                }
                .logo-pop { animation: logoPop 0.35s var(--ease) forwards; }
              `}</style>

              <div className="flex flex-col items-center text-center pb-6 border-b border-[var(--line)]">
                {/* 150px Logo with pop animation */}
                <div className="w-[150px] h-[150px] flex items-center justify-center mb-4 relative p-4 rounded-3xl bg-[var(--paper)]">
                  <div key={selectedSkill.symbol} className="logo-pop w-full h-full flex items-center justify-center">
                    <TechLogo
                      name={selectedSkill.name}
                      size={100}
                      withGlow={isBrand(selectedSkill.name)}
                    />
                  </div>
                </div>

                <div className="font-mono text-xs text-[var(--mute)] uppercase tracking-widest mb-1">
                  Element #{String(selectedSkill.atomicNo).padStart(2, "0")} · {selectedSkill.symbol}
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-[var(--ink)]">
                  {selectedSkill.name}
                </h3>
                <span className="mt-1.5 inline-block px-3 py-1 text-xs font-mono rounded-full bg-[var(--soft)] text-[var(--ink-2)]">
                  {selectedSkill.family}
                </span>
              </div>

              {/* Related Projects */}
              <div className="pt-5">
                <div className="text-xs font-mono text-[var(--mute)] uppercase tracking-wider mb-3">
                  Applied In Projects
                </div>
                {selectedSkill.projects && selectedSkill.projects.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.projects.map((p) => {
                      const labelMap: Record<string, string> = {
                        blog: "Python AI Blog Generator",
                        aqua: "AquaIntel Analytics",
                        fitness: "Next Gen Fitness Tracker",
                        mf: "M&F Kitchen Website",
                      };
                      return (
                        <span
                          key={p}
                          className="px-2.5 py-1 text-xs bg-[var(--paper)] rounded-lg text-[var(--ink-2)] font-medium border border-[var(--line)]"
                        >
                          {labelMap[p] ?? p}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-[var(--mute)] italic">
                    Core technical foundation across projects and problem solving.
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
