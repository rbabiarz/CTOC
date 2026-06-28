# /audit-tokens

Scan the codebase for hardcoded visual values that should reference tokens.

Steps:
1. Grep [`components/`](../../components/) and [`app/globals.css`](../../app/globals.css) for raw
   hex colors, `px` font sizes, and ad-hoc spacing in component code / inline `style={{}}`.
2. For each hit, suggest the matching token from `globals.css` (`--color-*`, `--spacing-*`,
   `--rounded-*`, `--shadow-*`, `--sev-*`) and mirror in
   [`tokens/semantic.json`](../../tokens/semantic.json).
3. Flag any color used as **status text** that references a bright `--sev-medium`/`--sev-high`
   fill instead of the AA-safe `--sev-*-text` variant.
4. Flag any new color/spacing value with no token — propose adding it at the right tier
   (primitive → semantic) rather than inlining.
5. Report findings as a table (file:line · current value · suggested token). Then offer to fix.
