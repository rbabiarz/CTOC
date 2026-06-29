'use client';

import { Fragment } from 'react';
import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from 'react';
import type { Severity, Alert } from '@/lib/types';

interface SevProps {
  level: Severity;
  children?: ReactNode;
}

export function Sev({ level, children }: SevProps) {
  return (
    <span className={`sev sev--${level}`}>
      <span className="sq" aria-hidden="true"></span>
      {children || level.toUpperCase()}
    </span>
  );
}

interface TagProps {
  children: ReactNode;
  onClick?: () => void;
}

export function Tag({ children, onClick }: TagProps) {
  // Interactive tags must be real buttons (keyboard + role); static tags stay spans.
  if (onClick) {
    return (
      <button type="button" className="tag" style={{ cursor: 'pointer' }} onClick={onClick}>
        {children}
      </button>
    );
  }
  return <span className="tag">{children}</span>;
}

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'danger' | 'ghost';
  size?: 'xs';
  active?: boolean;
}

export function Btn({ children, variant, size, active, onClick, className, ...rest }: BtnProps) {
  const cls = ['btn'];
  if (variant) cls.push(`btn--${variant}`);
  if (size) cls.push(`btn--${size}`);
  if (active) cls.push('btn--active');
  if (className) cls.push(className);
  return (
    <button className={cls.join(' ')} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

interface PanelProps {
  title?: string;
  sub?: string;
  toolbar?: ReactNode;
  children: ReactNode;
  flush?: boolean;
  style?: CSSProperties;
  className?: string;
}

export function Panel({ title, sub, toolbar, children, flush, style, className }: PanelProps) {
  return (
    <div className={`panel ${className || ''}`} style={style}>
      {title && (
        <div className="panel__head">
          <h2 className="panel__title">{title}</h2>
          {sub && <span className="panel__sub">{sub}</span>}
          {toolbar && <span className="panel__toolbar">{toolbar}</span>}
        </div>
      )}
      <div className={`panel__body ${flush ? 'panel__body--flush' : ''}`}>{children}</div>
    </div>
  );
}

interface KPIProps {
  label: string;
  value: string;
  delta?: string;
  deltaDir?: 'up' | 'down' | 'flat';
  footer?: string;
  accent?: 'crit';
}

export function KPI({ label, value, delta, deltaDir, footer, accent }: KPIProps) {
  return (
    <div className={`kpi ${accent ? `kpi--${accent}` : ''}`}>
      <div className="kpi__label">{label}</div>
      <div className="kpi__value">
        {value}
        {delta && (
          <span className={`kpi__delta ${deltaDir || 'flat'}`}>
            <span aria-hidden="true">{deltaDir === 'up' ? '▲' : deltaDir === 'down' ? '▼' : '—'}</span> {delta}
          </span>
        )}
      </div>
      {footer && (
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--color-muted-soft)' }}>
          {footer}
        </div>
      )}
    </div>
  );
}

interface SparkProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fill?: string;
}

export function Spark({ data, width = 80, height = 22, color, fill }: SparkProps) {
  if (!data || !data.length) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1 || 1);
  const points = data.map((v, i) => [i * stepX, height - ((v - min) / range) * (height - 2) - 1]);
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const dFill = `${d} L${width},${height} L0,${height} Z`;
  const stroke = color || 'var(--color-ink)';
  return (
    <svg className="spark" width={width} height={height} aria-hidden="true" focusable="false">
      {fill && <path d={dFill} fill={fill} opacity="0.18" />}
      <path d={d} stroke={stroke} strokeWidth="1.2" fill="none" />
    </svg>
  );
}

interface BarRowProps {
  label: string;
  value: number;
  max: number;
  severity?: string;
  suffix?: string;
}

export function BarRow({ label, value, max, severity, suffix }: BarRowProps) {
  const pct = Math.min(100, Math.max(2, (value / max) * 100));
  return (
    <div className="bar-row">
      <div className="bar-row__label" title={label}>{label}</div>
      <div className="bar-row__track">
        <div className={`bar-row__fill ${severity || ''}`} style={{ width: `${pct}%` }}></div>
      </div>
      <div className="bar-row__num">{value}{suffix || ''}</div>
    </div>
  );
}

/* ===== StatusDot — colored dot + label; meaning never by color alone (1.4.1) ===== */
export type StatusTone = 'critical' | 'high' | 'warn' | 'ok' | 'info' | 'muted';

interface StatusDotProps {
  tone: StatusTone;
  children: ReactNode;
}

export function StatusDot({ tone, children }: StatusDotProps) {
  return (
    <span className={`statusdot statusdot--${tone}`}>
      <span className="statusdot__dot" aria-hidden="true"></span>
      {children}
    </span>
  );
}

/* ===== KeyValueList — semantic <dl> metadata list ===== */
interface KVItem {
  term: ReactNode;
  desc: ReactNode;
}

interface KeyValueListProps {
  items: KVItem[];
  className?: string;
  style?: CSSProperties;
}

export function KeyValueList({ items, className, style }: KeyValueListProps) {
  return (
    <dl className={`kv ${className || ''}`.trim()} style={style}>
      {items.map((it, i) => (
        <Fragment key={i}>
          <dt>{it.term}</dt>
          <dd>{it.desc}</dd>
        </Fragment>
      ))}
    </dl>
  );
}

/* ===== StepProgress — ordered workflow stepper (done · current · upcoming) ===== */
interface StepProgressProps {
  steps: string[];
  current: number;
  className?: string;
  style?: CSSProperties;
}

export function StepProgress({ steps, current, className, style }: StepProgressProps) {
  return (
    <div className={`steps ${className || ''}`.trim()} style={style}>
      {steps.map((s, i) => (
        <div key={s} className={`steps__step ${i < current ? 'done' : ''} ${i === current ? 'curr' : ''}`.trim()}>{s}</div>
      ))}
    </div>
  );
}

/* ===== Table + ClickableRow — .tbl wrapper and the keyboard-accessible row pattern ===== */
interface TableProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Table({ children, className, style }: TableProps) {
  return <table className={`tbl ${className || ''}`.trim()} style={style}>{children}</table>;
}

interface ClickableRowProps {
  onActivate: () => void;
  active?: boolean;
  ariaLabel: string;
  className?: string;
  children: ReactNode;
}

export function ClickableRow({ onActivate, active, ariaLabel, className, children }: ClickableRowProps) {
  return (
    <tr
      className={`${active ? 'is-active' : ''} ${className || ''}`.trim()}
      onClick={onActivate}
      tabIndex={0}
      aria-current={active ? 'true' : undefined}
      aria-label={ariaLabel}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onActivate(); } }}
    >
      {children}
    </tr>
  );
}

/* ===== Feed — clickable alert/event stream ===== */
interface FeedProps {
  alerts: Alert[];
  onSelect?: (a: Alert) => void;
  flagNew?: boolean;
}

export function Feed({ alerts, onSelect, flagNew }: FeedProps) {
  return (
    <div className="feed" style={{ padding: '4px 8px' }}>
      {alerts.map((a, i) => (
        <button
          key={a.id}
          type="button"
          className={`feed__item ${i === 0 && flagNew ? 'is-new' : ''}`.trim()}
          aria-label={`${a.sev} alert: ${a.rule}, ${a.src} on ${a.host} — open triage`}
          onClick={() => onSelect && onSelect(a)}
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
  );
}
