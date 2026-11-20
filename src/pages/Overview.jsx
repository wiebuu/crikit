import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CalendarDays, Crown, ArrowRight, Trophy, Dumbbell, Swords, ListChecks, Radio, HeartPulse } from 'lucide-react';
import { TeamLogo, OppMark, StatusBadge, Form, fmtDate, Avatar } from '../components/ui.jsx';
import { useStore } from '../store.jsx';

function useCountdown(iso, time) {
  const target = new Date(`${iso}T${time}:00`).getTime();
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 30000); return () => clearInterval(t); }, []);
  const d = Math.max(0, target - now);
  return { days: Math.floor(d / 864e5), hrs: Math.floor((d % 864e5) / 36e5), mins: Math.floor((d % 36e5) / 6e4) };
}

function NextMatch({ m }) {
  const { comp, state } = useStore();
  const c = useCountdown(m.date, m.time);
  const xi = m.xi?.length ?? 0;
  return (
    <div className="card">
      <div className="card-head">
        <h3>Next match</h3>
        <span className="hint">{comp(m.compId)?.name}{m.stage ? ` · ${m.stage}` : ''}</span>
      </div>
      <div className="card-body">
        <div className="next-match">
          <div className="nm-side"><TeamLogo size={52} /><span>{state.team.name}</span></div>
          <div style={{ textAlign: 'center' }}>
            <div className="countdown">
              <div><b>{c.days}</b><span>days</span></div>
              <div><b>{c.hrs}</b><span>hrs</span></div>
              <div><b>{c.mins}</b><span>min</span></div>
            </div>
            <div className="subtle" style={{ fontSize: 12.5, marginTop: 10 }}>{fmtDate(m.date, { weekday: 'short', day: 'numeric', month: 'short' })} · {m.time}</div>
          </div>
          <div className="nm-side"><OppMark name={m.opponent} size="xl" /><span>{m.opponent}</span></div>
        </div>
        <div className="row between wrap" style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
          <span className="row muted" style={{ fontSize: 13, gap: 6 }}><MapPin size={14} /> {m.venue} · {m.home ? 'Home' : 'Away'}</span>
          <Link to={`/app/matches?xi=${m.id}`} className={`btn btn-sm ${xi === 11 ? '' : 'btn-primary'}`}>
            <ListChecks size={14} /> {xi === 11 ? 'Playing XI selected' : `Select playing XI (${xi}/11)`}
          </Link>
        </div>
      </div>
    </div>
  );
}

function LiveCard({ m }) {
  const { state } = useStore();
  const lv = state.live;
  return (
    <div className="scoreboard">
      <div className="row between wrap">
        <span className="sb-label">Live now · vs {m.opponent}</span>
        <span className="badge" style={{ background: 'rgba(255,255,255,.06)', color: '#d6d8e6', borderColor: 'rgba(255,255,255,.1)' }}><span className="live-dot" style={{ color: '#8ea2ff' }} /> LIVE</span>
      </div>
      <div className="row wrap" style={{ marginTop: 12, gap: 14 }}>
        <TeamLogo size={40} />
        <span className="sb-score" style={{ fontSize: 34 }}>{lv.runs}/{lv.wkts}</span>
        <span className="sb-overs">({Math.floor(lv.balls / 6)}.{lv.balls % 6} ov) · chasing {lv.target}</span>
      </div>
      <div className="row between wrap" style={{ marginTop: 14 }}>
        <span style={{ fontSize: 13, color: '#c4c6d6' }}>Need {lv.target - lv.runs} from {120 - lv.balls} balls</span>
        <Link to="/app/live" className="btn btn-sm" style={{ background: '#fff', color: '#0b0b0f', borderColor: '#fff' }}><Radio size={14} /> Open scorer</Link>
      </div>
    </div>
  );
}

export default function Overview() {
  const { state, player, comp, record } = useStore();
  const { team, players, matches, competitions, training } = state;
  const captain = player(team.captainId);
  const live = matches.find((m) => m.status === 'Live');
  const upcoming = matches.filter((m) => m.status === 'Upcoming').sort((a, b) => a.date.localeCompare(b.date));
  const results = matches.filter((m) => m.status === 'Completed').sort((a, b) => b.date.localeCompare(a.date));
  const active = competitions.filter((c) => c.status !== 'Completed');

  const counts = { Available: 0, Injured: 0, Unavailable: 0 };
  players.forEach((p) => { counts[p.status] += 1; });
  const out = players.filter((p) => p.status !== 'Available');

  const agenda = [
    ...upcoming.map((m) => ({ date: m.date, time: m.time, t: `vs ${m.opponent}`, s: `${comp(m.compId)?.name ?? 'Match'} · ${m.venue}`, kind: 'match' })),
    ...training.map((t) => ({ date: t.date, time: t.time, t: t.title, s: t.venue, kind: 'training' })),
  ].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)).slice(0, 5);

  const topBat = [...players].sort((a, b) => b.stats.runs - a.stats.runs)[0];
  const topBowl = [...players].sort((a, b) => b.stats.wkts - a.stats.wkts)[0];
  const topCatch = [...players].sort((a, b) => b.stats.ct - a.stats.ct)[0];

  return (
    <>
      <section className="team-hero" style={{ '--tc': team.color }}>
        <TeamLogo size={72} />
        <div style={{ minWidth: 0 }}>
          <span className="subtle" style={{ fontSize: 12.5 }}>Season {state.season}</span>
          <h1>{team.name}</h1>
          <div className="meta">
            <span><MapPin size={14} /> {team.homeGround}, {team.city}</span>
            <span><CalendarDays size={14} /> Est. {team.founded}</span>
            {captain && <span><Crown size={14} /> Captain {captain.name}</span>}
          </div>
        </div>
        <div className="hero-kpis">
          <div><b>{record.played}</b><span>Played</span></div>
          <div><b style={{ color: 'var(--success)' }}>{record.won}</b><span>Won</span></div>
          <div><b>{record.lost}</b><span>Lost</span></div>
          <div><b>{record.winPct}%</b><span>Win rate</span></div>
        </div>
      </section>

      {live && <div style={{ marginBottom: 16 }}><LiveCard m={live} /></div>}

      <div className="grid two-col" style={{ gridTemplateColumns: '1.4fr 1fr', marginBottom: 16 }}>
        {upcoming[0] ? <NextMatch m={upcoming[0]} /> : <div className="card card-body">No upcoming matches.</div>}

        <div className="card">
          <div className="card-head"><h3>Squad availability</h3><Link to="/app/squad" className="btn btn-sm btn-ghost">Squad <ArrowRight size={14} /></Link></div>
          <div className="card-body">
            <div className="row" style={{ alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.03em' }} className="mono">{counts.Available}</span>
              <span className="muted">of {players.length} players available</span>
            </div>
            <div className="avail-bar" style={{ marginTop: 14 }}>
              <i style={{ width: `${(counts.Available / players.length) * 100}%`, background: 'var(--success)' }} />
              <i style={{ width: `${(counts.Injured / players.length) * 100}%`, background: 'var(--red)' }} />
              <i style={{ width: `${(counts.Unavailable / players.length) * 100}%`, background: 'var(--amber)' }} />
            </div>
            <div className="legend">
              <span><i style={{ background: 'var(--success)' }} />Available {counts.Available}</span>
              <span><i style={{ background: 'var(--red)' }} />Injured {counts.Injured}</span>
              <span><i style={{ background: 'var(--amber)' }} />Unavailable {counts.Unavailable}</span>
            </div>
            <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
              {out.map((p) => (
                <div key={p.id} className="row between" style={{ fontSize: 13 }}>
                  <span className="row" style={{ gap: 8 }}><Avatar name={p.name} size={26} />{p.name}</span>
                  <StatusBadge status={p.status} />
                </div>
              ))}
              {!out.length && <span className="row subtle" style={{ fontSize: 13, gap: 6 }}><HeartPulse size={14} /> Everyone is fit and available.</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="grid two-col" style={{ gridTemplateColumns: '1.4fr 1fr', marginBottom: 16 }}>
        <div className="card">
          <div className="card-head"><h3>Competitions we’re in</h3><Link to="/app/competitions" className="btn btn-sm btn-ghost">All <ArrowRight size={14} /></Link></div>
          {active.map((c) => (
            <Link to={`/app/competitions?open=${c.id}`} key={c.id} className="agenda-item" style={{ gridTemplateColumns: '40px 1fr auto' }}>
              <span className="comp-icon"><Trophy size={17} /></span>
              <div>
                <div className="t">{c.name}</div>
                <div className="s">{c.format} {c.type.toLowerCase()} · {c.stage}{c.position ? ` · ${ordinal(c.position)} of ${c.teams}` : ''}</div>
              </div>
              <div className="row" style={{ gap: 8 }}>
                {c.p > 0 && <span className="mono subtle" style={{ fontSize: 12.5 }}>{c.w}W {c.l}L</span>}
                <StatusBadge status={c.status} />
              </div>
            </Link>
          ))}
        </div>

        <div className="card">
          <div className="card-head"><h3>Coming up</h3><span className="hint">Matches & training</span></div>
          {agenda.map((a, i) => {
            const d = new Date(a.date + 'T00:00:00');
            return (
              <div className="agenda-item" key={i}>
                <div className="agenda-date"><b>{d.getDate()}</b><span>{d.toLocaleDateString('en-IN', { month: 'short' })}</span></div>
                <div style={{ minWidth: 0 }}>
                  <div className="t">{a.t}</div>
                  <div className="s" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.time} · {a.s}</div>
                </div>
                <span className="stat-icon" style={a.kind === 'match' ? { background: 'var(--brand-soft)', color: 'var(--brand-text)' } : { background: 'var(--surface-2)', color: 'var(--text-2)' }}>
                  {a.kind === 'match' ? <Swords size={15} /> : <Dumbbell size={15} />}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid two-col" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
        <div className="card">
          <div className="card-head"><h3>Recent results</h3><Form form={results.slice(0, 5).map((m) => (m.result === 'Won' ? 'W' : 'L'))} /></div>
          {results.slice(0, 4).map((m) => (
            <div key={m.id} className="agenda-item" style={{ gridTemplateColumns: '32px 1fr auto' }}>
              <OppMark name={m.opponent} />
              <div>
                <div className="t">vs {m.opponent}</div>
                <div className="s">{fmtDate(m.date, { day: 'numeric', month: 'short' })} · {comp(m.compId)?.name} · <span className="mono">{m.our}</span> v <span className="mono">{m.opp}</span></div>
              </div>
              <span className={`badge ${m.result === 'Won' ? 'badge-green' : 'badge-red'}`}>{m.result} {m.margin}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-head"><h3>Top performers</h3><Link to="/app/stats" className="btn btn-sm btn-ghost">Stats <ArrowRight size={14} /></Link></div>
          {[
            { label: 'Most runs', p: topBat, v: topBat?.stats.runs, u: 'runs' },
            { label: 'Most wickets', p: topBowl, v: topBowl?.stats.wkts, u: 'wkts' },
            { label: 'Most catches', p: topCatch, v: topCatch?.stats.ct, u: 'ct' },
          ].map((x) => x.p && (
            <div key={x.label} className="agenda-item" style={{ gridTemplateColumns: '32px 1fr auto' }}>
              <Avatar name={x.p.name} />
              <div><div className="t">{x.p.name}</div><div className="s">{x.label}</div></div>
              <span className="mono" style={{ fontWeight: 600, fontSize: 18 }}>{x.v}<span className="subtle" style={{ fontSize: 11, fontWeight: 400 }}> {x.u}</span></span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
