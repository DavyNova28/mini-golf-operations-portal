# Changelog

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
