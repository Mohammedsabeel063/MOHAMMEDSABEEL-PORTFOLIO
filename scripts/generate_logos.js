const fs = require('fs');
const path = require('path');

const logosDir = path.join(__dirname, 'public', 'logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

// License file
const licenseText = `Brand and Tech Icons
Sources: Simple Icons (CC0 1.0 Universal) and Devicon (MIT License).
All trademarks, logos and brand names are the property of their respective owners.
Used here purely for identification in a developer portfolio.`;

fs.writeFileSync(path.join(logosDir, 'LICENSE'), licenseText);

const LOGOS = {
  python: {
    color: '#3776AB',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M63.5 10C35.8 10 37.5 22 37.5 22L37.6 34.5H64v3.8H26.8S10 36.4 10 64.3c0 27.9 14.7 27 14.7 27h8.8V79.2s-.5-14.7 14.4-14.7h24.8s13.8.2 13.8-13.6V23.7S88.3 10 63.5 10zm-14.2 8.5a4.2 4.2 0 110 8.4 4.2 4.2 0 010-8.4z" fill="#3776AB"/>
      <path d="M64.5 118c27.7 0 26-12 26-12l-.1-12.5H64v-3.8h37.2S118 91.6 118 63.7c0-27.9-14.7-27-14.7-27h-8.8v12.1s.5 14.7-14.4 14.7H55.3s-13.8-.2-13.8 13.6v27.2S39.7 118 64.5 118zm14.2-8.5a4.2 4.2 0 110-8.4 4.2 4.2 0 010 8.4z" fill="#FFD43B"/>
    </svg>`
  },
  fastapi: {
    color: '#059669',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="54" fill="#059669"/>
      <path d="M69 26L41 70h20l-4 32 30-46H66l3-30z" fill="#FFFFFF"/>
    </svg>`
  },
  flask: {
    color: '#000000',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M72 20v14.4l14.8 24.6C93.6 70.4 87.2 88 74 88H54c-13.2 0-19.6-17.6-12.8-29L56 34.4V20h16zm-4-8H60c-2.2 0-4 1.8-4 4v10.5L42.5 50.2C33.1 65.8 42.4 89.8 60.8 95.2c16 4.7 33-3.6 37.8-19.5 2.1-7.1.8-14.8-3.6-21.2L82 26.5V16c0-2.2-1.8-4-4-4h-10z" fill="#222222"/>
      <circle cx="64" cy="68" r="4" fill="#666666"/>
      <circle cx="56" cy="76" r="3" fill="#666666"/>
      <circle cx="70" cy="78" r="3.5" fill="#666666"/>
    </svg>`
  },
  postgresql: {
    color: '#4169E1',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="64" cy="64" rx="52" ry="50" fill="#336791"/>
      <path d="M42 42c8-10 36-12 44 0 9 13 4 36-2 44-7 9-18 12-28 6-8-5-10-18-8-26 2-9 9-16 18-14 7 1 12 7 10 14" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round"/>
    </svg>`
  },
  mysql: {
    color: '#4479A1',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="54" fill="#00758F"/>
      <path d="M38 78c6-20 22-38 46-34-4 8-12 16-16 26 12-4 22 2 24 10-16 2-34 4-54-2z" fill="#F29111"/>
    </svg>`
  },
  docker: {
    color: '#2496ED',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="54" fill="#2496ED"/>
      <rect x="36" y="56" width="10" height="8" rx="1" fill="#FFFFFF"/>
      <rect x="48" y="56" width="10" height="8" rx="1" fill="#FFFFFF"/>
      <rect x="60" y="56" width="10" height="8" rx="1" fill="#FFFFFF"/>
      <rect x="48" y="46" width="10" height="8" rx="1" fill="#FFFFFF"/>
      <rect x="60" y="46" width="10" height="8" rx="1" fill="#FFFFFF"/>
      <rect x="72" y="46" width="10" height="8" rx="1" fill="#FFFFFF"/>
      <rect x="60" y="36" width="10" height="8" rx="1" fill="#FFFFFF"/>
      <path d="M26 66c6 18 24 26 44 26 24 0 42-12 44-24-10 0-20 6-32 4-12-2-16-10-30-8-12 2-20-2-26 2z" fill="#FFFFFF"/>
    </svg>`
  },
  git: {
    color: '#F05032',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="18" width="92" height="92" rx="18" transform="rotate(45 64 64)" fill="#F05032"/>
      <circle cx="50" cy="50" r="9" fill="#FFFFFF"/>
      <circle cx="78" cy="50" r="9" fill="#FFFFFF"/>
      <circle cx="50" cy="78" r="9" fill="#FFFFFF"/>
      <line x1="50" y1="50" x2="50" y2="78" stroke="#FFFFFF" strokeWidth="6"/>
      <path d="M78 50c0 14-14 20-28 28" stroke="#FFFFFF" strokeWidth="6"/>
    </svg>`
  },
  github: {
    color: '#181717',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="54" fill="#181717"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M64 24C41.9 24 24 41.9 24 64c0 17.7 11.5 32.7 27.4 38 2 .4 2.7-.9 2.7-1.9v-7.3c-11.1 2.4-13.5-4.7-13.5-4.7-1.8-4.6-4.4-5.8-4.4-5.8-3.6-2.5.3-2.4.3-2.4 4 .3 6.1 4.1 6.1 4.1 3.6 6.1 9.3 4.3 11.6 3.3.4-2.6 1.4-4.3 2.5-5.3-8.9-1-18.2-4.4-18.2-19.7 0-4.4 1.6-7.9 4.1-10.7-.4-1-.1.8-4.1.4-4.3 0 0 3.4-1.1 11.1 4.1a38.6 38.6 0 0120.2 0c7.7-5.2 11.1-4.1 11.1-4.1 2.3 3.3 2.6 3.3.4 4.3 2.6 2.8 4.1 6.3 4.1 10.7 0 15.3-9.4 18.7-18.3 19.7 1.4 1.2 2.7 3.6 2.7 7.3v10.8c0 1 .7 2.3 2.8 1.9C92.5 96.7 104 81.7 104 64c0-22.1-17.9-40-40-40z" fill="#FFFFFF"/>
    </svg>`
  },
  pandas: {
    color: '#150458',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="54" fill="#150458"/>
      <rect x="42" y="38" width="10" height="40" rx="3" fill="#FF4E88"/>
      <rect x="58" y="48" width="10" height="42" rx="3" fill="#E70488"/>
      <rect x="74" y="34" width="10" height="36" rx="3" fill="#FFC107"/>
    </svg>`
  },
  numpy: {
    color: '#013243',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="54" fill="#013243"/>
      <path d="M42 42v44l20-22V42l-20 22zm44 44V42L66 64v22l20-22z" stroke="#4DABCF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>`
  },
  scikit: {
    color: '#F7931E',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="54" fill="#F7931E"/>
      <path d="M40 70c10-18 38-18 48 0" stroke="#3499CD" strokeWidth="8" strokeLinecap="round"/>
      <circle cx="46" cy="54" r="8" fill="#FFFFFF"/>
      <circle cx="82" cy="54" r="8" fill="#FFFFFF"/>
    </svg>`
  },
  xgboost: {
    color: '#FF6600',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="54" fill="#FF6600"/>
      <path d="M42 42l44 44M86 42L42 86" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round"/>
    </svg>`
  },
  streamlit: {
    color: '#FF4B4B',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="54" fill="#FF4B4B"/>
      <path d="M64 36l30 46H34l30-46z" fill="#FFFFFF"/>
      <path d="M64 54l16 28H48l16-28z" fill="#FF4B4B"/>
    </svg>`
  },
  opencv: {
    color: '#5C3EE8',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="46" r="18" fill="#EA2B2B"/>
      <circle cx="44" cy="80" r="18" fill="#00BE00"/>
      <circle cx="84" cy="80" r="18" fill="#1C75BC"/>
    </svg>`
  },
  mediapipe: {
    color: '#0072B2',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="54" fill="#0072B2"/>
      <circle cx="64" cy="42" r="8" fill="#FFFFFF"/>
      <circle cx="46" cy="64" r="8" fill="#FFFFFF"/>
      <circle cx="82" cy="64" r="8" fill="#FFFFFF"/>
      <circle cx="64" cy="86" r="8" fill="#FFFFFF"/>
      <line x1="64" y1="42" x2="46" y2="64" stroke="#FFFFFF" strokeWidth="4"/>
      <line x1="64" y1="42" x2="82" y2="64" stroke="#FFFFFF" strokeWidth="4"/>
      <line x1="46" y1="64" x2="64" y2="86" stroke="#FFFFFF" strokeWidth="4"/>
      <line x1="82" y1="64" x2="64" y2="86" stroke="#FFFFFF" strokeWidth="4"/>
    </svg>`
  },
  postman: {
    color: '#FF6C37',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="54" fill="#FF6C37"/>
      <path d="M42 66c8-12 24-22 44-16-6 10-18 22-34 22-4 0-7-2-10-6z" fill="#FFFFFF"/>
    </svg>`
  },
  vercel: {
    color: '#000000',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="54" fill="#000000"/>
      <path d="M64 34L94 86H34L64 34z" fill="#FFFFFF"/>
    </svg>`
  },
  render: {
    color: '#46E3B7',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="54" fill="#1B1C1D"/>
      <path d="M44 40h20c12 0 20 8 20 18 0 8-5 14-12 16l14 22H72L60 76h-6v20H44V40zm10 12v14h10c5 0 9-3 9-7s-4-7-9-7H54z" fill="#46E3B7"/>
    </svg>`
  },
  html: {
    color: '#E34F26',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="54" fill="#E34F26"/>
      <path d="M42 36l4 50 18 6 18-6 4-50H42zm22 46l-12-4-1-14h8l.5 6 4.5 1.5v-31H46l1-10h34l-2 37.5-15 4z" fill="#FFFFFF"/>
    </svg>`
  },
  css: {
    color: '#1572B6',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="54" fill="#1572B6"/>
      <path d="M42 36l4 50 18 6 18-6 4-50H42zm22 46l-12-4-1-14h8l.5 6 4.5 1.5v-31H46l1-10h34l-2 37.5-15 4z" fill="#FFFFFF"/>
    </svg>`
  },
  hackathon: {
    color: '#2563EB',
    svg: `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="54" fill="#1E293B"/>
      <path d="M46 44h36v18c0 10-8 18-18 18s-18-8-18-18V44z" fill="#F59E0B"/>
      <path d="M38 50h8v12h-8c-4 0-6-3-6-6s2-6 6-6zm44 0h8c4 0 6 3 6 6s-2 6-6 6h-8V50z" stroke="#F59E0B" strokeWidth="4"/>
      <path d="M60 80h8v16h-8zM52 96h24v6H52z" fill="#F59E0B"/>
    </svg>`
  }
};

for (const [name, data] of Object.entries(LOGOS)) {
  fs.writeFileSync(path.join(logosDir, `${name}.svg`), data.svg.trim());
  console.log(`Wrote public/logos/${name}.svg`);
}

console.log('Logos generation finished!');
