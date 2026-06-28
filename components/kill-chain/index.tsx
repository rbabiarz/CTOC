'use client';

import { useState, useEffect, useMemo } from 'react';
import { Btn, KPI, Panel, Sev, BarRow } from '@/components/ui';
import {
  ASSETS,
  EDGES,
  KILL_CHAIN_STAGES,
  MITRE_TACTICS,
  CAMPAIGNS,
  ALERTS,
  TIMELINE,
} from '@/lib/mock-data';
import type { MitreCell, MitreTactic } from '@/lib/mock-data';
import type { Alert, Asset, Campaign, KillChainStage, TimelineEvent } from '@/lib/types';

interface KillChainStripProps {
  stages: KillChainStage[];
  activeIdx: number;
  onSelect: (idx: number) => void;
}

function KillChainStrip({ stages, activeIdx, onSelect }: KillChainStripProps) {
  return (
    <div className="kc">
      {stages.map((s) => {
        const isActive = activeIdx === s.idx;
        const isHot = s.hot > 0;
        const barClass = s.hot >= 2 ? 'crit' : s.hot >= 1 ? 'high' : s.sig >= 6 ? 'med' : '';
        return (
          <button
            type="button"
            key={s.idx}
            className={`kc__stage ${isActive ? 'is-active' : ''} ${isHot ? 'is-hot' : ''}`}
            aria-pressed={isActive}
            onClick={() => onSelect(s.idx)}
          >
            <div className="kc__stage-idx">STAGE {s.idx.toString().padStart(2, '0')}</div>
            <div className="kc__stage-name">{s.name}</div>
            <div className="kc__stage-metrics">
              <div className="kc__metric">
                <span className="lbl">Events</span>
                <span className="num">{s.count.toLocaleString()}</span>
              </div>
              <div className="kc__metric">
                <span className="lbl">Active</span>
                <span className="num" style={{ color: s.hot ? 'var(--sev-critical)' : 'var(--color-muted)' }}>{s.hot}</span>
              </div>
              <div className="kc__metric">
                <span className="lbl">Conf.</span>
                <span className="num">{Math.round(s.conf * 100)}%</span>
              </div>
            </div>
            <div className={`kc__bar ${barClass}`}><span style={{ width: `${Math.round(s.conf * 100)}%` }}></span></div>
          </button>
        );
      })}
    </div>
  );
}

interface AssetMapProps {
  assets: Asset[];
  edges: typeof EDGES;
  onSelect?: (asset: Asset) => void;
  highlightCampaign?: string;
}

function AssetMap({ assets, edges, onSelect, highlightCampaign }: AssetMapProps) {
  const assetById = useMemo(() => Object.fromEntries(assets.map(a => [a.id, a])), [assets]);
  return (
    <div className="map">
      {edges.map((e, i) => {
        const a = assetById[e.from];
        const b = assetById[e.to];
        if (!a || !b) return null;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        return (
          <div
            key={i}
            className={`map__edge ${e.kind}`}
            style={{
              left: `${a.x}%`,
              top: `${a.y}%`,
              width: `${len}%`,
              transform: `rotate(${angle}deg)`,
            }}
          />
        );
      })}
      {assets.map(a => {
        const dotClass = a.sev === 'critical' ? 'crit' : a.sev === 'high' ? 'high' : a.sev === 'resolved' ? 'ok' : '';
        const sevWord = a.sev === 'critical' ? 'critical' : a.sev === 'high' ? 'high' : a.sev === 'resolved' ? 'resolved' : 'normal';
        const inner = (
          <>
            <div className={`map__node-dot ${dotClass}`} aria-hidden="true"></div>
            <div className="map__node-label">{a.label}</div>
          </>
        );
        return onSelect ? (
          <button
            key={a.id}
            type="button"
            className="map__node"
            style={{ left: `${a.x}%`, top: `${a.y}%` }}
            aria-label={`${a.label}, ${sevWord} severity asset — open detail`}
            onClick={() => onSelect(a)}
          >
            {inner}
          </button>
        ) : (
          <div key={a.id} className="map__node" style={{ left: `${a.x}%`, top: `${a.y}%` }}>
            {inner}
          </div>
        );
      })}
      <div style={{ position: 'absolute', bottom: 8, left: 8, display: 'flex', gap: 10, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--color-muted)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 16, height: 2, background: 'var(--sev-critical)' }}></span>EXFIL PATH</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 16, height: 2, background: 'var(--sev-high)' }}></span>ESCALATION</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 16, height: 1.5, background: 'repeating-linear-gradient(90deg, var(--sev-high) 0 4px, transparent 4px 7px)' }}></span>LATERAL</span>
      </div>
      <div style={{ position: 'absolute', top: 8, right: 8, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--color-muted-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        Topology · {assets.length} assets · {edges.length} flows · {highlightCampaign || 'all campaigns'}
      </div>
    </div>
  );
}

interface MitreGridProps {
  tactics: MitreTactic[];
  onCell?: (cell: MitreCell) => void;
}

function MitreGrid({ tactics, onCell }: MitreGridProps) {
  return (
    <div className="mitre">
      {tactics.map(col => (
        <div key={col.col} className="mitre__col">
          <div className="mitre__col-head">{col.col}</div>
          {col.cells.map(c => {
            const cls = `mitre__cell ${c.hit ? 'is-hit' : ''} ${c.crit ? 'is-crit' : ''}`;
            const content = (
              <>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: 'var(--color-muted-soft)', marginRight: 4 }}>{c.id}</span>
                  {c.name}
                </span>
                <span className="count">{c.count || ''}</span>
              </>
            );
            return c.hit ? (
              <button
                key={c.id}
                type="button"
                className={cls}
                onClick={() => onCell && onCell(c)}
                aria-label={`${c.id} ${c.name}${c.count ? `, ${c.count} detections` : ''} — open detail`}
                title={`${c.id} · ${c.name}`}
              >
                {content}
              </button>
            ) : (
              <div key={c.id} className={`${cls} mitre__cell--static`} title={`${c.id} · ${c.name}`}>
                {content}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

interface TimelineProps {
  events: TimelineEvent[];
  onSelect?: (event: TimelineEvent) => void;
}

export function Timeline({ events, onSelect }: TimelineProps) {
  return (
    <div className="timeline">
      {events.map((e, i) => {
        const inner = (
          <>
            <div className="timeline__time">{e.t} UTC</div>
            <div className="timeline__title">{e.title}</div>
            <div className="timeline__sub">{e.sub}</div>
          </>
        );
        return onSelect ? (
          <button key={i} type="button" className={`timeline__event ${e.sev}`} onClick={() => onSelect(e)}>
            {inner}
          </button>
        ) : (
          <div key={i} className={`timeline__event ${e.sev}`}>{inner}</div>
        );
      })}
    </div>
  );
}

interface KillChainScreenProps {
  onOpenAlert?: (alert: Alert) => void;
  onOpenCampaign?: (campaign: Campaign) => void;
}

export function KillChainScreen({ onOpenAlert, onOpenCampaign }: KillChainScreenProps) {
  const [activeStage, setActiveStage] = useState(5);
  const [activeCampaign, setActiveCampaign] = useState('CMP-2841');

  const feedAlerts = useMemo(() => {
    const filtered = activeCampaign === 'ALL' ? ALERTS : ALERTS.filter(a => a.campaign === activeCampaign);
    return (filtered.length ? filtered : ALERTS).slice(0, 9);
  }, [activeCampaign]);

  const campaignDetail = CAMPAIGNS.find(c => c.id === activeCampaign) || CAMPAIGNS[0];

  const [tickId, setTickId] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTickId(x => x + 1), 18000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="screen" data-screen-label="Fusion Kill Chain">
      <div className="screen__header">
        <div>
          <h1 className="screen__title">Fusion Kill Chain</h1>
          <div className="screen__subtitle">
            Active campaigns · cross-stream correlation · MITRE ATT&CK alignment
            <span style={{ marginLeft: 12, color: 'var(--sev-critical)', fontWeight: 600 }}>3 CRITICAL · 4 HIGH</span>
          </div>
        </div>
        <div className="screen__toolbar">
          <Btn size="xs">CORRELATION RULES</Btn>
          <Btn size="xs">EXPORT IOCS</Btn>
          <Btn size="xs" variant="primary">DECLARE INCIDENT</Btn>
        </div>
      </div>

      <div className="kpis" style={{ gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 10 }}>
        <KPI label="Active campaigns" value="7" delta="+2" deltaDir="up" footer="2 escalated past 06:00 UTC" />
        <KPI label="Open alerts" value="218" delta="−14" deltaDir="down" footer="1,442 ingested last hr" />
        <KPI label="Critical incidents" value="3" delta="+1" deltaDir="up" accent="crit" footer="INC-9981 ETA contain 14:55" />
        <KPI label="Assets compromised" value="12" delta="+3" deltaDir="up" footer="7 production · 3 corp · 2 cloud" />
        <KPI label="Mean time to detect" value="4m" delta="−18s" deltaDir="down" footer="Target ≤ 5m" />
        <KPI label="Mean time to respond" value="11m" delta="−02m" deltaDir="down" footer="Target ≤ 15m" />
        <KPI label="Auto-contained" value="83%" delta="+4%" deltaDir="up" footer="42 of 51 last hour" />
      </div>

      <Panel title="Lockheed Cyber Kill Chain" sub={`Stage ${activeStage} selected · ${KILL_CHAIN_STAGES[activeStage - 1].name}`} toolbar={
        <>
          <span className="dim mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>WINDOW</span>
          <Btn size="xs" active>1H</Btn>
          <Btn size="xs">24H</Btn>
          <Btn size="xs">7D</Btn>
          <Btn size="xs">30D</Btn>
        </>
      } style={{ marginBottom: 10 }} flush>
        <KillChainStrip stages={KILL_CHAIN_STAGES} activeIdx={activeStage} onSelect={setActiveStage} />
      </Panel>

      <div className="row" style={{ gridTemplateColumns: '1.4fr 1fr', marginBottom: 10 }}>
        <Panel title="Active campaigns" sub="correlated · last 72h" toolbar={
          <>
            <span className="dim mono uppr">{CAMPAIGNS.length} ROWS</span>
            <Btn size="xs">FILTER</Btn>
          </>
        } flush>
          <table className="tbl">
            <thead>
              <tr>
                <th style={{ width: 80 }}>ID</th>
                <th>Campaign</th>
                <th>Actor</th>
                <th style={{ width: 64 }}>Stage</th>
                <th style={{ width: 70 }}>Sev</th>
                <th style={{ width: 60 }} className="num">Conf</th>
                <th style={{ width: 56 }} className="num">Assets</th>
                <th style={{ width: 76 }} className="num">MTTD</th>
              </tr>
            </thead>
            <tbody>
              {CAMPAIGNS.map(c => (
                <tr
                  key={c.id}
                  className={activeCampaign === c.id ? 'is-active' : ''}
                  onClick={() => setActiveCampaign(c.id)}
                  tabIndex={0}
                  aria-current={activeCampaign === c.id ? 'true' : undefined}
                  aria-label={`Select campaign ${c.id}, ${c.name}`}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveCampaign(c.id); } }}
                >
                  <td className="mono">{c.id}</td>
                  <td><span className="ink">{c.name}</span><div className="dim" style={{ fontSize: 10.5 }}>{c.desc}</div></td>
                  <td className="mono dim">{c.actor}</td>
                  <td className="num">{c.stage}/7</td>
                  <td><Sev level={c.sev} /></td>
                  <td className="num">{Math.round(c.confidence * 100)}%</td>
                  <td className="num">{c.assets}</td>
                  <td className="num">{c.mttd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title="Blast radius · topology" sub={`${campaignDetail.id} · ${campaignDetail.name}`} toolbar={
          <>
            <Btn size="xs">RESET</Btn>
            <Btn size="xs" onClick={() => onOpenCampaign && onOpenCampaign(campaignDetail)}>OPEN ▸</Btn>
          </>
        } flush>
          <div style={{ padding: '8px 8px 0' }}>
            <AssetMap
              assets={ASSETS}
              edges={EDGES}
              onSelect={(a) => onOpenAlert && onOpenAlert(ALERTS.find(x => x.host.includes(a.label.split('.')[0])) || ALERTS[0])}
              highlightCampaign={campaignDetail.id}
            />
          </div>
          <div style={{ padding: '8px 12px 10px', borderTop: '1px solid var(--hairline)', marginTop: 8, fontSize: 11.5 }}>
            <div className="grid-2" style={{ gap: '4px 12px' }}>
              <div className="dim mono uppr">Entry vector</div><div className="mono ink">Phishing → macro · WS-441</div>
              <div className="dim mono uppr">Tactic</div><div className="mono ink">{campaignDetail.tactic} · Exfiltration</div>
              <div className="dim mono uppr">Started</div><div className="mono ink">{campaignDetail.started}</div>
              <div className="dim mono uppr">Confidence</div><div className="mono ink">{Math.round(campaignDetail.confidence * 100)}% · Bayesian fusion v3</div>
            </div>
          </div>
        </Panel>
      </div>

      <Panel title="MITRE ATT&CK · Enterprise" sub={`${campaignDetail.id} mapped · ${MITRE_TACTICS.reduce((n, c) => n + c.cells.filter(x => x.hit).length, 0)} techniques observed`} toolbar={
        <>
          <Btn size="xs" active>HEATMAP</Btn>
          <Btn size="xs">TIMELINE</Btn>
          <Btn size="xs">EXPORT NAVIGATOR</Btn>
        </>
      } style={{ marginBottom: 10 }}>
        <MitreGrid tactics={MITRE_TACTICS} onCell={(c) => c.hit && onOpenAlert && onOpenAlert(ALERTS[0])} />
      </Panel>

      <div className="row" style={{ gridTemplateColumns: '1.4fr 1fr 1fr', marginBottom: 0 }}>
        <Panel title="Investigation timeline" sub="cross-stream events · last 24m" toolbar={<><Btn size="xs">FILTER</Btn><Btn size="xs">EXPAND</Btn></>}>
          <Timeline events={TIMELINE} onSelect={() => onOpenAlert && onOpenAlert(ALERTS[0])} />
        </Panel>

        <Panel title="Live alert stream" sub={`${campaignDetail.id} scope`} toolbar={
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="live-dot"></span>
            <span className="mono" style={{ fontSize: 10, color: 'var(--color-success)', fontWeight: 600 }}>LIVE</span>
          </span>
        } flush>
          <div className="feed" style={{ padding: '4px 8px' }}>
            {feedAlerts.map((a, i) => (
              <button
                key={a.id}
                type="button"
                className={`feed__item ${i === 0 && tickId > 0 ? 'is-new' : ''}`}
                aria-label={`${a.sev} alert: ${a.rule}, ${a.src} on ${a.host} — open triage`}
                onClick={() => onOpenAlert && onOpenAlert(a)}
              >
                <div className="feed__time">{a.t}</div>
                <div><Sev level={a.sev}>{a.sev[0].toUpperCase()}</Sev></div>
                <div>
                  <div className="feed__msg ink">{a.rule}</div>
                  <div className="dim mono" style={{ fontSize: 10 }}>{a.src} · {a.host}</div>
                </div>
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="Signals" sub="top contributors">
          <div style={{ marginBottom: 6 }} className="dim mono uppr">By detection source</div>
          <BarRow label="EDR/Carbon Black" value={62} max={100} severity="crit" suffix="%" />
          <BarRow label="NDR/Vectra" value={48} max={100} severity="high" suffix="%" />
          <BarRow label="IDP/Okta" value={37} max={100} severity="high" suffix="%" />
          <BarRow label="CASB/Netskope" value={29} max={100} severity="med" suffix="%" />
          <BarRow label="SIEM/Splunk corr." value={22} max={100} severity="med" suffix="%" />
          <BarRow label="Fraud/Acme" value={14} max={100} severity="low" suffix="%" />

          <div style={{ marginTop: 12, marginBottom: 6 }} className="dim mono uppr">Top IOCs · last hr</div>
          <dl className="kv">
            <dt>IP</dt><dd>185.244.31.0/24</dd>
            <dt>DOMAIN</dt><dd>cdn-msft-update[.]com</dd>
            <dt>HASH</dt><dd>a1c4..f7e9 (loader.dll)</dd>
            <dt>CERT-SHA1</dt><dd>3c91..0b22 (revoked)</dd>
          </dl>
        </Panel>
      </div>
    </div>
  );
}
