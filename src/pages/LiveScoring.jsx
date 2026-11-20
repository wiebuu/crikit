import { useState } from 'react';
import { Undo2, ShieldCheck, Wifi } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { PageHead, TeamMark, chart } from '../components/ui.jsx';
import { liveMatch, teamById } from '../data/mock.js';

// convert "14.4" -> balls and back
const toBalls = (o) => { const [a, b] = o.split('.').map(Number); return a * 6 + (b || 0); };
const toOvers = (n) => `${Math.floor(n / 6)}.${n % 6}`;

export default function LiveScoring() {
  const [s, setS] = useState({
    runs: liveMatch.runs, wkts: liveMatch.wkts, balls: toBalls(liveMatch.overs),
    over: liveMatch.thisOver, comm: liveMatch.commentary, history: [],
  });

  const record = (kind) => {
    setS((p) => {
      const legal = !['WD', 'NB'].includes(kind);
      const runs = kind === 'W' ? 0 : kind === 'WD' || kind === 'NB' ? 1 : Number(kind);
      const balls = p.balls + (legal ? 1 : 0);
      const label = kind === 'W' ? 'W' : kind;
      // once the current over has 6 legal deliveries, the next ball starts a new over
      const overDone = p.over.filter((b) => !['WD', 'NB'].includes(b)).length >= 6;
      const newOver = overDone ? [label] : [...p.over, label];
      const text = {
        W: 'OUT! Big wicket — the batter has to walk back.', '0': 'No run, solid defence.', '1': '1 run, worked into the gap.',
        '2': '2 runs, good running between the wickets.', '3': '3 runs, chased down just short of the rope.',
        '4': 'FOUR! Pierces the field and races away.', '6': 'SIX! Launched high into the stands.',
        WD: 'Wide, drifting down leg.', NB: 'No-ball, overstepped. Free hit coming up.',
      }[kind];
      const type = { W: 'wicket', '4': 'four', '6': 'six', '0': 'dot' }[kind] || 'run';
      return {
        runs: p.runs + runs, wkts: p.wkts + (kind === 'W' ? 1 : 0), balls,
        over: newOver,
        comm: [{ ball: toOvers(legal ? balls : p.balls), text, type }, ...p.comm].slice(0, 8),
        history: [...p.history, p],
      };
    });
  };
  const undo = () => setS((p) => (p.history.length ? p.history[p.history.length - 1] : p));

  const target = liveMatch.target;
  const need = Math.max(target - s.runs, 0);
  const left = 120 - s.balls;
  const crr = s.balls ? (s.runs / s.balls) * 6 : 0;
  const rrr = left > 0 ? (need / left) * 6 : 0;
  const status = s.runs >= target ? `${teamById.GT.name} won by ${10 - s.wkts} wickets`
    : s.wkts >= 10 || left <= 0 ? `${teamById.RR.name} won by ${target - 1 - s.runs} runs`
    : `${teamById.GT.name} need ${need} runs from ${left} balls`;
  const empties = Math.max(0, 6 - s.over.filter((b) => !['WD', 'NB'].includes(b)).length);

  return (
    <>
      <PageHead title="Live Scoring Console" sub="M31 · Rishikesh Rangers vs Ganga Titans · Ganga View Oval">
        <span className="badge badge-green"><Wifi size={13} /> Synced · 42 viewers</span>
        <button className="btn"><ShieldCheck size={15} /> Request umpire verification</button>
      </PageHead>

      <div className="scoreboard" style={{ marginBottom: 20 }}>
        <div className="sb-teams">
          <div className="row" style={{ gap: 16 }}>
            <TeamMark id="GT" size="lg" />
            <div>
              <div style={{ color: '#8fb3a5', fontSize: 12.5, fontWeight: 500 }}>{teamById.GT.name} · batting</div>
              <div className="row" style={{ alignItems: 'baseline', gap: 10 }}>
                <span className="sb-score">{s.runs}/{s.wkts}</span>
                <span className="sb-overs">({toOvers(s.balls)} ov)</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#8fb3a5', fontSize: 12.5, fontWeight: 500 }}>{teamById.RR.name} · 1st innings</div>
            <div className="mono" style={{ fontSize: 22, fontWeight: 500 }}>172/6 <span className="sb-overs">(20 ov)</span></div>
          </div>
        </div>
        <div className="sb-pills">
          <div className="sb-pill">Target<b>{target}</b></div>
          <div className="sb-pill">CRR<b>{crr.toFixed(2)}</b></div>
          <div className="sb-pill">Req. RR<b>{rrr.toFixed(2)}</b></div>
          <div className="sb-pill">Balls left<b>{left}</b></div>
          <div className="sb-pill" style={{ flex: 1, minWidth: 220 }}>Status<b style={{ fontFamily: 'var(--font)', fontSize: 14, marginTop: 3 }}>{status}</b></div>
        </div>
      </div>

      <div className="grid two-col" style={{ gridTemplateColumns: '1fr 1.2fr', marginBottom: 20 }}>
        <div className="card">
          <div className="card-head">
            <h3>Record delivery</h3>
            <button className="btn btn-sm" onClick={undo} disabled={!s.history.length}><Undo2 size={14} /> Undo</button>
          </div>
          <div className="card-body">
            <div className="subtle" style={{ fontSize: 12.5, fontWeight: 500, marginBottom: 10 }}>This over</div>
            <div className="balls" style={{ marginBottom: 22 }}>
              {s.over.map((b, i) => <span key={i} className={`ball b${b}`}>{b}</span>)}
              {Array.from({ length: empties }).map((_, i) => <span key={'e' + i} className="ball empty">·</span>)}
            </div>
            <div className="pad">
              {['0', '1', '2', '3'].map((k) => <button key={k} onClick={() => record(k)}>{k}</button>)}
              <button className="p4" onClick={() => record('4')}>4</button>
              <button className="p6" onClick={() => record('6')}>6</button>
              <button className="px" onClick={() => record('WD')}>Wide</button>
              <button className="px" onClick={() => record('NB')}>No-ball</button>
              <button className="pw" style={{ gridColumn: 'span 4' }} onClick={() => record('W')}>Wicket</button>
            </div>
            <p className="subtle" style={{ fontSize: 12, marginTop: 14 }}>
              Every delivery is written to the audit log and broadcast to connected dashboards in real time.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-head"><h3>Batting & bowling</h3></div>
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Batter</th><th className="num">R</th><th className="num">B</th><th className="num">4s</th><th className="num">6s</th><th className="num">SR</th></tr></thead>
              <tbody>
                {liveMatch.batters.map((b) => (
                  <tr key={b.name}>
                    <td><b>{b.name}</b>{b.onStrike && <span style={{ color: 'var(--red)', marginLeft: 6 }}>●</span>}</td>
                    <td className="num"><b>{b.r}</b></td><td className="num">{b.b}</td><td className="num">{b.f}</td><td className="num">{b.s}</td>
                    <td className="num">{((b.r / b.b) * 100).toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="table" style={{ borderTop: '1px solid var(--border)' }}>
              <thead><tr><th>Bowler</th><th className="num">O</th><th className="num">M</th><th className="num">R</th><th className="num">W</th><th className="num">Econ</th></tr></thead>
              <tbody>
                <tr>
                  <td><b>{liveMatch.bowler.name}</b></td>
                  <td className="num">{liveMatch.bowler.o}</td><td className="num">{liveMatch.bowler.m}</td>
                  <td className="num">{liveMatch.bowler.r}</td><td className="num"><b>{liveMatch.bowler.w}</b></td>
                  <td className="num">{(liveMatch.bowler.r / (toBalls(liveMatch.bowler.o) / 6)).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid two-col" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
        <div className="card">
          <div className="card-head"><h3>Worm — cumulative runs</h3></div>
          <div className="card-body" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={liveMatch.worm} margin={{ left: -16, right: 8 }}>
                <CartesianGrid {...chart.grid} />
                <XAxis dataKey="over" {...chart.axis} />
                <YAxis {...chart.axis} />
                <Tooltip {...chart.tooltip} cursor={{ stroke: 'var(--border-strong)' }} labelFormatter={(o) => `Over ${o}`} />
                <Legend {...chart.legend} />
                <Line type="monotone" dataKey="RR" name={teamById.RR.name} stroke={teamById.RR.color} strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="GT" name={teamById.GT.name} stroke={teamById.GT.color} strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <div className="card-head"><h3>Ball-by-ball commentary</h3></div>
          <div className="comm">
            {s.comm.map((c, i) => (
              <div key={i} className={`comm-item ${c.type}`}>
                <span className="ov">{c.ball}</span><span>{c.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
