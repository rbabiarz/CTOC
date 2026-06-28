# Research synthesis — CTOC Command

> Prototype-stage synthesis: domain reasoning and prior-art observations that shaped CTOC.
> Replace/extend with real interviews and source citations as they're gathered.

## Method
Review of fusion-SOC / SIEM / SOAR / XDR surfaces and analyst-workflow literature; informal
modeling of Tier-1→IR triage flow. (Primary user research: TODO — see
[`interviews/`](./interviews/) and [`surveys/`](./surveys/).)

## Themes
1. **Tool fragmentation is the real cost.** Detection isn't the bottleneck; *correlation across
   tools* is. Analysts pivot across many consoles to assemble one story. → CTOC fuses streams
   into one ranked lens.
2. **Severity counts ≠ priority.** Raw counts don't say "what now". Kill-chain stage + ATT&CK
   alignment + blast radius communicate urgency better. → the Fusion Kill Chain is the spine.
3. **Density is desired, noise is not.** Operators want everything visible but reject clutter.
   → compact scale, one-idea-per-panel, monochrome base with severity as the only color.
4. **Domains must coexist, not fork.** DLP/fraud/insider/exec-travel have distinct data but
   shouldn't become separate apps. → one nav, shared severity + screen anatomy.
5. **Accessibility is operational, not cosmetic.** Operators work long shifts, varied
   environments/displays. → WCAG 2.2 AA gate, color-independent severity, full keyboard support.

## Where CTOC deliberately diverges from prior art
- **Monochrome + severity-only color** instead of the typical multi-hue SaaS palette.
- **Fusion-first** single pane instead of per-tool dashboards.
- **Comprehension framing** (kill chain/ATT&CK) foregrounded over alert volume.

## Implications for design
Keep the severity model disciplined; invest in the triage drawer and kill-chain framing as the
highest-leverage surfaces; validate every screen for color-independent meaning and keyboard use.
