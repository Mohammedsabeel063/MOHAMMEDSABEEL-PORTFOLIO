import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const interTight = localFont({
  src: [{ path: "../fonts/InterTight-Variable.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-inter-tight",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    { path: "../fonts/InstrumentSerif-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: [{ path: "../fonts/JetBrainsMono-Variable.woff2", weight: "100 800", style: "normal" }],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
};

export const metadata: Metadata = {
  title: "Mohammed Sabeel | Backend-focused Software Engineer",
  description: "Portfolio of Mohammed Sabeel — Backend-focused Software Engineer specialising in Python, FastAPI, Flask, PostgreSQL and machine learning. Based in Bengaluru, India.",
  keywords: ["Mohammed Sabeel", "Backend Engineer", "Python", "FastAPI", "Flask", "PostgreSQL", "Machine Learning", "Bengaluru"],
  authors: [{ name: "Mohammed Sabeel" }],
  creator: "Mohammed Sabeel",
  openGraph: {
    title: "Mohammed Sabeel | Backend-focused Software Engineer",
    description: "Portfolio of Mohammed Sabeel — Backend-focused Software Engineer.",
    url: "/",
    siteName: "Mohammed Sabeel Portfolio",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
