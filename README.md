# Mini Golf Operations Portal

A lightweight navigation hub for Mini Golf & Arcades operations.

## Build

- Version: `v0.1.4`
- Build: `1.4`
- Channel: `Development`

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

## Schedule Tab Structure

Build 1.4 models the actual Operations Google Sheet tabs used by each schedule profile. The Portal groups those tabs by screen so a profile can contain every source tab it needs instead of a single generic destination.

Current profile structure:

- Regular Profile: 20 tabs across Arcade, Golf, Slush, and Info Arcade.
- Summer Profile: 9 tabs across Arcade, Golf, Slush, and Info Arcade.
- Holiday Profile: 4 source tabs.
- Promo Profile: 2 source tabs.

Each destination shows both a friendly schedule label and the exact Google Sheets tab name.

## Configure Links

All destinations are centralized in:

`js/portal-config.js`

The PROD and DEV Dashboard links are already configured. The Portal uses one shared Operations Google Sheet for both environments.

For the shared Operations Google Sheet and each individual schedule tab, replace the matching empty URL:

```js
url: ""
```

with the full destination URL, for example:

```js
url: "https://docs.google.com/spreadsheets/d/.../edit#gid=123456789"
```

If a URL remains empty, the Portal safely shows the destination as **Not configured** while still displaying the exact Google Sheets tab name.

## Recommended GitHub Pages URL

Once GitHub Pages is enabled, the site can be served directly from the repository root.

## Build 1.1 assets

- `assets/icons/favicon.png` — browser/tab icon.
- `assets/images/JurassiqueLogo.png` — Portal header logo.

These replace the Build 1 placeholder golf icon without changing Portal navigation behavior.
