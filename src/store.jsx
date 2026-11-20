import { createContext, useContext, useEffect, useReducer, useState, useCallback, useMemo } from 'react';
import { seed } from './data/seed.js';

const KEY = 'crickit-team-v2';
const uid = (p) => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data?.version === seed.version) return data;
    }
  } catch { /* storage unavailable or corrupt: fall back to seed */ }
  return structuredClone(seed);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case 'team/update':
      return { ...state, team: { ...state.team, ...payload } };
    case 'player/add':
      return { ...state, players: [...state.players, { id: uid('p'), joined: Number(state.season), stats: { m: 0, runs: 0, hs: 0, avg: 0, sr: 0, wkts: 0, best: '—', econ: null, ct: 0 }, ...payload }] };
    case 'player/update':
      return { ...state, players: state.players.map((p) => (p.id === payload.id ? { ...p, ...payload } : p)) };
    case 'player/remove':
      return { ...state, players: state.players.filter((p) => p.id !== payload) };
    case 'staff/add':
      return { ...state, staff: [...state.staff, { id: uid('s'), since: Number(state.season), ...payload }] };
    case 'staff/remove':
      return { ...state, staff: state.staff.filter((s) => s.id !== payload) };
    case 'comp/add':
      return { ...state, competitions: [{ id: uid('c'), status: 'Upcoming', stage: 'Registered', position: null, p: 0, w: 0, l: 0, nr: 0, pts: null, nrr: null, ...payload }, ...state.competitions] };
    case 'match/add':
      return { ...state, matches: [...state.matches, { id: uid('m'), status: 'Upcoming', xi: [], ...payload }] };
    case 'match/xi':
      return { ...state, matches: state.matches.map((m) => (m.id === payload.id ? { ...m, xi: payload.xi } : m)) };
    case 'training/add':
      return { ...state, training: [...state.training, { id: uid('t'), ...payload }] };
    case 'reset':
      return structuredClone(seed);
    default:
      return state;
  }
}

const Ctx = createContext(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* quota or private mode: keep in memory */ }
  }, [state]);

  const notify = useCallback((text) => {
    const id = Math.random();
    setToasts((t) => [...t, { id, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const value = useMemo(() => {
    const player = (id) => state.players.find((p) => p.id === id);
    const comp = (id) => state.competitions.find((c) => c.id === id);
    const done = state.matches.filter((m) => m.status === 'Completed');
    const record = {
      played: done.length,
      won: done.filter((m) => m.result === 'Won').length,
      lost: done.filter((m) => m.result === 'Lost').length,
    };
    record.winPct = record.played ? Math.round((record.won / record.played) * 100) : 0;
    return { state, dispatch, notify, toasts, player, comp, record };
  }, [state, notify, toasts]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useStore = () => useContext(Ctx);
