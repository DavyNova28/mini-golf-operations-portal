# Mini Golf Operations Portal

A lightweight navigation hub for Mini Golf & Arcades operations.

## Build

- Version: `v0.1.6`
- Build: `1.6`
- Channel: `Development`
- Stable checkpoint: `v0.1.4 / Build 1.4`

## Purpose

The Portal is intentionally navigation-only. It does **not** connect to Apps Script, read signage telemetry, modify schedules, or write to Google Sheets.

Its job is to provide one clean place to open:

- PROD Dashboard
- DEV Dashboard
- Shared Operations Google Sheet
- Regular Profile destinations
- Summer Profile destinations
- Holiday Schedule destinations
- Promo Schedule destinations
- Audit Logs
- Backup History

## Build 1.6 — App Experience

Build 1.6 turns the Portal into an installable Progressive Web App while preserving the navigation-only architecture.

### Installable Portal

Supported Chromium browsers can show an **Install Portal** button when the site meets install requirements. Once installed, the Portal opens in its own standalone window and uses the Jurassique artwork as its app icon.

On iPhone/iPad, the Portal shows **Add to Home Screen** guidance. Use the browser Share menu and choose **Add to Home Screen**.

### Offline App Shell

A small service worker caches the Portal shell, including HTML, CSS, JavaScript, configuration, version metadata, logo, and icons.

The caching strategy is intentionally conservative:

- Portal code and configuration use **network first**, then fall back to the cached copy if the network is unavailable.
- Images use a cached copy while refreshing in the background.
- External Google Sheets and Dashboard destinations are **not** intercepted or cached by the Portal.
- Every Portal build uses its own cache name so older Build 1.6-era caches are removed when a newer service worker activates.

This means installing the Portal does not change or control the signage system. If the Portal is offline, the interface can still launch from cache, but external destinations still require whatever network access those services normally need.

### Mobile / Standalone Polish

- Added safe-area support for iPhone/iPad home-screen mode.
- Added dedicated 180px Apple touch icon.
- Added 192px, 512px, and maskable PWA icons.
- Added standalone app metadata and theme colors.

## Build 1.5 — Portal Usability

Build 1.5 added browser-only Quick Search, Favorites, Recently Opened links, remembered Schedule Profile state, and usability refinements. These features remain unchanged in Build 1.6.

## Files to Upload

Upload the entire project structure to the Portal repository:

- `index.html`
- `version.json`
- `manifest.webmanifest`
- `service-worker.js`
- `README.md`
- `CHANGELOG.md`
- `css/portal.css`
- `js/portal.js`
- `js/portal-config.js` *(persistent configuration; unchanged unless destinations change)*
- `assets/images/JurassiqueLogo.png`
- `assets/icons/favicon.png`
- `assets/icons/apple-touch-icon.png`
- `assets/icons/pwa-192.png`
- `assets/icons/pwa-512.png`
- `assets/icons/pwa-maskable-512.png`

No Apps Script files are required.

## Persistent Portal Configuration

All destinations are centralized in `js/portal-config.js`. Build 1.6 does not require a new configuration structure. Keep the verified configuration unless a link, Google Sheets tab, profile, or Quick Access destination actually changes.

## Existing Usability Features

- Portal-wide Quick Search
- `Ctrl + K` / `⌘ + K` search shortcut
- Browser-local Favorites
- Browser-local Recently Opened history
- Remembered open Schedule Profile
- Toggle-to-open / toggle-to-close Profile cards
- Dedicated Close button inside the open Profile
- Responsive desktop, tablet, and mobile layout

## Assets

- `assets/icons/favicon.png` — browser/tab icon.
- `assets/icons/apple-touch-icon.png` — iPhone/iPad Home Screen icon.
- `assets/icons/pwa-192.png` / `pwa-512.png` — installed app icons.
- `assets/icons/pwa-maskable-512.png` — safe-zone icon for platforms that crop app icons.
- `assets/images/JurassiqueLogo.png` — Portal header logo.
