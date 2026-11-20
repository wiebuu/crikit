import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CalendarPlus, MapPin, Clock, ListChecks, Radio, Crown, Award, CalendarDays } from 'lucide-react';
import { PageHead, StatusBadge, Modal, Drawer, Field, OppMark, TeamLogo, Avatar, fmtDate, Empty } from '../components/ui.jsx';
import { useStore } from '../store.jsx';

function MatchForm({ onClose, defaultComp }) {
  const { state, dispatch, notify } = useStore();
  const open = state.competitions.filter((c) => c.status !== 'Completed');
  const [f, setF] = useState({ opponent: '', compId: defaultComp || open[0]?.id || '', date: '', time: '14:00', venue: state.team.homeGround, home: 'true', stage: '' });
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  const valid = f.opponent.trim() && f.compId && f.date && f.time && f.venue.trim();
  const save = () => {
    dispatch({ type: 'match/add', payload: { ...f, opponent: f.opponent.trim(), home: f.home === 'true', stage: f.stage || undefined } });
    notify(`Match vs ${f.opponent.trim()} scheduled`);
    onClose();
  };
  return (
    <Modal title="Schedule a match" sub="Add a fixture for one of your competitions." onClose={onClose} width={580}
      footer={<><button className="btn" onClick={onClose}>Cancel</button><button className="btn btn-primary" disabled={!valid} onClick={save}><CalendarPlus size={15} /> Schedule</button></>}>
      <div className="form-grid">
        <Field label="Opponent" span={2}><input className="input" value={f.opponent} onChange={set('opponent')} autoFocus placeholder="Opposition team name" /></Field>
        <Field label="Competition" span={2}>
          <select className="select" value={f.compId} onChange={set('compId')}>
            {state.competitions.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.format})</option>)}
          </select>
        </Field>
        <Field label="Date"><input className="input" type="date" value={f.date} onChange={set('date')} /></Field>
        <Field label="Start time"><input className="input" type="time" value={f.time} onChange={set('time')} /></Field>
        <Field label="Venue" span={2}><input className="input" value={f.venue} onChange={set('venue')} /></Field>
        <Field label="Home / away">
          <select className="select" value={f.home} onChange={(e) => setF((x) => ({ ...x, home: e.target.value, venue: e.target.value === 'true' ? state.team.homeGround : '' }))}>
            <option value="true">Home</option><option value="false">Away</option>
          </select>
        </Field>
        <Field label="Stage (optional)"><input className="input" value={f.stage} onChange={set('stage')} placeholder="e.g. Semi-final" /></Field>
      </div>
    </Modal>
  );
}

function XIPicker({ m, onClose }) {
  const { state, dispatch, notify } = useStore();
  const [xi, setXi] = useState(m.xi ?? []);
  const toggle = (id) => setXi((x) => (x.includes(id) ? x.filter((i) => i !== id) : x.length < 11 ? [...x, id] : x));
  const roles = ['Batter', 'Wicket-keeper', 'All-rounder', 'Bowler'];
  const picked = state.players.filter((p) => xi.includes(p.id));
  const hasKeeper = picked.some((p) => p.role === 'Wicket-keeper');
  const bowlers = picked.filter((p) => p.role === 'Bowler' || p.role === 'All-rounder').length;
  const save = () => { dispatch({ type: 'match/xi', payload: { id: m.id, xi } }); notify(`Playing XI saved for vs ${m.opponent}`); onClose(); };

  return (
    <Drawer title={`Playing XI · vs ${m.opponent}`} onClose={onClose}
      footer={<><button className="btn" onClick={() => setXi([])}>Clear</button><button className="btn btn-primary" onClick={save}><ListChecks size={15} /> Save XI ({xi.length}/11)</button></>}>
      <div className="xi-count">
        <b>{xi.length} of 11 selected</b>
        <span className="row" style={{ gap: 6 }}>
          <span className={`badge ${hasKeeper ? 'badge-green' : 'badge-amber'}`}>{hasKeeper ? 'Keeper ✓' : 'No keeper'}</span>
          <span className={`badge ${bowlers >= 5 ? 'badge-green' : 'badge-amber'}`}>{bowlers} bowling options</span>
        </span>
      </div>
      {roles.map((r) => (
        <div key={r}>
          <div className="section-title" style={{ marginTop: 14 }}>{r}s</div>
          <div className="xi-list">
            {state.players.filter((p) => p.role === r).map((p) => {
              const on = xi.includes(p.id);
              const blocked = p.status !== 'Available';
              return (
                <label key={p.id} className={`xi-item${on ? ' on' : ''}${blocked ? ' disabled' : ''}`}>
                  <input type="checkbox" checked={on} disabled={blocked || (!on && xi.length >= 11)} onChange={() => toggle(p.id)} />
                  <Avatar name={p.name} photo={p.photo} size={28} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 500, fontSize: 13.5 }}>{p.name} {state.team.captainId === p.id && <Crown size={12} style={{ color: 'var(--amber)' }} />}</div>
                    <div className="subtle" style={{ fontSize: 12 }}>#{p.jersey} · {p.stats.runs} runs · {p.stats.wkts} wkts</div>
                  </div>
                  {blocked && <StatusBadge status={p.status} />}
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </Drawer>
  );
}

function ResultDrawer({ m, onClose }) {
  const { state, comp, player } = useStore();
  const potm = m.potm && player(m.potm);
  return (
    <Drawer title="Match result" onClose={onClose}>
      <div className="subtle" style={{ fontSize: 12.5 }}>{comp(m.compId)?.name}{m.stage ? ` · ${m.stage}` : ''}</div>
      <div className="card" style={{ marginTop: 12, boxShadow: 'none' }}>
        <div className="agenda-item" style={{ gridTemplateColumns: '36px 1fr auto' }}>
          <TeamLogo size={32} /><b>{state.team.name}</b><span className="mono" style={{ fontWeight: 600 }}>{m.our}</span>
        </div>
        <div className="agenda-item" style={{ gridTemplateColumns: '36px 1fr auto' }}>
          <OppMark name={m.opponent} /><b>{m.opponent}</b><span className="mono" style={{ fontWeight: 600 }}>{m.opp}</span>
        </div>
      </div>
      <p style={{ marginTop: 14, fontWeight: 600 }} className={m.result === 'Won' ? 'result-W' : 'result-L'}>{state.team.name} {m.result.toLowerCase()} {m.margin}</p>
      <div className="kv-grid">
        <div><span>Date</span><b>{fmtDate(m.date)}</b></div>
        <div><span>Venue</span><b>{m.venue}</b></div>
      </div>
      {potm && (
        <>
          <div className="section-title">Player of the match</div>
          <div className="row"><Avatar name={potm.name} photo={potm.photo} size={40} /><div><b>{potm.name}</b><div className="subtle" style={{ fontSize: 12.5 }}>{potm.role}</div></div><Award size={18} style={{ marginLeft: 'auto', color: 'var(--amber)' }} /></div>
        </>
      )}
    </Drawer>
  );
}

export default function Matches() {
  const { state, comp } = useStore();
  const [params, setParams] = useSearchParams();
  const [tab, setTab] = useState('Upcoming');
  const [cf, setCf] = useState('all');

  const list = state.matches
    .filter((m) => (tab === 'Upcoming' ? m.status !== 'Completed' : tab === 'Results' ? m.status === 'Completed' : true))
    .filter((m) => cf === 'all' || m.compId === cf)
    .sort((a, b) => (tab === 'Results' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));

  const xiMatch = state.matches.find((m) => m.id === params.get('xi'));
  const resMatch = state.matches.find((m) => m.id === params.get('result'));

  return (
    <>
      <PageHead title="Matches" sub="Fixtures and results across every competition we’re playing in.">
        <button className="btn btn-primary" onClick={() => setParams({ new: '1' })}><CalendarPlus size={15} /> Schedule match</button>
      </PageHead>

      <div className="card">
        <div className="toolbar">
          <div className="tabs">
            {['Upcoming', 'Results', 'All'].map((t) => <button key={t} className={`tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>{t}</button>)}
          </div>
          <select className="select" value={cf} onChange={(e) => setCf(e.target.value)}>
            <option value="all">All competitions</option>
            {state.competitions.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <div style={{ flex: 1 }} />
          <span className="subtle" style={{ fontSize: 13 }}>{list.length} matches</span>
        </div>

        {!list.length && <Empty icon={CalendarDays} title="No matches here" text="Schedule a match to see it in this list." />}

        {list.map((m) => {
          const d = new Date(m.date + 'T00:00:00');
          const act = m.status === 'Upcoming' ? { xi: m.id } : m.status === 'Completed' ? { result: m.id } : null;
          return (
            <div key={m.id} className="match-row" onClick={() => act && setParams(act)}>
              <div className="agenda-date" style={{ padding: '6px 0' }}>
                <b>{d.getDate()}</b><span>{d.toLocaleDateString('en-IN', { month: 'short' })}</span>
              </div>
              <div style={{ minWidth: 0 }}>
                <div className="mr-teams">
                  <TeamLogo size={24} />
                  <span>{state.team.shortName}</span>
                  {m.our && <span className="mr-score">{m.our}</span>}
                  <span className="vs">VS</span>
                  <OppMark name={m.opponent} size="sm" />
                  <span>{m.opponent}</span>
                  {m.opp && <span className="mr-score">{m.opp}</span>}
                </div>
                <div className="fx-meta">
                  <span style={{ color: 'var(--text-2)' }}>{comp(m.compId)?.name}{m.stage ? ` · ${m.stage}` : ''}</span>
                  <span><Clock size={13} />{m.time}</span>
                  <span><MapPin size={13} />{m.venue} · {m.home ? 'Home' : 'Away'}</span>
                  {m.result && <span className={m.result === 'Won' ? 'result-W' : 'result-L'} style={{ fontWeight: 500 }}>{m.result} {m.margin}</span>}
                </div>
              </div>
              <div className="row" style={{ justifyContent: 'flex-end' }} onClick={(e) => e.stopPropagation()}>
                {m.status === 'Live' && <><StatusBadge status="Live" /><Link to="/app/live" className="btn btn-sm btn-primary"><Radio size={14} /> Score</Link></>}
                {m.status === 'Upcoming' && (
                  <button className={`btn btn-sm ${m.xi?.length === 11 ? '' : 'btn-primary'}`} onClick={() => setParams({ xi: m.id })}>
                    <ListChecks size={14} /> {m.xi?.length === 11 ? 'XI ready' : `Pick XI ${m.xi?.length ?? 0}/11`}
                  </button>
                )}
                {m.status === 'Completed' && <StatusBadge status={m.result} />}
              </div>
            </div>
          );
        })}
      </div>

      {params.get('new') === '1' && <MatchForm defaultComp={params.get('comp')} onClose={() => setParams({})} />}
      {xiMatch && <XIPicker m={xiMatch} onClose={() => setParams({})} />}
      {resMatch && <ResultDrawer m={resMatch} onClose={() => setParams({})} />}
    </>
  );
}
