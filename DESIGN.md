# Design — CTOC Command

The north star and the rules of taste for the CTOC fusion-SOC dashboard.

## North star
> A Tier-1 analyst opens one screen and, within seconds, knows what is on fire, why it
> matters, and what to do next — without copy-pasting between six tools.

CTOC is a *comprehension* surface, not just a detection surface. Every screen should
reduce the time between "a signal exists" and "an operator understands and acts on it."

## Principles
1. **Comprehension over collection.** Don't just show more data — fuse and rank it. The
   kill-chain strip, MITRE alignment, and severity model exist to answer "what now?".
2. **Density with discipline.** Operators want everything visible. Pack information, but
   keep one idea per panel and a strict compact type/space scale — never noise.
3. **Severity is the signal; monochrome is the canvas.** The base is monochrome (cream/ink
   light, warm-charcoal dark). Color is reserved for severity and current selection. One
   meaning per hue, never decoration.
4. **Meaning survives without color.** Every severity cue pairs color with a glyph or label
   (the `Sev` pill's square + text, status dots with words). Color-blind and grayscale users
   lose nothing. See [`.claude/rules/accessibility.md`](./.claude/rules/accessibility.md).
5. **Accessible by default.** WCAG 2.2 AA is a gate, not a polish pass: keyboard paths,
   visible focus, ≥24px targets, contrast, a real modal dialog, focus management. The app is
   axe-clean in both themes and `npm run validate:theme` stays green.
6. **Systematic.** Every visual value traces to a token in [`app/globals.css`](./app/globals.css)
   (mirrored in [`design-tokens.json`](./design-tokens.json) / [`tokens/`](./tokens/)).

## The severity model (the heart of the system)
Five states, each with a token family (`--sev-*`, `--sev-*-bg`, `--sev-*-text`):

| State | Hue | Used for |
|---|---|---|
| **Critical** | vivid red `#d81b2a` (solid pill, white text) | active intrusion, P1, KEV |
| **High** | coral | escalations, P2 |
| **Medium** | ochre/amber | watch, partial |
| **Low** | blue | informational |
| **Resolved** | green | contained, OK |

Critical is intentionally the *punchiest* — a solid red badge that outranks the tinted
high/medium/low pills. Never introduce a sixth ad-hoc red, amber, or green; reference the
token. Bright fill colors are for fills/dots/bars; the `-text` variants are for colored text
on light surfaces (they pass contrast where the bright fills don't).

## Aesthetic direction
- **Type:** Inter (display/headings), DM Sans (body), JetBrains Mono (data, IDs, metrics).
  Mono carries the "operator console" feel; uppercase mono micro-labels are a signature.
- **Surfaces:** warm off-white cream in light, warm charcoal in dark — never clinical pure
  white or pure black. Hairlines and panel tints do the structural work, not heavy shadows.
- **Motion with intent:** status pulses, the triage drawer slide, the off-canvas nav. All
  respect `prefers-reduced-motion`.

## How design connects to build
Foundations and components are documented in [`design-system/`](./design-system/) and
implemented in [`components/`](./components/). Tokens live in [`app/globals.css`](./app/globals.css).
Decisions and their tradeoffs are recorded in [`docs/design-decisions.md`](./docs/design-decisions.md).

## Voice & tone
Operator-grade: terse, precise, mono-cased labels, real IOCs and timestamps. Full guidance
in [`.claude/rules/content-voice.md`](./.claude/rules/content-voice.md).
