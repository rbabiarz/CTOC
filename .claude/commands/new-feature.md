# /new-feature

Kick off a new feature or screen inside CTOC.

Steps:
1. Ask for the feature/screen name and a one-line operator goal ("what does this let an
   analyst do faster?").
2. Decide where it fits the IA: an **Operations** view, a **Domain** view, or **Reporting**
   (see [`docs/information-architecture.md`](../../docs/information-architecture.md)). Add it to
   the sidebar `NAV` in [`components/dashboard/Sidebar.tsx`](../../components/dashboard/Sidebar.tsx)
   and the `ScreenId` union + switch in
   [`components/dashboard/Dashboard.tsx`](../../components/dashboard/Dashboard.tsx).
3. Create `docs/features/<feature>.md` capturing goal, primary persona, success metric, scope,
   and which panels/visualizations it needs.
4. Add any unknowns to [`docs/open-questions.md`](../../docs/open-questions.md).
5. Reuse existing primitives (`Panel`, `KPI`, `BarRow`, `Sev`, `Spark`, table styles) and the
   established screen layout (`screen__header` → KPI strip → `row` panels). Propose components
   from [`design-system/components.md`](../../design-system/components.md).
6. Keep mock data in [`lib/mock-data.ts`](../../lib/mock-data.ts) consistent with TIDEWAVE.
7. Verify: keyboard path, both themes, `npm run validate:theme`, and axe-clean.
