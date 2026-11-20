# Crickit — Cricket Team Management System

A modern web platform for cricket analytics and sports management. It brings team registration,
fixture scheduling, live ball-by-ball scoring and real-time leaderboards together in one place.

> **Status:** frontend prototype. All data is sample data from `src/data/mock.js`. The Express/MongoDB
> backend, JWT auth and Socket.IO live updates come in the next phase.

## Pages

| Route | Page |
| --- | --- |
| `/` | Landing page: problem, features, roles, architecture, roadmap |
| `/login` | Sign-in with role picker (Admin / Coach / Player). Demo only, no real auth |
| `/app` | Dashboard: stats, live match, upcoming fixtures, run chart, activity log |
| `/app/live` | Live scoring console: interactive scoring pad, scorecard, worm chart, commentary |
| `/app/fixtures` | Fixture list with status filters and auto-schedule check |
| `/app/standings` | Points table with NRR, plus top run-scorers and wicket-takers |
| `/app/teams` | Team cards / list view with captain, coach, record and form |
| `/app/players` | Searchable, filterable and sortable player stats table |
| `/app/reports` | Report templates and generated PDF/CSV reports |

## Tech stack

- **React 18** + **Vite**
- **React Router** (hash routing, so it works on GitHub Pages)
- **Recharts** for charts, **lucide-react** for icons
- Plain CSS with design tokens (`src/styles.css`)

Planned backend: Node.js, Express REST API with role-based middleware, MongoDB, Socket.IO.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Build

```bash
npm run build
```

The production build goes to `dist/`. Pushing to `main` deploys it to GitHub Pages through
`.github/workflows/deploy.yml`. Turn this on once in **Settings → Pages → Source: GitHub Actions**.

## Project structure

```
src/
  components/   AppLayout (sidebar + topbar), shared UI pieces
  data/         mock.js: sample teams, players, fixtures, live match
  pages/        one file per route
  styles.css    design tokens and all styles
```

## Team

Sagar Saini · Aditya Kaintura · Kajal Bisht
Mentor: Dr. Anupama Mishra, School of Science & Technology, Swami Rama Himalayan University
