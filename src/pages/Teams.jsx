import { useState } from 'react';
import { Plus, Search, MapPin, UserRound, ClipboardList, LayoutGrid, List } from 'lucide-react';
import { PageHead, TeamMark, Form, fmtNrr } from '../components/ui.jsx';
import { teams } from '../data/mock.js';

export default function Teams() {
  const [q, setQ] = useState('');
  const [view, setView] = useState('grid');
  const list = teams.filter((t) => t.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHead title="Teams" sub="Registered squads, captains and coaching staff for this tournament.">
        <button className="btn btn-primary"><Plus size={15} /> Register team</button>
      </PageHead>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="toolbar" style={{ borderBottom: 0 }}>
          <label className="search"><Search size={16} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search teams…" /></label>
          <div style={{ flex: 1 }} />
          <span className="subtle" style={{ fontSize: 13 }}>{list.length} teams</span>
          <div className="tabs">
            <button className={`tab${view === 'grid' ? ' active' : ''}`} onClick={() => setView('grid')} aria-label="Grid view"><LayoutGrid size={15} /></button>
            <button className={`tab${view === 'list' ? ' active' : ''}`} onClick={() => setView('list')} aria-label="List view"><List size={15} /></button>
          </div>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="team-grid">
          {list.map((t) => (
            <div key={t.id} className="card team-card">
              <div className="band" style={{ background: t.color }} />
              <div className="body">
                <div className="row between">
                  <div className="row">
                    <TeamMark id={t.id} size="lg" />
                    <div>
                      <h3 style={{ fontSize: 16 }}>{t.name}</h3>
                      <span className="subtle" style={{ fontSize: 12.5 }}>Est. {t.founded} · {t.players} players</span>
                    </div>
                  </div>
                </div>
                <div className="meta-list">
                  <div><UserRound size={14} /> Captain: <b style={{ color: 'var(--text)' }}>{t.captain}</b></div>
                  <div><ClipboardList size={14} /> Coach: {t.coach}</div>
                  <div><MapPin size={14} /> {t.home}</div>
                </div>
                <div className="kv">
                  <div><b>{t.w}-{t.l}</b><span>W-L</span></div>
                  <div><b className="mono" style={{ color: t.nrr >= 0 ? 'var(--brand)' : 'var(--ball)', fontSize: 15 }}>{fmtNrr(t.nrr)}</b><span>NRR</span></div>
                  <div><b>{t.pts}</b><span>Points</span></div>
                </div>
                <div className="row between" style={{ marginTop: 16 }}>
                  <Form form={t.form} />
                  <button className="btn btn-sm">View squad</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card table-wrap">
          <table className="table">
            <thead><tr><th>Team</th><th>Captain</th><th>Coach</th><th>Home ground</th><th className="num">Squad</th><th className="num">Pts</th><th>Form</th></tr></thead>
            <tbody>
              {list.map((t) => (
                <tr key={t.id}>
                  <td><div className="row"><TeamMark id={t.id} size="sm" /><b>{t.name}</b></div></td>
                  <td>{t.captain}</td><td className="muted">{t.coach}</td><td className="muted">{t.home}</td>
                  <td className="num">{t.players}</td><td className="num"><b>{t.pts}</b></td><td><Form form={t.form} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
