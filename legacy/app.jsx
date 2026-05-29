/* app.jsx — app shell, routing, sidebar, topbar */

const { useState: useStateA, useEffect: useEffectA } = React;

const NAV = [
  { group: 'OPERATIONS', items: [
    { id: 'fusion', label: 'Fusion Kill Chain', count: '7', dot: 'crit' },
    { id: 'detect', label: 'Threat Detection', count: '218', dot: 'crit' },
    { id: 'incidents', label: 'Incidents & Cases', count: '14', dot: 'high' },
    { id: 'workload', label: 'Analyst Workload', count: '8', dot: 'med' },
    { id: 'automation', label: 'Automation', count: '3.8K', dot: 'ok' },
  ]},
  { group: 'DOMAINS', items: [
    { id: 'dlp', label: 'Data Loss Prev.', count: '412', dot: 'high' },
    { id: 'intel', label: 'Threat Intel', count: '42K', dot: 'ok' },
    { id: 'money', label: 'Money Movement', count: '142', dot: 'crit' },
    { id: 'fraud', label: 'Fraud Monitoring', count: '312', dot: 'high' },
    { id: 'vuln', label: 'Vulnerabilities', count: '38', dot: 'crit' },
    { id: 'insider', label: 'Insider Threat', count: '22', dot: 'high' },
    { id: 'travel', label: 'Executive Travel', count: '22', dot: 'high' },
  ]},
  { group: 'REPORTING', items: [
    { id: 'exec', label: 'Executive Overview', count: '', dot: 'ok' },
  ]},
];

const SCREEN_TITLES = {
  fusion: 'OPS / Fusion Kill Chain',
  detect: 'OPS / Threat Detection',
  incidents: 'OPS / Incidents & Cases',
  workload: 'OPS / Analyst Workload',
  automation: 'OPS / Automation & Remediation',
  dlp: 'DOMAINS / DLP',
  intel: 'DOMAINS / Threat Intelligence',
  money: 'DOMAINS / Money Movement',
  fraud: 'DOMAINS / Fraud Monitoring',
  vuln: 'DOMAINS / Vulnerability & Patch',
  insider: 'DOMAINS / Insider Threat',
  travel: 'DOMAINS / Executive Travel',
  exec: 'REPORTING / Executive Overview',
};

const Sidebar = ({ active, onSelect }) => (
  <nav className="sidebar app__sidebar">
    {NAV.map(group => (
      <div key={group.group}>
        <div className="sidebar__section">{group.group}</div>
        {group.items.map(item => (
          <div
            key={item.id}
            className={`sidebar__item ${active === item.id ? 'sidebar__item--active' : ''}`}
            onClick={() => onSelect(item.id)}
          >
            <span className={`dot ${item.dot}`}></span>
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
            {item.count && <span className="count">{item.count}</span>}
          </div>
        ))}
      </div>
    ))}
    <div style={{ padding: '14px 14px 6px', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--color-muted-soft)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>SHIFT · A · DAY</div>
    <div style={{ padding: '0 14px 8px', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--color-body)' }}>
      M. Okafor · T2<br/>
      <span className="dim">12 open · 92% SLA</span>
    </div>
  </nav>
);

const Topbar = ({ active, time, onTimeRange, timeRange }) => {
  return (
    <header className="topbar app__topbar">
      <div className="topbar__brand">
        <div className="topbar__brand-mark">C</div>
        <span>CTOC · COMMAND</span>
      </div>
      <div className="topbar__crumbs">
        <span className="dim">VIEW</span>
        <span>/</span>
        <strong>{(SCREEN_TITLES[active] || '').split(' / ')[0]}</strong>
        <span className="dim">/</span>
        <strong style={{ color: 'var(--color-ink)' }}>{(SCREEN_TITLES[active] || '').split(' / ')[1]}</strong>
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

      <div className="topbar__clock">
        <span className="live-dot"></span>
        <span className="label">UTC</span>
        <span style={{ color: 'var(--color-ink)', fontWeight: 600 }}>{time}</span>
      </div>
    </header>
  );
};

/* ===== App ===== */
const App = () => {
  const [active, setActive] = useStateA('fusion');
  const [alert, setAlert] = useStateA(null);
  const [timeRange, setTimeRange] = useStateA('LIVE');
  const [time, setTime] = useStateA('14:42:08');

  useEffectA(() => {
    const tick = () => {
      const d = new Date();
      setTime(`${String(d.getUTCHours()).padStart(2,'0')}:${String(d.getUTCMinutes()).padStart(2,'0')}:${String(d.getUTCSeconds()).padStart(2,'0')}`);
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  // Esc closes drawer
  useEffectA(() => {
    const onKey = (e) => { if (e.key === 'Escape') setAlert(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  let Screen;
  switch (active) {
    case 'fusion':     Screen = <KillChainScreen onOpenAlert={setAlert} />; break;
    case 'detect':     Screen = <ThreatDetectionScreen onOpenAlert={setAlert} />; break;
    case 'incidents':  Screen = <IncidentsScreen onOpenAlert={setAlert} />; break;
    case 'workload':   Screen = <WorkloadScreen />; break;
    case 'automation': Screen = <AutomationScreen />; break;
    case 'dlp':        Screen = <DLPScreen />; break;
    case 'intel':      Screen = <IntelScreen />; break;
    case 'money':      Screen = <MoneyScreen />; break;
    case 'fraud':      Screen = <FraudScreen />; break;
    case 'vuln':       Screen = <VulnScreen />; break;
    case 'insider':    Screen = <InsiderScreen />; break;
    case 'travel':     Screen = <TravelScreen />; break;
    case 'exec':       Screen = <ExecScreen />; break;
    default:           Screen = <KillChainScreen onOpenAlert={setAlert} />;
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
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
