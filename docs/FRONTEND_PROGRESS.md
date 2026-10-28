# Figma frame implementation tracker

Build order follows the approved design. User authorised frame-by-frame implementation on 27 October 2026. Complete each stage and review it before the next phase gate.

## Stage 1 — Foundation

Home mobile `6:78`, desktop `6:104`, tablet/narrow checks, responsive shell, brand assets, manifest, offline shell. See `FOUNDATION.md`. Local implementation complete; remote preview/project setup remains pending.

## Stage 2 — Storefront (current review)

| Frame group | Mobile | Desktop / tablet | Route / behaviour |
|---|---|---|---|
| Catalogue | 6:79 | 6:105 | `/shop`; 7 original-photo pieces and 4 proposed colourways; desktop sidebar, responsive grids |
| Filters | 6:102 | Sidebar in 6:105 | Category, size, preview/sold-out/concept status and maximum price; mobile modal; URL state |
| Search | 6:92 | 6:118 | `/search`; search terms, suggestions, results, sorting |
| No results | 6:99 | 17:483 | Empty query/filter result with clear action |
| Product | 6:80 | 6:106 / 6:131 | `/products/[slug]`; colour gallery, enlargement, size validation, local selection |
| Sold-out product | 6:81 | 6:107 | Original cap states; no purchase action |
| Size guide | 6:103 | Responsive modal | Explicitly pending official measurements |
| Favourites | 6:82 | 6:108 | `/favourites`; device-local persistence, remove, filter and sort |
| Empty favourites | 14:863 | 15:435 | Empty state and collection link |
| Notify me | 6:97 | Responsive modal | Form and consent preview; no backend submission or success claim |

Exact Figma icons and existing optimised source imagery are reused. New concepts remain labelled and unpriced. Display names/prices are provisional source-file data; sizes are MVP defaults, not verified inventory. The local preview selection at `/cart` is a handoff from product interaction, not the completed commerce frame.

Design adaptations: controls retain 44px hit areas; gallery dots are interactive; filters use native labelled inputs; modal closes with Escape and returns focus; unknown stock is called preview rather than in stock. Search suggestions are labelled Explore Deoluxe instead of implying fabricated search history. All 11 pieces fit this small catalogue, so the final message replaces a nonfunctional Load more control. Route prefetching is disabled to retain Home's JavaScript budget.

## Subsequent stages

1. Commerce UI: complete bag/drawer, quantity controls, contact/delivery/review, payment result, order lookup/status.
2. Connect and verify backend: authoritative product/variant/stock data, persisted waitlist, server totals, Paystack test processing/webhook and orders.
3. Remaining supporting frames: onboarding, full info/contact/policies, admin and polish. Policy/support content requires Deoluxe confirmation.

Public deployment, actual-phone demo, official prices/stock/size chart, and backend/project configuration remain open. No live purchase or notification delivery is claimed.

## Verification — 28 October 2026

- Production build, lint and TypeScript checks pass.
- Final full browser run: 18 passed, 2 duplicate worker checks intentionally skipped; the remaining offline test failed because the Chromium navigator-state emulation interrupted navigation. After separating banner emulation from cached navigation, the isolated offline check passed. No application change was required for that test correction.
- All storefront interaction checks pass at 390, 768 and 1440: filtering, URL restoration, sort/search/no results, gallery/colour changes, size validation, modal focus return, persisted favourites/removal, local preview selection and concept/sold-out safeguards. Malformed persisted data is validated.
- Independent final visual/asset check at 360, 390, 768 and 1440: all 11 catalogue images load; image slots preserve 4:5; no horizontal overflow or browser exceptions. Modal centering and gallery corner geometry verified. Screenshots and measured results are local under ignored `artifacts/storefront/`.
- Home JavaScript: **149,574 bytes gzip**, below the 150,000-byte budget. Route prefetch remains disabled to avoid downloading product/search code during Home browsing.
- Previously visited Home, catalogue and product documents work without network; an uncached API request fails and protected routes remain excluded from caches. Real-device/slow-network Lighthouse verification is still pending.

Stop here for the storefront review gate. Next implementation batch is the complete bag/drawer and checkout frames, followed by connected payment/order behaviour.
