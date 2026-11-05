import { defaultCache } from "@serwist/next/worker";
import { CacheFirst, ExpirationPlugin, NetworkFirst, NetworkOnly, Serwist } from "serwist";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig { __SW_MANIFEST: (PrecacheEntry | string)[] | undefined }
}
declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  // Runtime strategies perform their own network request. Disabling browser
  // navigation preload prevents an older in-flight document response from
  // committing after a newer offline navigation.
  skipWaiting: false, clientsClaim: true, navigationPreload: false,
  runtimeCaching: [
    { matcher: ({ url }) => /^\/(checkout|orders|admin|api)(\/|$)/.test(url.pathname), handler: new NetworkOnly() },
    { matcher: ({ request }) => request.destination === "image", handler: new CacheFirst({ cacheName: "deoluxe-images", plugins: [new ExpirationPlugin({ maxEntries: 150, maxAgeSeconds: 30 * 24 * 60 * 60 })] }) },
    {
      matcher: ({ request, url }) => request.destination === "document" && (["/", "/info", "/shop", "/search", "/favourites"].includes(url.pathname) || url.pathname.startsWith("/products/")),
      handler: new NetworkFirst({
        cacheName: "deoluxe-pages",
        networkTimeoutSeconds: 3,
        plugins: [new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 })],
      }),
    },
    ...defaultCache,
  ],
  fallbacks: { entries: [{ url: "/offline", matcher: ({ request }) => request.destination === "document" }] },
});
serwist.addEventListeners();
