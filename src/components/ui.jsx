import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../theme.js';
import { teamById } from '../data/mock.js';

export function TeamMark({ id, size = '' }) {
  const t = teamById[id];
  return (
    <span className={`team-mark ${size}`} style={{ '--tc': t?.color ?? '#6b7385' }} title={t?.name}>
      {id}
    </span>
  );
}

export function Form({ form }) {
  return (
    <span className="row" style={{ gap: 4 }}>
      {form.map((f, i) => (
        <span key={i} className={`form-pill form-${f}`}>{f}</span>
      ))}
    </span>
  );
}

export function StatusBadge({ status }) {
  if (status === 'Live')
    return <span className="badge badge-accent"><span className="live-dot" /> Live</span>;
  if (status === 'Completed') return <span className="badge badge-green">Completed</span>;
  if (status === 'Upcoming') return <span className="badge badge-blue">Upcoming</span>;
  if (status === 'Fit') return <span className="badge badge-green">Fit</span>;
  if (status === 'Doubtful') return <span className="badge badge-amber">Doubtful</span>;
  if (status === 'Injured') return <span className="badge badge-red">Injured</span>;
  return <span className="badge">{status}</span>;
}

export function PageHead({ title, sub, children }) {
  return (
    <div className="page-head">
      <div>
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
      {children && <div className="row wrap">{children}</div>}
    </div>
  );
}

export function Stat({ label, value, foot, icon: Icon, tone = 'green' }) {
  const tones = {
    green: ['var(--brand-soft)', 'var(--brand-text)'],
    red: ['var(--red-soft)', 'var(--red)'],
    blue: ['var(--blue-soft)', 'var(--blue)'],
    amber: ['var(--amber-soft)', 'var(--amber)'],
  };
  const [bg, fg] = tone === 'accent' ? tones.green : ['var(--surface-2)', 'var(--text-2)'];
  return (
    <div className="card stat">
      <div className="stat-top">
        <span>{label}</span>
        <span className="stat-icon" style={{ background: bg, color: fg }}><Icon size={17} /></span>
      </div>
      <div className="stat-value">{value}</div>
      {foot && <div className="stat-foot">{foot}</div>}
    </div>
  );
}

export function Logo({ size = 20 }) {
  return (
    <span className="brand-logo">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="7.5" stroke="#fff" strokeWidth="1.8" />
        <path d="M7.2 8.6c3.1 1.5 6.5 1.5 9.6 0M7.2 15.4c3.1-1.5 6.5-1.5 9.6 0" stroke="#fff" strokeOpacity=".75" strokeWidth="1.2" strokeDasharray="1.4 1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export const fmtDate = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
export const fmtNrr = (n) => (n > 0 ? '+' : '') + n.toFixed(3);

// ---- Theme toggle ----

export function ThemeToggle({ className = 'icon-btn' }) {
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';
  return (
    <button className={className} onClick={toggle} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`} title={`Switch to ${dark ? 'light' : 'dark'} theme`}>
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

// ---- Chart presets (theme-aware through CSS variables) ----
export const chart = {
  grid: { vertical: false, stroke: 'var(--chart-grid)' },
  axis: { tickLine: false, axisLine: false, tick: { fontSize: 12, fill: 'var(--text-3)' } },
  tooltip: {
    cursor: { fill: 'var(--surface-2)' },
    contentStyle: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12.5, color: 'var(--text)' },
    labelStyle: { color: 'var(--text)', fontWeight: 500 },
    itemStyle: { color: 'var(--text-2)' },
  },
  legend: { iconType: 'circle', iconSize: 8, wrapperStyle: { fontSize: 12.5, paddingTop: 8 } },
};
