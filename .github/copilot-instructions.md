<!-- Copilot instructions for AI coding agents working on this repo -->
# Repository Overview (short)

This repository has two main parts: a React + TypeScript frontend in `client/` and a small Express server in `server/`.

- Frontend: Vite + React + TypeScript + Tailwind. Source: `client/src`.
- Backend: Node/Express (CommonJS) API used for authentication and example API endpoints. Source: `server/`.

# Quick start commands

- Run the app (frontend):

  cd client
  npm install
  npm run dev

- Run the server locally:

  cd server
  npm install
  npm run dev

- Build frontend:

  cd client
  npm run build

- Tests (frontend):

  cd client
  npm run test

# Important project-specific patterns and conventions

- Path alias: frontend code uses `@/*` → `src/*` as configured in `client/tsconfig.json`. Prefer imports like `@/components/...`.
- Mixed languages: frontend is TypeScript (TSX); backend uses plain JS/CommonJS (`require`) in `server/`.
- State management: `zustand` stores live in `client/src/store` (e.g. TTS store in `client/src/store/tts_store.ts`). Use these stores rather than local component state for cross-component settings (language, audio toggles).
- Text-to-Speech (TTS): project centralizes language text in `client/constants/constants.ts` and uses a `TextToSpeech` UI component. To add TTS strings, update the `TTS_DATA` object in that constants file and pass language keys through the `useTTSStore` selector (see `client/README.md` for details).
- PDF generation: uses `@react-pdf/renderer` and helper at `client/src/utils/generatePdf.js` — keep render logic separate from page UI.
- UI primitives: radixes + shadcn patterns are used. Look under `client/src/components/ui` for component conventions (unstyled primitives + composition).

# API surface and integration notes

- Server exposes an example JSON route at `/api` and mounts auth routes at `/apii` (see `server/server.js`). CORS in `server/server.js` is configured to allow `http://localhost:5173` by default.
- Environment variables for the server are loaded from `.env` into `server/constants/index.js` — expect `PORT`, `SECRET`, `CLIENT_URL`.

# Build, test and lint specifics

- Frontend build runs `tsc && vite build` (ensures type-check before bundling). Tests run with `vitest` and `jsdom` (`npm run test`). Use `npm run test:ui` for the interactive Vitest UI.
- Linting uses ESLint with TypeScript; script: `npm run lint` in `client/`.

# Things an AI agent should default to when editing code here

- Respect the `@/` alias and `strict` TypeScript compiler flags in `client/tsconfig.json`.
- For frontend changes, prefer modifying or adding files under `client/src/*` and update `client/package.json` scripts only when necessary.
- Keep server edits in `server/` and maintain CommonJS `require` style unless converting the whole server to ESM.

# Where to look for examples

- Page patterns: `client/src/pages/*` (Addition/Division/Multiplication/Subtraction pages).
- Store usage: `client/src/store/store.ts` and `client/src/store/tts_store.ts`.
- Utility examples: `client/src/utils/generatePdf.js`, `client/src/lib/utils.ts`.

# Pull request/helpful notes for reviewers

- Small FE changes: run `npm run dev` in `client/` and load `http://localhost:5173` to verify behavior.
- When adding translations or TTS: update `client/constants/constants.ts` and ensure keys exist for all languages in `client/src/utils/locales/*`.

---
If any section is unclear or you want more examples (imports, component patterns, or a checklist for PRs), tell me which area to expand.
