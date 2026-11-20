import { useEffect, useRef, useState } from 'react';
import { Sun, Moon, X, UploadCloud, Trash2, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../theme.js';
import { useStore } from '../store.jsx';

/* ---------- formatting ---------- */
export const fmtDate = (iso, opts = { day: 'numeric', month: 'short', year: 'numeric' }) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', opts);
export const fmtNrr = (n) => (n == null ? '—' : (n > 0 ? '+' : '') + n.toFixed(3));
export const initials = (name = '') => name.split(/\s+/).filter(Boolean).slice(0, 2).map((s) => s[0]).join('').toUpperCase();

/* ---------- brand ---------- */
export function Logo({ size = 18 }) {
  return (
    <span className="brand-logo">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="7.5" stroke="#fff" strokeWidth="1.8" />
        <path d="M7.2 8.6c3.1 1.5 6.5 1.5 9.6 0M7.2 15.4c3.1-1.5 6.5-1.5 9.6 0" stroke="#fff" strokeOpacity=".75" strokeWidth="1.2" strokeDasharray="1.4 1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/* Our team's crest: the uploaded logo, or initials on the team colour */
export function TeamLogo({ size = 40, team: override }) {
  const { state } = useStore();
  const team = override ?? state.team;
  const style = { width: size, height: size, borderRadius: Math.round(size * 0.26), fontSize: Math.round(size * 0.32) };
  if (team.logo) return <img className="crest" src={team.logo} alt={`${team.name} logo`} style={style} />;
  return (
    <span className="crest crest-fallback" style={{ ...style, '--tc': team.color }}>
      {team.shortName || initials(team.name)}
    </span>
  );
}

/* Opponent marks: stable muted tint derived from the name */
const TINTS = ['#2b8aa3', '#b5714a', '#7c63d4', '#3f9282', '#a68a45', '#b0657d', '#6b7385', '#4c78c4'];
export function OppMark({ name, size = '' }) {
  const tint = TINTS[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % TINTS.length];
  return <span className={`team-mark ${size}`} style={{ '--tc': tint }} title={name}>{initials(name)}</span>;
}

export function Avatar({ name, photo, size = 32 }) {
  if (photo) return <img className="avatar" src={photo} alt={name} style={{ width: size, height: size, objectFit: 'cover' }} />;
  return <span className="avatar" style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}>{initials(name)}</span>;
}

export function Form({ form }) {
  return (
    <span className="row" style={{ gap: 4 }}>
      {form.map((f, i) => <span key={i} className={`form-pill form-${f}`}>{f}</span>)}
    </span>
  );
}

const BADGE = {
  Live: 'badge-accent', Ongoing: 'badge-accent', Completed: '', Upcoming: 'badge-blue',
  Won: 'badge-green', Lost: 'badge-red', Available: 'badge-green', Injured: 'badge-red', Unavailable: 'badge-amber',
  Champions: 'badge-green', Registered: 'badge-blue',
};
export function StatusBadge({ status }) {
  return (
    <span className={`badge ${BADGE[status] ?? ''}`}>
      {(status === 'Live' || status === 'Ongoing') && <span className="live-dot" />} {status}
    </span>
  );
}

/* ---------- layout pieces ---------- */
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

export function Stat({ label, value, foot, icon: Icon, accent }) {
  return (
    <div className="card stat">
      <div className="stat-top">
        <span>{label}</span>
        <span className="stat-icon" style={accent ? { background: 'var(--brand-soft)', color: 'var(--brand-text)' } : { background: 'var(--surface-2)', color: 'var(--text-2)' }}>
          <Icon size={16} />
        </span>
      </div>
      <div className="stat-value">{value}</div>
      {foot && <div className="stat-foot">{foot}</div>}
    </div>
  );
}

export function Empty({ icon: Icon, title, text, children }) {
  return (
    <div className="empty">
      {Icon && <span className="empty-ic"><Icon size={20} /></span>}
      <b>{title}</b>
      {text && <p>{text}</p>}
      {children}
    </div>
  );
}

export function ThemeToggle({ className = 'icon-btn' }) {
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';
  return (
    <button className={className} onClick={toggle} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`} title={`Switch to ${dark ? 'light' : 'dark'} theme`}>
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

/* ---------- overlays ---------- */
function useEscape(onClose) {
  useEffect(() => {
    const h = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [onClose]);
}

export function Modal({ title, sub, onClose, children, footer, width = 520 }) {
  useEscape(onClose);
  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: width }} role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-head">
          <div><h3>{title}</h3>{sub && <p>{sub}</p>}</div>
          <button className="icon-btn ghost" onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

export function Drawer({ title, onClose, children, footer }) {
  useEscape(onClose);
  return (
    <div className="overlay drawer-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <aside className="drawer" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button className="icon-btn ghost" onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>
        <div className="drawer-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </aside>
    </div>
  );
}

export function Field({ label, hint, children, span }) {
  return (
    <label className="field" style={span ? { gridColumn: `span ${span}` } : undefined}>
      <span className="field-label">{label}</span>
      {children}
      {hint && <span className="field-hint">{hint}</span>}
    </label>
  );
}

export function Toasts() {
  const { toasts } = useStore();
  return (
    <div className="toasts" aria-live="polite">
      {toasts.map((t) => <div key={t.id} className="toast"><CheckCircle2 size={16} /> {t.text}</div>)}
    </div>
  );
}

/* ---------- image upload (logo / photo) ---------- */
// Reads an image, scales it down to max `size` px and returns a PNG data URL.
function processImage(file, size) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Not a valid image'));
      img.onload = () => {
        const scale = Math.min(1, size / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = Math.round(img.width * scale);
        c.height = Math.round(img.height * scale);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        resolve(c.toDataURL('image/png'));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export function ImageUpload({ value, onChange, label = 'Upload logo', hint = 'PNG, JPG or SVG · up to 5 MB', size = 320, round = false, preview }) {
  const input = useRef(null);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handle = async (file) => {
    setError('');
    if (!file) return;
    if (!file.type.startsWith('image/')) return setError('Please choose an image file.');
    if (file.size > 5 * 1024 * 1024) return setError('Image is larger than 5 MB.');
    setBusy(true);
    try { onChange(await processImage(file, size)); }
    catch (e) { setError(e.message); }
    finally { setBusy(false); }
  };

  return (
    <div>
      <div
        className={`dropzone${drag ? ' drag' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files[0]); }}
        onClick={() => input.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && input.current?.click()}
      >
        <div className="dz-preview" style={{ borderRadius: round ? '50%' : 14 }}>
          {value ? <img src={value} alt="" /> : preview ?? <UploadCloud size={22} />}
        </div>
        <div>
          <b>{busy ? 'Processing…' : value ? 'Replace image' : label}</b>
          <p>Drag and drop, or <span className="link">browse</span></p>
          <p className="subtle" style={{ fontSize: 12 }}>{hint}</p>
        </div>
        <input ref={input} type="file" accept="image/*" hidden onChange={(e) => { handle(e.target.files[0]); e.target.value = ''; }} />
      </div>
      <div className="row between" style={{ marginTop: 8, minHeight: 20 }}>
        <span style={{ color: 'var(--red)', fontSize: 12.5 }}>{error}</span>
        {value && (
          <button type="button" className="btn btn-sm btn-ghost" onClick={() => onChange(null)}>
            <Trash2 size={13} /> Remove
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------- route loading state ---------- */
export function PageLoader() {
  return (
    <div className="page-loader" aria-busy="true" aria-label="Loading">
      <div className="skel" style={{ width: 220, height: 26 }} />
      <div className="skel" style={{ width: 340, height: 14, marginTop: 10 }} />
      <div className="stats" style={{ marginTop: 28 }}>
        {[0, 1, 2, 3].map((i) => <div key={i} className="skel" style={{ height: 110 }} />)}
      </div>
      <div className="grid two-col" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
        <div className="skel" style={{ height: 280 }} />
        <div className="skel" style={{ height: 280 }} />
      </div>
    </div>
  );
}

/* ---------- charts ---------- */
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
