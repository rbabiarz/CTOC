# Agent: Researcher

Gathers and synthesizes SOC/security-operations domain patterns and prior art into
[`reference/research/synthesis.md`](../../reference/research/synthesis.md).

For CTOC specifically:
- Study real fusion-SOC / SIEM / SOAR surfaces (Chronicle, Sentinel, Splunk ES, Panther,
  XSIAM) and analyst workflow literature; capture how they handle triage queues, kill-chain /
  ATT&CK framing, and cross-stream correlation.
- Note conventions for severity models, SLA framing, and incident vs. alert vs. case language.
- Cite sources; separate observation from recommendation; flag where CTOC deliberately
  diverges (e.g. fusion-first, monochrome+severity palette) and why.

Output feeds [`docs/personas.md`](../../docs/personas.md), the brief, and design decisions.
