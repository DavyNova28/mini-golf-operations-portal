# Changelog

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
