import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import withSerwistInit from "@serwist/next";

const revision = createHash("sha256").update(readFileSync("src/app/offline/page.tsx")).digest("hex");
const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV !== "production",
  register: false,
  additionalPrecacheEntries: [{ url: "/offline", revision }],
});

export default withSerwist({
  devIndicators: false,
  images: { formats: ["image/avif", "image/webp"] },
});
