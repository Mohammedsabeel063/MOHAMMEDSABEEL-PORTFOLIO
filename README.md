# Mohammed Sabeel — Personal Portfolio

A production-ready personal portfolio website for **Mohammed Sabeel**, Backend-focused Software Engineer based in Bengaluru, India.

Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, and Lenis smooth scrolling. Designed following minimalist, editorial Awwwards-inspired principles (quiet monochrome palette: white, black, and gray).

---

## 1. Quick Start

### Prerequisites
- Node.js 18+ (tested with Node 22)
- npm 9+

### Installation & Development
```bash
# Navigate to the portfolio directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

---

## 2. Sections Table

| Order | Section | Component | Description & Key Features |
|:---:|:---|:---|:---|
| 0.0 | **Navigation** | `Navigation.tsx` | Fixed header with spinning initials monogram, sliding active indicator pill, top progress bar, and mobile full-screen overlay. |
| 01 | **Hero** | `Hero.tsx` | Full-height video hero featuring Mohammed Sabeel with `mix-blend-mode: multiply`, background uppercase ghost text, autoplay with gesture audio unlock, and ▶/❚❚ sound toggle. |
| 02 | **About** | `About.tsx` | Responsive 3-column layout featuring an interactive hanging lanyard ID card with realistic pendulum motion, 3D flip, barcode, and quick facts verbatim from résumé. |
| 03 | **Skills** | `Skills.tsx` | "The Periodic Table of My Stack": 8-column element tile grid with atomic numbers, family filters, diagonal wave entrance, and sticky 320px inspector panel featuring 150px pop logo animation. |
| 04 | **Work** | `Work.tsx` | Expanding accordion project gallery (`flex: 8` active, folding slim spines for inactive), tech badges with micro-logos, links to live demos/repos, and grayscale illustrative UI previews. |
| 05 | **Certifications** | `Certifications.tsx` | Ink-flood index on white band: sticky left heading and numbered certification cards with interactive ink-flood hover transition (`scaleX: 0 -> 1`) and sliding ↗ arrow. |
| 06 | **Experience** | `Experience.tsx` | Unified chronological path combining education and internships. Features a scroll-drawn spine that illuminates milestone nodes dynamically and ends with "Next — Your team?". |
| 07 | **Achievements** | `Achievements.tsx` | Pinned horizontal gallery with horizontal scroll travel, 72px platform logo tiles with soft glow, and `easeOutQuart` animated counter metrics (e.g. 36 hrs, 50k+ records, 91% accuracy). |
| 08 | **Contact & Footer**| `Contact.tsx` | Bouncing letter hover animation for "Let's build something together", one-click email copy button with `aria-live`, phone, GitHub, LinkedIn links, circular spinning badge, and back-to-top button. |

---

## 3. How to Rebuild the Hero Video Pipeline

The video pipeline script is located at `scripts/build-hero-assets.py`. It requires `ffmpeg` and `numpy`.

```bash
python scripts/build-hero-assets.py --input "path/to/intro.mp4" --output "public/hero"
```

### What the pipeline does:
1. **Centering & Crop**: Crops tightly around the speaker (default `crop=800:1000:560:80`) and scales to 768 px wide.
2. **Backdrop Whitening**: Applies `colorlevels=rimax=0.98:gimax=0.98:bimax=0.98` so off-white backgrounds blend seamlessly into `--paper` (#f4f2ee).
3. **Seamless Loop**: Cross-fades the head and tail of both video and audio.
4. **Dual Output**: Generates both `hero.webm` (VP9 / Opus) and `hero.mp4` (H.264 / AAC).

---

## 4. Brand Logos & Licenses

Brand and tech logos are located in `public/logos/` and rendered via `TechLogo.tsx`.

- **Simple Icons**: Released under the [CC0 1.0 Universal License](https://creativecommons.org/publicdomain/zero/1.0/).
- **Devicon**: Released under the [MIT License](https://github.com/devicons/devicon/blob/master/LICENSE).
- All logos and brand trademarks belong to their respective copyright holders and are used solely for technology identification purposes. See `public/logos/LICENSE` for details.

---

## 5. Design System Tokens

Defined in `src/app/globals.css`:
- `--paper`: `#f4f2ee` (warm off-white page background)
- `--card`: `#ffffff` (card surface)
- `--ink`: `#0d0d0d` (primary text, solid buttons)
- `--ink-2`: `#3a3a3a` (body text)
- `--mute`: `#77756f` (subtitles, mono labels)
- `--faint`: `#a9a6a0` (subtle borders & numbers)
- `--line`: `rgba(13, 13, 13, 0.1)` (hairlines)
- `--soft`: `#e9e6e0` (neutral badge surface)
- `--ease`: `cubic-bezier(.16, 1, .3, 1)` (fluid easing for all interactions)
