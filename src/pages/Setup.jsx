import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, MapPin, CalendarDays } from 'lucide-react';
import { Logo, TeamLogo, ImageUpload, Field, ThemeToggle } from '../components/ui.jsx';
import { useStore } from '../store.jsx';

export const TEAM_COLORS = ['#3e5bd8', '#6e56cf', '#2b8aa3', '#3f9282', '#b5714a', '#a68a45', '#b0657d', '#3b4252'];

const STEPS = [
  { title: 'Team identity', text: 'Name, logo and colours' },
  { title: 'Home & details', text: 'Where your team plays' },
  { title: 'Team manager', text: 'Who runs the team' },
];

export default function Setup() {
  const { state, dispatch, notify } = useStore();
  const navigate = useNavigate();
  const manager = state.staff.find((s) => s.role === 'Team Manager');
  const [step, setStep] = useState(0);
  const [f, setF] = useState({
    ...state.team,
    managerName: manager?.name ?? '',
    managerEmail: manager?.email ?? '',
    managerPhone: manager?.phone ?? '',
  });
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e?.target ? e.target.value : e }));
  const canNext = step === 0 ? f.name.trim() && f.shortName.trim() : step === 1 ? f.homeGround.trim() : f.managerName.trim();

  const finish = () => {
    const { managerName, managerEmail, managerPhone, ...team } = f;
    dispatch({ type: 'team/update', payload: { ...team, shortName: team.shortName.toUpperCase().slice(0, 4), founded: Number(team.founded) || team.founded } });
    if (manager) dispatch({ type: 'staff/remove', payload: manager.id });
    dispatch({ type: 'staff/add', payload: { name: managerName, role: 'Team Manager', email: managerEmail, phone: managerPhone } });
    notify(`${team.name} is ready`);
    navigate('/app');
  };

  return (
    <div className="setup">
      <aside className="setup-side">
        <Link to="/" className="brand"><Logo /><span className="brand-name">Crickit</span></Link>
        <div>
          <h2 style={{ fontSize: 20, letterSpacing: '-0.03em' }}>Set up your team</h2>
          <p className="muted" style={{ marginTop: 6, fontSize: 13.5 }}>Takes about a minute. You can change everything later in Team Profile.</p>
        </div>
        <div className="steps-v">
          {STEPS.map((s, i) => (
            <div key={s.title} className={`step-v${i === step ? ' on' : ''}${i < step ? ' done' : ''}`}>
              <span className="num">{i < step ? <Check size={13} /> : i + 1}</span>
              <div><b>{s.title}</b><span>{s.text}</span></div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'auto' }}>
          <div className="section-title" style={{ marginTop: 0 }}>Preview</div>
          <div className="preview-card">
            <TeamLogo size={48} team={f} />
            <div style={{ minWidth: 0 }}>
              <b style={{ display: 'block' }}>{f.name || 'Your team name'}</b>
              <span className="subtle" style={{ fontSize: 12.5 }}>{f.homeGround || 'Home ground'} · Est. {f.founded || '—'}</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="setup-main">
        <div style={{ position: 'absolute', top: 20, right: 20 }}><ThemeToggle /></div>
        <div className="setup-card">
          <span className="kicker">Step {step + 1} of {STEPS.length}</span>
          <h1 style={{ fontSize: 28, letterSpacing: '-0.035em', marginTop: 8 }}>{STEPS[step].title}</h1>

          <div className="card" style={{ padding: 24, marginTop: 20 }}>
            {step === 0 && (
              <div className="form-grid">
                <div style={{ gridColumn: 'span 2' }}>
                  <span className="field-label" style={{ display: 'block', marginBottom: 6 }}>Team logo</span>
                  <ImageUpload value={f.logo} onChange={set('logo')} preview={<TeamLogo size={72} team={{ ...f, logo: null }} />} />
                </div>
                <Field label="Team name" span={2}><input className="input" value={f.name} onChange={set('name')} placeholder="e.g. Strikers Cricket Club" autoFocus /></Field>
                <Field label="Short name" hint="2–4 letters, shown on scorecards"><input className="input" value={f.shortName} maxLength={4} onChange={set('shortName')} placeholder="SCC" style={{ textTransform: 'uppercase' }} /></Field>
                <Field label="Motto (optional)"><input className="input" value={f.motto} onChange={set('motto')} placeholder="Play hard. Play fair." /></Field>
                <div style={{ gridColumn: 'span 2' }}>
                  <span className="field-label" style={{ display: 'block', marginBottom: 8 }}>Team colour</span>
                  <div className="color-row">
                    {TEAM_COLORS.map((c) => (
                      <button type="button" key={c} className={`swatch${f.color === c ? ' on' : ''}`} style={{ background: c }} onClick={() => set('color')(c)} aria-label={`Colour ${c}`} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="form-grid">
                <Field label="Home ground" span={2}>
                  <div className="search" style={{ maxWidth: 'none', height: 40 }}><MapPin size={15} /><input value={f.homeGround} onChange={set('homeGround')} placeholder="Ground name" /></div>
                </Field>
                <Field label="City"><input className="input" value={f.city} onChange={set('city')} placeholder="City" /></Field>
                <Field label="Founded">
                  <div className="search" style={{ maxWidth: 'none', height: 40 }}><CalendarDays size={15} /><input type="number" value={f.founded} onChange={set('founded')} placeholder="2019" /></div>
                </Field>
              </div>
            )}
            {step === 2 && (
              <div className="form-grid">
                <Field label="Your name" span={2}><input className="input" value={f.managerName} onChange={set('managerName')} placeholder="Full name" /></Field>
                <Field label="Email"><input className="input" type="email" value={f.managerEmail} onChange={set('managerEmail')} placeholder="you@club.com" /></Field>
                <Field label="Phone"><input className="input" value={f.managerPhone} onChange={set('managerPhone')} placeholder="+91 …" /></Field>
                <p className="subtle" style={{ gridColumn: 'span 2', fontSize: 13 }}>
                  As team manager you can add players and staff, enter competitions, schedule matches and pick the playing XI.
                </p>
              </div>
            )}
          </div>

          <div className="row between" style={{ marginTop: 20 }}>
            {step > 0
              ? <button className="btn" onClick={() => setStep(step - 1)}><ArrowLeft size={15} /> Back</button>
              : <Link to="/" className="btn btn-ghost"><ArrowLeft size={15} /> Cancel</Link>}
            {step < STEPS.length - 1
              ? <button className="btn btn-primary" disabled={!canNext} onClick={() => setStep(step + 1)}>Continue <ArrowRight size={15} /></button>
              : <button className="btn btn-primary" disabled={!canNext} onClick={finish}><Check size={15} /> Create team</button>}
          </div>
        </div>
      </main>
    </div>
  );
}
