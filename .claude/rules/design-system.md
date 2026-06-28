# Rule: Design system

CTOC's visual system is token-driven and severity-led. Follow it exactly.

## Tokens
- **Runtime source of truth:** the CSS custom properties in [`app/globals.css`](../../app/globals.css)
  (`:root` for light, `[data-theme="dark"]` for dark). The JSON files in
  [`tokens/`](../../tokens/) and [`design-tokens.json`](../../design-tokens.json) document/mirror them.
- **Never hardcode a visual value.** No raw hex, px spacing, font sizes, radii, or shadows in
  components — reference a token (`var(--color-ink)`, `var(--spacing-md)`, `var(--sev-critical)`).
  This applies to inline `style={{}}` too: use `var(--token)`, not literals.
- If a needed value doesn't exist, add it at the right tier (primitive → semantic) in
  `globals.css` and mirror it in `tokens/`, rather than inlining.
- Naming is semantic, not literal: `--color-ink`, `--panel-bg`, `--sev-critical` — not
  `--color-gray-900` in component code (primitives feed semantics, semantics feed components).

## Severity (the one color system)
- Five states only: `critical`, `high`, `medium`, `low`, `resolved`. Each has
  `--sev-*` (bright fill), `--sev-*-bg` (tint), and where needed `--sev-*-text` (AA-safe text).
- **Fills/dots/bars** use the bright `--sev-*`. **Colored text on light surfaces** uses the
  `-text` variant (the bright fill fails contrast as text — see accessibility rule).
- **Critical** is a solid red badge (`--sev-critical-solid` + `--on-sev-critical`), the
  punchiest cue. Do not invent new reds/ambers/greens for status.
- Never use color as the *only* signal — always pair with the `Sev` glyph or a text label.

## Components
- Reuse the primitives in [`components/ui/index.tsx`](../../components/ui/index.tsx)
  (`Btn`, `Sev`, `Tag`, `KPI`, `Panel`, `BarRow`, `Spark`) before creating anything new.
- Styling is via **semantic CSS classes** in `globals.css` (`.panel`, `.kpi`, `.kc__stage`,
  `.sev--critical`), not utility-class soup in markup.
- New components follow the variant/state model in
  [`design-system/components.md`](../../design-system/components.md).
