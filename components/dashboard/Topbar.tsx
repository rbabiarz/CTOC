'use client';

import { SCREEN_TITLES } from '@/components/dashboard/Sidebar';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import type { ScreenId } from '@/lib/types';

interface TopbarProps {
  active: ScreenId;
  time: string;
  onTimeRange: (range: string) => void;
  timeRange: string;
  navOpen: boolean;
  onToggleNav: () => void;
}

export function Topbar({ active, time, onTimeRange, timeRange, navOpen, onToggleNav }: TopbarProps) {
  const title = SCREEN_TITLES[active] || '';
  const parts = title.split(' / ');

  return (
    <header className="topbar app__topbar">
      <button
        type="button"
        id="nav-toggle"
        className="topbar__menu"
        aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={navOpen}
        aria-controls="primary-nav"
        onClick={onToggleNav}
      >
        <span className="topbar__menu-bars" data-open={navOpen}>
          <span></span><span></span><span></span>
        </span>
      </button>
      <div className="topbar__brand">
        <div className="topbar__brand-mark" aria-hidden="true">C</div>
        <span className="topbar__brand-text">CTOC · COMMAND</span>
      </div>
      <div className="topbar__crumbs">
        <span className="dim">VIEW</span>
        <span>/</span>
        <strong>{parts[0]}</strong>
        <span className="dim">/</span>
        <strong style={{ color: 'var(--color-ink)' }}>{parts[1]}</strong>
      </div>
      <div className="topbar__spacer"></div>

      <div className="topbar__controls">
        <div className="topbar__range" role="group" aria-label="Time range">
          <span className="dim mono uppr" id="range-label" style={{ marginRight: 6, alignSelf: 'center', fontSize: 9.5 }}>RANGE</span>
          {['LIVE', '1H', '24H', '7D', '30D'].map(r => (
            <button
              key={r}
              type="button"
              className={`topbar__chip ${timeRange === r ? 'topbar__chip--active' : ''}`}
              aria-pressed={timeRange === r}
              onClick={() => onTimeRange(r)}
            >
              {r}
            </button>
          ))}
        </div>

        <button type="button" className="topbar__chip"><span aria-hidden="true">⌕</span> SEARCH</button>
        <button type="button" className="topbar__chip"><span aria-hidden="true">⌥</span> FILTERS</button>
        <button type="button" className="topbar__chip">SAVED VIEWS</button>
      </div>

      <ThemeToggle />

      <div className="topbar__clock">
        <span className="live-dot" aria-hidden="true"></span>
        <span className="label">UTC</span>
        <span style={{ color: 'var(--color-ink)', fontWeight: 600 }}>{time}</span>
      </div>
    </header>
  );
}
