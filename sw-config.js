/* eslint no-unused-vars: 0 */
const config = {
	version: '2.0.2',
	fresh: [
		'https://apps.kernvalley.us/apps.json',
		'/manifest.json',
	].map(path => new URL(path, location.origin).href),
	stale: [
		/* HTML */
		'/',

		/* JavaScript */
		'/js/index.min.js',

		/* Stylesheets */
		'/css/index.min.css',
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
		'https://unpkg.com/@shgysk8zer0/',
		'https://unpkg.com/@kernvalley/',
		'https://unpkg.com/@aegisjsproject/',
		'https://i.imgur.com/',
		/\.(jpg|png|webp|svg|gif)$/,
	],
	allowedFresh: [
		'https://api.openweathermap.org/',
		'https://githubusercontent/com/u/',
		/\.(html|css|js|json)$/,
	],
};
