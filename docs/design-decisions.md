# Design decisions (ADR log) — CTOC Command

Append-only record of meaningful choices. Newest at top.

## ADR-008 — Document the project as a "deep dive" workspace
- **Date:** 2026-06-28
- **Status:** Accepted
- **Context:** The built dashboard had no captured design system, tokens-as-docs, or product
  context (brief/PRD/personas/IA).
- **Decision:** Scaffold the deep-dive structure (`CLAUDE.md`, `DESIGN.md`, `.claude/`,
  `tokens/`, `docs/`, `design-system/`, `reference/`) and fill it with CTOC-specific content,
  mirroring the real `app/globals.css` tokens and component inventory.
- **Consequences:** AI + humans get full context on day one; tokens now have a documented
  export. The runtime source of truth remains `app/globals.css`; the JSON mirrors can drift if
  not maintained — `/audit-tokens` is the guard.

## ADR-007 — Single icon theme toggle
- **Date:** 2026-06-28
- **Status:** Accepted
- **Context:** The topbar had "THEME · ☀ LIGHT · ☾ DARK" (~200px).
- **Decision:** Collapse to one icon-only toggle (☀/☾) using `aria-pressed` + stable
  `aria-label` + `title`. Icon shows current theme; click flips.
- **Consequences:** ~34px instead of ~200px; no WCAG 2.5.3 (Label-in-Name) conflict since
  there's no visible text label.

## ADR-006 — Punchier critical reds within AA
- **Date:** 2026-06-28
- **Status:** Accepted
- **Context:** After the a11y pass the critical pills were pale tints and the risk heatmap
  desaturated toward the cream surface (reds read gray).
- **Decision:** Brighten `--sev-critical` to `#d81b2a`; make the critical pill a **solid** red
  badge with white text (HIGH/MED/LOW stay tinted so critical out-ranks them); rebuild the
  heatmap with vivid fixed hues + auto black/white text per cell.
- **Consequences:** Strong, urgent critical signal that still passes AA (pure neon red fails
  with white text, so the ceiling is ~`#d81b2a`; heatmap cells use black text on bright cells).

## ADR-005 — WCAG 2.2 AA / AODA as a release gate
- **Date:** 2026-06-27
- **Status:** Accepted
- **Decision:** Convert all `div/span onClick` to real buttons/links; semantic nav list;
  real modal dialog (focus trap + restore) for triage; off-canvas nav focus management
  (`inert`); skip link; chart text alternatives; `npm run validate:theme` + axe-core gate.
- **Consequences:** 0 axe violations across 13 screens × 2 themes; small ongoing cost to keep
  it green on every change.

## ADR-004 — Full responsive shell (desktop → mobile)
- **Date:** 2026-06-27
- **Status:** Accepted
- **Decision:** Sidebar collapses to an off-canvas drawer < 1024px; multi-panel rows stack;
  KPI strips reflow; dense tables and the kill-chain/MITRE matrices scroll horizontally inside
  their panels; `100dvh` shell.
- **Consequences:** Usable down to ~360px without abandoning density on desktop.

## ADR-003 — Kill chain + MITRE ATT&CK as the prioritization spine
- **Date:** 2026 (initial build)
- **Status:** Accepted
- **Decision:** Frame fused signals by Lockheed kill-chain stage and MITRE techniques rather
  than raw severity counts, to answer "where in the attack are we?".
- **Consequences:** Strong narrative spine (TIDEWAVE); requires coherent mock data mapping.

## ADR-002 — Fusion model: one nav, three groups
- **Date:** 2026 (initial build)
- **Status:** Accepted
- **Decision:** A single sidebar spanning Operations / Domains / Reporting instead of separate
  per-tool apps. See [`information-architecture.md`](./information-architecture.md).

## ADR-001 — Monochrome base, severity-only color
- **Date:** 2026 (initial build)
- **Status:** Accepted
- **Decision:** Warm monochrome surfaces (cream/charcoal); reserve color for the 5-state
  severity model and current selection; never use saturated red/amber/green decoratively and
  never as the sole signal (always paired with a glyph/label).
- **Consequences:** Calm, dense operator aesthetic; the whole system hinges on the `--sev-*`
  token families staying disciplined.
