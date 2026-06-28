# /check-a11y

Run the CTOC accessibility gate after any UI change.

Steps:
1. Run `npm run validate:theme` — every theme token pair must pass WCAG AA. Fix any FAIL by
   adjusting the token (and add a `-text` variant if a bright fill is being used as text).
2. Run `npm run build` to confirm no type/lint regressions.
3. Run axe-core across screens in **both themes** via headless Chrome + CDP (see
   `CLAUDE.local.md` for the setup): navigate each `ScreenId`, force theme via `localStorage`
   `ctoc-theme`, and assert zero violations. Also test overlays (triage drawer, off-canvas nav).
4. Spot-check keyboard behavior: skip link is first tab stop; dialog traps + restores focus;
   nav inert-when-hidden + focus move/restore; Escape closes overlays.
5. Report results against the checklist in [`.claude/rules/accessibility.md`](../rules/accessibility.md).
