import { mkdir, readFile, writeFile, copyFile } from "node:fs/promises";
import sharp from "sharp";

const products = {
  "tee-black": "assets/incoming/products/products-blackboy-03.jpg",
  "tee-white": "assets/incoming/products/products-blackboy-02.jpg",
  "tee-red": "assets/incoming/products/products-blackboy-01.jpg",
  velvet: "assets/incoming/products/products-velvet-aura-01.jpg",
  "velvet-detail": "assets/incoming/products/products-velvet-aura-02.jpg",
  eclipse: "assets/incoming/products/products-eclipse-01.jpg",
  "eclipse-back": "assets/incoming/products/products-eclipse-03.jpg",
  "cap-black": "assets/processed/products/products-statement-cap-black-cutout-v1.png",
  "cap-green": "assets/processed/products/products-statement-cap-green-cutout-v1.png",
  "cap-maroon": "assets/concepts/products/concept-cap-wine-maroon-01.png",
  "cap-navy": "assets/concepts/products/concept-cap-midnight-navy-01.png",
  "tee-ivory": "assets/concepts/products/concept-tee-warm-ivory-01.png",
  "tee-forest": "assets/concepts/products/concept-tee-forest-green-01.png",
};
await Promise.all(["public/images/products", "public/images/editorial", "public/images/brand", "public/icons", "src/fonts"].map(p => mkdir(p, { recursive: true })));
const records = [];
for (const [name, source] of Object.entries(products)) {
  let buffer;
  optimisation: for (const width of [960, 768, 640]) {
    for (const quality of [78, 72, 66, 60]) {
      buffer = await sharp(source).rotate().resize({ width, withoutEnlargement: true }).webp({ quality, effort: 6 }).toBuffer();
      if (buffer.length <= 120_000) break optimisation;
    }
  }
  if (buffer.length > 120_000) throw new Error(`${name} exceeds the 120KB product image budget`);
  const destination = `public/images/products/${name}.webp`;
  await writeFile(destination, buffer);
  records.push({ source, destination, bytes: buffer.length });
}
for (const [name, source] of Object.entries({ campaign: "assets/incoming/hero/hero-velvet-campaign-01.jpg", studio: "assets/incoming/editorial/editorial-blackboy-studio-01.jpg" })) {
  const destination = `public/images/editorial/${name}.webp`;
  const buffer = await sharp(source).rotate().resize({ width: 1440, withoutEnlargement: true }).webp({ quality: 78, effort: 6 }).toBuffer();
  await writeFile(destination, buffer); records.push({ source, destination, bytes: buffer.length });
}
for (const colour of ["maroon", "white"]) await copyFile(`assets/brand/deoluxe-logo-transparent-${colour}-v3.png`, `public/images/brand/logo-${colour}.png`);
// App icons intentionally use a maroon install-tile surface; storefront logo marks stay transparent.
for (const [name, size, ratio] of [["icon-192", 192, .6], ["icon-512", 512, .6], ["icon-maskable-512", 512, .55], ["apple-touch-icon", 180, .6]]) {
  const mark = await sharp("assets/brand/deoluxe-logo-transparent-white-v3.png").resize({ width: Math.round(size * ratio), height: Math.round(size * ratio), fit: "inside" }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: "#650a09" } }).composite([{ input: mark, gravity: "centre" }]).png().toFile(`public/icons/${name}.png`);
}
await copyFile("node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2", "src/fonts/inter-latin.woff2");
await copyFile("node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2", "src/fonts/playfair-latin.woff2");
await copyFile("node_modules/@fontsource-variable/inter/LICENSE", "src/fonts/Inter-LICENSE.txt");
await copyFile("node_modules/@fontsource-variable/playfair-display/LICENSE", "src/fonts/Playfair-Display-LICENSE.txt");
await writeFile("assets/OPTIMISED_MANIFEST.json", JSON.stringify(records, null, 2) + "\n");
// Read the original manifest so this script fails clearly if run outside the project root.
await readFile("assets/ASSET_MANIFEST.md", "utf8");
console.log(`Prepared ${records.length} local WebP assets, transparent brand marks, PWA icons and local fonts.`);
