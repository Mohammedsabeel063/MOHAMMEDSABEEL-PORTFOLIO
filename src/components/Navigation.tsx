"use client";

import {
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";

import { PROFILE, NAV } from "@/lib/data";
import {
  useScrollY,
  useActiveSection,
} from "@/lib/hooks";
import { scrollToTarget } from "@/lib/scroll";

export default function Navigation() {
  const scrollY = useScrollY();

  const scrolled = scrollY > 40;

  const navIds = NAV.map((n) =>
    n.href.replace("#", "")
  );

  const active = useActiveSection(navIds);

  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  /* =====================================================
     NAVIGATION
  ===================================================== */

  const handleNav = useCallback((href: string) => {
    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      scrollToTarget(href);
    }

    setMenuOpen(false);
  }, []);

  /* =====================================================
     LOCK PAGE SCROLL WHEN MOBILE MENU IS OPEN
  ===================================================== */

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* =====================================================
     ESCAPE KEY
  ===================================================== */

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKey
      );
    };
  }, []);

  /* =====================================================
     SCROLL PROGRESS
  ===================================================== */

  const progressWidth =
    typeof window !== "undefined"
      ? (() => {
        const scrollable =
          document.documentElement.scrollHeight -
          window.innerHeight;

        if (scrollable <= 0) return 0;

        return Math.min(
          100,
          Math.max(0, (scrollY / scrollable) * 100)
        );
      })()
      : 0;

  return (
    <>
      {/* =================================================
          SCROLL PROGRESS
      ================================================= */}

      <div
        aria-hidden
        className="
          fixed
          top-0
          left-0
          h-[2px]
          bg-[var(--ink)]
          z-[100]
          pointer-events-none
        "
        style={{
          width: `${progressWidth}%`,
        }}
      />

      {/* =================================================
          HEADER
      ================================================= */}

      <header
        className="
          fixed
          top-2
          left-0
          right-0
          z-50
          px-0
          pointer-events-none
        "
      >
        <nav
          className="
            container-site
            flex
            items-center
            justify-between
            gap-4
            pointer-events-auto
          "
          aria-label="Main navigation"
        >
          {/* =================================================
              LOGO
          ================================================= */}

          <button
            onClick={() => handleNav("#")}
            className="
              flex
              items-center
              gap-2
              group
              shrink-0
            "
            aria-label="Back to top"
          >
            <span
              className={`
                w-9
                h-9
                shrink-0
                rounded-full
                border-2
                border-[var(--ink)]
                flex
                items-center
                justify-center
                text-xs
                font-bold
                tracking-tight
                font-mono
                transition-all
                duration-300
                group-hover:[transform:rotate(360deg)]
                ${scrolled
                  ? "bg-[var(--ink)] text-[var(--paper)]"
                  : "bg-transparent text-[var(--ink)]"
                }
              `}
              style={{
                transition:
                  "all 0.4s var(--ease)",
              }}
            >
              MS
            </span>

            {/* Desktop name */}
            <span
              className={`
                text-sm
                font-semibold
                tracking-tight
                transition-all
                duration-300
                hidden
                sm:block

                ${scrolled
                  ? "opacity-0 -translate-x-2"
                  : "opacity-100 translate-x-0"
                }
              `}
            >
              {PROFILE.name}
            </span>
          </button>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <div
            className={`
              hidden
              md:flex
              items-center
              gap-1
              px-2
              py-2
              rounded-full
              transition-all
              duration-300

              ${scrolled
                ? "backdrop-blur-xl bg-white/80 shadow-sm ring-1 ring-black/5"
                : ""
              }
            `}
          >
            {NAV.map((item) => {
              const itemId =
                item.href.replace("#", "");

              const isActive = active === itemId;

              return (
                <button
                  key={item.href}
                  onClick={() =>
                    handleNav(item.href)
                  }
                  className={`
                    relative
                    px-4
                    py-1.5
                    text-sm
                    font-medium
                    rounded-full
                    transition-all
                    duration-200
                    whitespace-nowrap

                    ${isActive
                      ? "text-[var(--paper)]"
                      : "text-[var(--ink-2)] hover:text-[var(--ink)]"
                    }
                  `}
                >
                  {isActive && (
                    <span
                      className="
                        absolute
                        inset-0
                        rounded-full
                        bg-[var(--ink)]
                      "
                      style={{
                        transition:
                          "all 0.3s var(--ease)",
                      }}
                      aria-hidden
                    />
                  )}

                  <span className="relative z-10">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            onClick={() =>
              setMenuOpen((value) => !value)
            }
            className="
              md:hidden
              btn
              btn-outline
              text-sm
              px-4
              py-2
              shrink-0
              min-w-[72px]
            "
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </nav>
      </header>

      {/* =================================================
          MOBILE FULLSCREEN MENU
      ================================================= */}

      {menuOpen && (
        <div
          ref={menuRef}
          id="mobile-navigation"
          className="
            fixed
            inset-0
            z-[60]
            bg-[var(--paper)]
            flex
            flex-col
            justify-center
            overflow-y-auto
            overscroll-contain
            px-5
            sm:px-8
          "
          style={{
            clipPath:
              "inset(0 0 0 0)",
            animation:
              "menuIn 0.4s var(--ease) forwards",
          }}
        >
          <style>{`
            @keyframes menuIn {
              from {
                clip-path: inset(0 0 100% 0);
              }

              to {
                clip-path: inset(0 0 0% 0);
              }
            }

            @keyframes fadeSlideIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }

              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          <nav
            aria-label="Mobile navigation"
            className="
              w-full
              max-w-xl
              mx-auto
            "
          >
            {NAV.map((item, i) => (
              <button
                key={item.href}
                onClick={() =>
                  handleNav(item.href)
                }
                className="
                  block
                  w-full
                  text-left
                  py-4
                  sm:py-5
                  border-b
                  border-[var(--line)]
                  min-w-0
                "
                style={{
                  animationDelay: `${i * 60}ms`,
                  animation:
                    "fadeSlideIn 0.5s var(--ease) both",
                }}
              >
                <span
                  className="
                    font-mono
                    text-xs
                    text-[var(--mute)]
                    block
                    mb-1
                  "
                >
                  0{i + 1}
                </span>

                <span
                  className="
                    block
                    text-3xl
                    sm:text-4xl
                    font-bold
                    tracking-tight
                    break-words
                  "
                >
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}