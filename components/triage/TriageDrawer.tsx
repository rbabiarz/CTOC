'use client';

import { useState, useRef, useEffect } from 'react';
import { Btn, Sev, Tag, StepProgress, Table, Textarea } from '@/components/ui';
import { KILL_CHAIN_STAGES } from '@/lib/mock-data';
import type { Alert } from '@/lib/types';

const TRIAGE_STEPS = ['DETECT', 'TRIAGE', 'INVESTIGATE', 'ESCALATE', 'CONTAIN', 'RESOLVE'];

interface TriageDrawerProps {
  alert: Alert | null;
  onClose: () => void;
  onAdvance?: () => void;
}

export function TriageDrawer({ alert, onClose }: TriageDrawerProps) {
  const [step, setStep] = useState(1);
  const [note, setNote] = useState('');
  const drawerRef = useRef<HTMLElement>(null);

  // Modal dialog focus management (WCAG 2.4.3, 2.1.2, 4.1.2):
  // move focus into the dialog, trap Tab within it, restore focus to the trigger on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    drawerRef.current?.focus();

    const node = drawerRef.current;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !node) return;
      const focusable = Array.from(
        node.querySelectorAll<HTMLElement>(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    node?.addEventListener('keydown', onKeyDown);
    return () => {
      node?.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, []);

  if (!alert) return null;

  const advance = () => setStep(s => Math.min(TRIAGE_STEPS.length - 1, s + 1));
  const back = () => setStep(s => Math.max(0, s - 1));

  return (
    <>
      <div className="drawer-mask" onClick={onClose} aria-hidden="true"></div>
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        tabIndex={-1}
        ref={drawerRef}
      >
        <div className="drawer__head">
          <div>
            <div className="drawer__id">{alert.id} · {alert.src}</div>
            <h2 className="drawer__title" id="drawer-title">{alert.rule}</h2>
            <div style={{ display: 'flex', gap: 6, marginTop: 6, alignItems: 'center' }}>
              <Sev level={alert.sev} />
              <Tag>STAGE {alert.stage}/7</Tag>
              <Tag>CONF {alert.conf}%</Tag>
              <Tag>{alert.status.toUpperCase()}</Tag>
              {alert.campaign && alert.campaign !== '—' && <Tag>{alert.campaign}</Tag>}
            </div>
          </div>
          <Btn variant="ghost" size="xs" onClick={onClose} className="drawer__close"><span aria-hidden="true">✕</span> CLOSE</Btn>
        </div>

        <div className="drawer__body">
          <div className="drawer__section">
            <h3 className="drawer__section-title">Triage workflow</h3>
            <StepProgress steps={TRIAGE_STEPS} current={step} />
            <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
              <Btn size="xs" onClick={back}>◀ BACK</Btn>
              <Btn size="xs" variant="primary" onClick={advance}>ADVANCE ▶ {TRIAGE_STEPS[Math.min(step + 1, TRIAGE_STEPS.length - 1)]}</Btn>
              <Btn size="xs">ASSIGN</Btn>
              <Btn size="xs" variant="danger">ESCALATE</Btn>
            </div>
          </div>

          <div className="drawer__section">
            <h3 className="drawer__section-title">Alert context</h3>
            <dl className="drawer__meta">
              <dt>Host</dt><dd>{alert.host}</dd>
              <dt>First seen</dt><dd>2026-05-26 {alert.t} UTC</dd>
              <dt>Detector</dt><dd>{alert.src}</dd>
              <dt>Stage</dt><dd>{alert.stage}/7 · {KILL_CHAIN_STAGES[alert.stage - 1].name}</dd>
              <dt>Confidence</dt><dd>{alert.conf}% (fusion model v3)</dd>
              <dt>Assigned</dt><dd>{alert.assigned}</dd>
              <dt>Campaign</dt><dd>{alert.campaign}</dd>
              <dt>SLA</dt><dd>{alert.sev === 'critical' ? '15 min' : alert.sev === 'high' ? '30 min' : '2 hr'} (P{alert.sev === 'critical' ? '1' : alert.sev === 'high' ? '2' : '3'})</dd>
            </dl>
          </div>

          <div className="drawer__section">
            <h3 className="drawer__section-title">Related signals (last 30m)</h3>
            <Table style={{ fontSize: 11 }}>
              <thead>
                <tr><th>Time</th><th>Source</th><th>Signal</th><th className="num">Score</th></tr>
              </thead>
              <tbody>
                <tr><td className="mono">14:42:08</td><td className="mono dim">EDR</td><td>LSASS handle acquired (T1003)</td><td className="num">92</td></tr>
                <tr><td className="mono">14:41:52</td><td className="mono dim">NDR</td><td>DCSync RPC pattern</td><td className="num">89</td></tr>
                <tr><td className="mono">14:39:18</td><td className="mono dim">CASB</td><td>Egress 2.3GB to cdn-msft-update[.]com</td><td className="num">94</td></tr>
                <tr><td className="mono">14:36:12</td><td className="mono dim">EDR</td><td>winword.exe → cmd.exe injection</td><td className="num">78</td></tr>
                <tr><td className="mono">14:24:11</td><td className="mono dim">IDP</td><td>MFA bypass attempt (svc-acct)</td><td className="num">67</td></tr>
              </tbody>
            </Table>
          </div>

          <div className="drawer__section">
            <h3 className="drawer__section-title">Recommended playbooks</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[
                { id: 'PB-CRED-12', name: 'Credential access — isolate + force rotation', conf: 0.91, mins: 3.2 },
                { id: 'PB-EXFIL-04', name: 'Exfiltration — egress block + DLP retro-scan', conf: 0.84, mins: 4.8 },
                { id: 'PB-IDP-22', name: 'Identity — invalidate sessions, enforce step-up', conf: 0.79, mins: 1.4 },
              ].map(p => (
                <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 60px 90px', gap: 8, alignItems: 'center', padding: '5px 8px', border: '1px solid var(--hairline)', borderRadius: 3, background: 'var(--panel-bg-strong)' }}>
                  <span className="mono" style={{ fontSize: 10.5 }}>{p.id}</span>
                  <span style={{ fontSize: 12 }}>{p.name}</span>
                  <span className="mono num" style={{ fontSize: 10.5, color: 'var(--color-muted)' }}>{Math.round(p.conf * 100)}%</span>
                  <Btn size="xs" variant="primary">RUN ▶ {p.mins}m</Btn>
                </div>
              ))}
            </div>
          </div>

          <div className="drawer__section">
            <h3 className="drawer__section-title" id="analyst-notes-label">Analyst notes</h3>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              aria-labelledby="analyst-notes-label"
              placeholder="Add observation, IOC, escalation reason…"
            />
          </div>
        </div>

        <div className="drawer__actions">
          <Btn size="xs">VIEW IN SIEM</Btn>
          <Btn size="xs">DOWNLOAD EVIDENCE</Btn>
          <Btn size="xs">CREATE CASE</Btn>
          <span style={{ flex: 1 }}></span>
          <Btn size="xs">MARK FALSE POSITIVE</Btn>
          <Btn size="xs" variant="primary">SAVE & CLOSE</Btn>
        </div>
      </aside>
    </>
  );
}
