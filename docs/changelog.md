# Changelog — CTOC Command

Newest at top. Design/UX-level notable changes (code-level history is in git).

## 2026-06-28
- Scaffolded the **deep-dive workspace**: `CLAUDE.md`, `DESIGN.md`, `.claude/` toolkit,
  three-tier `tokens/`, `docs/`, `design-system/`, `reference/` — all CTOC-specific.
- **Punchier critical reds:** brightened `--sev-critical` to `#d81b2a`, solid red critical
  pill, vivid contrast-aware risk heatmap (still AA).
- **Single icon theme toggle** replacing the LIGHT/DARK button pair (space saving).

## 2026-06-27
- **WCAG 2.2 AA / AODA pass:** semantic buttons everywhere, real modal triage dialog (focus
  trap + restore), off-canvas nav focus management, skip link, chart text alternatives,
  heading structure, `validate:theme` + axe-core gate (0 violations × 13 screens × 2 themes).
- **Full responsive pass:** off-canvas sidebar < 1024px, stacking panels, reflowing KPI strips,
  horizontal-scroll dense tables/matrices, `100dvh` shell.

## Earlier (2026)
- App-wide light/dark theme with WCAG-validated contrast tokens.
- Built the full prototype: 13 screens (Operations / Domains / Reporting), Fusion Kill Chain,
  Triage Drawer, TIDEWAVE mock scenario.
- Figma source-of-truth build (file `i3YWhwkly7iJEmk0tK3YJ7`) and GitHub Pages deploy.
