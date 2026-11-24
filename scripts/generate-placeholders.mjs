// Renders abstract placeholder "photos" into src/assets/photos/.
// They're generated art (gradients, horizons, soft light), not real photos,
// so the template ships with no copyrighted images. Replace them with your own work.
//
//   pnpm placeholders
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const out = new URL("../src/assets/photos/", import.meta.url);
await mkdir(out, { recursive: true });

// Small seeded random so every run makes the same images.
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

const SIZES = {
  landscape: [1800, 1200],
  portrait: [1200, 1800],
  square: [1500, 1500],
  wide: [1800, 1013],
};

const grain = (seed, opacity = 0.12) => `
  <filter id="grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${seed}" result="n"/>
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer><feFuncA type="table" tableValues="0 ${opacity}"/></feComponentTransfer>
  </filter>`;

function horizon(w, h, r, p) {
  const line = h * (0.45 + r() * 0.2);
  const sunX = w * (0.25 + r() * 0.5);
  const sunY = line - h * (0.05 + r() * 0.15);
  return `
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[1]}"/>
      </linearGradient>
      <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${p[2]}"/><stop offset="1" stop-color="${p[3]}"/>
      </linearGradient>
      <filter id="blur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="${w * 0.03}"/></filter>
      <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${w * 0.004}"/></filter>
      ${grain(Math.floor(r() * 100))}
    </defs>
    <rect width="${w}" height="${h}" fill="url(#sky)"/>
    <circle cx="${sunX}" cy="${sunY}" r="${w * 0.12}" fill="${p[4]}" opacity=".55" filter="url(#blur)"/>
    <circle cx="${sunX}" cy="${sunY}" r="${w * 0.035}" fill="${p[4]}" opacity=".9" filter="url(#soft)"/>
    <rect y="${line}" width="${w}" height="${h - line}" fill="url(#sea)"/>
    <rect x="${sunX - w * 0.06}" y="${line}" width="${w * 0.12}" height="${h - line}" fill="${p[4]}" opacity=".12" filter="url(#blur)"/>
    <rect y="${line - 1}" width="${w}" height="3" fill="${p[4]}" opacity=".35" filter="url(#soft)"/>
    <rect width="${w}" height="${h}" filter="url(#grain)"/>`;
}

function dunes(w, h, r, p) {
  let layers = "";
  const n = 4;
  for (let i = 0; i < n; i++) {
    const base = h * (0.35 + i * 0.17);
    const a = base - h * (0.05 + r() * 0.12);
    const b = base + h * (r() * 0.1);
    layers += `<path d="M0 ${base} C ${w * 0.3} ${a}, ${w * 0.55} ${b}, ${w} ${base - h * 0.06 * r()} V ${h} H 0 Z" fill="url(#d${i})"/>`;
  }
  const grads = [0, 1, 2, 3]
    .map(
      (i) => `<linearGradient id="d${i}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${p[i + 1]}"/><stop offset="1" stop-color="${p[Math.min(i + 2, 4)]}"/>
      </linearGradient>`,
    )
    .join("");
  return `
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[1]}"/>
      </linearGradient>
      ${grads}
      <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${w * 0.002}"/></filter>
      ${grain(Math.floor(r() * 100), 0.14)}
    </defs>
    <rect width="${w}" height="${h}" fill="url(#sky)"/>
    <g filter="url(#soft)">${layers}</g>
    <rect width="${w}" height="${h}" filter="url(#grain)"/>`;
}

function interior(w, h, r, p) {
  const x = w * (0.15 + r() * 0.35);
  const y = h * (0.1 + r() * 0.2);
  const ww = w * (0.25 + r() * 0.2);
  const wh = h * (0.4 + r() * 0.2);
  const skew = w * (0.08 + r() * 0.1);
  return `
    <defs>
      <linearGradient id="wall" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[1]}"/>
      </linearGradient>
      <linearGradient id="light" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${p[4]}" stop-opacity=".95"/><stop offset="1" stop-color="${p[4]}" stop-opacity=".45"/>
      </linearGradient>
      <filter id="blur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="${w * 0.012}"/></filter>
      ${grain(Math.floor(r() * 100), 0.1)}
    </defs>
    <rect width="${w}" height="${h}" fill="url(#wall)"/>
    <rect y="${h * 0.78}" width="${w}" height="${h * 0.22}" fill="${p[2]}"/>
    <g filter="url(#blur)">
      <path d="M${x} ${y} h${ww} l${skew} ${wh} h-${ww} z" fill="url(#light)"/>
      <rect x="${x + ww * 0.48}" y="${y}" width="${ww * 0.05}" height="${wh}" fill="${p[1]}" transform="skewX(${(Math.atan(skew / wh) * 180) / Math.PI})" transform-origin="${x} ${y}"/>
      <path d="M${x + skew} ${h * 0.78} h${ww * 1.2} l${skew * 1.6} ${h * 0.22} h-${ww * 1.3} z" fill="${p[4]}" opacity=".35"/>
    </g>
    <circle cx="${w * (0.7 + r() * 0.15)}" cy="${h * 0.7}" r="${w * 0.06}" fill="${p[3]}" opacity=".85" filter="url(#blur)"/>
    <rect width="${w}" height="${h}" filter="url(#grain)"/>`;
}

function shadow(w, h, r, p) {
  let blobs = "";
  for (let i = 0; i < 3; i++) {
    blobs += `<ellipse cx="${w * (0.2 + r() * 0.6)}" cy="${h * (0.25 + r() * 0.55)}" rx="${w * (0.14 + r() * 0.18)}" ry="${h * (0.12 + r() * 0.22)}" fill="${p[2 + i]}" opacity="${0.55 + r() * 0.35}"/>`;
  }
  return `
    <defs>
      <radialGradient id="bg" cx="${30 + r() * 40}%" cy="${30 + r() * 30}%" r="80%">
        <stop offset="0" stop-color="${p[1]}"/><stop offset="1" stop-color="${p[0]}"/>
      </radialGradient>
      <filter id="blur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="${w * 0.045}"/></filter>
      ${grain(Math.floor(r() * 100), 0.3)}
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <g filter="url(#blur)">${blobs}</g>
    <rect width="${w}" height="${h}" filter="url(#grain)"/>`;
}

const palettes = {
  coast: [
    ["#c9d3d8", "#eadfd2", "#7f95a0", "#3c4f5a", "#fff4e2"],
    ["#33414d", "#a1867a", "#2c3a44", "#11191f", "#ffd9b0"],
    ["#dfe6e8", "#f3efe8", "#a9b8be", "#6f8590", "#ffffff"],
    ["#151d26", "#3d4a5c", "#1b2530", "#090d12", "#c9d6e6"],
    ["#e8d6cc", "#f4e9df", "#b39c92", "#7a6862", "#fff1e0"],
    ["#9fb0b8", "#d9dcd6", "#56707c", "#26343c", "#f8f2e6"],
  ],
  desert: [
    ["#f1e2cf", "#e6c7a1", "#d19a66", "#a86a3d", "#6e4024"],
    ["#e9d9cc", "#d9b7a0", "#bf8f73", "#8f5f48", "#5a382a"],
    ["#2a2230", "#5d4152", "#8a5a52", "#b07a58", "#d6a676"],
    ["#f4ece2", "#e2d3bf", "#c8b195", "#a68d70", "#7d6851"],
    ["#efd8c4", "#e0b088", "#c98a5c", "#9b5c38", "#5e3420"],
  ],
  interior: [
    ["#d9cfc3", "#bfb2a4", "#8d8174", "#4f4a44", "#fff6e6"],
    ["#c7c2bb", "#a9a39b", "#6d6862", "#3c3936", "#fdf3e1"],
    ["#e4dbd0", "#cbbfb1", "#9e9284", "#5f6b5c", "#ffffff"],
    ["#b8ada3", "#958a80", "#5c544d", "#2f2c2a", "#ffe9c9"],
    ["#ddd6cf", "#c4bab0", "#827c76", "#7a5c4a", "#fffaf2"],
  ],
  shadow: [
    ["#0d0d0f", "#2a2a2e", "#5c5c62", "#8e8a86", "#3b3b40"],
    ["#111013", "#30282a", "#7a5f58", "#b89a8c", "#4a3a38"],
    ["#0b0c0e", "#22262b", "#4f5b66", "#9aa5ad", "#2f353b"],
    ["#141214", "#3a3436", "#6a6466", "#c2bbb8", "#28242a"],
    ["#0e0e0e", "#262626", "#505050", "#a0a0a0", "#3a3a3a"],
  ],
};

const plan = [
  ...palettes.coast.map((p, i) => ({ file: `coast-${i + 1}`, fn: horizon, p, size: ["wide", "landscape", "portrait", "landscape", "square", "wide"][i] })),
  ...palettes.desert.map((p, i) => ({ file: `desert-${i + 1}`, fn: dunes, p, size: ["landscape", "portrait", "wide", "square", "landscape"][i] })),
  ...palettes.interior.map((p, i) => ({ file: `interior-${i + 1}`, fn: interior, p, size: ["portrait", "landscape", "square", "portrait", "landscape"][i] })),
  ...palettes.shadow.map((p, i) => ({ file: `shadow-${i + 1}`, fn: shadow, p, size: ["portrait", "square", "portrait", "landscape", "portrait"][i] })),
];

let seed = 7;
for (const item of plan) {
  const [w, h] = SIZES[item.size];
  const r = rng(seed++ * 977);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${item.fn(w, h, r, item.p)}</svg>`;
  const path = new URL(`${item.file}.jpg`, out);
  const info = await sharp(Buffer.from(svg)).jpeg({ quality: 92, chromaSubsampling: "4:4:4", mozjpeg: true }).toFile(path.pathname);
  console.log(`${item.file}.jpg ${w}x${h} ${Math.round(info.size / 1024)} KB`);
}
