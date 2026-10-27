# Design Tokens (starter — designer may refine, then update here)

> Brand maroon `#650A09` was sampled from the supplied logo PNG and confirmed as the theme by the user on 2026-10-27. White, ivory and charcoal support it.

## Colour
| Token | Value | Use |
|---|---|---|
| `--brand-maroon-700` | `#4A0706` | Pressed state, dark surfaces |
| `--brand-maroon-600` | `#650A09` | **Primary brand**, splash bg, primary buttons |
| `--brand-maroon-500` | `#7F1514` | Hover, active accents |
| `--brand-maroon-100` | `#F4E3E2` | Tinted backgrounds, selected chip bg |
| `--ivory-50` | `#FAF7F4` | App background |
| `--ivory-100` | `#F2EDE8` | Cards, surfaces |
| `--ink-900` | `#141111` | Primary text |
| `--ink-600` | `#5E5856` | Secondary text |
| `--ink-300` | `#C9C2BE` | Borders, dividers |
| `--white` | `#FFFFFF` | Text on maroon, sticker |
| `--gold-500` | `#B8934A` | Optional luxe accent (sparingly: badges, stars) |
| `--success` | `#1F7A4D` | Paid / delivered |
| `--warning` | `#B26A00` | Low stock |
| `--error` | `#B3261E` | Errors |

Contrast checks to verify: white on `#650A09`, ink-900 on ivory-50, maroon-600 on ivory-50.

## Typography
Use two families max. Proposed (free, Google Fonts):
- **Display / headings:** `Playfair Display` (echoes the serif DL monogram) — weights 500, 700
- **UI / body:** `Inter` — weights 400, 500, 600

| Style | Size / line | Weight | Font |
|---|---|---|---|
| Display | 32 / 38 | 700 | Playfair |
| H1 | 26 / 32 | 700 | Playfair |
| H2 | 20 / 26 | 600 | Inter |
| Body | 15 / 22 | 400 | Inter |
| Body small | 13 / 18 | 400 | Inter |
| Caption | 11 / 14 | 500 | Inter, letter-spacing +4% |
| Price | 16 / 20 | 600 | Inter, tabular numbers |
| Button | 15 / 20 | 600 | Inter |

## Spacing (4 px base)
`4, 8, 12, 16, 20, 24, 32, 40, 56`. Screen side padding **20**. Card gap **12**. Section gap **32**.

## Breakpoints and layout grid
| Name | Width | Columns | Margin | Gutter |
|---|---|---|---|---|
| Mobile | 360–639 (design at 390) | 4 | 20 | 12 |
| Tablet | 640–1023 (design at 768) | 8 | 32 | 16 |
| Desktop | ≥ 1024 (design at 1440) | 12 | 80 | 24 |
Max content width **1200**. Product grid: 2 cols mobile · 3 tablet · 4 desktop (3 when a filter sidebar is shown).
Desktop type scale: Display 48/56 · H1 36/44 · H2 24/32 · Body 16/24 (Playfair + Inter unchanged).

## Radius
Chip/pill **999** · Button **999** (pill, as in the reference) · Card **24** · Input **16** · Sheet top **28** · Image inside card **20**.

## Elevation
- Card: `0 8px 24px rgba(20,17,17,0.06)`
- Floating nav: `0 12px 32px rgba(20,17,17,0.18)`
- Sheet: `0 -8px 32px rgba(20,17,17,0.12)`

## Components — key specs
- **Primary button:** height 52, pill, bg maroon-600, text white, full-width on mobile.
- **Floating bottom nav:** pill, 64 high, margin-bottom 16 + safe area, bg ink-900 or maroon-700 (designer's choice), active icon in white with maroon circle.
- **Product card:** radius 24, image ratio **4:5**, heart button top-right (44 px circle), info capsule overlapping bottom (name, rating optional, price).
- **Sold-out:** image dimmed 40%, white tilted sticker "Sold out" (−12°), CTA becomes "Notify me".
- **Size chip:** 56 × 44 pill; selected = ink-900 or maroon fill; unavailable = strikethrough + 40% opacity.

## Iconography
Outline icons, 1.75 px stroke, 24 px grid (e.g. Lucide). Icons: home, shop, bag, user, heart, search, bell, filter, arrow-left, close, truck, shield.

## Export to code
Developer maps these to Tailwind `theme.extend` + CSS variables in `src/styles/tokens.css`. Do not hardcode hex values in components.

## Verified design checks — 2026-10-27

White on maroon: **13.12:1**; ink on ivory: **17.60:1**; maroon on ivory: **12.29:1**; secondary text on ivory: **6.54:1**. Minimum caption size 11px. Favourite controls are 44px (correcting the earlier 40px component spec to meet the accessibility requirement). Desktop content uses centred 1200px maximum width, giving 120px outer margins at 1440px; the earlier 80px grid margin is a minimum, not an instruction to exceed the maximum width.
