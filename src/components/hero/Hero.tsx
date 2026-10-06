"use client";

import { useEffect, useRef } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

/*
 * The video file is "packed": left half = colour (premultiplied),
 * right half = alpha matte. This shader merges them into a
 * transparent image so it works on every browser, including iPhone.
 */
const VERT = `
attribute vec2 p;
varying vec2 uv;
void main() {
  uv = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
varying vec2 uv;
uniform sampler2D t;
void main() {
  float a = texture2D(t, vec2(0.5 + uv.x * 0.5, uv.y)).r;
  vec3 c = texture2D(t, vec2(uv.x * 0.5, uv.y)).rgb;
  gl_FragColor = vec4(min(c, vec3(a)), a);
}`;

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!section || !video || !canvas) return;

    /* ---------------- WebGL renderer ---------------- */
    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
    });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);

    let raf = 0;
    let dirty = true;

    const markDirty = () => {
      dirty = true;
    };
    const videoEvents = ["loadeddata", "seeked", "play", "playing"] as const;
    videoEvents.forEach((e) => video.addEventListener(e, markDirty));

    const render = () => {
      // Draw while playing, or once after a seek/load while paused
      if (video.readyState >= 2 && (!video.paused || dirty)) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          video
        );
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        dirty = false;
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    /* ---------------- Playback logic ---------------- */
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
        // Browser blocked autoplay with sound: start muted so it still
        // plays on load, then turn sound on at the first interaction.
        video.muted = true;
        needsUnmute = true;
        video.play().catch(() => { });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.intersectionRatio >= 0.25;
        if (isVisible === wasVisible) return;
        wasVisible = isVisible;

        if (isVisible) {
          playFromStart(); // every return to hero restarts from 0
        } else {
          video.pause();
        }
      },
      { threshold: [0.25] }
    );
    observer.observe(section);

    const onInteraction = () => {
      if (!needsUnmute) return;
      needsUnmute = false;
      video.muted = false;
      video.volume = 1;
      if (video.paused && wasVisible && !video.ended) {
        video.play().catch(() => { });
      }
    };

    const interactionEvents = [
      "pointerdown",
      "touchend",
      "click",
      "keydown",
    ] as const;
    interactionEvents.forEach((e) =>
      window.addEventListener(e, onInteraction)
    );

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      videoEvents.forEach((e) => video.removeEventListener(e, markDirty));
      interactionEvents.forEach((e) =>
        window.removeEventListener(e, onInteraction)
      );
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
          CHARACTER VIDEO (transparent, drawn on canvas)
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
        {/* Source video: kept in the DOM (needed for sound + decoding)
            but not shown. The canvas below is what visitors see. */}
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

        <canvas
          ref={canvasRef}
          width={900}
          height={1600}
          role="img"
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