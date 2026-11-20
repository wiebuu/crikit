import { useState } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import { PageHead, TeamLogo, ImageUpload, Field } from '../components/ui.jsx';
import { useStore } from '../store.jsx';
import { TEAM_COLORS } from './Setup.jsx';

export default function TeamProfile() {
  const { state, dispatch, notify } = useStore();
  const [f, setF] = useState(state.team);
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e?.target ? e.target.value : e }));
  const dirty = JSON.stringify(f) !== JSON.stringify(state.team);
  const available = state.players;

  const save = () => {
    dispatch({ type: 'team/update', payload: { ...f, shortName: f.shortName.toUpperCase().slice(0, 4), founded: Number(f.founded) || f.founded } });
    notify('Team profile saved');
  };

  return (
    <>
      <PageHead title="Team Profile" sub="Your club’s identity, home ground and leadership.">
        <button className="btn" disabled={!dirty} onClick={() => setF(state.team)}><RotateCcw size={15} /> Discard</button>
        <button className="btn btn-primary" disabled={!dirty || !f.name.trim()} onClick={save}><Save size={15} /> Save changes</button>
      </PageHead>

      <div className="grid two-col" style={{ gridTemplateColumns: '1.5fr 1fr', alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: 16 }}>
          <div className="card">
            <div className="card-head"><h3>Identity</h3></div>
            <div className="card-body form-grid">
              <div style={{ gridColumn: 'span 2' }}>
                <span className="field-label" style={{ display: 'block', marginBottom: 6 }}>Team logo</span>
                <ImageUpload value={f.logo} onChange={set('logo')} preview={<TeamLogo size={72} team={{ ...f, logo: null }} />} />
              </div>
              <Field label="Team name" span={2}><input className="input" value={f.name} onChange={set('name')} /></Field>
              <Field label="Short name" hint="2–4 letters"><input className="input" value={f.shortName} maxLength={4} onChange={set('shortName')} style={{ textTransform: 'uppercase' }} /></Field>
              <Field label="Motto"><input className="input" value={f.motto} onChange={set('motto')} /></Field>
              <div style={{ gridColumn: 'span 2' }}>
                <span className="field-label" style={{ display: 'block', marginBottom: 8 }}>Team colour</span>
                <div className="color-row">
                  {TEAM_COLORS.map((c) => <button type="button" key={c} className={`swatch${f.color === c ? ' on' : ''}`} style={{ background: c }} onClick={() => set('color')(c)} aria-label={`Colour ${c}`} />)}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-head"><h3>Home & history</h3></div>
            <div className="card-body form-grid">
              <Field label="Home ground" span={2}><input className="input" value={f.homeGround} onChange={set('homeGround')} /></Field>
              <Field label="City"><input className="input" value={f.city} onChange={set('city')} /></Field>
              <Field label="Founded"><input className="input" type="number" value={f.founded} onChange={set('founded')} /></Field>
            </div>
          </div>

          <div className="card">
            <div className="card-head"><h3>Leadership</h3></div>
            <div className="card-body form-grid">
              {[['captainId', 'Captain'], ['viceCaptainId', 'Vice-captain'], ['keeperId', 'First-choice wicket-keeper']].map(([k, label]) => (
                <Field key={k} label={label} span={k === 'keeperId' ? 2 : 1}>
                  <select className="select" value={f[k] ?? ''} onChange={set(k)}>
                    {available.filter((p) => k !== 'keeperId' || p.role === 'Wicket-keeper').map((p) => <option key={p.id} value={p.id}>#{p.jersey} {p.name}</option>)}
                  </select>
                </Field>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16, position: 'sticky', top: 84 }}>
          <div className="card">
            <div className="card-head"><h3>Preview</h3></div>
            <div className="card-body" style={{ display: 'grid', justifyItems: 'center', textAlign: 'center', gap: 10, padding: 28 }}>
              <TeamLogo size={96} team={f} />
              <h2 style={{ fontSize: 20, letterSpacing: '-0.03em', marginTop: 6 }}>{f.name || 'Team name'}</h2>
              <span className="badge mono">{(f.shortName || '—').toUpperCase()}</span>
              {f.motto && <p className="muted" style={{ fontStyle: 'italic' }}>“{f.motto}”</p>}
              <p className="subtle" style={{ fontSize: 13 }}>{f.homeGround} · {f.city} · Est. {f.founded}</p>
            </div>
          </div>
          <div className="card">
            <div className="card-head"><h3>Demo data</h3></div>
            <div className="card-body">
              <p className="muted" style={{ fontSize: 13.5 }}>Changes are saved in this browser. Reset to restore the original sample team.</p>
              <button className="btn" style={{ marginTop: 12 }} onClick={() => { dispatch({ type: 'reset' }); setTimeout(() => window.location.reload(), 50); }}>
                <RotateCcw size={15} /> Reset sample data
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
