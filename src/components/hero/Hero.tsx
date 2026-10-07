"use client";

import { useEffect, useRef } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

/*
 * The video is packed:
 * LEFT  = character/color video
 * RIGHT = alpha/transparency mask
 *
 * hero-alpha.mp4 is 1800 × 1600:
 * LEFT 900 × 1600 = character
 * RIGHT 900 × 1600 = alpha mask
 *
 * WebGL combines both halves and displays only the
 * transparent character on the canvas.
 */

const VERT = `
attribute vec2 p;

varying vec2 uv;

void main() {
  uv = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;

varying vec2 uv;

uniform sampler2D t;

void main() {
  // Right half = alpha mask
  float a = texture2D(
    t,
    vec2(0.5 + uv.x * 0.5, uv.y)
  ).r;

  // Left half = actual color video
  vec3 c = texture2D(
    t,
    vec2(uv.x * 0.5, uv.y)
  ).rgb;

  // Premultiplied alpha
  gl_FragColor = vec4(min(c, vec3(a)), a);
}
`;

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!section || !video || !canvas) return;

    /* =========================================
       WEBGL RENDERER
    ========================================= */

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
    });

    if (!gl) return;

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type);

      if (!shader) {
        throw new Error("Unable to create WebGL shader");
      }

      gl.shaderSource(shader, src);
      gl.compileShader(shader);

      return shader;
    };

    const program = gl.createProgram();

    if (!program) return;

    gl.attachShader(
      program,
      compile(gl.VERTEX_SHADER, VERT)
    );

    gl.attachShader(
      program,
      compile(gl.FRAGMENT_SHADER, FRAG)
    );

    gl.linkProgram(program);
    gl.useProgram(program);

    /* =========================================
       FULLSCREEN QUAD
    ========================================= */

    const buffer = gl.createBuffer();

    if (!buffer) return;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1,
        -1,
        1,
        -1,
        -1,
        1,
        1,
        1,
      ]),
      gl.STATIC_DRAW
    );

    const loc = gl.getAttribLocation(program, "p");

    gl.enableVertexAttribArray(loc);

    gl.vertexAttribPointer(
      loc,
      2,
      gl.FLOAT,
      false,
      0,
      0
    );

    /* =========================================
       VIDEO TEXTURE
    ========================================= */

    const texture = gl.createTexture();

    if (!texture) return;

    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_WRAP_S,
      gl.CLAMP_TO_EDGE
    );

    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_WRAP_T,
      gl.CLAMP_TO_EDGE
    );

    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MIN_FILTER,
      gl.LINEAR
    );

    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MAG_FILTER,
      gl.LINEAR
    );

    gl.pixelStorei(
      gl.UNPACK_FLIP_Y_WEBGL,
      true
    );

    gl.viewport(
      0,
      0,
      canvas.width,
      canvas.height
    );

    gl.clearColor(0, 0, 0, 0);

    let raf = 0;
    let dirty = true;

    const markDirty = () => {
      dirty = true;
    };

    const videoEvents = [
      "loadeddata",
      "seeked",
      "play",
      "playing",
    ] as const;

    videoEvents.forEach((event) => {
      video.addEventListener(event, markDirty);
    });

    /* =========================================
       RENDER LOOP
    ========================================= */

    const render = () => {
      if (
        video.readyState >= 2 &&
        (!video.paused || dirty)
      ) {
        gl.bindTexture(
          gl.TEXTURE_2D,
          texture
        );

        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          video
        );

        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawArrays(
          gl.TRIANGLE_STRIP,
          0,
          4
        );

        dirty = false;
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    /* =========================================
       PLAYBACK
    ========================================= */

    let wasVisible = false;
    let needsUnmute = false;

    const playFromStart = async () => {
      video.currentTime = 0;

      try {
        video.muted = false;
        video.volume = 1;

        await video.play();

        needsUnmute = false;
      } catch {
        /*
         * iPhone/Safari may block autoplay with sound.
         * Start muted and enable sound after interaction.
         */

        video.muted = true;
        needsUnmute = true;

        video.play().catch(() => { });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible =
          entry.intersectionRatio >= 0.25;

        if (isVisible === wasVisible) return;

        wasVisible = isVisible;

        if (isVisible) {
          // Restart whenever the user returns to Hero.
          playFromStart();
        } else {
          video.pause();
        }
      },
      {
        threshold: [0.25],
      }
    );

    observer.observe(section);

    /* =========================================
       UNMUTE AFTER USER INTERACTION
    ========================================= */

    const onInteraction = () => {
      if (!needsUnmute) return;

      needsUnmute = false;

      video.muted = false;
      video.volume = 1;

      if (
        video.paused &&
        wasVisible &&
        !video.ended
      ) {
        video.play().catch(() => { });
      }
    };

    const interactionEvents = [
      "pointerdown",
      "touchend",
      "click",
      "keydown",
    ] as const;

    interactionEvents.forEach((event) => {
      window.addEventListener(
        event,
        onInteraction
      );
    });

    /* =========================================
       CLEANUP
    ========================================= */

    return () => {
      observer.disconnect();

      cancelAnimationFrame(raf);

      videoEvents.forEach((event) => {
        video.removeEventListener(
          event,
          markDirty
        );
      });

      interactionEvents.forEach((event) => {
        window.removeEventListener(
          event,
          onInteraction
        );
      });

      video.pause();
    };
  }, []);

  const firstName =
    PROFILE.firstName.toUpperCase();

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

            translate-y-[115px]

            md:translate-y-0
          "
          style={{
            fontSize:
              "clamp(58px, 17vw, 240px)",
            lineHeight: 1,
            WebkitTextStroke:
              "1.5px rgba(13,13,13,0.12)",
            WebkitTextFillColor:
              "transparent",
            letterSpacing: "-0.06em",
          }}
        >
          {firstName}
        </span>
      </div>

      {/* =========================================
          CHARACTER VIDEO / CANVAS
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

          h-[52svh]
          min-h-[330px]
          max-h-[460px]

          sm:h-[55svh]
          sm:min-h-[360px]
          sm:max-h-[500px]

          md:h-[min(96svh,1040px)]
          md:min-h-0
          md:max-h-none
        "
      >
        {/* =====================================
            HIDDEN SOURCE VIDEO

            The video is only used for:
            - decoding
            - animation
            - audio

            Canvas is what the visitor sees.
        ===================================== */}

        <video
          ref={videoRef}
          src="/hero/hero.mp4"
          playsInline
          preload="auto"
          controls={false}
          aria-hidden
          tabIndex={-1}
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            opacity: 0,
            pointerEvents: "none",
          }}
        />

        {/* =====================================
            TRANSPARENT CANVAS

            Visible half:
            900 × 1600

            Source video:
            1800 × 1600

            LEFT  = 900 × 1600 character
            RIGHT = 900 × 1600 alpha
        ===================================== */}

        <canvas
          ref={canvasRef}
          width={900}
          height={1600}
          role="img"
          className="
            block
            h-full
            w-auto
            max-w-[94vw]
            object-contain

            scale-[1.08]

            sm:max-w-[88vw]
            sm:scale-100

            md:max-w-[min(520px,85vw)]
            md:scale-100
          "
          style={{
            aspectRatio: "900 / 1600",
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
            <span
              style={{
                color: "#59624F",
              }}
            >
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
              onClick={() =>
                scrollToTarget("#work")
              }
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
              onClick={() =>
                scrollToTarget("#contact")
              }
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