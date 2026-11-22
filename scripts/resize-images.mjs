// Creates a 720px-wide copy (<name>-720.webp) of every project screenshot,
// so phones download about half the bytes. Run after adding or replacing a print:
//   npm run images
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const dir = path.join(process.cwd(), "public", "projects");
const files = (await readdir(dir)).filter((f) => f.endsWith(".webp") && !f.endsWith("-720.webp"));

let made = 0;
for (const file of files) {
  const src = path.join(dir, file);
  const out = path.join(dir, file.replace(/\.webp$/, "-720.webp"));
  // Skip when the small copy exists and is newer than the original.
  const outTime = await stat(out).then((s) => s.mtimeMs, () => 0);
  if (outTime >= (await stat(src)).mtimeMs) continue;
  await sharp(src).resize({ width: 720 }).webp({ quality: 78, effort: 6 }).toFile(out);
  made++;
}
console.log(`${made} imagem(ns) de 720px gerada(s), ${files.length - made} já estavam em dia.`);
