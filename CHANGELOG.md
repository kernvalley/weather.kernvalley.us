<!-- markdownlint-disable -->
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Moved headers to separate headers config file
- Misc service worker and CSP updates
- Use new `<ad-block>` component

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
