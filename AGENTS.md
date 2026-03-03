# AGENTS.md

## Cursor Cloud specific instructions

This is a **Next.js 16** personal portfolio site (React 19, TypeScript, Tailwind CSS v4). Single service, no databases or Docker needed.

### Running the app

- `npm run dev` starts the dev server on port 3000 (Turbopack).
- `npm run build` produces a production build.
- `npm run lint` runs ESLint (pre-existing lint warnings/errors in the codebase around `react-hooks/set-state-in-effect` — these are not regressions).

### Key notes

- Both `package-lock.json` (npm) and `bun.lock` exist; use **npm** since Bun is not installed in the Cloud VM.
- Spotify widget requires `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REFRESH_TOKEN` env vars. The app runs fine without them — the widget simply returns empty data.
- Blog content lives in `content/blog/` as MDX files; project data is hardcoded in `lib/projects.ts`.
- No automated test suite exists in this repo — validation is manual (dev server + browser).
