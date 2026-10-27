import { defaultCache } from "@serwist/next/worker";
import { CacheFirst, ExpirationPlugin, NetworkOnly, Serwist, StaleWhileRevalidate } from "serwist";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig { __SW_MANIFEST: (PrecacheEntry | string)[] | undefined }
}
declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: false, clientsClaim: true, navigationPreload: true,
  runtimeCaching: [
    { matcher: ({ url }) => /^\/(checkout|orders|admin|api)(\/|$)/.test(url.pathname), handler: new NetworkOnly() },
    { matcher: ({ request }) => request.destination === "image", handler: new CacheFirst({ cacheName: "deoluxe-images", plugins: [new ExpirationPlugin({ maxEntries: 150, maxAgeSeconds: 30 * 24 * 60 * 60 })] }) },
    { matcher: ({ request, url }) => request.destination === "document" && (["/", "/info", "/shop", "/search", "/favourites"].includes(url.pathname) || url.pathname.startsWith("/products/")), handler: new StaleWhileRevalidate({ cacheName: "deoluxe-pages" }) },
    ...defaultCache,
  ],
  fallbacks: { entries: [{ url: "/offline", matcher: ({ request }) => request.destination === "document" }] },
});
serwist.addEventListeners();
