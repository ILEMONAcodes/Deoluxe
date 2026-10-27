# Asset Request Process & Shot List

**Rule:** the AI agent asks for images *before* design and again before build. It asks in batches, validates what arrives, and logs everything in `assets/ASSET_MANIFEST.md`.

## The process (agent follows this)
1. **Announce the batch:** "Batch B1 — Brand. I need: …" (list exact items, ratio, format).
2. **Human drops files** into the named `assets/incoming/<group>/` folder using the filename pattern. They can also paste Instagram/Drive links; the agent notes them as `link-only` and asks for originals.
3. **Agent validates:** format (JPG/PNG/WebP), min size, ratio, readability, no watermark, no screenshots-of-screenshots, faces/people usage rights.
4. **Agent logs** in the manifest (status: `received`, `needs-reshoot`, `pending`).
5. **Agent replies** with what's good, what's weak (be specific), and what's still missing. It does not proceed to the next batch until the human says "next" or "skip".
6. **Agent optimises** approved images (WebP/AVIF + sizes) into `public/images/...` during build.

## Technical specs
- Format: JPG/PNG (WebP ok). Original resolution preferred (don't re-compress).
- Min width: product **1600 px**, hero **2000 px**, lookbook **1600 px**.
- Product ratio **4:5** (portrait). Clean, consistent background where possible; also 1–2 detail shots.
- Keep faces/products inside the centre 80% (safe crop for different ratios).
- Filenames: `<group>-<slug>-<nn>.jpg`, lowercase, hyphens. Example: `products-black-puff-cap-01.jpg`.

## Batches and shot list

### B1 — Brand (`assets/brand/`)
| ID | Item | Notes |
|---|---|---|
| BR-1 | Logo SVG or high-res PNG (maroon bg + transparent white version) | PNG already provided; ask for vector |
| BR-2 | Brand guide / official font names / exact colours | If none, tokens are used |
| BR-3 | Brand one-liner + about text (2–3 sentences) | For About screen |
| BR-4 | Social handles, WhatsApp number, email, address (if any) | Footer/Profile |

### B2 — Onboarding + Home hero (`assets/incoming/hero/`)
| ID | Item | Ratio |
|---|---|---|
| ONB-1 | Lifestyle portrait, model wearing a signature piece | 3:4 |
| ONB-2 | Second lifestyle shot (different model/look) | 3:4 |
| ONB-3 | Third shot (night/city editorial like the Instagram feed) | 3:4 |
| HERO-1 | Home headline image (strongest campaign photo) | 4:5 or 1:1 |
| DROP-1 | Current/next drop banner image + drop name + date | 16:9 or 4:5 |

### B3 — Products (`assets/incoming/products/`) — repeat per product
Per product, provide: **front (main)**, **back/side**, **detail close-up**, **on-model** (if available), plus: name, price (₦), colours, sizes, 1–2 line description, stock per size, category.
Target: **8–12 products** for the demo, including **2 sold-out** examples (to show the sold-out state).
| ID | Item |
|---|---|
| P-01…P-12 | Product sets (see above) |
| P-SO-1, P-SO-2 | Sold-out items (can be from past drops, e.g. the "F#CKING DEOLUXE" caps) |

### B4 — Lookbook / "Shop the look" (`assets/incoming/lookbook/`) — optional for MVP
4–6 styled outfit photos (4:5) + which products appear in each.

### B5 — Editorial / social (`assets/incoming/editorial/`, `assets/incoming/og/`)
| ID | Item | Spec |
|---|---|---|
| OG-1 | Share image for link previews (WhatsApp/Instagram) | 1200 × 630 |
| ED-1…3 | Extra campaign shots for About/Profile/banners | any |

## Agent message templates

**Starting a batch**
> **Batch B2 — Onboarding & Home hero.** To design the first screens I need 5 images:
> 1. ONB-1, ONB-2, ONB-3 — portrait (3:4), models in Deoluxe pieces, min 1600 px wide.
> 2. HERO-1 — your strongest campaign photo (4:5).
> 3. DROP-1 — the current/next drop image, plus its name and release date.
> Drop them in `assets/incoming/hero/` named like `hero-onb-01.jpg`. Reply "done", or "skip" to use labelled placeholders.

**After receiving**
> Received 4 of 5. ✅ ONB-1, ONB-2, HERO-1 look great. ⚠️ ONB-3 is 900 px wide — can you send the original? ❌ DROP-1 missing. Want to continue to B3 (Products) or fix these first?

## Rights check (ask once)
"Do you confirm Deoluxe has the right to use the photos of models and any music/graphics visible in these images on the website?"

## Standing user update — 2026-10-27

The user authorises additional cap and tee colour concepts derived from their supplied images, and transparent recoloured logo variants. Preserve the original logo/product designs and store originals unchanged. Clearly distinguish generated colour concepts from confirmed merchandise. Every new design asset must be saved in the project assets folder, recorded in ASSET_MANIFEST.md, and added to Figma Assets while designing. Default logo treatment is maroon on light surfaces and white on dark surfaces, with no background tile.
