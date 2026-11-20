import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Flag, Trophy, CalendarDays, Users, Building2, Medal } from 'lucide-react';
import { PageHead, StatusBadge, Modal, Drawer, Field, OppMark, fmtDate, fmtNrr, Empty } from '../components/ui.jsx';
import { useStore } from '../store.jsx';
import { FORMATS, COMP_TYPES } from '../data/seed.js';
import { ordinal } from './Overview.jsx';

function CompForm({ onClose }) {
  const { dispatch, notify } = useStore();
  const [f, setF] = useState({ name: '', organiser: '', format: 'T20', type: 'League', start: '', end: '', teams: '' });
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  const valid = f.name.trim() && f.start && f.end && f.end >= f.start;
  const save = () => {
    dispatch({ type: 'comp/add', payload: { ...f, name: f.name.trim(), teams: Number(f.teams) || null } });
    notify(`Entered ${f.name.trim()}`);
    onClose();
  };
  return (
    <Modal title="Enter a competition" sub="Register your team for a league, cup or series." onClose={onClose} width={580}
      footer={<><button className="btn" onClick={onClose}>Cancel</button><button className="btn btn-primary" disabled={!valid} onClick={save}><Flag size={15} /> Enter competition</button></>}>
      <div className="form-grid">
        <Field label="Competition name" span={2}><input className="input" value={f.name} onChange={set('name')} autoFocus placeholder="e.g. Summer T20 Cup" /></Field>
        <Field label="Organised by" span={2}><input className="input" value={f.organiser} onChange={set('organiser')} placeholder="Association, club or council" /></Field>
        <Field label="Format"><select className="select" value={f.format} onChange={set('format')}>{FORMATS.map((x) => <option key={x}>{x}</option>)}</select></Field>
        <Field label="Type"><select className="select" value={f.type} onChange={set('type')}>{COMP_TYPES.map((x) => <option key={x}>{x}</option>)}</select></Field>
        <Field label="Starts"><input className="input" type="date" value={f.start} onChange={set('start')} /></Field>
        <Field label="Ends" hint={f.end && f.start && f.end < f.start ? 'End date is before the start date.' : ' '}><input className="input" type="date" value={f.end} onChange={set('end')} /></Field>
        <Field label="Number of teams"><input className="input" type="number" min="2" value={f.teams} onChange={set('teams')} placeholder="e.g. 12" /></Field>
      </div>
    </Modal>
  );
}

function CompDrawer({ c, onClose }) {
  const { state } = useStore();
  const ms = state.matches.filter((m) => m.compId === c.id).sort((a, b) => a.date.localeCompare(b.date));
  return (
    <Drawer title="Competition" onClose={onClose}>
      <div className="row" style={{ alignItems: 'flex-start' }}>
        <span className="comp-icon" style={{ width: 48, height: 48 }}><Trophy size={20} /></span>
        <div>
          <h2 style={{ fontSize: 20, letterSpacing: '-0.03em' }}>{c.name}</h2>
          <div className="row" style={{ gap: 6, marginTop: 6 }}><StatusBadge status={c.status} />{c.result && <StatusBadge status={c.result} />}</div>
        </div>
      </div>
      <div className="kv-grid">
        <div><span>Organiser</span><b>{c.organiser || '—'}</b></div>
        <div><span>Format</span><b>{c.format} · {c.type}</b></div>
        <div><span>Dates</span><b>{fmtDate(c.start, { day: 'numeric', month: 'short' })} – {fmtDate(c.end)}</b></div>
        <div><span>Teams</span><b>{c.teams ?? '—'}</b></div>
        <div><span>Current stage</span><b>{c.stage}</b></div>
        <div><span>Our position</span><b>{c.position ? `${ordinal(c.position)} of ${c.teams}` : '—'}</b></div>
      </div>
      {c.p > 0 && (
        <>
          <div className="section-title">Our record</div>
          <div className="comp-kpis" style={{ marginTop: 0 }}>
            <div><b>{c.p}</b><span>Played</span></div>
            <div><b style={{ color: 'var(--success)' }}>{c.w}</b><span>Won</span></div>
            <div><b>{c.l}</b><span>Lost</span></div>
            <div><b>{c.pts ?? fmtNrr(c.nrr)}</b><span>{c.pts != null ? 'Points' : 'NRR'}</span></div>
          </div>
          {c.nrr != null && <p className="subtle" style={{ fontSize: 12.5, marginTop: 8 }}>Net run rate {fmtNrr(c.nrr)}</p>}
        </>
      )}
      <div className="section-title">Our matches</div>
      {ms.length ? (
        <div className="card" style={{ boxShadow: 'none' }}>
          {ms.map((m) => (
            <div key={m.id} className="agenda-item" style={{ gridTemplateColumns: '28px 1fr auto' }}>
              <OppMark name={m.opponent} size="sm" />
              <div><div className="t">vs {m.opponent}</div><div className="s">{fmtDate(m.date, { day: 'numeric', month: 'short' })} · {m.stage ?? m.venue}</div></div>
              <StatusBadge status={m.result ?? m.status} />
            </div>
          ))}
        </div>
      ) : <p className="subtle" style={{ fontSize: 13.5 }}>No matches scheduled yet.</p>}
      <Link to={`/app/matches?new=1&comp=${c.id}`} className="btn" style={{ marginTop: 14 }}>Schedule a match in this competition</Link>
    </Drawer>
  );
}

export default function Competitions() {
  const { state } = useStore();
  const [params, setParams] = useSearchParams();
  const [tab, setTab] = useState('All');
  const comps = state.competitions.filter((c) => tab === 'All' || c.status === tab);
  const open = state.competitions.find((c) => c.id === params.get('open'));
  const trophies = state.competitions.filter((c) => c.result === 'Champions').length;

  return (
    <>
      <PageHead title="Competitions" sub={`Every league, cup and series ${state.team.name} has entered · ${trophies} title${trophies === 1 ? '' : 's'} won`}>
        <button className="btn btn-primary" onClick={() => setParams({ new: '1' })}><Flag size={15} /> Enter competition</button>
      </PageHead>

      <div className="tabs" style={{ marginBottom: 16 }}>
        {['All', 'Ongoing', 'Upcoming', 'Completed'].map((t) => (
          <button key={t} className={`tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t} <span className="subtle" style={{ marginLeft: 6, fontSize: 12 }}>{t === 'All' ? state.competitions.length : state.competitions.filter((c) => c.status === t).length}</span>
          </button>
        ))}
      </div>

      {!comps.length ? <div className="card"><Empty icon={Trophy} title={`No ${tab.toLowerCase()} competitions`} text="Enter a competition to start scheduling matches in it." /></div> : (
        <div className="comp-grid">
          {comps.map((c) => {
            const total = new Date(c.end) - new Date(c.start);
            const pct = c.status === 'Completed' ? 100 : c.status === 'Upcoming' ? 0 : Math.min(100, Math.max(0, ((Date.now() - new Date(c.start)) / total) * 100));
            return (
              <button key={c.id} className="card comp-card" onClick={() => setParams({ open: c.id })}>
                <div className="row between" style={{ alignItems: 'flex-start' }}>
                  <div className="row" style={{ alignItems: 'flex-start' }}>
                    <span className="comp-icon">{c.result === 'Champions' ? <Medal size={18} /> : <Trophy size={18} />}</span>
                    <div>
                      <b style={{ fontSize: 15.5 }}>{c.name}</b>
                      <div className="comp-meta">
                        <span><Building2 size={13} />{c.organiser || '—'}</span>
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={c.result ?? c.status} />
                </div>
                <div className="comp-meta" style={{ marginTop: 14 }}>
                  <span className="badge">{c.format}</span>
                  <span className="badge">{c.type}</span>
                  <span><CalendarDays size={13} />{fmtDate(c.start, { day: 'numeric', month: 'short' })} – {fmtDate(c.end, { day: 'numeric', month: 'short' })}</span>
                  {c.teams && <span><Users size={13} />{c.teams} teams</span>}
                </div>
                <div className="row between" style={{ marginTop: 16, fontSize: 12.5 }}>
                  <span className="muted">{c.stage}{c.position ? ` · ${ordinal(c.position)} place` : ''}</span>
                  <span className="subtle mono">{Math.round(pct)}%</span>
                </div>
                <div className="progress" style={{ marginTop: 6 }}><i style={{ width: `${pct}%` }} /></div>
                <div className="comp-kpis">
                  <div><b>{c.p}</b><span>Played</span></div>
                  <div><b>{c.w}</b><span>Won</span></div>
                  <div><b>{c.l}</b><span>Lost</span></div>
                  <div><b>{c.pts ?? '—'}</b><span>Points</span></div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {params.get('new') === '1' && <CompForm onClose={() => setParams({})} />}
      {open && <CompDrawer c={open} onClose={() => setParams({})} />}
    </>
  );
}
