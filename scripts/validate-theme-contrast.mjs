#!/usr/bin/env node
/**
 * WCAG 2.1 contrast validation for CTOC light/dark theme token pairs.
 * Run: npm run validate:theme
 */

const AA_NORMAL = 4.5;
const AA_LARGE = 3;

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function luminance([r, g, b]) {
  const a = [r, g, b].map(v => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function contrast(fg, bg) {
  const l1 = luminance(hexToRgb(fg));
  const l2 = luminance(hexToRgb(bg));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const themes = {
  light: {
    '--color-body': '#2a2a2a',
    '--color-ink': '#0a0a0a',
    '--color-muted': '#595959',
    '--color-muted-soft': '#737373',
    '--color-canvas': '#fffcf5',
    '--panel-bg': '#fffefa',
    '--panel-bg-strong': '#fbf6e9',
    '--color-surface-strong': '#ebe6d6',
    '--sev-critical': '#b91c1c',
    '--sev-critical-bg': '#fde2e2',
    '--sev-high-text': '#a3331f',
    '--sev-high-bg': '#fbe5e0',
    '--sev-medium-text': '#8a5e0e',
    '--sev-medium-bg': '#fbf0d4',
    '--sev-low-bg': '#d9e8fc',
    '--color-info-text': '#1e40af',
    '--sev-resolved': '#166534',
    '--sev-resolved-bg': '#d1fae5',
    '--mitre-crit-text': '#7d1414',
    '--color-on-primary': '#ffffff',
    '--color-on-danger': '#ffffff',
    '--btn-danger-hover': '#8f1414',
    '--color-error': '#dc2626',
    '--color-success': '#15803d',
  },
  dark: {
    '--color-body': '#d4cfc4',
    '--color-ink': '#f5f2eb',
    '--color-muted': '#b8b0a4',
    '--color-muted-soft': '#9a9288',
    '--color-canvas': '#141312',
    '--panel-bg': '#1a1917',
    '--panel-bg-strong': '#222019',
    '--color-surface-strong': '#2a2724',
    '--sev-critical': '#f87171',
    '--sev-critical-bg': '#3f1515',
    '--sev-high-text': '#fecaca',
    '--sev-high-bg': '#3d1812',
    '--sev-medium-text': '#fde68a',
    '--sev-medium-bg': '#3d3010',
    '--sev-low-bg': '#1e3050',
    '--color-info-text': '#93c5fd',
    '--sev-resolved': '#4ade80',
    '--sev-resolved-bg': '#14532d',
    '--mitre-crit-text': '#fca5a5',
    '--color-on-primary': '#141312',
    '--color-on-danger': '#ffffff',
    '--btn-danger-hover': '#991b1b',
    '--color-error': '#f87171',
    '--color-success': '#4ade80',
  },
};

const checks = [
  { fg: '--color-body', bg: '--color-canvas', label: 'Body text on canvas', level: AA_NORMAL },
  { fg: '--color-ink', bg: '--color-canvas', label: 'Ink on canvas', level: AA_NORMAL },
  { fg: '--color-muted', bg: '--color-canvas', label: 'Muted on canvas', level: AA_NORMAL },
  { fg: '--color-muted-soft', bg: '--panel-bg', label: 'Muted soft on panel', level: AA_NORMAL },
  { fg: '--color-ink', bg: '--panel-bg', label: 'Ink on panel', level: AA_NORMAL },
  { fg: '--color-body', bg: '--panel-bg-strong', label: 'Body on panel strong', level: AA_NORMAL },
  { fg: '--sev-critical', bg: '--sev-critical-bg', label: 'Critical severity pill', level: AA_NORMAL },
  { fg: '--sev-high-text', bg: '--sev-high-bg', label: 'High severity pill', level: AA_NORMAL },
  { fg: '--sev-medium-text', bg: '--sev-medium-bg', label: 'Medium severity pill', level: AA_NORMAL },
  { fg: '--color-info-text', bg: '--sev-low-bg', label: 'Low severity pill', level: AA_NORMAL },
  { fg: '--sev-resolved', bg: '--sev-resolved-bg', label: 'Resolved severity pill', level: AA_NORMAL },
  { fg: '--mitre-crit-text', bg: '--sev-critical-bg', label: 'MITRE critical cell', level: AA_NORMAL },
  { fg: '--color-on-primary', bg: '--color-ink', label: 'Primary button', level: AA_NORMAL },
  { fg: '--color-on-primary', bg: '--color-ink', label: 'Primary button (large)', level: AA_LARGE },
  { fg: '--color-on-danger', bg: '--btn-danger-hover', label: 'Danger button hover', level: AA_NORMAL },
  { fg: '--color-error', bg: '--color-canvas', label: 'Error delta on canvas', level: AA_NORMAL },
  { fg: '--color-success', bg: '--color-canvas', label: 'Success delta on canvas', level: AA_NORMAL },
  { fg: '--color-on-primary', bg: '--color-ink', label: 'Active sidebar count', level: AA_NORMAL },
];

let failed = 0;

for (const [themeName, tokens] of Object.entries(themes)) {
  console.log(`\n${themeName.toUpperCase()} theme`);
  console.log('─'.repeat(60));
  for (const { fg, bg, label, level } of checks) {
    const ratio = contrast(tokens[fg], tokens[bg]);
    const pass = ratio >= level;
    const status = pass ? 'PASS' : 'FAIL';
    if (!pass) failed += 1;
    console.log(
      `${status}  ${ratio.toFixed(2)}:1 (need ${level}:1)  ${label}`,
    );
  }
}

console.log('\n' + '─'.repeat(60));
if (failed > 0) {
  console.error(`\n${failed} contrast check(s) failed.`);
  process.exit(1);
}
console.log('\nAll theme contrast checks passed (WCAG 2.1 AA).');
