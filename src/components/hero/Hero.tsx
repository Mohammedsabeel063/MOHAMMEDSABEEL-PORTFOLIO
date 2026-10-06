"use client";

import { useEffect, useRef } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    let wasVisible = false;
    let needsUserInteraction = false;

    const playVideoWithSound = async () => {
      try {
        video.muted = false;
        video.volume = 1;

        await video.play();

        needsUserInteraction = false;
      } catch {
        // Mobile browsers may block autoplay with sound.
        needsUserInteraction = true;
      }
    };

    const startAfterInteraction = async () => {
      if (!needsUserInteraction) return;

      try {
        video.muted = false;
        video.volume = 1;

        await video.play();

        needsUserInteraction = false;
      } catch {
        // Ignore playback failure.
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.intersectionRatio >= 0.25;

        if (isVisible === wasVisible) return;

        wasVisible = isVisible;

        if (isVisible) {
          playVideoWithSound();
        } else {
          video.pause();
        }
      },
      {
        threshold: [0.25],
      }
    );

    observer.observe(section);

    /*
     * Try autoplay with sound immediately.
     * If Safari/iPhone blocks it, the first user interaction
     * with the page will start the video with sound.
     */
    playVideoWithSound();

    const interactionEvents = [
      "pointerdown",
      "touchstart",
      "click",
      "keydown",
    ] as const;

    interactionEvents.forEach((event) => {
      window.addEventListener(event, startAfterInteraction, {
        once: true,
      });
    });

    return () => {
      observer.disconnect();

      interactionEvents.forEach((event) => {
        window.removeEventListener(event, startAfterInteraction);
      });

      video.pause();
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
          CHARACTER VIDEO
      ========================================= */}
      <div
        className="
          relative
          z-10
          flex
          w-full
          items-center
          justify-center
          shrink-0

          h-[43svh]
          min-h-[260px]
          max-h-[360px]

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
          src="/hero/hero.mp4"
          autoPlay
          playsInline
          preload="auto"
          controls={false}
          className="
            block
            h-full
            w-auto
            max-w-[88vw]
            object-contain

            sm:max-w-[80vw]

            md:max-w-[min(520px,85vw)]
          "
          style={{
            aspectRatio: "768/960",
            mixBlendMode: "multiply",
          }}
          aria-label={`Video self-introduction of ${PROFILE.name}`}
        />
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