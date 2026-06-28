# Success metrics — CTOC Command

CTOC is a prototype, so "success" is split into (a) the operational metrics the *product
concept* would move, and (b) the quality bar for the *artifact itself*.

## Product-concept metrics (what a real CTOC would improve)
| Metric | Definition | Target signal | Surfaced on |
|--------|------------|---------------|-------------|
| Mean time to detect (MTTD) | Signal → triaged | trending down | Fusion, Detection |
| Mean time to respond (MTTR) | Triage → containment | ≤ P1 SLA (15m) | Fusion, Incidents |
| Median triage time | Per-alert handle time | down vs. baseline | Threat Detection |
| Cross-tool pivots per triage | Consoles touched to resolve one alert | → ~1 (the goal) | (concept) |
| False-positive % / suppression | Noise removed before a human sees it | down / up | Threat Detection |
| Auto-contained % | Incidents handled by playbooks | up | Automation |
| Loss avoided vs. actual | $ prevented vs. realized | up / down | Executive Overview |

## Artifact quality bar (gates for this repo)
- **Accessibility:** 0 axe-core violations across all 13 screens × light/dark;
  `npm run validate:theme` green. (WCAG 2.2 AA / AODA.)
- **Responsive:** no horizontal overflow 360px → 1440px+; usable shell at every breakpoint.
- **Build:** `npm run build` clean (types + lint); static export deploys to GitHub Pages.
- **Narrative coherence:** TIDEWAVE data stays internally consistent across screens.

## Guardrail metrics (must not regress)
Accessibility conformance, contrast, keyboard operability, bundle size / first-load JS, and the
internal consistency of the mock scenario.
