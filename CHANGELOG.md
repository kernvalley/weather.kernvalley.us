<!-- markdownlint-disable -->
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v2.0.1] - 2023-07-05

### Changed
- Update dependencies and config

## [v2.0.0] - 2023-05-17

### Added
- Implement Trusted Types
- Implement import maps

### Changed
- Update to node 18
- Switch to using unpkg for components and modules

### Fixed
- Add correct asset links signature for Play Store [#111](https://github.com/kernvalley/weather.kernvalley.us/issues/111)
- Fix typo in some repo links

## [v1.1.0] - 2021-01-12

### Added
- More local cities, determined by postal codes
- Play Store link/badge in footer
- `.well-known/assetlinks.json`

### Changed
- Update design by not including header
- Update footer layout
- Update app `short_name` to "KRV Weather" for consistency

## [v1.0.3] - 2020-12-13

### Added
- `<button is="app-list">`
- Theme handling via `cookieStore`
- App data reset page

### Changed
- Move `<button is="pwa-install">` to `<nav>`

### Fixed
- Correctly get city data from URL hash

## [v1.0.2] - 2020-10-20

### Changed
- Moved headers to separate headers config file
- Misc service worker and CSP updates
- Use new `<ad-block>` component
- Implement cookie handling
- Update page loads
- Create weather components using JS to save requests
- Update Analytics

## [v1.0.1] - 2020-09-07

### Added
- Google Analytics
- `htmlhint` linting
- Enable preloading of assets

### Changed
- Dynamically load polyfill script
- Update config
- Delete invalid headers and config from Netlify config file

### Removed
- Duplicate style rules (exist in CDN stylesheets)

### Fixed
- Fix PostCSS config breaking dark mode

## [v1.0.0] - 2020-07-28

### Added
- CHANGELOG
- Dependabot config
- Super Linter
- Minifying of JS & CSS
- Add `<github-user>` to footer
- `.well-known/assetlinks.json` for TWA support
- Play Store app id for install prompt
- Shortcuts / jumplist to weather in various regions

### Updated
- Update icons to be compatible as "maskable" icons
- Components now use external stylesheets
- Enable project-wide linting
- Block `unsafe-inline` styles in CSP
- Update service worker cache & config to use minified resources

### Removed
- Travis-CI config file (just use GitHub Actions)
<!-- markdownlint-restore -->
