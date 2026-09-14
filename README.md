# Mini Golf Operations Portal

A lightweight navigation hub for Mini Golf & Arcades operations.

## Build

- Version: `v0.1.5`
- Build: `1.5`
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

## Build 1.5 — Portal Usability

Build 1.5 adds browser-only quality-of-life tools without adding any backend dependency.

### Quick Search

Search across every configured destination, including:

- PROD and DEV Dashboards
- Quick Access links
- Schedule profile labels
- Screen names
- Friendly day labels
- Exact Google Sheets tab names

Examples:

- `Arcade Saturday`
- `Golf Holiday`
- `infoArcadeRegularThuFri`
- `Audit`

Use `Ctrl + K` on Windows or `⌘ + K` on macOS to focus the search box.

### Favorites

Star frequently used destinations to pin them in the **Favorites** panel. Up to 12 favorites are retained in the current browser.

### Recently Opened

The Portal remembers the last 8 configured destinations opened from the Portal. Recent history can be cleared at any time.

### Remembered Schedule Profile

If a Schedule Profile is open when the page is reloaded, the Portal restores that profile automatically. Closing the profile clears the remembered state.

### Local Storage Only

Favorites, recent destinations, and the remembered Schedule Profile are stored with browser `localStorage` only. They are not sent to Google Sheets, GitHub, Apps Script, or the signage system.

If browser storage is unavailable, the Portal still works normally; only these convenience features stop persisting.

## Files to Upload

Upload the entire project structure to the Portal repository:

- `index.html`
- `version.json`
- `README.md`
- `CHANGELOG.md`
- `css/portal.css`
- `js/portal-config.js`
- `js/portal.js`
- `assets/images/JurassiqueLogo.png`
- `assets/icons/favicon.png`

No Apps Script files are required.

## Schedule Profile Toggle

Schedule Profile cards behave like an accordion selector:

- Click a profile card to open its destinations.
- Click the same active profile card again to close it.
- Click a different profile card to switch the open panel to that profile.
- The **Close** button remains available inside the open panel.
- Build 1.5 remembers the currently open profile after a reload.

## Schedule Tab Structure

The Portal models the actual Operations Google Sheet tabs used by each schedule profile.

- Regular Profile: 20 tabs across Arcade, Golf, Slush, and Info Arcade.
- Summer Profile: 9 tabs across Arcade, Golf, Slush, and Info Arcade.
- Holiday Profile: 4 source tabs.
- Promo Profile: 2 source tabs.

Each destination shows both a friendly schedule label and the exact Google Sheets tab name.

## Configure Links

All destinations are centralized in:

`js/portal-config.js`

The current configuration contains the verified Portal destinations for the shared Operations Google Sheet and both Dashboard environments.

When a future destination changes, update only its matching `url` value. If a URL is empty or invalid, the Portal safely shows that destination as unavailable instead of opening a broken link.

## Assets

- `assets/icons/favicon.png` — browser/tab icon.
- `assets/images/JurassiqueLogo.png` — Portal header logo.
