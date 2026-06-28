# Components

> Note: CTOC's **live** components currently ship from [`../../components/`](../../components/)
> (Next.js App Router layout), not from `src/`. This `src/components/` tree is the design-system
> staging area for primitives/patterns we'd extract into a standalone, publishable package.

## Where things are today
| Concern | Location |
|---|---|
| Shared primitives | [`../../components/ui/index.tsx`](../../components/ui/index.tsx) — `Btn`, `Sev`, `Tag`, `KPI`, `Panel`, `BarRow`, `Spark` |
| App shell | `../../components/dashboard/` — `Dashboard`, `Sidebar`, `Topbar` |
| Screens | `../../components/screens/` — operations + domains |
| Fusion / kill chain | `../../components/kill-chain/` |
| Triage modal | `../../components/triage/` |
| Theme | `../../components/theme/` — `ThemeProvider`, `ThemeToggle` |

## Intended split if/when extracted here
- `primitives/` — atoms (`Button`, `Tag`, `Sev`, `KPI`, `Spark`, `BarRow`).
- `patterns/` — composed pieces (`Panel`, table, `KillChainStrip`, `TriageDrawer`, `RiskHeatmap`).

## Conventions
One component per file; style via tokens + semantic classes in
[`../../app/globals.css`](../../app/globals.css); follow
[`../../.claude/rules/code-style.md`](../../.claude/rules/code-style.md) and
[`../../design-system/components.md`](../../design-system/components.md). See
[`open-questions.md` #5](../../docs/open-questions.md) on whether to extract.
