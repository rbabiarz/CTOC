export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'resolved' | 'info';

export type ScreenId =
  | 'fusion'
  | 'detect'
  | 'incidents'
  | 'workload'
  | 'automation'
  | 'dlp'
  | 'intel'
  | 'money'
  | 'fraud'
  | 'vuln'
  | 'insider'
  | 'travel'
  | 'exec';

export interface Alert {
  id: string;
  t: string;
  src: string;
  host: string;
  rule: string;
  sev: Severity;
  stage: number;
  conf: number;
  status: string;
  assigned: string;
  campaign: string;
}

export interface Campaign {
  id: string;
  name: string;
  actor: string;
  stage: number;
  sev: Severity;
  confidence: number;
  assets: number;
  mttd: string;
  started: string;
  tactic: string;
  desc: string;
}

export interface Incident {
  id: string;
  title: string;
  sev: Severity;
  stage: number;
  lead: string;
  sla: string;
  status: string;
  opened: string;
  assets: number;
}

export interface Asset {
  id: string;
  kind: string;
  sev: Severity;
  x: number;
  y: number;
  label: string;
}

export interface Edge {
  from: string;
  to: string;
  kind: string;
}

export interface KillChainStage {
  idx: number;
  name: string;
  short: string;
  count: number;
  hot: number;
  sig: number;
  conf: number;
}

export interface TimelineEvent {
  t: string;
  sev: string;
  title: string;
  sub: string;
}

export interface QueueEntry {
  who: string;
  open: number;
  crit: number;
  sla: number;
  util: number;
}
