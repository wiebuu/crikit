import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UserPlus, Mail, Phone, CalendarDays, Trash2 } from 'lucide-react';
import { PageHead, Avatar, Modal, Field } from '../components/ui.jsx';
import { useStore } from '../store.jsx';
import { STAFF_ROLES } from '../data/seed.js';

function StaffForm({ onClose }) {
  const { dispatch, notify } = useStore();
  const [f, setF] = useState({ name: '', role: 'Assistant Coach', email: '', phone: '' });
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  const save = () => { dispatch({ type: 'staff/add', payload: { ...f, name: f.name.trim() } }); notify(`${f.name.trim()} added to staff`); onClose(); };
  return (
    <Modal title="Add staff member" sub="Coaches, support staff and analysts." onClose={onClose}
      footer={<><button className="btn" onClick={onClose}>Cancel</button><button className="btn btn-primary" disabled={!f.name.trim()} onClick={save}><UserPlus size={15} /> Add</button></>}>
      <div className="form-grid">
        <Field label="Full name" span={2}><input className="input" value={f.name} onChange={set('name')} autoFocus placeholder="Name" /></Field>
        <Field label="Role" span={2}><select className="select" value={f.role} onChange={set('role')}>{STAFF_ROLES.filter((r) => r !== 'Team Manager').map((r) => <option key={r}>{r}</option>)}</select></Field>
        <Field label="Email"><input className="input" type="email" value={f.email} onChange={set('email')} placeholder="name@club.com" /></Field>
        <Field label="Phone"><input className="input" value={f.phone} onChange={set('phone')} placeholder="+91 …" /></Field>
      </div>
    </Modal>
  );
}

export default function Staff() {
  const { state, dispatch, notify } = useStore();
  const [params, setParams] = useSearchParams();
  const order = (r) => STAFF_ROLES.indexOf(r);
  const staff = [...state.staff].sort((a, b) => order(a.role) - order(b.role));

  return (
    <>
      <PageHead title="Staff" sub="The people behind the team: management, coaching and support.">
        <button className="btn btn-primary" onClick={() => setParams({ new: '1' })}><UserPlus size={15} /> Add staff</button>
      </PageHead>
      <div className="staff-grid">
        {staff.map((s) => (
          <div key={s.id} className="card staff-card">
            <div className="row between">
              <div className="row">
                <Avatar name={s.name} size={44} />
                <div><b style={{ fontSize: 15 }}>{s.name}</b><div><span className={`badge ${s.role === 'Team Manager' ? 'badge-accent' : ''}`} style={{ marginTop: 4 }}>{s.role}</span></div></div>
              </div>
              {s.role !== 'Team Manager' && (
                <button className="icon-btn ghost" aria-label={`Remove ${s.name}`} title="Remove" onClick={() => { dispatch({ type: 'staff/remove', payload: s.id }); notify(`${s.name} removed`); }}><Trash2 size={15} /></button>
              )}
            </div>
            <div className="contact">
              {s.email && <span><Mail size={14} />{s.email}</span>}
              {s.phone && <span><Phone size={14} />{s.phone}</span>}
              <span><CalendarDays size={14} />With the team since {s.since}</span>
            </div>
          </div>
        ))}
      </div>
      {params.get('new') === '1' && <StaffForm onClose={() => setParams({})} />}
    </>
  );
}
