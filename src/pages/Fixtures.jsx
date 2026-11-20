import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wand2, Plus, MapPin, Clock, Hash, CheckCircle2 } from 'lucide-react';
import { PageHead, TeamMark, StatusBadge } from '../components/ui.jsx';
import { fixtures, teamById } from '../data/mock.js';

const filters = ['All', 'Live', 'Upcoming', 'Completed'];

export default function Fixtures() {
  const [f, setF] = useState('All');
  const [generated, setGenerated] = useState(false);
  const list = fixtures.filter((x) => f === 'All' || x.status === f);

  return (
    <>
      <PageHead title="Fixtures" sub="Clash-free round-robin schedule across all venues.">
        <button className="btn" onClick={() => setGenerated(true)}><Wand2 size={15} /> Auto-generate schedule</button>
        <button className="btn btn-primary"><Plus size={15} /> Add match</button>
      </PageHead>

      {generated && (
        <div className="card" style={{ padding: '14px 20px', marginBottom: 20, display: 'flex', gap: 12, alignItems: 'center', background: 'var(--brand-soft)', borderColor: 'var(--brand-line)', boxShadow: 'none' }}>
          <CheckCircle2 size={18} color="var(--brand-text)" />
          <span><b>Schedule check passed.</b> 56 league matches across 4 venues · 0 venue clashes · minimum 2 rest days per team.</span>
        </div>
      )}

      <div className="card">
        <div className="toolbar">
          <div className="tabs">
            {filters.map((x) => (
              <button key={x} className={`tab${f === x ? ' active' : ''}`} onClick={() => setF(x)}>{x}</button>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <span className="subtle" style={{ fontSize: 13 }}>Showing {list.length} matches</span>
        </div>

        {list.map((m) => {
          const d = new Date(m.date + 'T00:00:00');
          return (
            <div className="fixture" key={m.id}>
              <div className="fx-date">
                <div className="d">{d.getDate()}</div>
                <div className="m">{d.toLocaleDateString('en-IN', { month: 'short', weekday: 'short' })}</div>
              </div>
              <div>
                <div className="fx-teams">
                  <div className="fx-team">
                    <TeamMark id={m.home} />
                    <div><div>{teamById[m.home].name}</div>{m.score && <div className="sc">{m.score[m.home]}</div>}</div>
                  </div>
                  <span className="vs">VS</span>
                  <div className="fx-team right">
                    <TeamMark id={m.away} />
                    <div><div>{teamById[m.away].name}</div>{m.score && <div className="sc">{m.score[m.away]}</div>}</div>
                  </div>
                </div>
                <div className="fx-meta">
                  <span><Hash size={13} />{m.id}</span>
                  <span><Clock size={13} />{m.time} IST</span>
                  <span><MapPin size={13} />{m.venue}</span>
                  {m.result && <span style={{ color: m.status === 'Live' ? 'var(--red)' : 'var(--brand-text)', fontWeight: 500 }}>{m.result}</span>}
                </div>
              </div>
              <div className="row" style={{ justifyContent: 'flex-end' }}>
                <StatusBadge status={m.status} />
                {m.status === 'Live' && <Link to="/app/live" className="btn btn-sm btn-primary">Score</Link>}
                {m.status === 'Completed' && <button className="btn btn-sm">Scorecard</button>}
                {m.status === 'Upcoming' && <button className="btn btn-sm">Edit</button>}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
