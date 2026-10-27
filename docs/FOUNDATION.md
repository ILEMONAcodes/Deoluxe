# Frontend foundation — 27 October 2026

User approved the current design and authorised frontend work (D-025). Phase 2 local foundation is ready for review. The public deployment and remote database remain pending project setup (D-033).

## Run and review

Run `npm ci` then `npm run dev`; open http://localhost:3000. A production preview was started at http://localhost:3100 for this session.

The homepage follows Figma mobile Home `6:78` and desktop Home `6:104` in file `x1mF2EuOrxrdDRclX8OQV8`. It uses local brand/product assets, original Figma icons, and locally hosted Inter and Playfair Display. Tablet uses a three-column grid and an adjusted campaign focal point to retain faces.

## Included

- Next App Router, strict TypeScript, Tailwind tokens, responsive header/footer/navigation and homepage.
- Transparent maroon/white brand assets and four clearly labelled colour concepts; original sources and derivative mapping remain in the asset manifests.
- Empty bag/saved screens, information page, install manifest, icons, offline fallback, connection status and worker-update controls.
- Integer-kobo formatting, CI configuration, and a draft Supabase migration with RLS and sanitised availability view.

The catalogue is read-only preview data. Prices derived from source filenames remain provisional (D-015). Concepts have no prices or stock claims. Cart, favourites, filtering, product detail, authentication, payments and order creation are subsequent phases. The SQL migration has not been applied or database-tested; CI has not yet run on a remote repository.

## Validation

- `npm run lint`, `npm run typecheck`, `npm run build`: passed.
- `npm run test:smoke`: 7 passed, 2 intentionally skipped duplicates of the shared mobile worker check. Covers rendering and loaded images at 390/768/1440, overflow, alt attributes, concept labelling, browser errors, initial JavaScript budget, money validation, manifest, offline navigation/fallback and exclusion of sensitive routes from caches.
- Visual review completed at all three sizes; tablet campaign crop corrected and reviewed after the final build.
- Initial homepage JavaScript measured at approximately 145 kB gzipped in the production browser capture, below the configured 150 KiB assertion. This is a local measurement, not a Lighthouse or real-device performance certification.
- All 13 product WebP derivatives are below 120,000 bytes; largest is 119,618 bytes. Two editorial derivatives are 296,692 and 92,576 bytes. See `assets/OPTIMISED_MANIFEST.json`.
- Dependency audit after the patched Zod override: zero reported vulnerabilities.

No real-phone check or public preview deployment is claimed. Keyboard/accessibility and broader Lighthouse audits remain part of subsequent feature/polish verification.

## Review gate

Review the local foundation before Phase 3 catalogue, product details and persistent favourites. A connected Vercel project is needed for a shareable preview; a Supabase project is needed to apply and verify the schema. Keep credentials in environment variables, never in chat or source control.
