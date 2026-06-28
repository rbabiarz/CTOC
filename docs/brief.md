# Brief — CTOC Command

## Problem
A Security Operations Center runs on a stack of point tools — SIEM, EDR, NDR, IDP, CASB,
DLP, vuln scanners, fraud engines, threat intel — each with its own queue, severity model,
and blind spots. Tier-1 triage becomes copy-paste archaeology; Tier-2/IR spend the first hour
of an incident just correlating signals that should already be fused. Traditional tooling
optimizes for *detection*, not *comprehension*.

## Product in one line
A fusion-center SOC command dashboard: one operational lens that correlates, prioritizes, and
surfaces every stream — framed by the kill chain and MITRE ATT&CK — so analysts know what's on
fire, why it matters, and what to do next.

## Why now
Detection volume keeps rising while analyst headcount doesn't; alert fatigue and slow
cross-tool correlation are the bottleneck. The industry is converging on fusion/XDR models —
this is a UX exploration of what that single pane should actually feel like for an operator.

## Scope of this artifact
A clickable, high-fidelity **prototype** with realistic mock data (the **Operation TIDEWAVE**
APT-441 scenario, plus insider-DLP, wire-fraud, and KEV-vuln threads). 13 screens across
Operations, Domains, and Reporting. Not a production platform; no live data, no backend.

## Target users
Pointer: [`personas.md`](./personas.md) — Tier-1 analyst, Tier-2/IR lead, Fraud Ops, CISO/exec.

## Success looks like
Pointer: [`success-metrics.md`](./success-metrics.md). Headline: shorter time-to-comprehension
(signal → understood → acted), demonstrated through the triage and fusion flows.

## Out of scope
- A real detection/ingestion backend or live integrations.
- Configuration/admin, RBAC, tenanting, billing.
- Mobile-native apps (the web prototype is responsive but desktop-first).
- Replacing analysts' deep-dive tools — CTOC is the correlation/decision layer above them.
