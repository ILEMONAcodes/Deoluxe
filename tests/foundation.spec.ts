import { test, expect } from "@playwright/test";
import { gzipSync } from "node:zlib";
import { formatNaira } from "../src/lib/money";

test("renders the approved foundation at each breakpoint", async ({ page }, testInfo) => {
  const errors: string[] = [];
  const scripts = new Map<string, Buffer>();
  const pendingScripts: Promise<void>[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("response", response => {
    if (response.url().includes("/_next/static/") && response.url().split("?")[0].endsWith(".js")) {
      pendingScripts.push(response.body().then(body => { scripts.set(response.url(), body); }).catch(() => {}));
    }
  });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".hero")).toBeVisible();
  await expect(page.getByRole("heading", { name: "The current rotation" })).toBeVisible();
  await page.locator("#colour-studies").scrollIntoViewIfNeeded();
  await expect(page.locator("#colour-studies .product-card")).toHaveCount(4);
  await expect(page.locator("#colour-studies")).toContainText("proposed colourways");
  await expect(page.locator("#colour-studies .product-price")).toHaveText(Array(4).fill("Colour concept"));
  await page.locator(".editorial-image").scrollIntoViewIfNeeded();
  if (await page.locator(".site-footer").isVisible()) await page.locator(".site-footer").scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => [...document.images].filter(img => img.getClientRects().length > 0).every(img => img.complete && img.naturalWidth > 0))).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  const allImagesHaveAlt = await page.evaluate(() => [...document.images].every(img => img.hasAttribute("alt")));
  expect(allImagesHaveAlt).toBe(true);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.screenshot({ path: `test-results/home-${testInfo.project.name}.png`, fullPage: true });
  await Promise.all(pendingScripts);
  const jsGzip = [...scripts.values()].reduce((total, body) => total + gzipSync(body).length, 0);
  await testInfo.attach("home-js-gzip", { body: JSON.stringify({ bytes: jsGzip, budget: 150 * 1024 }), contentType: "application/json" });
  expect(jsGzip).toBeLessThanOrEqual(150 * 1024);
  expect(errors).toEqual([]);
});

test("manifest and cached pages work offline; sensitive routes stay out of caches", async ({ page, context }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "One production worker test covers the shared shell");
  const response = await page.request.get("/manifest.webmanifest");
  const manifest = await response.json();
  expect(manifest.name).toBe("Deoluxe");
  expect(manifest.icons.some((icon: { purpose: string }) => icon.purpose === "maskable")).toBe(true);
  await page.goto("/");
  await page.evaluate(() => navigator.serviceWorker.ready);
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);
  await page.reload();
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => fetch("/orders", { cache: "no-store" }).then(response => response.status));
  const sensitiveCached = await page.evaluate(async () => {
    const requests = (await Promise.all((await caches.keys()).map(async name => (await caches.open(name)).keys()))).flat();
    return requests.some(request => /^\/(checkout|orders|admin|api)(\/|$)/.test(new URL(request.url).pathname));
  });
  expect(sensitiveCached).toBe(false);
  await context.setOffline(true);
  // Current Chromium separates request failure emulation from navigator.onLine.
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.overrideNetworkState", { offline: true, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
  await expect(page.getByRole("status")).toContainText("You’re offline");
  await page.goto("/");
  await expect(page.locator(".hero")).toBeVisible();
  await page.goto("/not-previously-visited");
  await expect(page.getByRole("heading", { name: "You’re offline." })).toBeVisible();
});

test("integer-kobo formatting rejects unsafe money inputs", () => {
  expect(formatNaira(3500000)).toBe("₦35,000");
  expect(formatNaira(0)).toBe("₦0");
  expect(() => formatNaira(0.5)).toThrow(RangeError);
  expect(() => formatNaira(-1)).toThrow(RangeError);
});
