import { FileText, FileSpreadsheet, Download, Share2, Plus, ClipboardList, Trophy, Users, ShieldCheck } from 'lucide-react';
import { PageHead, fmtDate } from '../components/ui.jsx';
import { reports } from '../data/mock.js';

const templates = [
  { icon: ClipboardList, title: 'Match summary', desc: 'Scorecard, key moments and player of the match.' },
  { icon: Trophy, title: 'Standings report', desc: 'Points table with NRR breakdown per team.' },
  { icon: Users, title: 'Player statistics', desc: 'Batting and bowling aggregates for any squad.' },
  { icon: ShieldCheck, title: 'Audit log', desc: 'Every score edit with user, time and reason.' },
];

export default function Reports() {
  return (
    <>
      <PageHead title="Reports" sub="Downloadable reports and shareable match summaries for stakeholders.">
        <button className="btn btn-primary"><Plus size={15} /> New report</button>
      </PageHead>

      <div className="team-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', marginBottom: 20 }}>
        {templates.map(({ icon: Icon, title, desc }) => (
          <button key={title} className="card" style={{ textAlign: 'left', padding: 20, cursor: 'pointer' }}>
            <span className="stat-icon" style={{ background: 'var(--brand-soft)', color: 'var(--brand)', marginBottom: 14 }}><Icon size={17} /></span>
            <div style={{ fontWeight: 600, fontSize: 15 }}>{title}</div>
            <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>{desc}</div>
          </button>
        ))}
      </div>

      <div className="card">
        <div className="card-head"><h3>Generated reports</h3><span className="subtle" style={{ fontSize: 12.5 }}>{reports.length} files</span></div>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Report</th><th>Type</th><th>Generated</th><th className="num">Size</th><th style={{ textAlign: 'right' }}>Actions</th></tr></thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="row">
                      <span className="stat-icon" style={{ background: r.format === 'PDF' ? 'var(--red-soft)' : 'var(--brand-soft)', color: r.format === 'PDF' ? 'var(--red)' : 'var(--brand)' }}>
                        {r.format === 'PDF' ? <FileText size={16} /> : <FileSpreadsheet size={16} />}
                      </span>
                      <div><b>{r.title}</b><div className="subtle mono" style={{ fontSize: 11.5 }}>{r.id} · {r.format}</div></div>
                    </div>
                  </td>
                  <td><span className="badge">{r.type}</span></td>
                  <td className="muted">{fmtDate(r.date)}</td>
                  <td className="num">{r.size}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="row" style={{ justifyContent: 'flex-end', gap: 6 }}>
                      <button className="icon-btn" aria-label="Share"><Share2 size={15} /></button>
                      <button className="icon-btn" aria-label="Download"><Download size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
