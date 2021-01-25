/* eslint-env serviceworker */
/* eslint no-unused-vars: 0 */
const config = {
	version: '1.1.0',
	fresh: [
		'https://apps.kernvalley.us/apps.json',
		'/manifest.json',
	].map(path => new URL(path, location.origin).href),
	stale: [
		/* HTML */
		'/',
		'https://cdn.kernvalley.us/components/weather/forecast.html',
		'https://cdn.kernvalley.us/components/weather/current.html',
		'https://cdn.kernvalley.us/components/github/user.html',
		'https://cdn.kernvalley.us/components/pwa/prompt.html',
		'https://cdn.kernvalley.us/components/ad/block.html',

		/* JavaScript */
		'/js/index.min.js',

		/* Stylesheets */
		'/css/index.min.css',
		'https://cdn.kernvalley.us/components/weather/forecast.css',
		'https://cdn.kernvalley.us/components/weather/current.css',
		'https://cdn.kernvalley.us/components/github/user.css',
		'https://cdn.kernvalley.us/components/pwa/prompt.css',
		'https://cdn.kernvalley.us/components/ad/block.css',

		/* Images */
		'/img/icons.svg',
		'/img/apple-touch-icon.png',
		'/img/icon-192.png',
		'/img/favicon.svg',
		'https://cdn.kernvalley.us/img/keep-kern-clean.svg',
		'https://cdn.kernvalley.us/img/logos/play-badge.svg',
		'https://cdn.kernvalley.us/img/logos/instagram.svg',

		/* Fonts */
		'https://cdn.kernvalley.us/fonts/roboto.woff2',
	].map(path => new URL(path, location.origin).href),
	allowed: [
		/https:\/\/i\.imgur\.com\/*/,
	],
	allowedFresh: [
		'https://api.openweathermap.org/',
		'https://githubusercontent/com/u/',
	],
};
