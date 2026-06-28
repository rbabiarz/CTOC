# Information architecture — CTOC Command

## Navigation model
A single left sidebar, three groups. (Source: `NAV` in
[`components/dashboard/Sidebar.tsx`](../components/dashboard/Sidebar.tsx);
screen routing via the `ScreenId` switch in
[`components/dashboard/Dashboard.tsx`](../components/dashboard/Dashboard.tsx).)

```
CTOC Command
├── OPERATIONS
│   ├── Fusion Kill Chain        (fusion)    ← default / prototype start
│   ├── Threat Detection         (detect)
│   ├── Incidents & Cases        (incidents)
│   ├── Analyst Workload         (workload)
│   └── Automation               (automation)
├── DOMAINS
│   ├── Data Loss Prevention     (dlp)
│   ├── Threat Intel             (intel)
│   ├── Money Movement           (money)
│   ├── Fraud Monitoring         (fraud)
│   ├── Vulnerabilities          (vuln)
│   ├── Insider Threat           (insider)
│   └── Executive Travel         (travel)
└── REPORTING
    └── Executive Overview        (exec)
```

## Overlays (not in nav)
- **Triage Drawer** — a modal dialog opened from any alert (feed item, alert row, MITRE hit,
  map node, timeline event). Workflow steps · alert context · related signals · recommended
  playbooks · analyst notes. ([`components/triage/TriageDrawer.tsx`](../components/triage/TriageDrawer.tsx))
- **Off-canvas sidebar** — the nav itself becomes a drawer below 1024px.

## Shared screen anatomy
Every screen follows: `screen__header` (title + subtitle + toolbar) → KPI strip → one or more
`row`s of `Panel`s (tables, bar lists, charts, maps, heatmaps).

## Core objects & relationships
- **Alert** — a single fused detection (id, severity, source, host, confidence, status). Opens
  the Triage Drawer.
- **Campaign** — a correlated cluster of activity (e.g. CMP-2841 / Operation TIDEWAVE) mapped
  to a kill-chain stage and MITRE techniques; has a blast-radius topology.
- **Incident / Case** — a managed investigation (INC-…) with severity, stage, lead, SLA.
- **Asset** — a host/system (APP-77, EDGE-LB-A) appearing in topology, vuln, and blast radius.
- **IOC** — indicators (IP/domain/hash/cert) flowing from Threat Intel.
- **Entity (user/account)** — subject of DLP, insider, and fraud views.

Relationships: alerts → correlate into campaigns → escalate into incidents; campaigns/incidents
touch assets and entities; playbooks act on them via Automation.
