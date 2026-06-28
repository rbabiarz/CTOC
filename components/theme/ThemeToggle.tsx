'use client';

import { useTheme } from '@/components/theme/ThemeProvider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle topbar__chip"
      aria-pressed={isDark}
      aria-label="Dark theme"
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <span aria-hidden="true">{isDark ? '☾' : '☀'}</span>
    </button>
  );
}
