/* eslint-env serviceworker */
/* eslint no-unused-vars: 0 */
const config = {
	version: '2.0.0',
	fresh: [
		'https://apps.kernvalley.us/apps.json',
		'/manifest.json',
	].map(path => new URL(path, location.origin).href),
	stale: [
		/* HTML */
		'/',
		'https://unpkg.com/@shgysk8zer0/components@0.0.9/weather/forecast.html',
		'https://unpkg.com/@shgysk8zer0/components@0.0.9/weather/current.html',
		'https://unpkg.com/@shgysk8zer0/components@0.0.9/github/user.html',
		'https://unpkg.com/@shgysk8zer0/components@0.0.9/pwa/prompt.html',
		'https://unpkg.com/@shgysk8zer0/components@0.0.9/krv/ad.html',
		'https://unpkg.com/@shgysk8zer0/components@0.0.9/install/prompt.html',

		/* JavaScript */
		'/js/index.min.js',

		/* Stylesheets */
		'/css/index.min.css',
		'https://unpkg.com/@shgysk8zer0/components@0.0.9/weather/forecast.css',
		'https://unpkg.com/@shgysk8zer0/components@0.0.9/weather/current.css',
		'https://unpkg.com/@shgysk8zer0/components@0.0.9/github/user.css',
		'https://unpkg.com/@shgysk8zer0/components@0.0.9/pwa/prompt.css',
		'https://unpkg.com/@shgysk8zer0/components@0.0.9/krv/ad.css',
		'https://unpkg.com/@shgysk8zer0/components@0.0.9/install/prompt.css',

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
		'https://i.imgur.com/',
		/\.(jpg|png|webp|svg|gif)$/,
	],
	allowedFresh: [
		'https://api.openweathermap.org/',
		'https://githubusercontent/com/u/',
		/\.(html|css|js|json)$/,
	],
};
