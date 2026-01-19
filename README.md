# FreshFromFarm

Monorepo containing three apps for the FreshFromFarm project:

- `freshfromfarm-backend` — Node/Express API (ES modules)
- `freshfromfarm-frontend` — React (Create React App)
- `freshfromfarm-merchant` — React (Create React App)

**Current focus:** Backend and Merchant apps only (frontend is not currently in active development).

Quick overview

- The backend is an Express API using ES modules and `mongoose` for MongoDB. Routes are mounted under `/api/*` in `server.js`.
- Authentication uses JWT access tokens (sent in `Authorization: Bearer <token>`) and a refresh token stored as an HTTP-only cookie named `refreshToken`.
- File uploads are stored under `freshfromfarm-backend/uploads` and served statically at `/uploads`.

Repository structure (top-level)

- `freshfromfarm-backend/` — server, routes, controllers, models, auth helpers
- `freshfromfarm-frontend/` — main user-facing React app
- `freshfromfarm-merchant/` — merchant React app (admin/merchant UI)

Key files to inspect

- `freshfromfarm-backend/server.js` — app entry, CORS, static uploads, route mounting
- `freshfromfarm-backend/config/config.js` — reads `.env` values; important keys listed below
- `freshfromfarm-backend/auth/auth.js` — token helpers and `fetchUser` middleware
- `freshfromfarm-backend/controllers/UserController.js` — auth flows: register, login, OTP, refresh
- `freshfromfarm-backend/services/emailService.js` and `templates/mailTemplates.js` — email sending
- `freshfromfarm-backend/models/*.js` — Mongoose schema examples

Environment variables

The backend expects these environment variables (set in a `.env` file):

- `MONGO_URI` — MongoDB connection string
- `SECRET` — access token secret
- `REFRESH_SECRET` — refresh token secret
- `CLIENT_ID`, `CLIENT_SECRET`, `CALLBACK_URL` — Google OAuth
- `EMAIL_USER`, `EMAIL_PASS` — SMTP credentials for sending emails

Common developer workflows

- Start backend (development):

```powershell
cd freshfromfarm-backend; npm run dev
```

- Start backend (production):

```powershell
cd freshfromfarm-backend; npm start
```

- Start merchant app (each in separate terminals):

```powershell
cd freshfromfarm-merchant; npm start
```

Notes on patterns & conventions

- Use ES modules throughout the backend (`import` / `export`). Do not convert to CommonJS.
- Controller responses use consistent shape (see `UserController.js`): return JSON objects with `status`, `responseType`, `message`, and optional `accessToken`.
- Reuse constants in `freshfromfarm-backend/constants/*` for HTTP status codes and messages.
- Token creation uses `auth.createAccessToken(payload, conf.ACCESS_TOKEN_SECRET)` and `auth.createRefreshToken(payload, conf.REFRESH_TOKEN_SECRET)`.
- Refresh token flow is implemented in `UserController.refreshToken` and expects the refresh token cookie under `refreshToken`.

Testing & linting

- There are no automated tests included. Each package uses standard `npm` scripts — see each `package.json` for `start`, `dev`, and `test` placeholders.

Troubleshooting & tips

- CORS: allowed origins are defined in `freshfromfarm-backend/server.js`. If you run frontends on different ports, add them to the allowed list.
- Static files: uploaded assets are served from `/uploads` — if images fail to load, confirm files exist under `freshfromfarm-backend/uploads` and the server is running.
- Common auth failure: ensure `Authorization` header is `Bearer <token>` and the correct `SECRET`/`REFRESH_SECRET` are set.