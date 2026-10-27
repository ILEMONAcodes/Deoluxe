# PWA Spec

## Installability
- `manifest.webmanifest`: `name: "Deoluxe"`, `short_name: "Deoluxe"`, `display: "standalone"`, `orientation: "portrait"`, `start_url: "/?source=pwa"`, `background_color` and `theme_color` = brand maroon `#650A09` (confirm in tokens).
- Icons: 192, 512, and **maskable** 512 (logo centred inside the safe zone on maroon). Apple touch icon 180. Generate from `assets/brand/deoluxe-logo-maroon.png` (ask the human for a vector/SVG if available).
- iOS: `apple-mobile-web-app-capable`, status bar style, splash images for common devices (generate).
- Custom **install prompt**: show after the 2nd page view or add-to-cart; dismissible; remember dismissal 14 days. On iOS show "Share → Add to Home Screen" instructions.

## Service worker strategy
| Resource | Strategy |
|---|---|
| App shell, JS, CSS, fonts | Precache |
| Product/category pages | Stale-while-revalidate |
| Product images | Cache-first, max 150 entries, 30 days |
| API GET (catalogue) | Network-first with 3 s timeout → cache fallback |
| Checkout, orders, payment, admin | **Network-only** (never cached) |
- Offline page: branded fallback with logo and "You're offline — saved pages still work".
- Update flow: when a new SW is waiting, show a small "Update available — Refresh" toast.

## Performance budget (mobile, throttled 4G)
- LCP ≤ 2.5 s · CLS ≤ 0.05 · INP ≤ 200 ms
- JS on Home ≤ 150 KB gzip · each product image ≤ 120 KB at display size
- Use AVIF/WebP, `sizes` + `srcset`, lazy-load below the fold, preload the hero image only.
- Fonts: max 2 families, `font-display: swap`, subset Latin.

## Quality gates (Lighthouse, mobile)
Performance ≥ 85 · Accessibility ≥ 95 · Best Practices ≥ 95 · SEO ≥ 90 · PWA installable.

## Other
- HTTPS only. Set `theme-color`, `viewport-fit=cover`, safe-area insets for the bottom nav.
- Respect `prefers-reduced-motion`.
- Open Graph + Twitter images per product for Instagram/WhatsApp link previews.
