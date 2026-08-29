# Academia — Platform Packaging

Academia now has a single web codebase plus platform shells:

- **Android + iOS:** Capacitor 8 under `platforms/mobile`.
- **Windows + macOS + Linux:** Electron under `platforms/desktop`.
- **Browser/PWA:** manifest and mobile metadata in `client/public`.

## Important

The application is full-stack, so mobile and desktop builds should connect to the deployed HTTPS server. Do not embed database credentials or JWT secrets in a client package.

Set `ACADEMIA_SERVER_URL` to the HTTPS production address before native packaging.

The GitHub Actions workflows can build an Android debug APK and desktop installers after the repository is pushed to GitHub and the `ACADEMIA_SERVER_URL` repository secret is configured.

### Why these choices?

Capacitor is designed to turn an existing web application into native Android/iOS apps while retaining access to native APIs. Electron provides a cross-platform desktop runtime for Windows, macOS and Linux.
