import { teamById } from '../data/mock.js';

export function TeamMark({ id, size = '' }) {
  const t = teamById[id];
  return (
    <span className={`team-mark ${size}`} style={{ background: t?.color ?? '#475569' }} title={t?.name}>
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
    return <span className="badge badge-red"><span className="live-dot" /> Live</span>;
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
    green: ['var(--brand-50)', 'var(--brand)'],
    red: ['var(--ball-50)', 'var(--ball)'],
    blue: ['var(--blue-50)', 'var(--blue)'],
    amber: ['var(--amber-50)', 'var(--amber)'],
  };
  const [bg, fg] = tones[tone];
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
        <circle cx="12" cy="12" r="8" fill="#e63946" />
        <path d="M6.5 9.5c3.5 1.6 7.5 1.6 11 0M6.5 14.5c3.5-1.6 7.5-1.6 11 0" stroke="#fff" strokeWidth="1.3" strokeDasharray="1.6 1.6" />
      </svg>
    </span>
  );
}

export const fmtDate = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
export const fmtNrr = (n) => (n > 0 ? '+' : '') + n.toFixed(3);
