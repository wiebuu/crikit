import { useState, useMemo } from 'react';
import { Plus, Search, Download, ArrowUpDown } from 'lucide-react';
import { PageHead, TeamMark, StatusBadge } from '../components/ui.jsx';
import { players, teams, teamById } from '../data/mock.js';

const roles = ['All roles', 'Batter', 'Bowler', 'All-rounder', 'Wicket-keeper'];

export default function Players() {
  const [q, setQ] = useState('');
  const [team, setTeam] = useState('all');
  const [role, setRole] = useState('All roles');
  const [sort, setSort] = useState({ key: 'runs', dir: -1 });

  const list = useMemo(() => {
    return players
      .filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
      .filter((p) => team === 'all' || p.team === team)
      .filter((p) => role === 'All roles' || p.role === role)
      .sort((a, b) => ((a[sort.key] ?? -1) - (b[sort.key] ?? -1)) * sort.dir);
  }, [q, team, role, sort]);

  const Th = ({ k, children }) => (
    <th className="num" style={{ cursor: 'pointer' }} onClick={() => setSort((s) => ({ key: k, dir: s.key === k ? -s.dir : -1 }))}>
      <span className="row" style={{ gap: 4, justifyContent: 'flex-end' }}>{children}<ArrowUpDown size={11} opacity={sort.key === k ? 1 : 0.35} /></span>
    </th>
  );

  return (
    <>
      <PageHead title="Players" sub="Structured player profiles with season statistics and fitness status.">
        <button className="btn"><Download size={15} /> Export CSV</button>
        <button className="btn btn-primary"><Plus size={15} /> Add player</button>
      </PageHead>

      <div className="card">
        <div className="toolbar">
          <label className="search"><Search size={16} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search players…" /></label>
          <select className="select" value={team} onChange={(e) => setTeam(e.target.value)}>
            <option value="all">All teams</option>
            {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <select className="select" value={role} onChange={(e) => setRole(e.target.value)}>
            {roles.map((r) => <option key={r}>{r}</option>)}
          </select>
          <div style={{ flex: 1 }} />
          <span className="subtle" style={{ fontSize: 13 }}>{list.length} of {players.length} players</span>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Player</th><th>Team</th><th>Role</th><th>Batting / Bowling</th>
                <Th k="m">M</Th><Th k="runs">Runs</Th><Th k="avg">Avg</Th><Th k="sr">SR</Th><Th k="wkts">Wkts</Th><Th k="econ">Econ</Th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="row">
                      <span className="avatar" style={{ background: teamById[p.team].color, width: 30, height: 30, fontSize: 11 }}>
                        {p.name.split(' ').map((s) => s[0]).join('')}
                      </span>
                      <b>{p.name}</b>
                    </div>
                  </td>
                  <td><div className="row" style={{ gap: 8 }}><TeamMark id={p.team} size="sm" /><span className="muted">{teamById[p.team].name}</span></div></td>
                  <td>{p.role}</td>
                  <td className="muted" style={{ fontSize: 12.5 }}>{p.bat}-hand · {p.bowl}</td>
                  <td className="num">{p.m}</td>
                  <td className="num"><b>{p.runs}</b></td>
                  <td className="num">{p.avg.toFixed(1)}</td>
                  <td className="num">{p.sr.toFixed(1)}</td>
                  <td className="num"><b>{p.wkts}</b></td>
                  <td className="num">{p.econ ? p.econ.toFixed(1) : '—'}</td>
                  <td><StatusBadge status={p.status} /></td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr><td colSpan={11} style={{ textAlign: 'center', padding: 40 }} className="subtle">No players match these filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
