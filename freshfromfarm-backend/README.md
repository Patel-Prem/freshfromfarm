# FreshFromFarm — Backend

Express + Mongoose API for FreshFromFarm. The backend is written using ES modules and exposes routes for authentication, produce management, and orders.

Quick start

1. Install dependencies

```powershell
cd freshfromfarm-backend
npm install
```

2. Run in development (uses `nodemon`):

```powershell
npm run dev
```

3. Run in production:

```powershell
npm start
```

Important notes

- Project uses ES modules (`"type": "module"` in `package.json`). Use `import`/`export`.
- Server entry: `server.js`. Routes mounted:
  - `app.use('/api/auth', user);`
  - `app.use('/api/produce', produce);`
  - `app.use('/api/order', order);`
- Static uploads are served from `/uploads` (folder: `freshfromfarm-backend/uploads`).
- CORS allowed origins are configured in `server.js` (defaults: `http://localhost:3000`, `http://localhost:3001`, `http://localhost:8080`).

Environment variables

Create a `.env` at `freshfromfarm-backend` (or set env vars in your environment). Key variables used in `config/config.js`:

- `MONGO_URI` — MongoDB connection string
- `SECRET` — access token secret (used as `ACCESS_TOKEN_SECRET`)
- `REFRESH_SECRET` — refresh token secret (used as `REFRESH_TOKEN_SECRET`)
- `CLIENT_ID`, `CLIENT_SECRET`, `CALLBACK_URL` — (optional) Google OAuth
- `EMAIL_USER`, `EMAIL_PASS` — SMTP credentials for sending emails

Auth & token flow

- Access tokens: short-lived JWTs (15 minutes) created with `auth.createAccessToken(payload, conf.ACCESS_TOKEN_SECRET)`.
- Refresh tokens: long-lived JWTs (7 days) created with `auth.createRefreshToken(payload, conf.REFRESH_TOKEN_SECRET)` and stored in an HTTP-only cookie named `refreshToken`.
- Middleware `auth.fetchUser` verifies the `Authorization` header (`Bearer <token>`) and attaches `req.user`.
- Refresh endpoint implemented in `controllers/UserController.js` (`refreshToken`) — it verifies the cookie and the token stored in the user's `refresh_token` field in the DB.

Key files & folders

- `server.js` — app entry, CORS, static serving, route mounting
- `config/config.js` — loads `.env` values and exports `conf`
- `auth/auth.js` — JWT helpers and `fetchUser` middleware
- `controllers/` — route handlers (see `UserController.js` for detailed auth flows)
- `routes/` — maps endpoints to controllers
- `models/` — Mongoose models (Users, Produces, Orders, Files)
- `services/emailService.js` + `templates/mailTemplates.js` — email sending and templates
- `utils/generateOTP.js` — OTP generation used in registration/verification

Controller response shape

- Controllers return JSON objects with a consistent shape. Examples from `UserController.js`:

```json
{
  "status": <numeric-status-constant>,
  "responseType": "SUCCEED" | "FAILED",
  "message": "Human readable message",
  "accessToken": "<token>" // optional
}
```

Use the constants in `constants/messages.js` and `constants/httpStatusCodes.js` when modifying or adding responses.

Sample API requests

- Register (sends OTP email):

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"first_name":"Test","last_name":"User","email":"test@example.com","password":"pass1234","is_merchant":false}'
```

- Login (returns `accessToken` and sets `refreshToken` cookie):

```bash
curl -i -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass1234","is_merchant":false}'
```

- Refresh access token (uses cookie sent by browser):

```bash
curl -i -X POST http://localhost:8080/api/auth/refresh \
  --cookie "refreshToken=<token-from-browser>"
```

Troubleshooting

- DB connection errors: confirm `MONGO_URI` and that MongoDB is reachable from your machine.
- CORS errors: add your frontend origin to the `allowedOrigins` array in `server.js`.
- Missing environment variables: check `config/config.js` to see which env vars are consumed.
- File upload problems: verify `multer` upload paths in the produce controller and that `uploads/` folder exists and is readable by the process.

Development tips

- Keep `.env` out of source control. Consider adding a `.env.example` at the repo root with placeholders.
- When adding new routes, update the corresponding route file in `routes/` and add controller functions in `controllers/` following existing response shapes and constants.
