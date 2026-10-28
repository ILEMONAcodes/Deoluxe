# Asset Manifest

Agent: update this table whenever an asset is received, rejected or replaced.

| ID | Group | Filename / link | Dimensions | Status (received / pending / needs-reshoot / link-only / placeholder) | Rights confirmed | Notes |
|---|---|---|---|---|---|---|
| BR-1 | brand | `assets/brand/deoluxe-logo-maroon.png` | 500×500 | received (PNG only) | yes (client brand) | Ask for SVG / transparent white version |
| REF-1 | reference | `assets/reference/brand-instagram-feed.png` | 1918×1262 | received | n/a (reference only) | Vibe reference; not for production use |
| REF-2 | reference | `assets/reference/ui-reference-vero-app.png` | 2062×1138 | received | n/a (reference only) | Layout/interaction reference; do not copy |
| BR-2…4 | brand | — | — | pending | — | Brand guide, about text, contacts |
| ONB-1…3, HERO-1, DROP-1 | hero | — | — | pending | — | Batch B2 |
| P-01…P-12 | products | — | — | pending | — | Batch B3 |

## Supplied originals — 2026-10-27

Original files copied without recompression; provenance in `assets/source-index.json`. Model and graphic usage rights confirmed in chat. All 1440px originals are below the 1600px product / 2000px hero target: acceptable for design previews, higher-resolution exports requested before production. Square tee shots are preserved uncropped; portrait sources are 3:4 and need deliberate 4:5 framing.

| ID | Group | Filename | Dimensions | Status | Rights confirmed | Notes |
|---|---|---|---|---|---|---|
| U-01 | products | `assets/incoming/products/products-blackboy-01.jpg` | 1440×1440 | received | yes | Original retained; design preview approved by user |
| U-02 | products | `assets/incoming/products/products-blackboy-02.jpg` | 1440×1440 | received | yes | Original retained; design preview approved by user |
| U-03 | products | `assets/incoming/products/products-blackboy-03.jpg` | 1440×1440 | received | yes | Original retained; design preview approved by user |
| U-04 | products | `assets/incoming/products/products-velvet-aura-01.jpg` | 1440×1920 | received | yes | Original retained; design preview approved by user |
| U-05 | products | `assets/incoming/products/products-velvet-aura-02.jpg` | 1440×1920 | received | yes | Original retained; design preview approved by user |
| U-06 | hero | `assets/incoming/hero/hero-velvet-campaign-01.jpg` | 1440×1920 | received | yes | Original retained; design preview approved by user |
| U-07 | products | `assets/incoming/products/products-eclipse-01.jpg` | 1440×1920 | received | yes | Original retained; design preview approved by user |
| U-08 | products | `assets/incoming/products/products-eclipse-02.jpg` | 1440×1920 | received | yes | Original retained; design preview approved by user |
| U-09 | products | `assets/incoming/products/products-eclipse-03.jpg` | 1440×1920 | received | yes | Original retained; design preview approved by user |
| U-10 | products | `assets/incoming/products/products-statement-cap-01.jpg` | 1440×1920 | received | yes | Original retained; design preview approved by user |
| U-11 | products | `assets/incoming/products/products-statement-cap-02.jpg` | 1440×1920 | received | yes | Original retained; design preview approved by user |
| U-12 | editorial | `assets/incoming/editorial/editorial-blackboy-studio-01.jpg` | 1440×1920 | received | yes | Original retained; design preview approved by user |
| U-13 | editorial | `assets/incoming/editorial/editorial-blackboy-studio-02.jpg` | 1440×1920 | received | yes | Original retained; design preview approved by user |

## Edited cap assets

| ID | Group | Filename | Dimensions | Status | Rights confirmed | Notes |
|---|---|---|---|---|---|---|
| CAP-EDIT-1 | processed/products | `assets/processed/products/products-statement-cap-black-cutout-v1.png` | 1243×1265 | received | yes | Built-in ImageGen retouch; transparent background, hand/sticker removed; inspect reconstructed details against original before production |
| CAP-EDIT-2 | processed/products | `assets/processed/products/products-statement-cap-green-cutout-v1.png` | 1230×1278 | received | yes | Built-in ImageGen retouch; transparent background, hand/sticker removed; inspect reconstructed details against original before production |

All originals and edited caps uploaded into Figma Assets. Source image hashes and destination layer IDs: `design/figma-assets.json` and `design/figma-cap-assets.json`.

Remaining imagery: no extra stock or invented imagery used. Additional product angles and higher-resolution originals are pending for production; current supplied photos used for design review.

## Revision 02 — transparent logos and colour concepts (2026-10-27)

User explicitly authorised logo recolouring/background removal and new cap/tee colourways. Generated colours are **proposed concepts**, not confirmed merchandise or stock. Built-in ImageGen used for product edits and logo extraction; both final logo colours share one alpha silhouette composed and exported directly from Figma to preserve transparency.

| ID | Filename | Dimensions | Status | Rights / authorisation | Notes |
|---|---|---|---|---|---|
| R02-01 | `assets/brand/deoluxe-logo-transparent-maroon-v3.png` | 400×349 | received | user authorised derivative | Transparent logo; final selected v3 export; Figma layer `23:10` |
| R02-02 | `assets/concepts/products/concept-cap-wine-maroon-01.png` | 1243×1265 | concept — pending brand approval | user authorised derivative | AI colour study; no price/stock assigned; Figma layer `23:18` |
| R02-03 | `assets/concepts/products/concept-cap-midnight-navy-01.png` | 1243×1265 | concept — pending brand approval | user authorised derivative | AI colour study; no price/stock assigned; Figma layer `23:23` |
| R02-04 | `assets/brand/deoluxe-logo-transparent-white-v3.png` | 400×349 | received | user authorised derivative | Transparent logo; final selected v3 export; Figma layer `23:14` |
| R02-05 | `assets/concepts/products/concept-tee-warm-ivory-01.png` | 1254×1254 | concept — pending brand approval | user authorised derivative | AI colour study; no price/stock assigned; Figma layer `23:27` |
| R02-06 | `assets/concepts/products/concept-tee-forest-green-01.png` | 1254×1254 | concept — pending brand approval | user authorised derivative | AI colour study; no price/stock assigned; Figma layer `23:31` |

Final logo files are the **v3** PNGs. Earlier logo maroon-v1 is the extraction source; maroon-v2 and white-v1 are rejected opaque export intermediates and must not be used. No accepted screen uses these earlier versions. Original supplied maroon-square logo remains archived as the original asset only.

All six selected assets are stored locally, uploaded to Figma Assets under Revision 02, and shown on Colour Studio. Colour concepts are also included in Home/Catalogue at 390, 360, 768 and 1440 widths. Prompts: `design/COLOUR_CONCEPT_PROMPTS.json`. Verification: `design/revision-02-asset-validation.json`.

## Frontend foundation derivatives

`npm run assets` generates local WebP product/editorial images, copies the two selected transparent logo PNGs, packages PWA install icons on maroon tile surfaces, and copies approved Latin font subsets plus licences. All originals remain unchanged. Outputs and byte sizes: `assets/OPTIMISED_MANIFEST.json`. Product source images are capped at 120,000 bytes, with responsive Next Image delivery. Local Figma SVG icons are stored in `public/icons/ui/`; the frontend does not hotlink Figma assets.
# Storefront implementation — 2026-10-27

Exact Figma SVG exports added under `public/icons/ui/`: `back.svg` (24×24), `filter.svg` (24×24), `empty-heart.svg` (40×40), `empty-search.svg` (40×40), `size-grid.svg` (40×40). Source frames 6:80, 6:79, 14:863, 6:99 and 6:103. Root dimensions preserved. All storefront product/gallery imagery reuses local optimised assets from `assets/OPTIMISED_MANIFEST.json`; no temporary Figma runtime URLs or new generated product images.
