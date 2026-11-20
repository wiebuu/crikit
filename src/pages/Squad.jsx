import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UserPlus, Search, LayoutGrid, List, Crown, Shield, Hand, Trash2, Users } from 'lucide-react';
import { PageHead, Avatar, StatusBadge, Modal, Drawer, Field, ImageUpload, Empty } from '../components/ui.jsx';
import { useStore } from '../store.jsx';
import { ROLES, AVAILABILITY } from '../data/seed.js';

const blank = { name: '', jersey: '', role: 'Batter', bat: 'Right-hand', bowl: '—', age: '', status: 'Available', photo: null };

function PlayerForm({ onClose }) {
  const { dispatch, notify, state } = useStore();
  const [f, setF] = useState(blank);
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e?.target ? e.target.value : e }));
  const taken = state.players.some((p) => String(p.jersey) === String(f.jersey));
  const valid = f.name.trim() && f.jersey !== '' && !taken;
  const save = () => {
    dispatch({ type: 'player/add', payload: { ...f, name: f.name.trim(), jersey: Number(f.jersey), age: Number(f.age) || null } });
    notify(`${f.name.trim()} added to the squad`);
    onClose();
  };
  return (
    <Modal title="Add player" sub="Create a player profile for your squad." onClose={onClose} width={600}
      footer={<><button className="btn" onClick={onClose}>Cancel</button><button className="btn btn-primary" disabled={!valid} onClick={save}><UserPlus size={15} /> Add player</button></>}>
      <div className="form-grid">
        <div style={{ gridColumn: 'span 2' }}>
          <ImageUpload value={f.photo} onChange={set('photo')} label="Upload player photo" round size={240} />
        </div>
        <Field label="Full name" span={2}><input className="input" value={f.name} onChange={set('name')} placeholder="Player name" autoFocus /></Field>
        <Field label="Jersey number" hint={taken ? 'That number is already taken.' : ' '}><input className="input" type="number" min="0" max="999" value={f.jersey} onChange={set('jersey')} placeholder="e.g. 17" /></Field>
        <Field label="Age"><input className="input" type="number" min="10" max="60" value={f.age} onChange={set('age')} placeholder="e.g. 22" /></Field>
        <Field label="Playing role"><select className="select" value={f.role} onChange={set('role')}>{ROLES.map((r) => <option key={r}>{r}</option>)}</select></Field>
        <Field label="Availability"><select className="select" value={f.status} onChange={set('status')}>{AVAILABILITY.map((r) => <option key={r}>{r}</option>)}</select></Field>
        <Field label="Batting"><select className="select" value={f.bat} onChange={set('bat')}><option>Right-hand</option><option>Left-hand</option></select></Field>
        <Field label="Bowling">
          <select className="select" value={f.bowl} onChange={set('bowl')}>
            {['—', 'Right-arm fast', 'Right-arm medium', 'Left-arm fast', 'Left-arm medium', 'Off-break', 'Leg-break', 'Slow left-arm'].map((b) => <option key={b}>{b}</option>)}
          </select>
        </Field>
      </div>
    </Modal>
  );
}

function PlayerDrawer({ p, onClose }) {
  const { state, dispatch, notify } = useStore();
  const { team } = state;
  const s = p.stats;
  const tags = [team.captainId === p.id && 'Captain', team.viceCaptainId === p.id && 'Vice-captain', team.keeperId === p.id && 'Wicket-keeper'].filter(Boolean);
  const setLead = (key, label) => { dispatch({ type: 'team/update', payload: { [key]: p.id } }); notify(`${p.name} is now ${label}`); };
  return (
    <Drawer title="Player profile" onClose={onClose}
      footer={<button className="btn" onClick={() => { dispatch({ type: 'player/remove', payload: p.id }); notify(`${p.name} removed from squad`); onClose(); }}><Trash2 size={14} /> Remove from squad</button>}>
      <div className="profile-head">
        <Avatar name={p.name} photo={p.photo} size={64} />
        <div>
          <h2>{p.name}</h2>
          <div className="muted" style={{ fontSize: 13.5 }}>#{p.jersey} · {p.role}</div>
          <div className="row" style={{ gap: 6, marginTop: 6 }}>{tags.map((t) => <span key={t} className="badge badge-accent">{t}</span>)}</div>
        </div>
      </div>
      <div className="kv-grid">
        <div><span>Batting</span><b>{p.bat}</b></div>
        <div><span>Bowling</span><b>{p.bowl}</b></div>
        <div><span>Age</span><b>{p.age ?? '—'}</b></div>
        <div><span>With team since</span><b>{p.joined}</b></div>
      </div>

      <div className="section-title">Availability</div>
      <div className="tabs" style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
        {AVAILABILITY.map((a) => (
          <button key={a} className={`tab${p.status === a ? ' active' : ''}`} style={{ justifyContent: 'center' }}
            onClick={() => { dispatch({ type: 'player/update', payload: { id: p.id, status: a } }); notify(`${p.name} marked ${a.toLowerCase()}`); }}>{a}</button>
        ))}
      </div>

      <div className="section-title">Season {state.season} statistics</div>
      <div className="kv-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)', marginTop: 0 }}>
        <div><span>Matches</span><b className="mono">{s.m}</b></div>
        <div><span>Runs</span><b className="mono">{s.runs}</b></div>
        <div><span>Highest</span><b className="mono">{s.hs}</b></div>
        <div><span>Average</span><b className="mono">{s.avg}</b></div>
        <div><span>Strike rate</span><b className="mono">{s.sr}</b></div>
        <div><span>Catches</span><b className="mono">{s.ct}</b></div>
        <div><span>Wickets</span><b className="mono">{s.wkts}</b></div>
        <div><span>Best</span><b className="mono">{s.best}</b></div>
        <div><span>Economy</span><b className="mono">{s.econ ?? '—'}</b></div>
      </div>

      <div className="section-title">Leadership</div>
      <div className="row wrap" style={{ gap: 8 }}>
        <button className="btn btn-sm" disabled={team.captainId === p.id} onClick={() => setLead('captainId', 'captain')}><Crown size={14} /> Make captain</button>
        <button className="btn btn-sm" disabled={team.viceCaptainId === p.id} onClick={() => setLead('viceCaptainId', 'vice-captain')}><Shield size={14} /> Make vice-captain</button>
        <button className="btn btn-sm" disabled={team.keeperId === p.id} onClick={() => setLead('keeperId', 'first-choice keeper')}><Hand size={14} /> First-choice keeper</button>
      </div>
    </Drawer>
  );
}

export default function Squad() {
  const { state } = useStore();
  const { players, team } = state;
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState('');
  const [role, setRole] = useState('All');
  const [status, setStatus] = useState('all');
  const [view, setView] = useState('grid');
  const [openId, setOpenId] = useState(null);
  const adding = params.get('new') === '1';
  const closeAdd = () => setParams({});
  const open = players.find((p) => p.id === openId);

  useEffect(() => { if (openId && !open) setOpenId(null); }, [open, openId]);

  const list = useMemo(() => players
    .filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || String(p.jersey) === q)
    .filter((p) => role === 'All' || p.role === role)
    .filter((p) => status === 'all' || p.status === status)
    .sort((a, b) => a.jersey - b.jersey), [players, q, role, status]);

  const lead = (id) => (team.captainId === id ? 'C' : team.viceCaptainId === id ? 'VC' : team.keeperId === id ? 'WK' : null);

  return (
    <>
      <PageHead title="Squad" sub={`${players.length} registered players · ${players.filter((p) => p.status === 'Available').length} available for selection`}>
        <button className="btn btn-primary" onClick={() => setParams({ new: '1' })}><UserPlus size={15} /> Add player</button>
      </PageHead>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="toolbar" style={{ borderBottom: 0 }}>
          <label className="search"><Search size={15} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or jersey…" /></label>
          <div className="tabs">
            {['All', ...ROLES].map((r) => <button key={r} className={`tab${role === r ? ' active' : ''}`} onClick={() => setRole(r)}>{r === 'All' ? 'All' : r + 's'}</button>)}
          </div>
          <select className="select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">Any availability</option>
            {AVAILABILITY.map((a) => <option key={a}>{a}</option>)}
          </select>
          <div style={{ flex: 1 }} />
          <div className="tabs">
            <button className={`tab${view === 'grid' ? ' active' : ''}`} onClick={() => setView('grid')} aria-label="Card view"><LayoutGrid size={15} /></button>
            <button className={`tab${view === 'list' ? ' active' : ''}`} onClick={() => setView('list')} aria-label="Table view"><List size={15} /></button>
          </div>
        </div>
      </div>

      {!list.length ? (
        <div className="card"><Empty icon={Users} title="No players found" text="Try a different search or filter, or add a new player to the squad." /></div>
      ) : view === 'grid' ? (
        <div className="player-grid">
          {list.map((p) => (
            <button key={p.id} className="card player-card" onClick={() => setOpenId(p.id)}>
              <span className="jersey">#{p.jersey}</span>
              <Avatar name={p.name} photo={p.photo} size={44} />
              <div className="pc-name">{p.name}{lead(p.id) && <span className="tag">{lead(p.id)}</span>}</div>
              <div className="row between" style={{ marginTop: 2 }}>
                <span className="pc-role">{p.role}</span>
                <StatusBadge status={p.status} />
              </div>
              <div className="pc-stats">
                <div><b>{p.stats.m}</b><span>Matches</span></div>
                <div><b>{p.stats.runs}</b><span>Runs</span></div>
                <div><b>{p.stats.wkts}</b><span>Wickets</span></div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="card table-wrap">
          <table className="table">
            <thead><tr><th>#</th><th>Player</th><th>Role</th><th>Batting / Bowling</th><th className="num">M</th><th className="num">Runs</th><th className="num">SR</th><th className="num">Wkts</th><th className="num">Econ</th><th>Status</th></tr></thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.id} onClick={() => setOpenId(p.id)} style={{ cursor: 'pointer' }}>
                  <td className="mono subtle">{p.jersey}</td>
                  <td><div className="row" style={{ gap: 10 }}><Avatar name={p.name} photo={p.photo} size={28} /><b>{p.name}</b>{lead(p.id) && <span className="tag">{lead(p.id)}</span>}</div></td>
                  <td>{p.role}</td>
                  <td className="muted" style={{ fontSize: 12.5 }}>{p.bat} · {p.bowl}</td>
                  <td className="num">{p.stats.m}</td><td className="num"><b>{p.stats.runs}</b></td><td className="num">{p.stats.sr}</td>
                  <td className="num"><b>{p.stats.wkts}</b></td><td className="num">{p.stats.econ ?? '—'}</td>
                  <td><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {adding && <PlayerForm onClose={closeAdd} />}
      {open && <PlayerDrawer p={open} onClose={() => setOpenId(null)} />}
    </>
  );
}
