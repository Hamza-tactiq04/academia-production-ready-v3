# Academia security baseline

## Implemented in this release

- Administrator passwords use Node.js `scrypt` with a unique random salt and constant-time verification.
- `auth.me` strips `passwordHash` before any data crosses the tRPC boundary.
- Administrator password login creates a short-lived (30 day) HttpOnly session cookie.
- Administrator password changes require the current password once a password is already configured; first-time setup is available to an authenticated administrator.
- Production startup fails when `JWT_SECRET` is missing or shorter than 64 characters and when `DATABASE_URL` is missing.
- Browser security headers are installed: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, and production HSTS.
- Session cookies use `SameSite=Lax`, `HttpOnly`, and `Secure` when the request is HTTPS.
- JSON/urlencoded request bodies are bounded at 12 MB.
- No real secrets are shipped in the source archive; `.env` remains local/server-only.

## Deployment checklist

1. Set a fresh `JWT_SECRET` generated from at least 64 random characters; 96 random bytes is recommended.
2. Keep `DATABASE_URL`, OAuth credentials, Forge credentials, and JWT secrets in the platform's secret manager, not in frontend code.
3. Apply the database migrations before enabling administrator password login.
4. Sign in through the trusted OAuth flow once, open **Settings → Administrator password**, and set the password.
5. Test administrator password login and logout over HTTPS.
6. Run `npm run check`, `npm test`, and `npm run build` in an environment with dependencies installed.
