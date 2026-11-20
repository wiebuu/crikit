import { Link } from 'react-router-dom';
import { Shield, Users, CalendarDays, Activity, ArrowRight, ShieldCheck, Radio, FileText, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { PageHead, Stat, TeamMark, StatusBadge, Form, fmtNrr, chart } from '../components/ui.jsx';
import { teams, fixtures, players, activity, runsByTeam, liveMatch, teamById } from '../data/mock.js';

const actIcon = {
  score: [Radio, 'var(--red-soft)', 'var(--red)'],
  audit: [ShieldCheck, 'var(--brand-soft)', 'var(--brand-text)'],
  team: [Users, 'var(--blue-soft)', 'var(--blue)'],
  fixture: [CalendarDays, 'var(--amber-soft)', 'var(--amber)'],
  report: [FileText, 'var(--surface-3)', 'var(--text-2)'],
};

export default function Dashboard() {
  const standings = [...teams].sort((a, b) => b.pts - a.pts || b.nrr - a.nrr);
  const upcoming = fixtures.filter((f) => f.status === 'Upcoming').slice(0, 3);
  const played = fixtures.filter((f) => f.status === 'Completed').length + 28;
  const live = liveMatch;

  return (
    <>
      <PageHead title="Good afternoon, Sagar" sub="Here’s what’s happening across the Himalayan Premier League today.">
        <button className="btn"><RefreshCw size={15} /> Sync</button>
        <Link to="/app/fixtures" className="btn btn-primary"><CalendarDays size={15} /> New fixture</Link>
      </PageHead>

      <div className="stats">
        <Stat label="Registered teams" value={teams.length} foot={<><b>+1</b> since last season</>} icon={Shield} />
        <Stat label="Active players" value={teams.reduce((s, t) => s + t.players, 0)} foot={`${players.filter(p => p.status !== 'Fit').length} on injury watch`} icon={Users} tone="blue" />
        <Stat label="Matches played" value={`${played}/56`} foot={<><b>{Math.round(played / 56 * 100)}%</b> of league stage</>} icon={CalendarDays} tone="amber" />
        <Stat label="Live now" value="1" foot="RR vs GT · Ganga View Oval" icon={Activity} tone="red" />
      </div>

      <div className="grid two-col" style={{ gridTemplateColumns: '1.35fr 1fr', marginBottom: 20 }}>
        {/* Live match */}
        <div className="card">
          <div className="card-head">
            <h3>Live match · M31</h3>
            <StatusBadge status="Live" />
          </div>
          <div className="card-body">
            <div className="row between wrap" style={{ gap: 20 }}>
              <div className="row">
                <TeamMark id="RR" size="lg" />
                <div>
                  <div style={{ fontWeight: 500 }}>{teamById.RR.name}</div>
                  <div className="mono" style={{ fontSize: 22, fontWeight: 600 }}>172/6 <span className="subtle" style={{ fontSize: 13 }}>(20)</span></div>
                </div>
              </div>
              <span className="vs">VS</span>
              <div className="row" style={{ flexDirection: 'row-reverse', textAlign: 'right' }}>
                <TeamMark id="GT" size="lg" />
                <div>
                  <div style={{ fontWeight: 500 }}>{teamById.GT.name}</div>
                  <div className="mono" style={{ fontSize: 22, fontWeight: 600 }}>{live.runs}/{live.wkts} <span className="subtle" style={{ fontSize: 13 }}>({live.overs})</span></div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 18, height: 6, background: 'var(--surface-3)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ width: `${(live.runs / live.target) * 100}%`, height: '100%', background: 'var(--brand)', borderRadius: 99 }} />
            </div>
            <div className="row between wrap" style={{ marginTop: 10, fontSize: 13 }}>
              <span className="muted">{fixtures[2].result}</span>
              <span className="mono subtle">CRR {live.crr} · RRR {live.rrr}</span>
            </div>
            <Link to="/app/live" className="btn" style={{ marginTop: 18 }}>Open scoring console <ArrowRight size={15} /></Link>
          </div>
        </div>

        {/* Upcoming */}
        <div className="card">
          <div className="card-head">
            <h3>Upcoming fixtures</h3>
            <Link to="/app/fixtures" className="btn btn-sm btn-ghost">View all <ArrowRight size={14} /></Link>
          </div>
          {upcoming.map((f) => (
            <div key={f.id} className="row between" style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
              <div className="row">
                <TeamMark id={f.home} size="sm" />
                <span style={{ fontWeight: 600 }}>{f.home}</span>
                <span className="subtle" style={{ fontSize: 12 }}>vs</span>
                <span style={{ fontWeight: 600 }}>{f.away}</span>
                <TeamMark id={f.away} size="sm" />
              </div>
              <div style={{ textAlign: 'right', fontSize: 12.5 }}>
                <div style={{ fontWeight: 600 }}>{new Date(f.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} · {f.time}</div>
                <div className="subtle">{f.venue}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid two-col" style={{ gridTemplateColumns: '1.35fr 1fr', marginBottom: 20 }}>
        <div className="card">
          <div className="card-head">
            <h3>Runs scored vs conceded</h3>
            <span className="hint">League stage · all matches</span>
          </div>
          <div className="card-body" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={runsByTeam} barGap={3} margin={{ left: -16 }}>
                <CartesianGrid {...chart.grid} />
                <XAxis dataKey="team" {...chart.axis} />
                <YAxis {...chart.axis} />
                <Tooltip {...chart.tooltip} />
                <Legend {...chart.legend} />
                <Bar dataKey="scored" name="Runs scored" fill="var(--brand)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="conceded" name="Runs conceded" fill="var(--chart-muted)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <h3>Recent activity</h3>
            <span className="badge">Audit trail</span>
          </div>
          <div className="activity">
            {activity.map((a, i) => {
              const [Icon, bg, fg] = actIcon[a.kind];
              return (
                <div className="act" key={i}>
                  <span className="act-icon" style={{ background: bg, color: fg }}><Icon size={16} /></span>
                  <div><div className="t">{a.text}</div><div className="w">{a.when}</div></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <h3>Points table — top 4</h3>
          <Link to="/app/standings" className="btn btn-sm btn-ghost">Full leaderboard <ArrowRight size={14} /></Link>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>#</th><th>Team</th><th className="num">P</th><th className="num">W</th><th className="num">L</th><th className="num">NRR</th><th className="num">Pts</th><th>Form</th></tr></thead>
            <tbody>
              {standings.slice(0, 4).map((t, i) => (
                <tr key={t.id} className="qualify">
                  <td className="mono">{i + 1}</td>
                  <td><div className="row"><TeamMark id={t.id} size="sm" /><b>{t.name}</b></div></td>
                  <td className="num">{t.p}</td><td className="num">{t.w}</td><td className="num">{t.l}</td>
                  <td className="num" style={{ color: t.nrr >= 0 ? 'var(--brand-text)' : 'var(--red)' }}>{fmtNrr(t.nrr)}</td>
                  <td className="num"><b>{t.pts}</b></td>
                  <td><Form form={t.form} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
