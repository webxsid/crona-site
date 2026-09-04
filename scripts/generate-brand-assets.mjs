import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import sharp from "sharp";
import { execFile } from "node:child_process";

const run = promisify(execFile);

const root = process.cwd();
const outputDir = path.join(root, "public/brand/icons");

await fs.mkdir(outputDir, { recursive: true });

for (const variant of ["dark", "light"]) {
  const mark = path.join(root, `public/brand/marks/crona-${variant}.svg`);
  for (const size of [16, 32, 48, 256]) {
    await sharp(mark, { density: 144 })
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(outputDir, `crona-${variant}-${size}.png`));
  }
}

const icoSource = path.join(outputDir, "crona-app-icon-256.png");
await sharp(path.join(outputDir, "crona-dark-1024.png"))
  .resize(256, 256, { fit: "contain" })
  .png()
  .toFile(icoSource);

await run("ffmpeg", [
  "-hide_banner",
  "-loglevel",
  "error",
  "-y",
  "-i",
  icoSource,
  path.join(outputDir, "crona-favicon.ico"),
]);

console.log("Generated Crona light/dark favicon PNGs and Mac app-icon ICO in public/brand/icons.");
