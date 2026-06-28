# Foundations — CTOC Command

All values are tokens in [`app/globals.css`](../app/globals.css) (mirrored in
[`design-tokens.json`](../design-tokens.json) / [`tokens/`](../tokens/)). Reference semantic
tokens, never raw values.

## Color
A warm **monochrome** base; **color is reserved for severity** and current selection.

| Role | Light | Dark |
|---|---|---|
| Canvas | `#fffcf5` cream | `#141312` warm charcoal |
| Panel bg / strong | `#fffefa` / `#fbf6e9` | `#1a1917` / `#222019` |
| Ink (headings) | `#0a0a0a` | `#f5f2eb` |
| Body | `#2a2a2a` | `#d4cfc4` |
| Muted / muted-soft | `#595959` / `#6a6a6a` | `#b8b0a4` / `#9a9288` |
| Hairline / strong | `#e6dfc8` / `#d6cfb5` | `#353029` / `#454038` |

**Severity** (the only chromatic system) — each has `--sev-*` (fill), `--sev-*-bg` (tint), and
where needed `--sev-*-text` (AA text):

| State | Light fill | Notes |
|---|---|---|
| Critical | `#d81b2a` | **solid pill, white text** — punchiest |
| High | coral `#e64d3c` | text variant `#a3331f` |
| Medium | ochre `#d4a036` | text variant `#8a5e0e` |
| Low | blue `#1570ef` | informational |
| Resolved | green `#166534` | contained / OK |

Structure is carried by hairlines and panel tints, not heavy shadows. See
[`../.claude/rules/accessibility.md`](../.claude/rules/accessibility.md) for the fill-vs-text rule.

## Typography
- **Inter** — display/headings (`--font-display`).
- **DM Sans** — body/UI (`--font-body`).
- **JetBrains Mono** — data, IDs, metrics, micro-labels (`--font-mono`). Uppercase mono labels
  are a signature.
- Scale: a `display-*` ramp (72→30px) for hero numbers and a `text-*` ramp (24→12px) for UI.
  In the dense dashboard most UI sits at 10–13px; KPI values are the loud exception.

## Spacing & layout
4px base scale: `--spacing-xs 4 · sm 8 · md 12 · lg 16 · xl 20 · 2xl 24 · 3xl 32 …`. Shell is a
CSS grid (`200px` sidebar + `44px` topbar + scrollable main) at `100dvh`; collapses to a single
column with an off-canvas sidebar below 1024px.

## Elevation & radius
- **Elevation:** mostly flat; `--shadow-sm/md/lg` exist but are used sparingly (the triage
  drawer, popovers). Prefer hairlines + tint over shadow.
- **Radius:** `--rounded-xs 4 · sm 6 · md 8 · lg 12 · xl 16`; pills use `--rounded-full`. Cards
  stay 4–8px (no over-rounding).
