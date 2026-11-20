// Mock data for the frontend prototype.
// When the Express/MongoDB backend is ready, replace these with API calls.

export const org = {
  name: 'Crickit',
  season: 'Season 2026',
};

export const teams = [
  { id: 'HH', name: 'Himalayan Hawks', color: '#3e5bd8', captain: 'Arjun Negi', coach: 'R. Bhandari', home: 'SRHU Ground, Dehradun', founded: 2019, players: 16, p: 7, w: 6, l: 1, nr: 0, nrr: 1.284, form: ['W', 'W', 'L', 'W', 'W'] },
  { id: 'DS', name: 'Doon Strikers', color: '#2b8aa3', captain: 'Rohit Rawat', coach: 'S. Thapa', home: 'Maharana Pratap Stadium', founded: 2018, players: 15, p: 7, w: 5, l: 2, nr: 0, nrr: 0.912, form: ['W', 'L', 'W', 'W', 'W'] },
  { id: 'RR', name: 'Rishikesh Rangers', color: '#b5714a', captain: 'Vikas Bisht', coach: 'A. Joshi', home: 'Ganga View Oval', founded: 2020, players: 16, p: 7, w: 4, l: 2, nr: 1, nrr: 0.433, form: ['W', 'NR', 'W', 'L', 'W'] },
  { id: 'GT', name: 'Ganga Titans', color: '#7c63d4', captain: 'Manish Chauhan', coach: 'K. Pant', home: 'Haridwar Sports Complex', founded: 2017, players: 17, p: 7, w: 4, l: 3, nr: 0, nrr: 0.102, form: ['L', 'W', 'W', 'L', 'W'] },
  { id: 'MM', name: 'Mussoorie Mavericks', color: '#3f9282', captain: 'Deepak Kaintura', coach: 'P. Rana', home: 'Hill Top Ground', founded: 2021, players: 15, p: 7, w: 3, l: 4, nr: 0, nrr: -0.215, form: ['L', 'L', 'W', 'W', 'L'] },
  { id: 'HR', name: 'Haridwar Heroes', color: '#a68a45', captain: 'Sandeep Saini', coach: 'M. Gusain', home: 'Haridwar Sports Complex', founded: 2019, players: 16, p: 7, w: 2, l: 4, nr: 1, nrr: -0.488, form: ['L', 'W', 'NR', 'L', 'L'] },
  { id: 'NK', name: 'Nainital Knights', color: '#b0657d', captain: 'Harsh Bora', coach: 'D. Mehra', home: 'Flats Ground, Nainital', founded: 2016, players: 15, p: 7, w: 2, l: 5, nr: 0, nrr: -0.871, form: ['L', 'L', 'W', 'L', 'L'] },
  { id: 'GG', name: 'Garhwal Gladiators', color: '#6b7385', captain: 'Nitin Butola', coach: 'V. Semwal', home: 'Pauri Cricket Ground', founded: 2022, players: 14, p: 7, w: 1, l: 6, nr: 0, nrr: -1.142, form: ['L', 'L', 'L', 'W', 'L'] },
].map((t) => ({ ...t, pts: t.w * 2 + t.nr }));

export const teamById = Object.fromEntries(teams.map((t) => [t.id, t]));

export const players = [
  { id: 1, name: 'Arjun Negi', team: 'HH', role: 'Batter', bat: 'Right', bowl: '—', m: 7, runs: 342, avg: 57.0, sr: 148.7, wkts: 0, econ: null, status: 'Fit' },
  { id: 2, name: 'Rohit Rawat', team: 'DS', role: 'All-rounder', bat: 'Right', bowl: 'Right-arm medium', m: 7, runs: 268, avg: 44.6, sr: 139.5, wkts: 9, econ: 7.4, status: 'Fit' },
  { id: 3, name: 'Vikas Bisht', team: 'RR', role: 'Wicket-keeper', bat: 'Left', bowl: '—', m: 7, runs: 301, avg: 50.1, sr: 152.0, wkts: 0, econ: null, status: 'Fit' },
  { id: 4, name: 'Kunal Dhyani', team: 'HH', role: 'Bowler', bat: 'Right', bowl: 'Left-arm fast', m: 7, runs: 34, avg: 8.5, sr: 98.0, wkts: 15, econ: 6.2, status: 'Fit' },
  { id: 5, name: 'Manish Chauhan', team: 'GT', role: 'Batter', bat: 'Right', bowl: 'Off-break', m: 7, runs: 287, avg: 41.0, sr: 131.6, wkts: 2, econ: 8.1, status: 'Fit' },
  { id: 6, name: 'Deepak Kaintura', team: 'MM', role: 'All-rounder', bat: 'Left', bowl: 'Slow left-arm', m: 7, runs: 198, avg: 33.0, sr: 127.4, wkts: 8, econ: 6.9, status: 'Doubtful' },
  { id: 7, name: 'Sandeep Saini', team: 'HR', role: 'Bowler', bat: 'Right', bowl: 'Right-arm fast', m: 7, runs: 41, avg: 10.2, sr: 105.1, wkts: 12, econ: 7.1, status: 'Fit' },
  { id: 8, name: 'Harsh Bora', team: 'NK', role: 'Batter', bat: 'Right', bowl: '—', m: 7, runs: 224, avg: 32.0, sr: 135.7, wkts: 0, econ: null, status: 'Fit' },
  { id: 9, name: 'Nitin Butola', team: 'GG', role: 'All-rounder', bat: 'Right', bowl: 'Leg-break', m: 7, runs: 176, avg: 25.1, sr: 122.2, wkts: 7, econ: 7.8, status: 'Injured' },
  { id: 10, name: 'Aman Thapliyal', team: 'DS', role: 'Bowler', bat: 'Left', bowl: 'Left-arm medium', m: 7, runs: 22, avg: 7.3, sr: 91.6, wkts: 13, econ: 6.6, status: 'Fit' },
  { id: 11, name: 'Yash Pundir', team: 'RR', role: 'Bowler', bat: 'Right', bowl: 'Leg-break', m: 6, runs: 18, avg: 6.0, sr: 85.7, wkts: 11, econ: 6.4, status: 'Fit' },
  { id: 12, name: 'Ritik Mamgain', team: 'GT', role: 'Wicket-keeper', bat: 'Right', bowl: '—', m: 7, runs: 211, avg: 35.1, sr: 141.6, wkts: 0, econ: null, status: 'Fit' },
  { id: 13, name: 'Sahil Uniyal', team: 'HH', role: 'All-rounder', bat: 'Left', bowl: 'Off-break', m: 7, runs: 156, avg: 31.2, sr: 144.4, wkts: 6, econ: 7.0, status: 'Fit' },
  { id: 14, name: 'Prateek Nautiyal', team: 'MM', role: 'Batter', bat: 'Right', bowl: '—', m: 7, runs: 239, avg: 39.8, sr: 129.1, wkts: 0, econ: null, status: 'Fit' },
  { id: 15, name: 'Gaurav Kandari', team: 'NK', role: 'Bowler', bat: 'Right', bowl: 'Right-arm fast', m: 7, runs: 29, avg: 9.6, sr: 96.6, wkts: 10, econ: 7.6, status: 'Fit' },
  { id: 16, name: 'Ankit Rautela', team: 'HR', role: 'Batter', bat: 'Left', bowl: '—', m: 7, runs: 205, avg: 29.2, sr: 133.1, wkts: 0, econ: null, status: 'Fit' },
];

export const fixtures = [
  { id: 'M29', date: '2026-11-18', time: '14:00', home: 'HH', away: 'NK', venue: 'SRHU Ground, Dehradun', status: 'Completed', result: 'Himalayan Hawks won by 7 wickets', score: { HH: '164/3 (17.2)', NK: '161/8 (20)' } },
  { id: 'M30', date: '2026-11-19', time: '18:30', home: 'DS', away: 'MM', venue: 'Maharana Pratap Stadium', status: 'Completed', result: 'Doon Strikers won by 22 runs', score: { DS: '187/5 (20)', MM: '165/9 (20)' } },
  { id: 'M31', date: '2026-11-20', time: '14:00', home: 'RR', away: 'GT', venue: 'Ganga View Oval', status: 'Live', result: 'Ganga Titans need 46 runs from 32 balls', score: { RR: '172/6 (20)', GT: '127/4 (14.4)' } },
  { id: 'M32', date: '2026-11-21', time: '18:30', home: 'HR', away: 'GG', venue: 'Haridwar Sports Complex', status: 'Upcoming' },
  { id: 'M33', date: '2026-11-22', time: '14:00', home: 'HH', away: 'DS', venue: 'SRHU Ground, Dehradun', status: 'Upcoming' },
  { id: 'M34', date: '2026-11-22', time: '18:30', home: 'NK', away: 'MM', venue: 'Flats Ground, Nainital', status: 'Upcoming' },
  { id: 'M35', date: '2026-11-24', time: '14:00', home: 'GT', away: 'HR', venue: 'Haridwar Sports Complex', status: 'Upcoming' },
  { id: 'M36', date: '2026-11-25', time: '18:30', home: 'GG', away: 'RR', venue: 'Pauri Cricket Ground', status: 'Upcoming' },
];

// Live match (M31) ball-by-ball snapshot
export const liveMatch = {
  id: 'M31',
  batting: 'GT',
  bowling: 'RR',
  target: 173,
  runs: 127,
  wkts: 4,
  overs: '14.4',
  crr: 8.66,
  rrr: 8.63,
  batters: [
    { name: 'Manish Chauhan', r: 58, b: 39, f: 6, s: 2, onStrike: true },
    { name: 'Ritik Mamgain', r: 21, b: 14, f: 1, s: 1, onStrike: false },
  ],
  bowler: { name: 'Yash Pundir', o: '3.4', m: 0, r: 24, w: 2 },
  thisOver: ['1', '4', 'W', '0'],
  // runs per over for both innings, used in the worm chart
  worm: [
    { over: 1, RR: 8, GT: 6 }, { over: 2, RR: 17, GT: 15 }, { over: 3, RR: 25, GT: 27 },
    { over: 4, RR: 38, GT: 33 }, { over: 5, RR: 46, GT: 44 }, { over: 6, RR: 59, GT: 52 },
    { over: 7, RR: 66, GT: 61 }, { over: 8, RR: 74, GT: 69 }, { over: 9, RR: 85, GT: 78 },
    { over: 10, RR: 93, GT: 88 }, { over: 11, RR: 104, GT: 97 }, { over: 12, RR: 112, GT: 108 },
    { over: 13, RR: 121, GT: 116 }, { over: 14, RR: 133, GT: 124 }, { over: 15, RR: 140 },
    { over: 16, RR: 148 }, { over: 17, RR: 155 }, { over: 18, RR: 161 }, { over: 19, RR: 166 }, { over: 20, RR: 172 },
  ],
  commentary: [
    { ball: '14.4', text: 'Pundir to Chauhan, no run. Tossed up outside off, defended back.', type: 'dot' },
    { ball: '14.3', text: 'OUT! Pundir to Rautela, bowled. The googly sneaks through bat and pad.', type: 'wicket' },
    { ball: '14.2', text: 'Pundir to Chauhan, FOUR. Swept fine, beats short fine leg.', type: 'four' },
    { ball: '14.1', text: 'Pundir to Rautela, 1 run. Pushed to long-on.', type: 'run' },
    { ball: '13.6', text: 'Bisht to Chauhan, SIX! Down the track and lofted over long-off.', type: 'six' },
  ],
};

export const activity = [
  { when: '2 min ago', text: 'Score updated: GT 127/4 (14.4) vs RR', kind: 'score' },
  { when: '18 min ago', text: 'Umpire verified innings 1 scorecard for M31', kind: 'audit' },
  { when: '1 h ago', text: 'Coach S. Thapa updated Doon Strikers playing XI for M33', kind: 'team' },
  { when: '3 h ago', text: 'Fixture M35 moved to Haridwar Sports Complex (venue clash resolved)', kind: 'fixture' },
  { when: 'Yesterday', text: 'Match report for M30 exported to PDF by Admin', kind: 'report' },
];

export const runsByTeam = teams.map((t, i) => ({
  team: t.id,
  scored: [1186, 1142, 1060, 1031, 998, 951, 912, 874][i],
  conceded: [1032, 1015, 1012, 1019, 1027, 1022, 1007, 1009][i],
}));

export const reports = [
  { id: 'R-1031', title: 'Match Summary — M30 DS vs MM', type: 'Match summary', date: '2026-11-19', size: '284 KB', format: 'PDF' },
  { id: 'R-1030', title: 'Points Table & NRR — Week 4', type: 'Standings', date: '2026-11-17', size: '96 KB', format: 'PDF' },
  { id: 'R-1029', title: 'Player Statistics — All Teams', type: 'Player stats', date: '2026-11-16', size: '412 KB', format: 'CSV' },
  { id: 'R-1028', title: 'Score Edit Audit Log — November', type: 'Audit', date: '2026-11-15', size: '58 KB', format: 'CSV' },
  { id: 'R-1027', title: 'Match Summary — M29 HH vs NK', type: 'Match summary', date: '2026-11-18', size: '276 KB', format: 'PDF' },
  { id: 'R-1026', title: 'Fixture Schedule — Upcoming Matches', type: 'Fixtures', date: '2026-11-14', size: '74 KB', format: 'PDF' },
];
