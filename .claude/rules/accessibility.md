# Rule: Accessibility

Target **WCAG 2.2 AA / AODA**. CTOC is axe-clean across all 13 screens in both themes and
must stay that way. `npm run validate:theme` must pass before shipping.

## Color & contrast (1.4.x)
- Body text ≥ 4.5:1; large/UI text ≥ 3:1. `npm run validate:theme` checks every token pair.
- The bright `--sev-medium` / `--sev-high` fills FAIL as text on light surfaces — use the
  `--sev-*-text` variants for colored text. Critical text uses `--sev-critical` (kept AA).
- **Never convey meaning by color alone** (1.4.1): severity always pairs hue with a glyph or
  word (`Sev` square + label; status dots with text; column headers in the risk heatmap).
- Heatmap/auto-tinted cells compute black/white text from the blended background so contrast
  holds in both themes — keep that pattern if you add data-viz.

## Keyboard & focus (2.1, 2.4)
- Every interactive element is a real `<button>`/`<a>`/input — no `<div onClick>`. Clickable
  table rows get `tabIndex`, Enter/Space handlers, and `aria-label`/`aria-current`.
- Visible focus everywhere (global `:focus-visible` ring). Don't remove outlines.
- The triage drawer is a real modal: `role="dialog"`, `aria-modal`, `aria-labelledby`,
  focus trap, initial focus in, focus restored to trigger on close, Escape to close.
- The mobile off-canvas nav uses `inert` when hidden, moves focus in on open, restores to the
  hamburger on close; main is `inert` while the drawer is open.
- A skip link (`#main-content`) is the first tab stop.

## Targets & motion (2.5, 2.3)
- Hit targets ≥ 24px (2.5.8); primary nav items ≥ 44px on touch.
- Respect `prefers-reduced-motion` — pulses, drawer slide, and nav transitions have reduced
  alternatives.

## Structure & names (1.3, 4.1)
- Real heading hierarchy (screen `h1`, panel titles `h2`, dialog sections `h3`); nav is a
  `ul`/`li`/`button` list; tables use `th`.
- Icon-only controls (theme toggle, hamburger) have `aria-label`; decorative glyphs and
  sparklines are `aria-hidden`; informative SVGs (maps, charts, timelines) get `role="img"` +
  `aria-label`.

## Verify
Re-run axe-core (via headless Chrome + CDP) and `npm run validate:theme` after any UI change.
