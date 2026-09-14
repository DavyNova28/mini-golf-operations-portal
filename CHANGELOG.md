## v0.1.11 — Build 1.11

### Quick Access Inline Actions

- Extended the cleaner inline Copy Link design to Quick Access cards.
- Removed the separate full-height Copy Link action from Quick Access.
- Kept the Favorite star as the dedicated action on the right.
- Preserved existing copy confirmation, toast feedback, and destination behavior.
- No changes to `portal-config.js` or destination URLs.
- Bumped Portal and service-worker cache markers to Build 1.11.

---

## v0.1.10 — Build 1.10

### Changed
- Reworked **Schedule Profile** destination actions using the cleaner inline-copy design.
- Removed the separate full-height Copy Link button from Schedule Profile rows.
- Added a subtle Copy Link icon inside each schedule card, with tooltip/accessible labeling and the existing copied-link toast feedback.
- Kept the Favorite star as the dedicated action button on the right side of every schedule destination.
- Kept Quick Access, Search results, Favorites, and Recently Opened Copy Link controls unchanged for this focused UI update.
- Preserved Build 1.9.1 compact Favorites/Recently Opened scrolling behavior.
- Kept `js/portal-config.js` unchanged; no destination or URL migration is required.
- Bumped Portal and service-worker cache markers to Build 1.10.

# Changelog

## v0.1.9.1 — Build 1.9.1

### Fixed
- Hardened the **Favorites** viewport so more than 4 saved Favorites can no longer expand the Portal page.
- Added a JavaScript-measured row limit in addition to the CSS fallback, ensuring the Favorites panel scrolls internally after the fourth visible destination.
- Applied the same measured viewport logic to **Recently Opened** so its existing 3-row limit remains reliable across browser/PWA cache transitions.
- Recalculates the shortcut viewport after window resizing so the scroll boundary stays correct on desktop and mobile.
- Kept the 12-Favorite and 8-recent storage limits unchanged.
- Kept `js/portal-config.js` unchanged; no destination or URL migration is required.
- Bumped Portal and service-worker cache markers to Build 1.9.1.

## v0.1.9 — Build 1.9

### Changed
- Limited the visible **Favorites** list to 4 destinations at a time.
- Added an internal vertical scroll area when more than 4 Favorites are saved, preventing the Favorites panel from making the Portal page progressively taller.
- Kept the existing 12-favorite storage limit unchanged, so additional Favorites remain available by scrolling inside the panel.
- Kept the Build 1.8 **Recently Opened** behavior unchanged at 3 visible destinations before internal scrolling.
- Kept `js/portal-config.js` unchanged; no destination or URL migration is required.
- Updated Portal version metadata, service-worker cache identity, and cache-busting markers to Build 1.9.

## v0.1.8 — Build 1.8

### Changed
- Limited the visible **Recently Opened** list to 3 destinations at a time.
- Added an internal vertical scroll area when more than 3 recent destinations are available, preventing the Portal page from growing taller as recent history fills.
- Kept the existing recent-history storage limit unchanged, so older recent destinations remain accessible by scrolling.
- Kept Favorites and `js/portal-config.js` unchanged.
- Updated Portal version metadata, service-worker cache identity, and cache-busting markers to Build 1.8.

## v0.1.7 — Build 1.7

### Added
- Added **Open All** actions for Schedule Profile screen groups containing multiple configured tabs.
- Added **Copy Link** actions to Schedule Profile destinations, Quick Access cards, Search results, Favorites, and Recently Opened destinations.
- Added clipboard fallback support for browsers that do not expose the modern Clipboard API.
- Added lightweight Portal toast feedback for copied links and Open All results.

### Changed
- Open All actions add successfully opened schedule destinations to Recently Opened in one batch.
- Updated destination action layouts to accommodate Copy Link and Favorite controls on desktop and mobile.
- Updated Portal version metadata, service-worker cache identity, and cache-busting markers to Build 1.7.
- Kept `js/portal-config.js` unchanged; Build 1.7 requires no destination/configuration migration.

### Safety / Reliability
- Open All only attempts to open configured HTTP/HTTPS destinations.
- Browser pop-up blocking is detected where possible and surfaced to the user without changing Portal state or configuration.
- Copy actions never modify Google Sheets or the signage backend.

## v0.1.6 — Build 1.6

### Added
- Added Progressive Web App metadata through `manifest.webmanifest`.
- Added install support for compatible desktop and Android browsers through the native browser install prompt.
- Added iPhone/iPad **Add to Home Screen** guidance for browsers that do not expose the native install prompt.
- Added a conservative service worker that keeps the Portal shell available from cache when the network is unavailable.
- Added dedicated 180×180 Apple touch, 192×192 PWA, 512×512 PWA, and maskable app icons derived from the supplied Jurassique artwork.

### Changed
- Added iPhone/iPad safe-area support for standalone Home Screen mode.
- Added standalone app metadata and updated theme/application metadata.
- Updated Portal version metadata and cache markers to Build 1.6.
- Kept `js/portal-config.js` as the persistent verified destination configuration; no new configuration structure is required.

### Reliability
- Portal JavaScript, CSS, configuration, and metadata use a network-first cache strategy so live GitHub Pages files remain preferred.
- External Dashboard and Google Sheets links are never intercepted or cached by the service worker.
- Old Portal service-worker caches are removed automatically when a newer cache version activates.

## v0.1.5 — Build 1.5

### Added
- Added Portal-wide Quick Search across Dashboards, Quick Access links, friendly schedule labels, screen groups, and exact Google Sheets tab names.
- Added `Ctrl + K` / `⌘ + K` keyboard shortcut to focus Portal search.
- Added browser-local Favorites with star controls and a 12-destination limit.
- Added browser-local Recently Opened history for the last 8 destinations, including a Clear action.
- Added remembered Schedule Profile state so the last open profile is restored after reload.

### Changed
- Added smoother Profile panel opening and closing transitions with reduced-motion support.
- Added favorite controls to Schedule Profile destinations and Quick Access cards.
- Improved desktop and mobile layouts for search results, shortcuts, schedule links, and Quick Access cards.
- Updated the Portal note to clarify that convenience state is stored only in the current browser.
- Updated Portal metadata and cache markers to Build 1.5.

## v0.1.4 — Build 1.4

### Changed
- Rebuilt Schedule Profiles around the actual Google Sheets tab structure used by operations.
- Regular Profile now exposes 20 exact source tabs grouped under Arcade, Golf, Slush, and Info Arcade.
- Summer Profile now exposes 9 exact source tabs grouped by screen and operating-day range.
- Holiday Profile now exposes GolfHoliday, ArcadeHoliday, SlushHoliday, and infoArcadeHoliday.
- Promo Profile now exposes GolfPromoWednesday and ArcadePromoThursday.
- Each destination now shows a friendly schedule label plus the exact Google Sheets tab name.
- Profile destination groups now use a clearer two-column card layout on larger screens and collapse to one column on mobile.
- Empty destinations continue to display **Not configured** safely until their URLs are added.
- Updated Portal version metadata and cache markers to Build 1.4.

## v0.1.3 — Build 1.3

### Changed
- Schedule Profile cards now work as toggles: click a profile once to open it and click the same active profile again to close it.
- The existing **Close** button remains available as a second way to close the profile panel.
- The active Schedule Profile card now receives a subtle selected state and accessible `aria-expanded` status.
- Updated the Schedule Profiles helper text, version metadata, and cache markers to Build 1.3.

## v0.1.2 — Build 1.2

### Changed
- Replaced the separate PROD and DEV Google Sheets Quick Access entries with one shared **Operations Google Sheet** entry.
- Updated the Quick Access layout from four columns to three columns for the shared-workbook structure.
- Updated Quick Access wording to describe the single shared operations workbook.
- Aligned the README with the one-repository Portal setup and the shared Google Sheet architecture.
- Updated version and cache markers to Build 1.2.

## v0.1.1 — Build 1.1

### Changed
- Replaced the placeholder golf icon in the Portal header with the supplied Jurassique logo.
- Added the supplied browser favicon for Chrome, Edge, Safari, and other supported browsers.
- Added Apple touch icon metadata.
- Updated cache markers and visible Portal version to Build 1.1.

All notable changes to the Mini Golf Operations Portal will be documented here.

## [0.1.0] - Build 1 - Development

### Added

- Initial Mini Golf Operations Portal.
- Direct PROD and DEV Dashboard launch cards.
- Schedule Profile navigation for Regular, Summer, Holiday, and Promo workflows.
- Quick Access area for Google Sheets, Audit Logs, and Backup History.
- Centralized destination configuration in `js/portal-config.js`.
- Safe disabled state for destinations that have not been configured yet.
- Responsive desktop, tablet, and mobile layout.
- Independent Portal version metadata through `version.json`.
- Navigation-only architecture with no Apps Script or signage backend dependency.
