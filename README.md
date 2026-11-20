# Crickit — Cricket Team Management System

A web platform for **one cricket team**, run by its team manager. The manager builds the squad and
staff, enters the competitions the team plays in, schedules matches, picks the playing XI, scores
live and tracks season statistics.

> **Status:** frontend prototype. Data is sample data from `src/data/seed.js`. Changes you make in
> the app (new players, logo, matches…) are saved in your browser. The Express/MongoDB backend, JWT
> auth and Socket.IO live updates come in the next phase.

## Features

- **Loading screen:** branded splash on first load, plus skeleton loaders between pages
- **Team setup:** 3-step onboarding with **team logo upload** (drag and drop), colours and home ground
- **Overview:** team header with season record, live match, next match countdown, squad
  availability, competitions, upcoming matches and training, recent results, top performers
- **Squad:** player cards or table, filters, add player (with photo), profile drawer, availability,
  captain / vice-captain / keeper
- **Staff:** manager, coaches and support staff
- **Competitions:** every league, cup, series or friendly the team enters, with stage, position and record
- **Matches:** fixtures and results, schedule a match, **playing XI selection** (blocks injured or
  unavailable players, checks for a keeper and bowling options)
- **Live Match:** ball-by-ball scoring console, run progression chart, commentary
- **Statistics:** batting and bowling tables, charts, win rate
- **Team Profile:** edit identity, logo, colours and leadership
- Light and dark themes, responsive down to phone width

## Data model

| Entity | Key fields |
| --- | --- |
| `team` | name, shortName, logo, color, founded, city, homeGround, captainId, viceCaptainId, keeperId |
| `staff[]` | name, role (Team Manager, Head Coach, …), email, phone, since |
| `players[]` | name, jersey, role, bat, bowl, age, status (Available / Injured / Unavailable), photo, stats |
| `competitions[]` | name, organiser, format, type, start, end, status, stage, position, p / w / l, pts, nrr |
| `matches[]` | compId, opponent, date, time, venue, home, status, result, margin, scores, xi[] |
| `training[]` | date, time, title, venue |

## Tech stack

React 18 + Vite, React Router (hash routing for GitHub Pages), Recharts, lucide-react.
Plain CSS with design tokens (`src/styles.css`), Geist font.

Planned backend: Node.js + Express REST API with role-based middleware, MongoDB, Socket.IO.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Build & deploy

```bash
npm run build
```

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
Enable it once in **Settings → Pages → Source: GitHub Actions**.

## Project structure

```
src/
  data/seed.js        data schema + sample team
  store.jsx           app state (React context), saved to localStorage
  components/         AppLayout (sidebar + top bar), shared UI kit
  pages/              Landing, Login, Setup, Overview, Squad, Staff,
                      Competitions, Matches, LiveMatch, Stats, TeamProfile
  styles.css          design tokens and styles
```

## Project team

Sagar Saini · Aditya Kaintura · Kajal Bisht
Mentor: Dr. Anupama Mishra, School of Science & Technology, Swami Rama Himalayan University
