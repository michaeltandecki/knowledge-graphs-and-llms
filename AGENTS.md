# AGENTS.md

## Purpose
This repository contains a Reveal.js presentation about knowledge graphs and LLMs.
Use this file as the default operating guide for any coding agent working in this repo.

## Project Layout
- `slides/` contains one Markdown file per slide, grouped by section folders.
- `scripts/build.js` generates `index.html` from all slide Markdown files.
- `index.html` is generated output and should be rebuilt after slide/file changes.
- `css/custom.css` contains presentation styling overrides.
- `js/mini-graph-progress.js` controls the bottom-left progress graph widget.

## Core Commands
- Install deps: `pnpm install`
- Build deck: `pnpm build` (or `node scripts/build.js`)
- Local preview: `pnpm start` (open `http://localhost:8000`)

## Slide Workflow Rules
1. Treat slide Markdown files under `slides/` as the source of truth.
2. After changing slide files or renaming slides, rebuild `index.html`.
3. Keep filenames and H2 slide titles aligned when practical.
4. If you rename slide files, confirm `index.html` references are updated.
5. Avoid long code blocks in slides unless explicitly requested.

## Current Narrative Constraints (active talk version)
- Audience: mixed Data and AI practitioners
- Duration target: 20-25 minutes
- Total slides target: about 20 (current working version may be 24)
- Narrative arc: question -> first attempt -> limitation -> alternative representation -> experiment -> comparison -> conclusion
- Use one running question early and revisit it later
- Avoid heavy theory and avoid sounding like a KG sales pitch
- Mark concrete examples as placeholders when real examples are not finalized
- Use at most one small code snippet in the whole talk
- End on core insight, not practical advice

## Editing Guidance
- Prefer minimal, surgical edits over broad rewrites.
- Preserve existing visual style unless asked to redesign.
- Keep wording concise and presentation-friendly.
- If content and filename drift apart, align both.
- For side-by-side comparisons, prefer two panes using HTML inside slide Markdown (`.two-col` with pane classes) instead of Markdown tables.
- Ensure side-by-side panes have equal height (`align-items: stretch` on container; panes as flex columns).
- Keep pane styling restrained and readable in the existing dark theme (subtle border/gradient/shadow, no overly slick effects).

## Verification Checklist
After meaningful edits:
1. Run `pnpm build`.
2. Confirm expected slide count in build output.
3. Check that renamed files are reflected in `index.html`.
4. Spot-check modified slides for heading/content consistency.

## Reveal + Cytoscape Pitfalls (Lessons Learned)
- Reveal scales `.slides` with CSS transforms. Cytoscape can compute incorrect bounds inside transformed/animated containers, causing clipping or graph offset.
- Prefer a dedicated full-slide Cytoscape container with explicit width/height and no nested decorative wrappers that constrain overflow.
- When practical, initialize or resize Cytoscape only after the target slide is active (`Reveal.on("ready")`, `Reveal.on("slidechanged")`, and window `resize`).
- On slide activation, call `cy.resize()` before fitting/centering so Cytoscape recalculates viewport dimensions.
- Keep pan/zoom behavior explicit in config (`userPanningEnabled`, `userZoomingEnabled`, `autoungrabify`) to avoid accidental interaction regressions while tuning layout.
- Avoid hand-edited inline styles in devtools as a “fix” (e.g., temporary width/padding changes); move all final sizing to source CSS/JS.
- If labels look blurry on large displays, set Cytoscape `pixelRatio: "auto"` and tune node/label font sizes in stylesheet selectors.
- For dense radial graphs, prefer deterministic positioning (`preset`) or centered layouts over repeated auto-fit loops that may drift between renders.
- Keep slide title layering explicit: ensure heading `z-index` is above graph canvas when graph is absolutely positioned.
- `index.html` is generated. If script/link includes are changed manually there, mirror those changes in `scripts/build.js` or they will be lost on next build.
