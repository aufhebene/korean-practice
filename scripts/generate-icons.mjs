import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const outDir = resolve(projectRoot, "assets");
await mkdir(outDir, { recursive: true });

// Brand colors
const PURPLE = { r: 167, g: 139, b: 250, alpha: 1 }; // #a78bfa
const PURPLE_HEX = "#a78bfa";
const WHITE_HEX = "#FFFFFF";

const FONT_FAMILY = "Apple SD Gothic Neo";
const FONT_FILE = "/System/Library/Fonts/AppleSDGothicNeo.ttc";

async function renderText(text, { size, color, weight = "bold" }) {
  return sharp({
    text: {
      text: `<span foreground="${color}" weight="${weight}">${text}</span>`,
      font: FONT_FAMILY,
      fontfile: FONT_FILE,
      width: size,
      height: size,
      rgba: true,
      align: "center",
    },
  })
    .png()
    .toBuffer();
}

// 1) icon-only.png (1024x1024) — full bleed icon with background
async function buildIconOnly() {
  const SIZE = 1024;
  const TEXT_SIZE = 720;
  const text = await renderText("한", { size: TEXT_SIZE, color: WHITE_HEX });
  const path = resolve(outDir, "icon-only.png");
  await sharp({
    create: {
      width: SIZE,
      height: SIZE,
      channels: 4,
      background: PURPLE,
    },
  })
    .composite([{ input: text, gravity: "center" }])
    .png()
    .toFile(path);
  console.log(`✓ ${path}`);
}

// 2) icon-foreground.png (1024x1024) — Android adaptive foreground (with safe area)
//    Adaptive icons crop to ~66% of the canvas, so keep the glyph small.
async function buildIconForeground() {
  const SIZE = 1024;
  const TEXT_SIZE = 480; // smaller — fits inside adaptive icon mask
  const text = await renderText("한", { size: TEXT_SIZE, color: WHITE_HEX });
  const path = resolve(outDir, "icon-foreground.png");
  await sharp({
    create: {
      width: SIZE,
      height: SIZE,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: text, gravity: "center" }])
    .png()
    .toFile(path);
  console.log(`✓ ${path}`);
}

// 3) icon-background.png (1024x1024) — solid brand purple
async function buildIconBackground() {
  const SIZE = 1024;
  const path = resolve(outDir, "icon-background.png");
  await sharp({
    create: {
      width: SIZE,
      height: SIZE,
      channels: 4,
      background: PURPLE,
    },
  })
    .png()
    .toFile(path);
  console.log(`✓ ${path}`);
}

// 4) splash.png (2732x2732) — light splash with centered logo only
async function buildSplash() {
  const SIZE = 2732;
  const TEXT_SIZE = 900;
  const text = await renderText("한", { size: TEXT_SIZE, color: WHITE_HEX });
  const path = resolve(outDir, "splash.png");
  await sharp({
    create: {
      width: SIZE,
      height: SIZE,
      channels: 4,
      background: PURPLE,
    },
  })
    .composite([{ input: text, gravity: "center" }])
    .png()
    .toFile(path);
  console.log(`✓ ${path}`);
}

// 5) splash-dark.png (2732x2732) — same purple (no dark variant for now,
//    but providing prevents a generation warning)
async function buildSplashDark() {
  const SIZE = 2732;
  const TEXT_SIZE = 700;
  const text = await renderText("한", { size: TEXT_SIZE, color: WHITE_HEX });
  const path = resolve(outDir, "splash-dark.png");
  await sharp({
    create: {
      width: SIZE,
      height: SIZE,
      channels: 4,
      background: { r: 91, g: 33, b: 182, alpha: 1 }, // deeper purple #5b21b6
    },
  })
    .composite([{ input: text, gravity: "center" }])
    .png()
    .toFile(path);
  console.log(`✓ ${path}`);
}

await buildIconOnly();
await buildIconForeground();
await buildIconBackground();
await buildSplash();
await buildSplashDark();
console.log("\n✅ All assets generated in assets/");
