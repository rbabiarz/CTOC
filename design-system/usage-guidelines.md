# Usage guidelines — CTOC Command

Do / don't for applying the system.

## Color & severity
- **Do** use color only for severity and current selection. **Don't** add decorative color or a
  sixth ad-hoc red/amber/green.
- **Do** pair every severity cue with a glyph or label. **Don't** rely on hue alone.
- **Do** use `--sev-*-text` for colored status text on light surfaces. **Don't** use the bright
  `--sev-medium`/`--sev-high` fills as text (they fail contrast).
- **Do** keep critical the punchiest (solid red badge). **Don't** let high/medium out-shout it.

## Tokens
- **Do** reference tokens (`var(--…)`) for every visual value, including inline styles.
- **Don't** hardcode hex/px, and don't scatter Tailwind utilities in markup — extend a semantic
  class in `app/globals.css`.

## Components & layout
- **Do** reuse `components/ui` primitives and the standard screen anatomy.
- **Do** honor the compact scale and one-idea-per-panel.
- **Don't** reinvent a queue/table/KPI per screen.

## Accessibility (non-negotiable)
- **Do** make every interactive element a real button/link/input with a visible focus state and
  ≥24px target. **Don't** ship `<div onClick>`.
- **Do** design empty/loading/error and the keyboard path. **Don't** ship only the happy path.
- **Do** re-run `npm run validate:theme` + axe in both themes after UI changes.

## Motion
- **Do** animate to convey state (status pulse, drawer slide) and honor `prefers-reduced-motion`.
- **Don't** add decorative motion.
