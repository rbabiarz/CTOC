'use client';

import { useTheme } from '@/components/theme/ThemeProvider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className="theme-toggle"
      role="group"
      aria-label="Color theme"
    >
      <span className="dim mono uppr theme-toggle__label">THEME</span>
      <button
        type="button"
        className={`topbar__chip ${!isDark ? 'topbar__chip--active' : ''}`}
        aria-pressed={!isDark}
        onClick={() => setTheme('light')}
      >
        ☀ LIGHT
      </button>
      <button
        type="button"
        className={`topbar__chip ${isDark ? 'topbar__chip--active' : ''}`}
        aria-pressed={isDark}
        onClick={() => setTheme('dark')}
      >
        ☾ DARK
      </button>
    </div>
  );
}
