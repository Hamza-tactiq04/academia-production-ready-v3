# Academia deployment

## 1. Local full-stack test

Copy `.env.example` to `.env`, generate a JWT secret with:

```bash
npm run generate-jwt-secret
```

Put the generated value into `JWT_SECRET`, set strong MySQL passwords, then:

```bash
npm ci
npm run preflight
npm run check
npm test -- --run
npm run build
docker compose up --build
```

The application is then available at `http://localhost:3000` and the health endpoint is `http://localhost:3000/api/health`.

## 2. Production server

Use a managed HTTPS domain and a managed MySQL/TiDB database. Required secrets:

- `DATABASE_URL`
- `JWT_SECRET` (64+ random characters)
- `VITE_APP_ID`
- `OAUTH_SERVER_URL` when OAuth is enabled
- `OWNER_OPEN_ID` when required by the existing admin bootstrap

Do not put any of these secrets in the Android/iOS app.

## 3. Android APK

Set the GitHub repository secret `ACADEMIA_SERVER_URL` to the public HTTPS URL of the deployed server. Then run **Actions → Build Academia Android APK → Run workflow**. The workflow performs preflight, type checking, tests, web build, Capacitor sync and `assembleDebug`, then uploads `app-debug.apk` as an artifact.

The native app intentionally refuses a functional production build without HTTPS, preventing an APK that installs but cannot reach the backend.

## 4. iOS

On macOS, install the Capacitor iOS platform and open the generated Xcode project. A physical iPhone requires Apple signing/development credentials.
