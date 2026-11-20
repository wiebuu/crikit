import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Swords, Trophy, Target, Percent, Download } from 'lucide-react';
import { PageHead, Stat, Avatar, chart } from '../components/ui.jsx';
import { useStore } from '../store.jsx';

export default function Stats() {
  const { state, record } = useStore();
  const [tab, setTab] = useState('Batting');
  const { players, competitions, matches } = state;

  const batting = [...players].filter((p) => p.stats.m).sort((a, b) => b.stats.runs - a.stats.runs);
  const bowling = [...players].filter((p) => p.stats.wkts).sort((a, b) => b.stats.wkts - a.stats.wkts || a.stats.econ - b.stats.econ);
  const byComp = competitions.filter((c) => c.p > 0).map((c) => ({ name: c.name.split(' ').slice(0, 2).join(' '), Won: c.w, Lost: c.l }));
  const runsChart = batting.slice(0, 8).map((p) => ({ name: p.name.split(' ')[0], runs: p.stats.runs }));
  const totalRuns = players.reduce((s, p) => s + p.stats.runs, 0);
  const totalWkts = players.reduce((s, p) => s + p.stats.wkts, 0);
  const titles = competitions.filter((c) => c.result === 'Champions').length;

  return (
    <>
      <PageHead title="Statistics" sub={`Season ${state.season} performance across all competitions.`}>
        <button className="btn"><Download size={15} /> Export CSV</button>
      </PageHead>

      <div className="stats">
        <Stat label="Matches played" value={record.played} foot={`${matches.filter((m) => m.status === 'Upcoming').length} still to play`} icon={Swords} />
        <Stat label="Win rate" value={`${record.winPct}%`} foot={`${record.won} won · ${record.lost} lost`} icon={Percent} accent />
        <Stat label="Team runs" value={totalRuns.toLocaleString('en-IN')} foot={`${totalWkts} wickets taken`} icon={Target} />
        <Stat label="Titles" value={titles} foot={`${competitions.length} competitions entered`} icon={Trophy} />
      </div>

      <div className="grid two-col" style={{ gridTemplateColumns: '1.3fr 1fr', marginBottom: 16 }}>
        <div className="card">
          <div className="card-head"><h3>Top run scorers</h3><span className="hint">Season runs</span></div>
          <div className="card-body" style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={runsChart} margin={{ left: -16 }}>
                <CartesianGrid {...chart.grid} />
                <XAxis dataKey="name" {...chart.axis} />
                <YAxis {...chart.axis} />
                <Tooltip {...chart.tooltip} />
                <Bar dataKey="runs" name="Runs" fill="var(--brand)" radius={[4, 4, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <div className="card-head"><h3>Results by competition</h3></div>
          <div className="card-body" style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byComp} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid horizontal={false} stroke="var(--chart-grid)" />
                <XAxis type="number" {...chart.axis} allowDecimals={false} />
                <YAxis type="category" dataKey="name" {...chart.axis} width={110} />
                <Tooltip {...chart.tooltip} />
                <Bar dataKey="Won" stackId="a" fill="var(--brand)" maxBarSize={22} />
                <Bar dataKey="Lost" stackId="a" fill="var(--chart-muted)" radius={[0, 4, 4, 0]} maxBarSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="toolbar">
          <div className="tabs">{['Batting', 'Bowling'].map((t) => <button key={t} className={`tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>{t}</button>)}</div>
        </div>
        <div className="table-wrap">
          {tab === 'Batting' ? (
            <table className="table">
              <thead><tr><th>#</th><th>Player</th><th className="num">M</th><th className="num">Runs</th><th className="num">HS</th><th className="num">Avg</th><th className="num">SR</th><th className="num">Ct</th></tr></thead>
              <tbody>{batting.map((p, i) => (
                <tr key={p.id}><td className="mono subtle">{i + 1}</td><td><div className="row" style={{ gap: 10 }}><Avatar name={p.name} photo={p.photo} size={26} /><b>{p.name}</b></div></td>
                  <td className="num">{p.stats.m}</td><td className="num"><b>{p.stats.runs}</b></td><td className="num">{p.stats.hs}</td><td className="num">{p.stats.avg}</td><td className="num">{p.stats.sr}</td><td className="num">{p.stats.ct}</td></tr>
              ))}</tbody>
            </table>
          ) : (
            <table className="table">
              <thead><tr><th>#</th><th>Player</th><th>Style</th><th className="num">M</th><th className="num">Wkts</th><th className="num">Best</th><th className="num">Econ</th></tr></thead>
              <tbody>{bowling.map((p, i) => (
                <tr key={p.id}><td className="mono subtle">{i + 1}</td><td><div className="row" style={{ gap: 10 }}><Avatar name={p.name} photo={p.photo} size={26} /><b>{p.name}</b></div></td>
                  <td className="muted" style={{ fontSize: 12.5 }}>{p.bowl}</td><td className="num">{p.stats.m}</td><td className="num"><b>{p.stats.wkts}</b></td><td className="num">{p.stats.best}</td><td className="num">{p.stats.econ ?? '—'}</td></tr>
              ))}</tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
