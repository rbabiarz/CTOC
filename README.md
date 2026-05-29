# CTOC Command

**Cyber Threat Operations Center** — a high-fidelity interactive prototype for a unified SOC command dashboard. Built with **Next.js**, **React**, and **Tailwind CSS**, using realistic mock data that tells a coherent active-intrusion story.

Open the dashboard: [CTOC Dashboard.html](./CTOC%20Dashboard.html)

Repository: [github.com/rbabiarz/CTOC](https://github.com/rbabiarz/CTOC)

---

## What this project is

Most Security Operations Centers do not run on a single pane of glass. Analysts live inside a stack of point tools — SIEM, EDR, NDR, IDP, CASB, DLP, vuln scanners, fraud engines, threat intel platforms — each with its own queue, its own severity model, and its own blind spots. Tier-1 triage becomes copy-paste archaeology. Tier-2 and IR spend the first hour of an incident just correlating signals that should already be fused.

**CTOC Command** is a product and UX exploration of what a *fusion center* dashboard could look like when those streams are correlated, prioritized, and surfaced through a single operational lens. It is not a production SOC platform. It is a clickable prototype that demonstrates:

- How **cross-stream correlation** changes analyst workflow
- How **kill-chain and MITRE ATT&CK framing** help prioritize what matters now
- How **domain-specific views** (DLP, fraud, insider threat, executive travel) coexist with core ops views without fragmenting the operator experience
- How **triage, incident management, automation, and executive reporting** connect in one navigation model

The mock scenario centers on **Operation TIDEWAVE** — a simulated APT-441 intrusion moving from phishing through credential access, lateral movement, and exfiltration — with parallel threads for insider data loss, wire fraud, and a KEV vulnerability on an edge appliance.

---

## Why SOC dashboards need a fusion model

Traditional SOC tooling optimizes for *detection*, not *comprehension*. Each tool answers a narrow question well:

| Tool class | What it sees | What it misses |
|---|---|---|
| SIEM | Log correlation, rule hits | Business context, asset blast radius |
| EDR | Endpoint behavior, process chains | Network path, identity session context |
| NDR | Lateral movement, C2 beacons | User intent, data classification |
| IDP | Auth anomalies, impossible travel | What happened after login |
| CASB/DLP | Data movement, policy violations | Attack campaign linkage |
| Vuln mgmt | Exposure, patch state | Active exploitation in progress |
| Fraud / payments | Transaction velocity, mule patterns | Compromise that enabled the fraud |

A fusion dashboard does not replace these tools. It **orients the analyst** by answering four questions on every screen:

1. **What is happening?** — Active campaigns, open incidents, live alert volume
2. **How bad is it?** — Severity, kill-chain stage, confidence, blast radius
3. **What should I do next?** — Triage workflow, recommended playbooks, SLA pressure
4. **Who else needs to know?** — Workload distribution, executive risk posture, regulatory framing

CTOC Command prototypes that orientation layer across 13 views grouped into Operations, Domains, and Reporting.

---

## Screens at a glance

### Operations (core SOC workflow)

| Screen | Purpose |
|---|---|
| **Fusion Kill Chain** | Hero view. Lockheed kill-chain stages, active campaigns, asset topology map, MITRE ATT&CK heatmap, live alert stream, investigation timeline |
| **Threat Detection** | Unified alert queue across 9 detection sources with severity/source filters, volume trends, tactic breakdown, noisy-rule candidates |
| **Incidents & Cases** | Open incident list with SLA tracking, response progress steps, playbook usage, resolution trends |
| **Analyst Workload** | Per-analyst queue depth, capacity utilization, shift heatmap, burnout signals, tier distribution |
| **Automation & Remediation** | SOAR playbook execution log, success/failure analysis, containment confidence by action type |

### Domains (specialized monitoring)

| Screen | Purpose |
|---|---|
| **Data Loss Prevention** | Policy violations by channel (email, GenAI, USB, cloud), classifier exposure, repeat offenders |
| **Threat Intelligence** | IOC ingestion, actor tracking, campaign correlation, geographic threat map |
| **Money Movement** | Transaction velocity, corridor risk, held wires, ML anomaly clusters |
| **Fraud Monitoring** | Customer fraud typology, ATO/chargeback queues, loss exposure |
| **Vulnerability & Patch** | KEV catalog hits, CVSS/EPSS prioritization, business-unit risk heatmap, patch compliance |
| **Insider Threat** | UEBA behavioral scores, privileged session timeline, HR/Legal escalation context |
| **Executive Travel** | VIP itinerary tracking, geopolitical risk overlay, loaner device posture, active travel incidents |

### Reporting

| Screen | Purpose |
|---|---|
| **Executive Overview** | Enterprise risk posture, business-impact framing ($ loss avoided vs actual), regulatory readiness (NIST, ISO, PCI, DORA), board-ready headline |

---

## Deep dive: Fusion Kill Chain (the hero screen)

The Fusion Kill Chain screen is the conceptual center of the prototype. It models how a mature SOC would **fuse** telemetry into a campaign-centric narrative rather than a flat alert feed.

### Lockheed Martin Cyber Kill Chain

Seven stages are rendered as an interactive strip, each showing event volume, active hot incidents, and fusion confidence:

1. Reconnaissance
2. Weaponization
3. Delivery
4. Exploitation
5. Installation
6. Command & Control
7. Actions on Objectives

Selecting a stage filters context across the rest of the screen. In the mock data, stages 5–7 are "hot" — reflecting an intrusion that has moved past initial access into credential theft, lateral movement, and exfiltration.

### Active campaigns

Campaigns are correlated clusters of alerts attributed to a threat actor, with kill-chain stage, confidence score, asset count, and mean-time-to-detect. The primary narrative campaign is **CMP-2841 / Operation TIDEWAVE** (APT-441), described as: *credential harvesting → DC lateral → S3 staging*.

Other campaigns in the mock include macro-based eCrime (RUSTFALL), unattributed RDP anomalies (PALEHORSE), and an insider exfiltration thread (CLEARWATER).

### Blast radius topology

An asset map visualizes compromised and at-risk nodes (databases, app servers, workstations, domain controllers, object storage, edge load balancers) with edge types for exfil paths, escalation, and lateral movement. Clicking a node opens the triage drawer for a related alert.

### MITRE ATT&CK Enterprise heatmap

Techniques are grouped by tactic column (Initial Access through Exfiltration). Cells with observed activity are highlighted; critical techniques (e.g., T1003 credential access, T1021 remote services, T1041 C2 channel exfil) are emphasized. This gives analysts a **technique-level** view aligned to industry-standard taxonomy.

### Live operations panels

- **Investigation timeline** — cross-stream events with severity coloring
- **Live alert stream** — scoped to the selected campaign, with simulated "new alert" pulse
- **Signal contributors** — bar chart of detection source contribution plus top IOCs (IP, domain, hash, cert)

---

## Deep dive: Alert triage workflow

Clicking any alert in Threat Detection, Fusion Kill Chain, or Incidents opens a **right-side triage drawer** — the analyst's primary action surface.

The drawer implements a six-step workflow:

```
DETECT → TRIAGE → INVESTIGATE → ESCALATE → CONTAIN → RESOLVE
```

Each alert surfaces:

- **Context** — host, detector, kill-chain stage, fusion confidence, SLA tier, campaign linkage
- **Related signals** — correlated events from EDR, NDR, CASB, IDP in the last 30 minutes
- **Recommended playbooks** — SOAR actions with confidence and estimated execution time (e.g., `PB-CRED-12` credential isolation, `PB-EXFIL-04` egress block)
- **Analyst notes** — free-text observation field
- **Actions** — View in SIEM, download evidence, create case, mark false positive

This pattern reflects how modern SOCs are moving from "alert = ticket" to **alert = decision point** with pre-computed response options.

---

## Deep dive: Detection source fusion

The prototype simulates ingestion from nine named sources (defined in `shared.jsx`):

| Source | Example detections |
|---|---|
| EDR / Carbon Black | LSASS access, process injection |
| NDR / Vectra | DCSync, C2 beacon heartbeat |
| IDP / Okta | Impossible travel, MFA bypass |
| CASB / Netskope | Anomalous egress, OAuth grants |
| SIEM / Splunk | Correlation rules, 4xx enumeration |
| Email / Proofpoint | Phishing kit signatures |
| DLP / Forcepoint | PII batch to personal email |
| Fraud / Acme | Wire velocity anomaly |
| Vuln / Tenable | KEV CVE with public POC |

Alerts carry a unified schema: ID, timestamp, severity, confidence, kill-chain stage, status, assignee, and optional campaign ID. This is the **normalization layer** a real fusion platform would implement upstream of the UI.

---

## Deep dive: Domain views and why they matter

Enterprise SOCs — especially in financial services — cannot treat "cyber" and "fraud" as separate worlds. CTOC Command includes domain dashboards that reflect **converged security operations**:

### DLP + GenAI exposure

The DLP screen highlights a modern SOC pain point: employees pasting customer PII and source code into LLM tools. The mock tracks ChatGPT, Claude, Copilot, Gemini, and internal LLM usage with flagged prompt counts — a realistic 2025–2026 operational concern.

### Money movement + fraud

Money Movement and Fraud Monitoring screens model **transaction-layer security** — held wires, corridor risk (EMEA, LATAM, SEA, RU), ML graph clusters for mule patterns, and fraud typology (ATO, CNP, chargeback waves). These tie back to the same incident model when a compromise enables financial crime.

### Insider threat + executive travel

Insider Threat uses UEBA z-scores and privileged session timelines. Executive Travel adds **VIP-specific risk** — loaner devices, geopolitical destination tiers, and active incidents like hostile-network MITM on a CISO traveling to TLV. These are specialty SOC functions that rarely appear in generic SIEM dashboards but are critical in regulated industries.

### Vulnerability management under attack

The Vuln screen connects patch posture to active exploitation — KEV hits with SLA countdowns, EPSS scores, and a business-unit × severity heatmap. This bridges the gap between "we have 14K open CVEs" and "these 14 assets on EDGE-LB-A are being actively targeted right now."

---

## Deep dive: Automation and executive reporting

### SOAR / automation layer

The Automation screen shows playbook execution at scale: 3,884 runs in 24h, 83% auto-contained, with per-playbook success rates and failure root-cause analysis. Playbooks map directly to triage recommendations (`PB-CRED-12`, `PB-EXFIL-04`, etc.), closing the loop from **detection → decision → automated action**.

### Executive overview

The Executive Overview reframes SOC metrics for board consumption:

- Enterprise risk posture (ELEVATED / NORMAL)
- Operational readiness percentage
- Quarterly loss avoided vs actual loss ($84M vs $4.2M in the mock)
- Regulatory framework readiness (NIST CSF, ISO 27001, PCI-DSS, DORA, NYDFS, SOX, CMMC)
- Pre-written board headline with key callouts

This is the **reporting tier** that justifies SOC investment and communicates residual risk without drowning executives in alert counts.

---

## Architecture

```
app/
├── layout.tsx               Root layout — fonts (Inter, DM Sans, JetBrains Mono)
├── page.tsx                 Dashboard entry point
└── globals.css              Tailwind + design tokens + SOC component styles

components/
├── dashboard/               App shell — Sidebar, Topbar, Dashboard routing
├── ui/                      Atoms — Sev, KPI, Panel, Spark, BarRow, Btn, Tag
├── kill-chain/              Fusion Kill Chain screen + Timeline, MITRE grid, asset map
├── triage/                  Alert triage drawer
└── screens/
    ├── operations.tsx       Threat Detection, Incidents, Workload, Automation, Money, Fraud
    └── domains.tsx          DLP, Intel, Vuln, Insider, Travel, Executive Overview

lib/
├── mock-data.ts             Static fixtures — alerts, campaigns, incidents, KPIs
└── types.ts                 TypeScript interfaces

legacy/                      Original standalone HTML/JSX prototype (archived)
```

### Technical approach

- **Next.js 15** (App Router) with **React 19** and **Tailwind CSS v4**.
- **Client components** for all interactive screens; mock data lives in `lib/mock-data.ts`.
- **Design tokens** in CSS custom properties (`globals.css`); Tailwind available for new layout utilities.
- **SOC component styles** preserved as BEM classes from the original prototype.
- **Designed for 1440px desktop.** Optimized for analyst workstation / SOC wall display proportions.

### App shell features

- **Sidebar navigation** — three groups (Operations, Domains, Reporting) with live counts and severity dots
- **Topbar** — breadcrumb context, time range chips (LIVE / 1H / 24H / 7D / 30D), search/filters, UTC clock
- **Shift context** — current analyst (M. Okafor, T2), open case count, SLA percentage
- **Keyboard** — `Esc` closes the triage drawer

---

## Design system

Visual language follows a **warm operational aesthetic** — cream canvas (`#fffcf5`), high-contrast ink text, monospace accents for IDs and timestamps, and a severity palette mapped to SOC conventions:

| Token | Usage |
|---|---|
| `--sev-critical` | P1 incidents, active exploitation, SLA breach |
| `--sev-high` | P2, escalation paths, high-confidence threats |
| `--sev-medium` | Triage queue, moderate risk |
| `--sev-low` / `--sev-resolved` | Suppressed noise, closed/contained |
| `--sev-info` | Informational, baseline activity |

Typography pairs **Inter / DM Sans** for UI copy with **JetBrains Mono** for operational data (alert IDs, timestamps, IOCs, playbook names).

Components are intentionally generic (`Panel`, `KPI`, `Sev`, `Spark`, `BarRow`, `Tbl`) so new screens can be added without a component library dependency.

---

## Quick start

Requires Node.js 18+.

```bash
cd CTOC
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Production build:

```bash
npm run build
npm start
```

The original standalone HTML prototype is archived in `legacy/` if you need to reference it.

---

## Mock scenario walkthrough

To experience the prototype as a coherent story:

1. Start on **Fusion Kill Chain** — note Operation TIDEWAVE at stage 6 with 7 compromised assets
2. Click **CMP-2841** in the campaigns table — topology and alert feed re-scope
3. Click any alert in the live feed — triage drawer opens with related signals and playbook recommendations
4. Navigate to **Threat Detection** — filter by EDR or critical severity
5. Open **Incidents & Cases** — select INC-9981 (TIDEWAVE containment in progress)
6. Check **Analyst Workload** — see queue pressure and burnout signals
7. Review **Automation** — trace playbook runs triggered by the same alerts
8. Cross-reference **DLP** and **Insider Threat** for the CLEARWATER insider thread
9. Check **Money Movement** for the held $4.2M EMEA wire cluster
10. Finish on **Executive Overview** for the board-ready summary

---

## What this is not

- **Not a production SOC platform.** No real telemetry, no authentication, no API layer.
- **Not a SIEM replacement.** It demonstrates UX for fused visibility, not log ingestion or search.
- **Not wired to live data.** All numbers, campaigns, and timelines are illustrative fixtures.
- **Not mobile-responsive.** Layout targets 1440px SOC analyst workstations.

---

## Intended audience

- **SOC product managers** exploring unified dashboard concepts
- **Security architects** evaluating fusion-center information architecture
- **UX designers** prototyping high-density operational interfaces
- **CISO / security leadership** reviewing executive reporting patterns
- **Analysts and IR leads** validating workflow assumptions before vendor selection or build decisions

---

## License

Prototype for product exploration. All mock data, company names, threat actor labels, and financial figures are fictional.
