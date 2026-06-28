# Patterns — CTOC Command

Composed, reusable solutions built from the components.

## Screen anatomy
Every screen: **`screen__header`** (title `h1` + subtitle + toolbar of `Btn`s) → **KPI strip**
(6 KPIs, reflows to 3/2 on smaller screens) → one or more **`row`s of `Panel`s** (tables, bar
lists, charts, maps, heatmaps). Keep one idea per panel.

## Severity model
Five states (critical→resolved), each a `--sev-*` token family. Color + glyph/label always
together. Bright fills for bars/dots/cells; `-text` variants for colored status text on light
surfaces; critical is the solid red badge. Status in tables = `● WORD` (colored dot + label),
never a bare dot.

## Fusion & prioritization
The kill-chain strip + MITRE grid + campaign blast-radius topology are the prioritization
spine — they answer "where in the attack are we, and what's affected?". New ops surfaces should
plug into this framing rather than inventing a parallel severity scheme.

## Triage flow
Any alert affordance (feed item, alert row, MITRE hit, map node, timeline event) opens the
**Triage Drawer** modal: workflow stepper → context → related signals → recommended playbooks →
notes → footer actions. The drawer traps focus and restores it to the trigger on close.

## Data tables
Dense tables use `th` headers and, below ~1180px, scroll horizontally *inside* their panel
(`min-width: max-content` + `overflow-x:auto`) rather than squishing. Clickable rows are
keyboard-operable (`tabIndex` + Enter/Space + `aria-label`/`aria-current`).

## Data viz
- **Sparklines** are decorative; the adjacent number is the data.
- **Maps / timelines / charts** are `role="img"` with a descriptive `aria-label`.
- **Heatmaps** use opaque blended cells with per-cell auto black/white text so contrast holds in
  both themes; severity is also conveyed by column header/position, not hue alone.

## Responsive shell
≥1024px: fixed sidebar + dense grid. <1024px: off-canvas sidebar (hamburger), stacked panels,
reflowed KPIs, horizontal-scroll tables/matrices. `100dvh` to avoid mobile-chrome clipping.

## Empty / loading / error
Design all three, not just the happy path: empty states teach the view (what would populate
here and why); loading uses skeletons over spinners; errors state what happened + the next
operator action.
