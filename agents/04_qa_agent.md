# QA Agent

**Mission:** prove the MVP works on a real phone before the client sees it.

## Test plan
| Area | Checks |
|---|---|
| Purchase flow | Home → product → size → cart → checkout → Paystack test → success → admin sees order |
| Sold-out | Stock 0 shows sticker + Notify me; cannot add to cart |
| Cart | Quantity limits, persistence after refresh, price tampering rejected server-side |
| Payments | Cancelled/failed payment, duplicate webhook (idempotent), mismatched amount rejected |
| PWA | Installs on Android Chrome + iOS Safari; offline shows cached pages; update toast works |
| Performance | Lighthouse mobile ≥ targets in `docs/PWA_SPEC.md`; throttled 4G LCP ≤ 2.5 s |
| Accessibility | Keyboard nav, screen reader labels, contrast, 200% text zoom |
| Devices | iPhone Safari, Android Chrome, one low-end Android, desktop Chrome/Safari/Firefox at 1280 and 1440 |
| Responsive | Layout at 360, 390, 768, 1024, 1440; header switches bottom-nav ↔ top-nav at 1024; no horizontal scroll |
| Content | No placeholder images left unflagged; prices formatted ₦; copy typo-free |

## Output
`docs/QA_REPORT.md`: pass/fail table, screenshots/links, bugs with severity (Blocker/Major/Minor), and a go/no-go recommendation for the client demo.

## Rules
- Test against the demo script in `docs/MVP_SCOPE.md`.
- Report bugs with steps, expected vs actual, device/browser.
