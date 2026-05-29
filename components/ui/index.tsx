'use client';

import type { CSSProperties, MouseEventHandler, ReactNode, ButtonHTMLAttributes } from 'react';
import type { Severity } from '@/lib/types';

interface SevProps {
  level: Severity;
  children?: ReactNode;
}

export function Sev({ level, children }: SevProps) {
  return (
    <span className={`sev sev--${level}`}>
      <span className="sq"></span>
      {children || level.toUpperCase()}
    </span>
  );
}

interface TagProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLSpanElement>;
}

export function Tag({ children, onClick }: TagProps) {
  return (
    <span
      className="tag"
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : undefined}
    >
      {children}
    </span>
  );
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
          <span className="panel__title">{title}</span>
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
            {deltaDir === 'up' ? '▲' : deltaDir === 'down' ? '▼' : '—'} {delta}
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
    <svg className="spark" width={width} height={height}>
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
