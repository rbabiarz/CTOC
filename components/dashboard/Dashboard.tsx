'use client';

import { useState, useEffect } from 'react';
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
    <div className="app">
      <Topbar active={active} time={time} onTimeRange={setTimeRange} timeRange={timeRange} />
      <Sidebar active={active} onSelect={setActive} />
      <main className="app__main">
        {Screen}
      </main>
      {alert && <TriageDrawer alert={alert} onClose={() => setAlert(null)} />}
    </div>
  );
}
