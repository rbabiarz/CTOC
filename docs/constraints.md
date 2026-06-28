# Constraints — CTOC Command

- **Technical:**
  - Next.js 15 **static export** (`output: "export"`) — no server, no runtime data fetching,
    `images.unoptimized`. All data is mock ([`lib/mock-data.ts`](../lib/mock-data.ts)).
  - GitHub Pages deploy needs `basePath`/`assetPrefix = /CTOC` (set via `GITHUB_PAGES`/CI);
    `trailingSlash: true`. Don't hardcode absolute root paths to assets.
  - All styling centralized in [`app/globals.css`](../app/globals.css) (tokens + semantic
    classes); React 19 + Tailwind v4.
- **Brand / design:** monochrome cream/charcoal base; **severity is the only color system**;
  no decorative saturated color; meaning never by hue alone. See [`../DESIGN.md`](../DESIGN.md).
- **Accessibility:** WCAG 2.2 AA / AODA is a hard gate (see
  [`.claude/rules/accessibility.md`](../.claude/rules/accessibility.md)).
- **Platform:** desktop-first operator tool; responsive down to ~360px (off-canvas nav,
  stacked panels, horizontal-scroll tables). Targets ≥ 24px; primary nav ≥ 44px on touch.
- **Data realism:** this is a prototype with *plausible* data, not real telemetry — keep it
  obviously illustrative (no real customer/PII/IOC data).
- **Timeline / resourcing:** solo product-design build; favor reusing the existing system over
  net-new components.
