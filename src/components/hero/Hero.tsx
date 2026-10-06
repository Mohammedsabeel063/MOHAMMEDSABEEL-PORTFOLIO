"use client";

import { useEffect, useRef } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const v = videoRef.current;

    if (!section || !v) return;

    let wasVisible = false;
    let needsUnmute = false;

    const events = ["pointerdown", "keydown", "touchend"] as const;

    const playFromStart = async () => {
      v.currentTime = 0;
      v.muted = false;
      v.volume = 1;

      try {
        await v.play();
        needsUnmute = false;
      } catch {
        v.muted = true;
        needsUnmute = true;

        try {
          await v.play();
        } catch {
          // Ignore autoplay failure
        }
      }
    };

    const onGesture = async () => {
      if (!needsUnmute) return;

      needsUnmute = false;

      v.muted = false;
      v.volume = 1;

      try {
        await v.play();
      } catch {
        // Ignore playback failure
      }

      events.forEach((event) => {
        window.removeEventListener(event, onGesture);
      });
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.intersectionRatio >= 0.35;

        if (isVisible === wasVisible) return;

        wasVisible = isVisible;

        if (isVisible) {
          playFromStart();
        } else {
          v.pause();
        }
      },
      {
        threshold: [0.35],
      }
    );

    obs.observe(section);

    events.forEach((event) => {
      window.addEventListener(event, onGesture, { once: true });
    });

    const rect = section.getBoundingClientRect();

    const visibleHeight =
      Math.min(rect.bottom, window.innerHeight) -
      Math.max(rect.top, 0);

    const visibilityRatio =
      Math.max(0, visibleHeight) / Math.max(1, rect.height);

    if (visibilityRatio >= 0.35) {
      wasVisible = true;
      playFromStart();
    }

    return () => {
      obs.disconnect();

      events.forEach((event) => {
        window.removeEventListener(event, onGesture);
      });
    };
  }, []);

  const firstName = PROFILE.firstName.toUpperCase();

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="
        relative
        flex
        flex-col
        items-center
        min-h-[100svh]
        overflow-hidden
        bg-[var(--paper)]
        pt-20
        pb-8
        md:justify-center
        md:pt-0
        md:pb-0
      "
      aria-label="Introduction Hero"
    >
      <style>{`
        @keyframes heroFadeIn {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-fade {
          animation: heroFadeIn 0.9s var(--ease) both;
        }
      `}</style>

      {/* =========================================
          GIANT BACKGROUND NAME
      ========================================= */}
      <div
        aria-hidden
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          pointer-events-none
          select-none
          overflow-hidden
          z-0
        "
      >
        <span
          className="
            font-bold
            tracking-tighter
            text-[var(--ink)]
            select-none
            whitespace-nowrap
          "
          style={{
            fontSize: "clamp(58px, 17vw, 240px)",
            lineHeight: 1,
            WebkitTextStroke: "1.5px rgba(13,13,13,0.12)",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.06em",
          }}
        >
          {firstName}
        </span>
      </div>

      {/* =========================================
          VIDEO
      ========================================= */}
      <div
        className="
          relative
          z-10
          flex
          w-full
          items-center
          justify-center
          pointer-events-none
          shrink-0

          h-[45svh]
          min-h-[270px]
          max-h-[330px]

          sm:h-[50svh]
          sm:min-h-[300px]
          sm:max-h-[390px]

          md:h-[min(96svh,1040px)]
          md:min-h-0
          md:max-h-none
        "
      >
        <video
          ref={videoRef}
          playsInline
          preload="auto"
          className="
            h-full
            w-auto
            max-w-[78vw]
            object-contain

            sm:max-w-[80vw]

            md:max-w-[min(520px,85vw)]
          "
          style={{
            aspectRatio: "768/960",
            mixBlendMode: "multiply",
          }}
          aria-label={`Video self-introduction of ${PROFILE.name}`}
        >
          <source src="/hero/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* =========================================
          TEXT + BUTTONS
      ========================================= */}
      <div
        className="
          relative
          z-40
          w-full
          container-site

          mt-1

          md:absolute
          md:bottom-0
          md:left-0
          md:right-0
          md:mt-0
          md:pb-8

          pointer-events-none
        "
      >
        <div
          className="
            hero-fade
            pointer-events-auto
            w-full
            max-w-4xl
          "
          style={{
            animationDelay: "0.2s",
          }}
        >
          {/* =====================================
              HEADING
          ===================================== */}
          <h1
            className="
              relative
              z-50

              text-[1.85rem]
              leading-[1.05]

              sm:text-4xl

              md:text-6xl

              font-bold
              tracking-tight
              mb-5

              text-[var(--ink)]

              max-w-[760px]
            "
            style={{
              letterSpacing: "-0.045em",
            }}
          >
            Backend-focused{" "}
            <span style={{ color: "#59624F" }}>
              Software
            </span>{" "}
            <span className="text-[var(--ink)]">
              Engineer.
            </span>
          </h1>

          {/* =====================================
              BUTTONS
          ===================================== */}
          <div
            className="
              grid
              grid-cols-2
              gap-2.5
              w-full

              md:flex
              md:flex-wrap
              md:gap-3
            "
          >
            <button
              onClick={() => scrollToTarget("#work")}
              className="
                btn
                btn-primary
                min-h-11
                px-4
                whitespace-nowrap
                w-full
                md:w-auto
              "
            >
              Explore work
            </button>

            <button
              onClick={() => scrollToTarget("#contact")}
              className="
                btn
                btn-outline
                min-h-11
                px-4
                whitespace-nowrap
                w-full
                md:w-auto
              "
            >
              Let&apos;s talk
            </button>

            <a
              href={PROFILE.resume}
              download
              className="
                btn
                btn-outline
                min-h-11
                px-4
                whitespace-nowrap
                w-full

                col-span-2

                md:w-auto
                md:col-span-1
              "
              aria-label="Download resume PDF"
            >
              Resume ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}