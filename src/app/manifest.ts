import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest { return {
  name: "Deoluxe", short_name: "Deoluxe", description: "Wear the statement.",
  start_url: "/?source=pwa", scope: "/", display: "standalone", orientation: "portrait",
  theme_color: "#650a09", background_color: "#650a09", lang: "en-NG",
  icons: [
    { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
    { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
  ],
}; }
