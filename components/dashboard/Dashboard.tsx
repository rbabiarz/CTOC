'use client';

import { useState, useEffect, useRef } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Topbar } from '@/components/dashboard/Topbar';
import { KillChainScreen } from '@/components/kill-chain';
import { TriageDrawer } from '@/components/triage/TriageDrawer';
import {
  ThreatDetectionScreen,
  IncidentsScreen,
  WorkloadScreen,
  AutomationScreen,
  MoneyScreen,
  FraudScreen,
} from '@/components/screens/operations';
import {
  DLPScreen,
  IntelScreen,
  VulnScreen,
  InsiderScreen,
  TravelScreen,
  ExecScreen,
} from '@/components/screens/domains';
import type { Alert, ScreenId } from '@/lib/types';

export function Dashboard() {
  const [active, setActive] = useState<ScreenId>('fusion');
  const [alert, setAlert] = useState<Alert | null>(null);
  const [timeRange, setTimeRange] = useState('LIVE');
  const [time, setTime] = useState('14:42:08');
  const [navOpen, setNavOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const navWasOpen = useRef(false);

  // Track whether the sidebar is in off-canvas (drawer) mode.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const update = () => setIsCompact(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Escape closes the off-canvas nav
  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setNavOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navOpen]);

  // Off-canvas nav focus management (2.4.3): move focus into the drawer on open,
  // restore it to the toggle on close.
  useEffect(() => {
    if (!isCompact) return;
    if (navOpen) {
      navWasOpen.current = true;
      const first = navRef.current?.querySelector<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])');
      first?.focus();
    } else if (navWasOpen.current) {
      navWasOpen.current = false;
      document.getElementById('nav-toggle')?.focus();
    }
  }, [navOpen, isCompact]);

  const selectScreen = (id: ScreenId) => {
    setActive(id);
    setNavOpen(false); // collapse the drawer after navigating on mobile
  };

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(`${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}:${String(d.getUTCSeconds()).padStart(2, '0')}`);
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setAlert(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  let Screen;
  switch (active) {
    case 'fusion':
      Screen = <KillChainScreen onOpenAlert={setAlert} />;
      break;
    case 'detect':
      Screen = <ThreatDetectionScreen onOpenAlert={setAlert} />;
      break;
    case 'incidents':
      Screen = <IncidentsScreen onOpenAlert={setAlert} />;
      break;
    case 'workload':
      Screen = <WorkloadScreen />;
      break;
    case 'automation':
      Screen = <AutomationScreen />;
      break;
    case 'dlp':
      Screen = <DLPScreen />;
      break;
    case 'intel':
      Screen = <IntelScreen />;
      break;
    case 'money':
      Screen = <MoneyScreen />;
      break;
    case 'fraud':
      Screen = <FraudScreen />;
      break;
    case 'vuln':
      Screen = <VulnScreen />;
      break;
    case 'insider':
      Screen = <InsiderScreen />;
      break;
    case 'travel':
      Screen = <TravelScreen />;
      break;
    case 'exec':
      Screen = <ExecScreen />;
      break;
    default:
      Screen = <KillChainScreen onOpenAlert={setAlert} />;
  }

  return (
    <div className={`app ${navOpen ? 'app--nav-open' : ''}`}>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Topbar
        active={active}
        time={time}
        onTimeRange={setTimeRange}
        timeRange={timeRange}
        navOpen={navOpen}
        onToggleNav={() => setNavOpen(o => !o)}
      />
      <Sidebar
        active={active}
        onSelect={selectScreen}
        open={navOpen}
        hidden={isCompact && !navOpen}
        navRef={navRef}
      />
      {navOpen && (
        <div
          className="nav-scrim"
          aria-hidden="true"
          onClick={() => setNavOpen(false)}
        />
      )}
      <main
        className="app__main"
        id="main-content"
        tabIndex={-1}
        inert={isCompact && navOpen ? true : undefined}
      >
        {Screen}
      </main>
      {alert && <TriageDrawer alert={alert} onClose={() => setAlert(null)} />}
    </div>
  );
}
