import React from "react";
import Image from "next/image";

export const BRAND_MAP: Record<string, { logo: string; color: string }> = {
  python: { logo: "/logos/python.svg", color: "#3776AB" },
  fastapi: { logo: "/logos/fastapi.svg", color: "#059669" },
  flask: { logo: "/logos/flask.svg", color: "#222222" },
  postgresql: { logo: "/logos/postgresql.svg", color: "#336791" },
  mysql: { logo: "/logos/mysql.svg", color: "#00758F" },
  sqlalchemy: { logo: "/logos/postgresql.svg", color: "#D71F00" },
  pandas: { logo: "/logos/pandas.svg", color: "#150458" },
  numpy: { logo: "/logos/numpy.svg", color: "#013243" },
  "scikit-learn": { logo: "/logos/scikit.svg", color: "#F7931E" },
  xgboost: { logo: "/logos/xgboost.svg", color: "#FF6600" },
  streamlit: { logo: "/logos/streamlit.svg", color: "#FF4B4B" },
  opencv: { logo: "/logos/opencv.svg", color: "#5C3EE8" },
  mediapipe: { logo: "/logos/mediapipe.svg", color: "#0072B2" },
  git: { logo: "/logos/git.svg", color: "#F05032" },
  github: { logo: "/logos/github.svg", color: "#181717" },
  docker: { logo: "/logos/docker.svg", color: "#2496ED" },
  postman: { logo: "/logos/postman.svg", color: "#FF6C37" },
  render: { logo: "/logos/render.svg", color: "#46E3B7" },
  vercel: { logo: "/logos/vercel.svg", color: "#000000" },
  html: { logo: "/logos/html.svg", color: "#E34F26" },
  css: { logo: "/logos/css.svg", color: "#1572B6" },
  sql: { logo: "/logos/postgresql.svg", color: "#00758F" },
  hackathon: { logo: "/logos/hackathon.svg", color: "#2563EB" },
};

export const CONCEPT_MAP: Record<string, React.ReactNode> = {
  "rest apis": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M6 12h12M14 9l3 3-3 3" />
    </svg>
  ),
  oop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  "data structures": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" />
    </svg>
  ),
  "agile sdlc": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M21 12a9 9 0 11-3-6.7L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  ),
  debugging: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <rect x="7" y="8" width="10" height="12" rx="5" />
      <path d="M12 5V2M9 12H3M21 12h-6M4 7l3 2M20 7l-3 2M4 17l3-2M20 17l-3-2" />
    </svg>
  ),
  "query opt.": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  "ci/cd": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M4 12a8 8 0 0114.93-4M20 12a8 8 0 01-14.93 4" />
      <path d="M19 4v4h-4M5 20v-4h4" />
    </svg>
  ),
  "random forest": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M12 2l4 7h-3l4 7h-4v4h-2v-4H7l4-7H8l4-7z" />
    </svg>
  ),
};

export function isBrand(name: string): boolean {
  const key = name.toLowerCase().trim();
  return Boolean(BRAND_MAP[key]);
}

interface TechLogoProps {
  name: string;
  size?: number;
  className?: string;
  withGlow?: boolean;
}

export default function TechLogo({
  name,
  size = 48,
  className = "",
  withGlow = false,
}: TechLogoProps) {
  const key = name.toLowerCase().trim();
  const brand = BRAND_MAP[key];

  if (brand) {
    return (
      <div
        className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        {withGlow && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full blur-md opacity-30"
            style={{ backgroundColor: brand.color }}
          />
        )}
        <Image
          src={brand.logo}
          alt={`${name} logo`}
          width={size}
          height={size}
          className="relative z-10 w-full h-full object-contain"
        />
      </div>
    );
  }

  const concept = CONCEPT_MAP[key];
  if (concept) {
    return (
      <div
        className={`relative inline-flex items-center justify-center text-[var(--ink)] flex-shrink-0 ${className}`}
        style={{ width: size, height: size }}
        aria-label={`${name} concept icon`}
      >
        {concept}
      </div>
    );
  }

  // Fallback monogram
  return (
    <div
      className={`relative inline-flex items-center justify-center font-mono font-bold text-xs bg-[var(--soft)] rounded-md text-[var(--ink)] flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}
