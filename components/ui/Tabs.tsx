'use client';

import type { ReactNode } from 'react';

/* ===== Tabs — underlined tablist ===== */
interface TabItem {
  id: string;
  label: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  ariaLabel?: string;
}

export function Tabs({ items, value, onChange, ariaLabel }: TabsProps) {
  return (
    <div className="tabs" role="tablist" aria-label={ariaLabel}>
      {items.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={value === t.id}
          className={`tabs__tab ${value === t.id ? 'is-active' : ''}`.trim()}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ===== Segmented — compact pill toggle group ===== */
interface SegOption {
  value: string;
  label: ReactNode;
}

interface SegmentedProps {
  options: SegOption[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
}

export function Segmented({ options, value, onChange, ariaLabel }: SegmentedProps) {
  return (
    <div className="segmented" role="group" aria-label={ariaLabel}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          className={`segmented__btn ${value === o.value ? 'is-active' : ''}`.trim()}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
