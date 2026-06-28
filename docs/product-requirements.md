# Product requirements — CTOC Command

## Overview
A fusion-model SOC dashboard prototype. One navigation model spans core operations, domain
surfaces, and executive reporting, unified by a shared severity model and kill-chain / MITRE
framing.

## Goals
- Demonstrate **cross-stream correlation** changing analyst workflow (fewer tools, faster
  comprehension).
- Make **prioritization legible**: kill-chain stage + MITRE alignment + severity answer "what
  now?" at a glance.
- Show how **domain views** (DLP, fraud, insider, exec travel) coexist with core ops without
  fragmenting the operator experience.
- Connect **triage → incident → automation → executive reporting** in one coherent model.

## Non-goals
- Production data pipelines, real integrations, or detection logic.
- Admin/config, multi-tenant, auth.
- Net-new analytics not in service of comprehension.

## Primary user stories
- As a **T1 analyst**, I want a fused, ranked alert stream so I can triage without pivoting
  across six consoles.
- As a **T2/IR lead**, I want kill-chain + blast-radius context on a campaign so I can scope
  and contain faster.
- As **Fraud Ops**, I want held transactions, corridor risk, and ML clusters in one queue.
- As a **CISO**, I want a board-ready posture view with loss-avoided and regulatory readiness.

## Functional requirements (screen inventory)
| # | Capability | Group | Priority |
|---|------------|-------|----------|
| 1 | Fusion Kill Chain (campaigns, blast radius, MITRE, live stream) | Operations | P0 |
| 2 | Threat Detection (fused alert queue + triage) | Operations | P0 |
| 3 | Incidents & Cases (SLA, response progress) | Operations | P0 |
| 4 | Triage Drawer (modal: workflow, context, signals, playbooks) | Operations | P0 |
| 5 | Analyst Workload (queues, capacity, shift heatmap) | Operations | P1 |
| 6 | Automation & Remediation (playbook log, health) | Operations | P1 |
| 7 | DLP, Threat Intel, Money Movement, Fraud, Vulnerabilities, Insider, Exec Travel | Domains | P1 |
| 8 | Executive Overview (posture, business impact, readiness) | Reporting | P1 |
| 9 | Light/dark theme, responsive shell, full keyboard + AT support | Cross-cutting | P0 |

## Constraints
See [`constraints.md`](./constraints.md).

## Open questions
See [`open-questions.md`](./open-questions.md).
