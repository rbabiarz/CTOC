'use client';

import type { Ref } from 'react';
import type { ScreenId } from '@/lib/types';

interface NavItem {
  id: ScreenId;
  label: string;
  count: string;
  dot: string;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

const NAV: NavGroup[] = [
  { group: 'OPERATIONS', items: [
    { id: 'fusion', label: 'Fusion Kill Chain', count: '7', dot: 'crit' },
    { id: 'detect', label: 'Threat Detection', count: '218', dot: 'crit' },
    { id: 'incidents', label: 'Incidents & Cases', count: '14', dot: 'high' },
    { id: 'workload', label: 'Analyst Workload', count: '8', dot: 'med' },
    { id: 'automation', label: 'Automation', count: '3.8K', dot: 'ok' },
  ]},
  { group: 'DOMAINS', items: [
    { id: 'dlp', label: 'Data Loss Prev.', count: '412', dot: 'high' },
    { id: 'intel', label: 'Threat Intel', count: '42K', dot: 'ok' },
    { id: 'money', label: 'Money Movement', count: '142', dot: 'crit' },
    { id: 'fraud', label: 'Fraud Monitoring', count: '312', dot: 'high' },
    { id: 'vuln', label: 'Vulnerabilities', count: '38', dot: 'crit' },
    { id: 'insider', label: 'Insider Threat', count: '22', dot: 'high' },
    { id: 'travel', label: 'Executive Travel', count: '22', dot: 'high' },
  ]},
  { group: 'REPORTING', items: [
    { id: 'exec', label: 'Executive Overview', count: '', dot: 'ok' },
  ]},
];

const DOT_LABEL: Record<string, string> = {
  crit: 'Critical',
  high: 'High',
  med: 'Medium',
  ok: 'Normal',
};

interface SidebarProps {
  active: ScreenId;
  onSelect: (id: ScreenId) => void;
  open?: boolean;
  /** Removed from tab order / a11y tree when the off-canvas drawer is closed on mobile. */
  hidden?: boolean;
  navRef?: Ref<HTMLElement>;
}

export function Sidebar({ active, onSelect, open = false, hidden = false, navRef }: SidebarProps) {
  return (
    <nav
      id="primary-nav"
      ref={navRef}
      aria-label="Primary"
      inert={hidden ? true : undefined}
      className={`sidebar app__sidebar ${open ? 'app__sidebar--open' : ''}`}
    >
      {NAV.map(group => {
        const headingId = `nav-group-${group.group.toLowerCase()}`;
        return (
          <div key={group.group}>
            <div className="sidebar__section" id={headingId}>{group.group}</div>
            <ul className="sidebar__list" aria-labelledby={headingId}>
              {group.items.map(item => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`sidebar__item ${active === item.id ? 'sidebar__item--active' : ''}`}
                    aria-current={active === item.id ? 'page' : undefined}
                    onClick={() => onSelect(item.id)}
                  >
                    <span className={`dot ${item.dot}`} aria-hidden="true"></span>
                    <span className="sidebar__item-label">{item.label}</span>
                    <span className="sr-only">{DOT_LABEL[item.dot] ?? 'Normal'} priority</span>
                    {item.count && (
                      <span className="count">
                        <span aria-hidden="true">{item.count}</span>
                        <span className="sr-only">{item.count} open</span>
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <div style={{ padding: '14px 14px 6px', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--color-muted-soft)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>SHIFT · A · DAY</div>
      <div style={{ padding: '0 14px 8px', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--color-body)' }}>
        M. Okafor · T2<br/>
        <span className="dim">12 open · 92% SLA</span>
      </div>
    </nav>
  );
}

export const SCREEN_TITLES: Record<ScreenId, string> = {
  fusion: 'OPS / Fusion Kill Chain',
  detect: 'OPS / Threat Detection',
  incidents: 'OPS / Incidents & Cases',
  workload: 'OPS / Analyst Workload',
  automation: 'OPS / Automation & Remediation',
  dlp: 'DOMAINS / DLP',
  intel: 'DOMAINS / Threat Intelligence',
  money: 'DOMAINS / Money Movement',
  fraud: 'DOMAINS / Fraud Monitoring',
  vuln: 'DOMAINS / Vulnerability & Patch',
  insider: 'DOMAINS / Insider Threat',
  travel: 'DOMAINS / Executive Travel',
  exec: 'REPORTING / Executive Overview',
};
