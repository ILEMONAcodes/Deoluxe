import { test, expect } from "@playwright/test";

test("catalogue filters, URL state, sorting, search and empty state", async ({ page }, info) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/shop");
  await expect(page.getByRole("heading", { name: "The collection." })).toBeVisible();
  await expect(page.locator(".product-card")).toHaveCount(11);
  await expect(page.locator(".concept-grid .product-card")).toHaveCount(4);
  await page.evaluate(() => document.fonts.ready);
  await expect.poll(() => page.locator(".concept-grid img").evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
  await page.screenshot({ path: `test-results/catalogue-${info.project.name}.png` });
  if (info.project.name === "desktop") {
    await page.getByRole("radio", { name: "Caps", exact: true }).check();
  } else {
    await page.getByRole("button", { name: "Open filters" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.screenshot({ path: `test-results/filters-${info.project.name}.png` });
    await page.getByRole("radio", { name: "Caps", exact: true }).check();
    await page.getByRole("button", { name: "Show pieces", exact: true }).click();
  }
  await expect(page).toHaveURL(/category=Caps/);
  await expect(page.locator(".product-card")).toHaveCount(4);
  await page.reload();
  await expect(page.locator(".product-card")).toHaveCount(4);
  await page.goto("/shop?sort=price-low&max=40000");
  await expect(page.locator(".product-card")).toHaveCount(4);
  await page.goto("/search");
  await page.getByRole("searchbox", { name: "Search pieces" }).fill("Velvet");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await expect(page.locator(".product-card")).toContainText("Velvet Aura Set");
  await page.getByRole("searchbox").fill("zzzz-no-such-piece");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Nothing here yet." })).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.getByRole("heading", { name: "Find your statement." })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test("product gallery, size validation, preview selection and persistent favourites", async ({ page }, info) => {
  const errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
  await page.goto("/products/blackboy-black");
  await expect(page.getByRole("heading", { name: "BlackBoy Set", exact: true, level: 1 })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await expect.poll(() => page.locator(".gallery-main img").evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await page.screenshot({ path: `test-results/product-${info.project.name}.png` });
  const action = info.project.name === "mobile" ? page.locator(".product-purchase-bar button") : page.locator(".product-primary");
  await action.click();
  await expect(page.locator("#size-error")).toHaveText("Select your size to continue.");
  await page.getByRole("button", { name: "White", exact: true }).click();
  await expect(page.locator(".gallery-main img")).toHaveAttribute("alt", /White Deoluxe/);
  await page.getByRole("button", { name: "Size guide", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("official garment measurements");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Size guide", exact: true })).toBeFocused();
  await page.getByRole("group", { name: "Choose size" }).getByRole("button", { name: "L", exact: true }).click();
  await action.click();
  await expect(page.getByRole("dialog")).toContainText("White · L");
  await page.getByRole("button", { name: "Keep exploring" }).click();
  await page.getByRole("button", { name: "Save to favourites", exact: true }).click();
  await expect(page.getByRole("button", { name: "Saved to favourites", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.goto("/favourites");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.screenshot({ path: `test-results/favourites-${info.project.name}.png` });
  await page.reload();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.locator(".product-card .product-heart").click();
  await expect(page.getByRole("heading", { name: "Keep a little inspiration." })).toBeVisible();
  await page.screenshot({ path: `test-results/favourites-empty-${info.project.name}.png` });
  await page.goto("/cart");
  await expect(page.locator(".selection-row")).toContainText("White · L · Quantity 1");
  await page.getByRole("button", { name: "Remove", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Your bag is waiting." })).toBeVisible();
  expect(errors).toEqual([]);
});

test("sold-out and concept states do not invent purchases or waitlist success", async ({ page }, info) => {
  await page.goto("/products/statement-black");
  await expect(page.locator(".sold-out-notice")).toContainText("SOLD OUT");
  await page.screenshot({ path: `test-results/sold-out-${info.project.name}.png` });
  await page.getByRole("button", { name: "Notify me", exact: true }).filter({ visible: true }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("textbox", { name: "Email or WhatsApp" }).fill("review@example.com");
  await dialog.getByRole("checkbox").check();
  await dialog.getByRole("button", { name: "Notify me", exact: true }).click();
  await expect(dialog.getByRole("status")).toContainText("No request was sent");
  await page.keyboard.press("Escape");
  await page.goto("/products/cap-maroon");
  await expect(page.getByRole("button", { name: "Colour concept · not for sale", exact: true }).filter({ visible: true })).toBeDisabled();
  await expect(page.locator(".detail-price")).toHaveText("Colour concept");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const response = await page.goto("/products/nonexistent-piece");
  expect(response?.status()).toBe(404);
});

test("malformed saved browser data cannot break storefront hydration", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("deoluxe-shop-v1", JSON.stringify({ version: 1, state: { favourites: [null, 12, "blackboy-black"], selections: [{ id: "bad", quantity: -3 }], hydrated: true } })));
  await page.goto("/favourites");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.goto("/cart");
  await expect(page.getByRole("heading", { name: "Your bag is waiting." })).toBeVisible();
});
