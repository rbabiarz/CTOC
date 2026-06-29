# Code Connect — CTOC Design System

Maps Figma components in the **[CTOC Design System](https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System)**
file to their real implementations in [`components/ui`](../components/ui/index.tsx), so Figma
**Dev Mode** shows the actual `<Btn>` / `<Sev>` / … snippet + import instead of generated CSS.

These are parser-based `figma.connect()` files (`@figma/code-connect`), published with the CLI.

## Mappings (this folder)

| Figma component | node-id | Code component | Mapped props |
|---|---|---|---|
| Button | `16-18` | `Btn` | `Style→variant`, `State→disabled` |
| Severity Badge | `18-17` | `Sev` | `Level→level` |
| Tag / Chip | `19-6` | `Tag` | `State` → static `<span>` vs interactive `<button>` |
| KPI | `20-10` | `KPI` | `Accent→accent` |
| Panel / Card | `21-2` | `Panel` | composition |
| Status Dot | `22-14` | `StatusDot` | `State→tone` + label |
| Input | `23-10` | `Input` | `State→invalid` / `disabled` |
| Select | `33-16` | `Select` | `State→disabled` |
| Checkbox | `31-20` | `Checkbox` | `State→checked` / `disabled` |
| Radio | `32-13` | `Radio` | `State→checked` / `disabled` |
| Switch | `32-27` | `Switch` | `State→checked` / `disabled` |
| Tabs | `23-21` | `Tabs` | composition |
| Alert | `40-19` | `Alert` | `Severity→tone` |
| Toast | `39-30` | `Toast` | `Severity→tone` |
| Avatar | `51-18` | `Avatar` | `Size→size` |
| Table Row | `36-45` | `ClickableRow` | `State→active` |
| Breadcrumb Item | `49-10` | `Breadcrumbs` | composition |
| Page Item | `52-12` | `Pagination` | composition |

**18 components mapped** (up from 5 — see [docs/changelog.md](../docs/changelog.md)).

## Prerequisites (⚠ not met on the current plan)

Code Connect requires **all** of:
1. A **Figma Organization or Enterprise** plan with a **Dev or Full** seat. The CTOC file is
   currently on **Pro** — `get_code_connect_suggestions` returns *"You need a Dev or Full seat
   on an Organization or Enterprise plan."* Until upgraded, mappings won't appear in Dev Mode.
2. The components **published to a team library** (these are local components today).
3. `@figma/code-connect` installed and a `FIGMA_ACCESS_TOKEN` (Dev-Mode-enabled) in the env.

Everything here is authored and ready; it goes live the moment 1–3 are satisfied.

## Publish

```bash
npm install                       # installs @figma/code-connect (devDependency)
export FIGMA_ACCESS_TOKEN=figd_…  # token with Code Connect write scope
npm run code-connect:check        # figma connect parse — validates the files
npm run code-connect:publish      # figma connect publish — pushes mappings to Figma
```

## Coverage & gaps

**Code components with no 1:1 Figma component** — these are containers or assembled patterns,
so they are intentionally *not* Code-Connected (no single Figma node represents them):
`KeyValueList`, `StepProgress`, `Table` (wrapper — its row is mapped via `ClickableRow`),
`Feed`, `Textarea` (covered by the Input component), `Segmented`, `Modal`, `Empty`, `Spinner`.

**Figma components with no code component yet** — build the primitive in `components/ui`, then
add a `*.figma.tsx` here: `Combobox` (`34-15`), `Menu Item` (`48-18`), `Accordion Item`
(`50-16`), `Slider` (`58-30`).

## Build note

This folder is excluded from the app's `tsconfig.json` and is outside Next's lint dirs, so the
uninstalled `@figma/code-connect` import never breaks `npm run build`. The Code Connect CLI
type-checks these files itself via `figma.config.json`.
