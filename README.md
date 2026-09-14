# Mini Golf Operations Portal

A lightweight navigation hub for Mini Golf & Arcades operations.

## Build

- Version: `v0.1.9.1`
- Build: `1.9.1`
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

## Build 1.9.1 — Compact Favorites Fix

Build 1.9.1 hardens the shortcut-panel height limits after Build 1.9 did not reliably constrain Favorites in every browser/PWA state.

### Favorites / Recent Viewports

- Favorites shows up to **4 destinations** before internal scrolling.
- Recently Opened shows up to **3 destinations** before internal scrolling.
- JavaScript now measures the rendered rows and applies the viewport height directly, with CSS remaining as a fallback.
- The limits are recalculated after browser resizing.
- Stored Favorites, recent history, and all destination URLs remain unchanged.
- `js/portal-config.js` is unchanged and requires no URL or structure updates.

## Build 1.9 — Compact Favorites

Build 1.9 applies the same compact-panel behavior used by Recently Opened to **Favorites**.

### Favorites Scroll Area

- Up to **4 Favorites** are visible at once.
- Additional Favorites remain available by scrolling **inside the Favorites panel**.
- The existing 12-favorite storage limit is unchanged; this is only a display/layout change.
- Recently Opened remains limited to 3 visible destinations before its own internal scroll area.
- `js/portal-config.js` is unchanged and requires no URL or structure updates.

## Build 1.8 — Compact Recent History

Build 1.8 keeps the **Recently Opened** panel from growing taller as more destinations are opened.

### Recently Opened Scroll Area

- Up to **3 destinations** are visible at once.
- Additional recent destinations remain available by scrolling **inside the Recently Opened panel**.
- The existing recent-history limit is unchanged; this is only a display/layout change.
- Favorites are unaffected.
- `js/portal-config.js` is unchanged and requires no URL or structure updates.

## Build 1.7 — Schedule Workflow

Build 1.7 adds small workflow tools for working with schedule destinations more quickly while preserving the same verified `portal-config.js` structure.

### Open All per Screen Group

Regular and Summer screen groups that contain more than one configured schedule tab now show an **Open All** action.

For example, **Regular Profile → Arcade → Open All** attempts to open every configured Arcade schedule tab for that group in separate browser tabs.

Browser pop-up rules still apply. If the browser blocks some or all additional tabs, the Portal shows a short message explaining what happened.

### Copy Link Actions

Configured destinations now include a **Copy Link** action in Schedule Profiles, Quick Access, Search results, Favorites, and Recently Opened lists.

Copying a link:

- does not open the destination;
- does not modify Google Sheets;
- uses the browser clipboard when available;
- falls back to the browser's legacy copy method when needed;
- briefly confirms success in the Portal.

Dashboard URLs are also copyable when they appear in Portal Search results.

### Recent History

Using **Open All** records successfully opened schedule destinations in Recently Opened without changing Favorites or configuration.

## Build 1.6 — App Experience

Build 1.6 added Progressive Web App installation, iPhone/iPad Home Screen support, app icons, safe-area polish, and a conservative offline Portal shell.

## Build 1.5 — Portal Usability

Build 1.5 added browser-only Quick Search, Favorites, Recently Opened links, remembered Schedule Profile state, and usability refinements.

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

All destinations remain centralized in `js/portal-config.js`. **Build 1.9.1 does not require any new configuration fields or URL changes.** Keep the verified configuration unless a real destination, Google Sheets tab, profile, or Quick Access link changes.

## Existing Features

- Installable Portal / PWA experience
- iPhone/iPad Add to Home Screen support
- Portal-wide Quick Search
- `Ctrl + K` / `⌘ + K` search shortcut
- Browser-local Favorites
- Browser-local Recently Opened history
- Remembered open Schedule Profile
- Toggle-to-open / toggle-to-close Profile cards
- Dedicated Close button inside the open Profile
- Open All actions for multi-tab schedule groups
- Copy Link actions for configured destinations
- Responsive desktop, tablet, and mobile layout

## Assets

- `assets/icons/favicon.png` — browser/tab icon.
- `assets/icons/apple-touch-icon.png` — iPhone/iPad Home Screen icon.
- `assets/icons/pwa-192.png` / `pwa-512.png` — installed app icons.
- `assets/icons/pwa-maskable-512.png` — safe-zone icon for platforms that crop app icons.
- `assets/images/JurassiqueLogo.png` — Portal header logo.
