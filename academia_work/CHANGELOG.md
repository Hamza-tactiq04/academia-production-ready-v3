# Academia — final test-ready update

## Included

- Administrator password setup/change flow from Settings.
- Direct administrator login by email + password.
- scrypt password hashing with unique salts and constant-time verification.
- `passwordHash` removed from `auth.me` responses.
- 30-day HttpOnly administrator password sessions.
- Basic in-memory brute-force throttling for administrator password login.
- Production startup validation for `JWT_SECRET` and `DATABASE_URL`.
- Security response headers and safer session-cookie defaults.
- Reduced JSON/form request body limits from 50 MB to 12 MB.
- New Academia shield/football logo and favicon.
- Settings page with a security-status checklist.
- Arabic, English and French labels for the new security/login UI.
- No `.env`, `.project-config.json`, or real secrets included in the archive.

## Important deployment step

The archive cannot contain the production database credentials or JWT secret. Set those values in the deployment platform's secret manager. Generate a fresh JWT secret with 96 random bytes (base64url) before production deployment.

The database already contains migration `0013_add_password_hash.sql`; `0014_admin_security.sql` is intentionally schema-neutral because this release hardens the application layer without adding another database column.
