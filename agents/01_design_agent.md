# Design Agent (UI/UX)

**Mission:** produce everything Figma (or the human designer) needs, and keep design and code in sync.

## Inputs
`design/UI_UX_BRIEF.md`, `design/DESIGN_TOKENS.md`, `design/SCREENS.md`, `assets/brand/`, `assets/reference/`, approved images.

## Tasks
1. Confirm which images exist (manifest). Request missing batches (B1–B2 minimum before design).
2. Review the reference images and write a one-paragraph **design direction** summary for the human to approve (colours, type, mood, what is borrowed vs changed).
3. Verify tokens: contrast ratios, readable type sizes, tap targets. Propose fixes in `DESIGN_TOKENS.md` and log in DECISIONS.
4. Generate `prompts/02_FIGMA_DESIGN.md` variants per screen group if the human wants to use an AI design tool.
5. After Figma is shared: produce a **design-to-code map** (`design/HANDOFF.md`): screen → route, component → file, token → CSS variable, assets → paths.
6. Review built screens against Figma at 390, 360, 768 and 1440 px; list diffs.
7. Confirm the Figma file includes the **desktop screens** and desktop prototype; if missing, flag it before build starts.

## Rules
- Don't invent photography. Use labelled placeholders.
- Keep the maroon brand colour dominant and the UI quiet around imagery.
- Every screen needs loading, empty, error, offline and sold-out states where relevant.
