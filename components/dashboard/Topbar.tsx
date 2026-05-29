'use client';

import { SCREEN_TITLES } from '@/components/dashboard/Sidebar';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import type { ScreenId } from '@/lib/types';

interface TopbarProps {
  active: ScreenId;
  time: string;
  onTimeRange: (range: string) => void;
  timeRange: string;
}

export function Topbar({ active, time, onTimeRange, timeRange }: TopbarProps) {
  const title = SCREEN_TITLES[active] || '';
  const parts = title.split(' / ');

  return (
    <header className="topbar app__topbar">
      <div className="topbar__brand">
        <div className="topbar__brand-mark">C</div>
        <span>CTOC · COMMAND</span>
      </div>
      <div className="topbar__crumbs">
        <span className="dim">VIEW</span>
        <span>/</span>
        <strong>{parts[0]}</strong>
        <span className="dim">/</span>
        <strong style={{ color: 'var(--color-ink)' }}>{parts[1]}</strong>
      </div>
      <div className="topbar__spacer"></div>

      <div style={{ display: 'flex', gap: 4 }}>
        <span className="dim mono uppr" style={{ marginRight: 6, alignSelf: 'center', fontSize: 9.5 }}>RANGE</span>
        {['LIVE', '1H', '24H', '7D', '30D'].map(r => (
          <span key={r} className={`topbar__chip ${timeRange === r ? 'topbar__chip--active' : ''}`} onClick={() => onTimeRange(r)}>{r}</span>
        ))}
      </div>

      <span className="topbar__chip">⌕ SEARCH</span>
      <span className="topbar__chip">⌥ FILTERS</span>
      <span className="topbar__chip">SAVED VIEWS</span>

      <ThemeToggle />

      <div className="topbar__clock">
        <span className="live-dot"></span>
        <span className="label">UTC</span>
        <span style={{ color: 'var(--color-ink)', fontWeight: 600 }}>{time}</span>
      </div>
    </header>
  );
}
