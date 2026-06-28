# Rule: Content & voice

The product voice for CTOC Command is **operator-grade**: terse, precise, and credible to a
working SOC analyst.

- **Tone:** calm, exact, unhurried even under pressure. No marketing language, no hype, no
  exclamation points. The dashboard is a colleague, not a salesperson.
- **Register:** dense and technical. Real-looking artifacts: IDs (`ALT-78441`, `CMP-2841`,
  `INC-9978`, `CVE-2026-28114`), UTC timestamps, MITRE technique IDs (`T1003`), actor names
  (APT-441 / Nostromo), corridors (`US→GB→AE`).
- **Labels:** uppercase mono for micro-labels and metrics (`OPEN ALERTS`, `MEAN TIME TO
  DETECT`, `CONF`). This is a signature of the system — keep it consistent.
- **Microcopy:** lead with the verb on actions (`DECLARE INCIDENT`, `HOLD TXN`, `RECALL EXEC`,
  `QUARANTINE BATCH`). Buttons are imperative and specific to the domain.
- **Status:** pair the word with the cue (`● OPEN`, `● TRIAGE`, `● CONTAINED`) — never a bare
  colored dot.
- **Numbers:** tabular, with units and deltas (`3m 42s`, `+8%`, `−14`). Keep the TIDEWAVE
  scenario coherent — don't introduce numbers that contradict the story.
- **Errors / empty states:** state what happened and the next operator action; never blame the
  analyst.
- **Glossary:** one term per concept (alert vs. incident vs. case vs. campaign are distinct —
  don't blur them).
