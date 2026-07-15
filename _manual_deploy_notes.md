# Manual deployment notes

This repo has been stripped of platform deployment configuration (Netlify/Vercel).

## Local dev
- `npm run dev`
- Vite no longer provides a built-in `/api` proxy by default.

## Build
- `npm run build`

## Runtime API integration
This frontend expects your backend API to be reachable from the browser.

Choose one:
1) Serve the backend on the same origin (recommended), so requests to `/api/...` hit your backend.
2) Provide a reverse proxy in front of both the frontend and backend.
3) Update frontend API base URL (see `src/config.js`) to point directly to your backend.

