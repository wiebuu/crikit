/*
 * Crickit data schema — ONE team, managed by its team manager.
 *
 * team          the club itself (identity, logo, home ground, leadership)
 * staff[]       manager, coaches, physio, analyst …
 * players[]     the squad, with availability and season stats
 * competitions[] every tournament / league / series the team has entered
 * matches[]     every fixture the team plays, linked to a competition
 * training[]    practice sessions on the team calendar
 *
 * This is sample data for the frontend prototype. The backend (Express +
 * MongoDB) will expose the same shapes through its REST API.
 */

export const ROLES = ['Batter', 'Bowler', 'All-rounder', 'Wicket-keeper'];
export const AVAILABILITY = ['Available', 'Injured', 'Unavailable'];
export const STAFF_ROLES = ['Team Manager', 'Head Coach', 'Assistant Coach', 'Batting Coach', 'Bowling Coach', 'Fielding Coach', 'Physio', 'Analyst'];
export const FORMATS = ['T20', 'T10', 'ODI', 'Test'];
export const COMP_TYPES = ['League', 'Knockout', 'Series', 'Friendly'];

export const seed = {
  version: 2,
  season: '2026',

  team: {
    name: 'Strikers Cricket Club',
    shortName: 'SCC',
    logo: null, // data URL once the manager uploads a crest
    color: '#3e5bd8',
    founded: 2019,
    city: 'Dehradun',
    homeGround: 'University Cricket Ground',
    motto: 'Play hard. Play fair.',
    captainId: 'p1',
    viceCaptainId: 'p2',
    keeperId: 'p3',
  },

  staff: [
    { id: 's1', name: 'Sagar Saini', role: 'Team Manager', email: 'manager@strikers.club', phone: '+91 98765 10001', since: 2023 },
    { id: 's2', name: 'Rakesh Bhandari', role: 'Head Coach', email: 'coach@strikers.club', phone: '+91 98765 10002', since: 2021 },
    { id: 's3', name: 'Aditya Kaintura', role: 'Analyst', email: 'analyst@strikers.club', phone: '+91 98765 10003', since: 2024 },
    { id: 's4', name: 'Kajal Bisht', role: 'Physio', email: 'physio@strikers.club', phone: '+91 98765 10004', since: 2024 },
    { id: 's5', name: 'Sunil Thapa', role: 'Bowling Coach', email: 'bowling@strikers.club', phone: '+91 98765 10005', since: 2022 },
  ],

  players: [
    { id: 'p1', name: 'Arjun Negi', jersey: 7, role: 'Batter', bat: 'Right-hand', bowl: '—', age: 24, status: 'Available', joined: 2019, stats: { m: 14, runs: 512, hs: 94, avg: 42.6, sr: 141.8, wkts: 0, best: '—', econ: null, ct: 6 } },
    { id: 'p2', name: 'Rohit Rawat', jersey: 18, role: 'All-rounder', bat: 'Right-hand', bowl: 'Right-arm medium', age: 26, status: 'Available', joined: 2019, stats: { m: 14, runs: 388, hs: 71, avg: 35.2, sr: 136.1, wkts: 16, best: '4/22', econ: 7.2, ct: 4 } },
    { id: 'p3', name: 'Vikas Bisht', jersey: 1, role: 'Wicket-keeper', bat: 'Left-hand', bowl: '—', age: 23, status: 'Available', joined: 2020, stats: { m: 14, runs: 421, hs: 88, avg: 38.2, sr: 148.9, wkts: 0, best: '—', econ: null, ct: 14 } },
    { id: 'p4', name: 'Kunal Dhyani', jersey: 33, role: 'Bowler', bat: 'Right-hand', bowl: 'Left-arm fast', age: 22, status: 'Available', joined: 2021, stats: { m: 13, runs: 48, hs: 15, avg: 8.0, sr: 104.3, wkts: 22, best: '5/18', econ: 6.4, ct: 3 } },
    { id: 'p5', name: 'Manish Chauhan', jersey: 45, role: 'Batter', bat: 'Right-hand', bowl: 'Off-break', age: 27, status: 'Injured', joined: 2019, stats: { m: 10, runs: 302, hs: 67, avg: 33.5, sr: 129.4, wkts: 3, best: '1/12', econ: 8.1, ct: 5 } },
    { id: 'p6', name: 'Deepak Kaintura', jersey: 10, role: 'All-rounder', bat: 'Left-hand', bowl: 'Slow left-arm', age: 25, status: 'Available', joined: 2020, stats: { m: 14, runs: 241, hs: 52, avg: 26.7, sr: 131.0, wkts: 14, best: '3/19', econ: 6.8, ct: 7 } },
    { id: 'p7', name: 'Sandeep Saini', jersey: 99, role: 'Bowler', bat: 'Right-hand', bowl: 'Right-arm fast', age: 24, status: 'Available', joined: 2021, stats: { m: 14, runs: 61, hs: 22, avg: 10.1, sr: 112.9, wkts: 19, best: '4/27', econ: 7.0, ct: 2 } },
    { id: 'p8', name: 'Harsh Bora', jersey: 21, role: 'Batter', bat: 'Right-hand', bowl: '—', age: 21, status: 'Unavailable', joined: 2023, stats: { m: 8, runs: 176, hs: 49, avg: 25.1, sr: 124.8, wkts: 0, best: '—', econ: null, ct: 3 } },
    { id: 'p9', name: 'Nitin Butola', jersey: 14, role: 'All-rounder', bat: 'Right-hand', bowl: 'Leg-break', age: 28, status: 'Available', joined: 2019, stats: { m: 12, runs: 198, hs: 44, avg: 22.0, sr: 127.7, wkts: 11, best: '3/24', econ: 7.6, ct: 4 } },
    { id: 'p10', name: 'Aman Thapliyal', jersey: 27, role: 'Bowler', bat: 'Left-hand', bowl: 'Left-arm medium', age: 22, status: 'Available', joined: 2022, stats: { m: 11, runs: 22, hs: 9, avg: 5.5, sr: 88.0, wkts: 13, best: '3/15', econ: 6.9, ct: 1 } },
    { id: 'p11', name: 'Yash Pundir', jersey: 8, role: 'Bowler', bat: 'Right-hand', bowl: 'Leg-break', age: 20, status: 'Available', joined: 2024, stats: { m: 9, runs: 18, hs: 11, avg: 6.0, sr: 90.0, wkts: 12, best: '4/20', econ: 6.6, ct: 2 } },
    { id: 'p12', name: 'Ritik Mamgain', jersey: 5, role: 'Wicket-keeper', bat: 'Right-hand', bowl: '—', age: 22, status: 'Available', joined: 2023, stats: { m: 6, runs: 131, hs: 38, avg: 26.2, sr: 133.6, wkts: 0, best: '—', econ: null, ct: 5 } },
    { id: 'p13', name: 'Sahil Uniyal', jersey: 23, role: 'All-rounder', bat: 'Left-hand', bowl: 'Off-break', age: 23, status: 'Available', joined: 2022, stats: { m: 12, runs: 214, hs: 57, avg: 30.5, sr: 140.7, wkts: 8, best: '2/14', econ: 7.1, ct: 6 } },
    { id: 'p14', name: 'Prateek Nautiyal', jersey: 11, role: 'Batter', bat: 'Right-hand', bowl: '—', age: 25, status: 'Available', joined: 2021, stats: { m: 11, runs: 267, hs: 61, avg: 29.6, sr: 126.5, wkts: 0, best: '—', econ: null, ct: 4 } },
    { id: 'p15', name: 'Gaurav Kandari', jersey: 36, role: 'Bowler', bat: 'Right-hand', bowl: 'Right-arm fast', age: 26, status: 'Injured', joined: 2020, stats: { m: 7, runs: 19, hs: 8, avg: 6.3, sr: 95.0, wkts: 8, best: '3/31', econ: 7.9, ct: 1 } },
    { id: 'p16', name: 'Ankit Rautela', jersey: 3, role: 'Batter', bat: 'Left-hand', bowl: '—', age: 19, status: 'Available', joined: 2025, stats: { m: 5, runs: 98, hs: 41, avg: 24.5, sr: 130.6, wkts: 0, best: '—', econ: null, ct: 2 } },
  ],

  competitions: [
    { id: 'c1', name: 'City T20 League', organiser: 'District Cricket Association', format: 'T20', type: 'League', start: '2026-10-05', end: '2026-12-20', status: 'Ongoing', teams: 10, stage: 'Group stage', position: 2, p: 7, w: 5, l: 2, nr: 0, pts: 10, nrr: 0.912 },
    { id: 'c2', name: 'Inter-College Cup', organiser: 'University Sports Council', format: 'T20', type: 'Knockout', start: '2026-11-10', end: '2026-12-05', status: 'Ongoing', teams: 16, stage: 'Quarter-final', position: null, p: 2, w: 2, l: 0, nr: 0, pts: null, nrr: null },
    { id: 'c3', name: 'Winter One-Day Trophy', organiser: 'State Cricket Club Forum', format: 'ODI', type: 'League', start: '2027-01-10', end: '2027-02-15', status: 'Upcoming', teams: 8, stage: 'Registered', position: null, p: 0, w: 0, l: 0, nr: 0, pts: null, nrr: null },
    { id: 'c4', name: 'Monsoon T10 Bash', organiser: 'City Sports Club', format: 'T10', type: 'Knockout', start: '2026-07-12', end: '2026-07-20', status: 'Completed', teams: 12, stage: 'Final', position: 1, result: 'Champions', p: 5, w: 5, l: 0, nr: 0, pts: null, nrr: null },
  ],

  matches: [
    { id: 'm1', compId: 'c4', opponent: 'Lakeside Lions', date: '2026-07-20', time: '16:00', venue: 'City Sports Club Ground', home: false, status: 'Completed', result: 'Won', margin: 'by 6 wickets', our: '98/4 (9.1)', opp: '96/7 (10)', potm: 'p1', stage: 'Final' },
    { id: 'm2', compId: 'c1', opponent: 'Riverside CC', date: '2026-11-08', time: '14:00', venue: 'University Cricket Ground', home: true, status: 'Completed', result: 'Won', margin: 'by 24 runs', our: '178/6 (20)', opp: '154/9 (20)', potm: 'p4' },
    { id: 'm3', compId: 'c2', opponent: 'Valley Warriors', date: '2026-11-12', time: '10:00', venue: 'Sports Complex, Ground 2', home: false, status: 'Completed', result: 'Won', margin: 'by 5 wickets', our: '149/5 (18.3)', opp: '146/8 (20)', potm: 'p3', stage: 'Round of 16' },
    { id: 'm4', compId: 'c1', opponent: 'Northern Knights', date: '2026-11-15', time: '14:00', venue: 'Northern Oval', home: false, status: 'Completed', result: 'Lost', margin: 'by 11 runs', our: '152/8 (20)', opp: '163/7 (20)', potm: null },
    { id: 'm5', compId: 'c1', opponent: 'Hilltop XI', date: '2026-11-18', time: '18:30', venue: 'University Cricket Ground', home: true, status: 'Completed', result: 'Won', margin: 'by 8 wickets', our: '131/2 (15.4)', opp: '128/9 (20)', potm: 'p7' },
    { id: 'm6', compId: 'c1', opponent: 'Green Park CC', date: '2026-11-20', time: '14:00', venue: 'University Cricket Ground', home: true, status: 'Live', result: null, our: '127/4 (14.4)', opp: '172/6 (20)', target: 173 },
    { id: 'm7', compId: 'c2', opponent: 'United Cricket Academy', date: '2026-11-23', time: '10:00', venue: 'Sports Complex, Ground 1', home: false, status: 'Upcoming', stage: 'Quarter-final', xi: ['p1', 'p2', 'p3', 'p4', 'p6', 'p7', 'p9', 'p10', 'p11', 'p13', 'p14'] },
    { id: 'm8', compId: 'c1', opponent: 'City Gymkhana', date: '2026-11-27', time: '18:30', venue: 'Gymkhana Ground', home: false, status: 'Upcoming', xi: [] },
    { id: 'm9', compId: 'c1', opponent: 'Riverside CC', date: '2026-12-04', time: '14:00', venue: 'Riverside Park', home: false, status: 'Upcoming', xi: [] },
  ],

  training: [
    { id: 't1', date: '2026-11-21', time: '06:30', title: 'Nets — batting vs pace', venue: 'University Cricket Ground' },
    { id: 't2', date: '2026-11-22', time: '06:30', title: 'Match simulation & fielding drills', venue: 'University Cricket Ground' },
    { id: 't3', date: '2026-11-25', time: '17:00', title: 'Recovery & video analysis', venue: 'Club pavilion' },
  ],

  // ball-by-ball snapshot of the live match (m6): we are chasing 173
  live: {
    matchId: 'm6',
    target: 173,
    runs: 127,
    wkts: 4,
    balls: 88,
    thisOver: ['1', '4', 'W', '0'],
    batters: [
      { id: 'p3', r: 58, b: 39, f: 6, s: 2, onStrike: true },
      { id: 'p13', r: 21, b: 14, f: 1, s: 1, onStrike: false },
    ],
    bowler: { name: 'R. Mehra', o: '3.4', m: 0, r: 24, w: 2 },
    commentary: [
      { ball: '14.4', text: 'Mehra to Bisht, no run. Tossed up outside off, defended back.', type: 'dot' },
      { ball: '14.3', text: 'OUT! Mehra to Rawat, bowled. The googly sneaks through bat and pad.', type: 'wicket' },
      { ball: '14.2', text: 'Mehra to Bisht, FOUR. Swept fine, beats short fine leg.', type: 'four' },
      { ball: '14.1', text: 'Mehra to Rawat, 1 run. Pushed to long-on.', type: 'run' },
      { ball: '13.6', text: 'Joshi to Bisht, SIX! Down the track and lofted over long-off.', type: 'six' },
    ],
    worm: [
      [1, 8, 6], [2, 17, 15], [3, 25, 27], [4, 38, 33], [5, 46, 44], [6, 59, 52], [7, 66, 61], [8, 74, 69],
      [9, 85, 78], [10, 93, 88], [11, 104, 97], [12, 112, 108], [13, 121, 116], [14, 133, 124],
      [15, 140], [16, 148], [17, 155], [18, 161], [19, 166], [20, 172],
    ].map(([over, opp, us]) => ({ over, opp, us })),
  },
};
