import { useState } from 'react';
import { Undo2, ShieldCheck, Wifi, Radio } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { PageHead, TeamLogo, OppMark, chart, Empty } from '../components/ui.jsx';
import { useStore } from '../store.jsx';

const toOvers = (n) => `${Math.floor(n / 6)}.${n % 6}`;
const LABEL = {
  W: 'OUT! Big wicket — the batter has to walk back.', '0': 'No run, solid defence.', '1': '1 run, worked into the gap.',
  '2': '2 runs, good running between the wickets.', '3': '3 runs, chased down just short of the rope.',
  '4': 'FOUR! Pierces the field and races away.', '6': 'SIX! Launched high into the stands.',
  WD: 'Wide, drifting down leg.', NB: 'No-ball, overstepped. Free hit coming up.',
};

export default function LiveMatch() {
  const { state, player, comp } = useStore();
  const m = state.matches.find((x) => x.status === 'Live');
  const lv = state.live;
  const [s, setS] = useState({ runs: lv.runs, wkts: lv.wkts, balls: lv.balls, over: lv.thisOver, comm: lv.commentary, history: [] });

  if (!m) return <div className="card"><Empty icon={Radio} title="No match in progress" text="When one of your matches starts, the live scoring console appears here." /></div>;

  const record = (kind) => setS((p) => {
    const legal = kind !== 'WD' && kind !== 'NB';
    const runs = kind === 'W' ? 0 : legal ? Number(kind) : 1;
    const balls = p.balls + (legal ? 1 : 0);
    const overDone = p.over.filter((b) => b !== 'WD' && b !== 'NB').length >= 6;
    return {
      runs: p.runs + runs,
      wkts: p.wkts + (kind === 'W' ? 1 : 0),
      balls,
      over: overDone ? [kind] : [...p.over, kind],
      comm: [{ ball: toOvers(legal ? balls : p.balls), text: LABEL[kind], type: { W: 'wicket', '4': 'four', '6': 'six', '0': 'dot' }[kind] || 'run' }, ...p.comm].slice(0, 8),
      history: [...p.history, p],
    };
  });
  const undo = () => setS((p) => (p.history.length ? p.history[p.history.length - 1] : p));

  const need = Math.max(lv.target - s.runs, 0);
  const left = 120 - s.balls;
  const crr = s.balls ? (s.runs / s.balls) * 6 : 0;
  const rrr = left > 0 ? (need / left) * 6 : 0;
  const status = s.runs >= lv.target ? `${state.team.name} won by ${10 - s.wkts} wickets`
    : s.wkts >= 10 || left <= 0 ? `${m.opponent} won by ${lv.target - 1 - s.runs} runs`
    : `${state.team.name} need ${need} runs from ${left} balls`;
  const empties = Math.max(0, 6 - s.over.filter((b) => b !== 'WD' && b !== 'NB').length);

  return (
    <>
      <PageHead title="Live Match" sub={`vs ${m.opponent} · ${comp(m.compId)?.name} · ${m.venue}`}>
        <span className="badge badge-green"><Wifi size={13} /> Synced</span>
        <button className="btn"><ShieldCheck size={15} /> Request umpire verification</button>
      </PageHead>

      <div className="scoreboard" style={{ marginBottom: 16 }}>
        <div className="sb-teams">
          <div className="row" style={{ gap: 16 }}>
            <TeamLogo size={48} />
            <div>
              <div className="sb-label">{state.team.name} · batting</div>
              <div className="row" style={{ alignItems: 'baseline', gap: 10 }}>
                <span className="sb-score">{s.runs}/{s.wkts}</span>
                <span className="sb-overs">({toOvers(s.balls)} ov)</span>
              </div>
            </div>
          </div>
          <div className="row on-dark" style={{ gap: 12, textAlign: 'right' }}>
            <div>
              <div className="sb-label">{m.opponent} · 1st innings</div>
              <div className="mono" style={{ fontSize: 22, fontWeight: 500 }}>{m.opp}</div>
            </div>
            <OppMark name={m.opponent} size="lg" />
          </div>
        </div>
        <div className="sb-pills">
          <div className="sb-pill">Target<b>{lv.target}</b></div>
          <div className="sb-pill">CRR<b>{crr.toFixed(2)}</b></div>
          <div className="sb-pill">Req. RR<b>{rrr.toFixed(2)}</b></div>
          <div className="sb-pill">Balls left<b>{left}</b></div>
          <div className="sb-pill" style={{ flex: 1, minWidth: 220 }}>Status<b style={{ fontFamily: 'var(--font)', fontSize: 14, marginTop: 3 }}>{status}</b></div>
        </div>
      </div>

      <div className="grid two-col" style={{ gridTemplateColumns: '1fr 1.2fr', marginBottom: 16 }}>
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
            <p className="subtle" style={{ fontSize: 12, marginTop: 14 }}>Every delivery is saved to the audit log and pushed to the team’s dashboards in real time.</p>
          </div>
        </div>

        <div className="card">
          <div className="card-head"><h3>At the crease</h3></div>
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Batter</th><th className="num">R</th><th className="num">B</th><th className="num">4s</th><th className="num">6s</th><th className="num">SR</th></tr></thead>
              <tbody>
                {lv.batters.map((b) => (
                  <tr key={b.id}>
                    <td><b>{player(b.id)?.name ?? 'Batter'}</b>{b.onStrike && <span style={{ color: 'var(--brand-text)', marginLeft: 6 }}>●</span>}</td>
                    <td className="num"><b>{b.r}</b></td><td className="num">{b.b}</td><td className="num">{b.f}</td><td className="num">{b.s}</td>
                    <td className="num">{((b.r / b.b) * 100).toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="table" style={{ borderTop: '1px solid var(--border)' }}>
              <thead><tr><th>Bowler ({m.opponent})</th><th className="num">O</th><th className="num">M</th><th className="num">R</th><th className="num">W</th></tr></thead>
              <tbody>
                <tr><td><b>{lv.bowler.name}</b></td><td className="num">{lv.bowler.o}</td><td className="num">{lv.bowler.m}</td><td className="num">{lv.bowler.r}</td><td className="num"><b>{lv.bowler.w}</b></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid two-col" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
        <div className="card">
          <div className="card-head"><h3>Run progression</h3></div>
          <div className="card-body" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lv.worm} margin={{ left: -16, right: 8 }}>
                <CartesianGrid {...chart.grid} />
                <XAxis dataKey="over" {...chart.axis} />
                <YAxis {...chart.axis} />
                <Tooltip {...chart.tooltip} cursor={{ stroke: 'var(--border-strong)' }} labelFormatter={(o) => `Over ${o}`} />
                <Legend {...chart.legend} />
                <Line type="monotone" dataKey="us" name={state.team.name} stroke="var(--brand)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="opp" name={m.opponent} stroke="var(--text-3)" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <div className="card-head"><h3>Ball-by-ball</h3></div>
          {s.comm.map((c, i) => (
            <div key={i} className={`comm-item ${c.type}`}><span className="ov">{c.ball}</span><span>{c.text}</span></div>
          ))}
        </div>
      </div>
    </>
  );
}
