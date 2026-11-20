import { Download, Info } from 'lucide-react';
import { PageHead, TeamMark, Form, fmtNrr } from '../components/ui.jsx';
import { teams, players, teamById } from '../data/mock.js';

function Leaders({ title, rows, valueKey, unit }) {
  return (
    <div className="card">
      <div className="card-head"><h3>{title}</h3></div>
      {rows.map((p, i) => (
        <div key={p.id} className="row between" style={{ padding: '12px 20px', borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 0 }}>
          <div className="row">
            <span className="mono subtle" style={{ width: 16 }}>{i + 1}</span>
            <TeamMark id={p.team} size="sm" />
            <div><div style={{ fontWeight: 600 }}>{p.name}</div><div className="subtle" style={{ fontSize: 12 }}>{teamById[p.team].name}</div></div>
          </div>
          <div className="mono" style={{ fontWeight: 600, fontSize: 16 }}>{p[valueKey]}<span className="subtle" style={{ fontSize: 11, fontWeight: 500 }}> {unit}</span></div>
        </div>
      ))}
    </div>
  );
}

export default function Standings() {
  const rows = [...teams].sort((a, b) => b.pts - a.pts || b.nrr - a.nrr);
  const topRuns = [...players].sort((a, b) => b.runs - a.runs).slice(0, 5);
  const topWkts = [...players].sort((a, b) => b.wkts - a.wkts).slice(0, 5);

  return (
    <>
      <PageHead title="Leaderboard" sub="Points table recalculated instantly after every completed match.">
        <button className="btn"><Download size={15} /> Download PDF</button>
      </PageHead>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <h3>Points table</h3>
          <span className="row subtle" style={{ fontSize: 12.5, gap: 6 }}><span style={{ width: 10, height: 10, background: 'var(--brand)', borderRadius: 2 }} /> Playoff qualification zone (top 4)</span>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr><th>Pos</th><th>Team</th><th className="num">P</th><th className="num">W</th><th className="num">L</th><th className="num">NR</th><th className="num">NRR</th><th className="num">Pts</th><th>Last 5</th></tr>
            </thead>
            <tbody>
              {rows.map((t, i) => (
                <tr key={t.id} className={i < 4 ? 'qualify' : ''}>
                  <td className="mono"><b>{i + 1}</b></td>
                  <td><div className="row"><TeamMark id={t.id} /><div><b>{t.name}</b><div className="subtle" style={{ fontSize: 12 }}>Capt. {t.captain}</div></div></div></td>
                  <td className="num">{t.p}</td><td className="num">{t.w}</td><td className="num">{t.l}</td><td className="num">{t.nr}</td>
                  <td className="num" style={{ color: t.nrr >= 0 ? 'var(--success)' : 'var(--red)' }}>{fmtNrr(t.nrr)}</td>
                  <td className="num" style={{ fontSize: 15 }}><b>{t.pts}</b></td>
                  <td><Form form={t.form} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row subtle" style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', fontSize: 12.5, gap: 8 }}>
          <Info size={14} /> Win = 2 pts · No result = 1 pt · Ties on points are separated by Net Run Rate.
        </div>
      </div>

      <div className="grid two-col" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <Leaders title="Most runs — Orange Cap" rows={topRuns} valueKey="runs" unit="runs" />
        <Leaders title="Most wickets — Purple Cap" rows={topWkts} valueKey="wkts" unit="wkts" />
      </div>
    </>
  );
}
