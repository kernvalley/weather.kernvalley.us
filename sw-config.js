/* eslint no-unused-vars: 0 */
const config = {
	version: '1.0.1',
	fresh: [
		'/',
	].map(url => new URL(url, location.origin).href),
	stale: [
		'/css/index.min.css',
		'/js/index.min.js',
		'/img/icons.svg',
		'/img/neon.svg',
		'/img/apple-touch-icon.png',
		'/img/icon-192.png',
		'/img/favicon.svg',
		'https://polyfill.io/v3/polyfill.min.js',
		'https://cdn.kernvalley.us/components/weather-forecast.html',
		'https://cdn.kernvalley.us/components/weather-current.html',
		'https://cdn.kernvalley.us/components/github/user.html',
		'https://cdn.kernvalley.us/components/pwa/prompt.html',

		'https://cdn.kernvalley.us/components/weather-forecast.css',
		'https://cdn.kernvalley.us/components/weather-current.css',
		'https://cdn.kernvalley.us/components/github/user.css',
		'https://cdn.kernvalley.us/components/pwa/prompt.css',
		/* Social Icons for Web Share API shim */
		'https://cdn.kernvalley.us/img/octicons/mail.svg',
		'https://cdn.kernvalley.us/img/logos/facebook.svg',
		'https://cdn.kernvalley.us/img/logos/twitter.svg',
		'https://cdn.kernvalley.us/img/logos/google-plus.svg',
		'https://cdn.kernvalley.us/img/logos/linkedin.svg',
		'https://cdn.kernvalley.us/img/logos/reddit.svg',
		'https://cdn.kernvalley.us/img/logos/gmail.svg',
		'https://cdn.kernvalley.us/img/adwaita-icons/actions/mail-send.svg',
		'https://cdn.kernvalley.us/img/logos/instagram.svg',
		'https://cdn.kernvalley.us/img/keep-kern-clean.svg',
		'https://cdn.kernvalley.us/fonts/roboto.woff2',
	].map(path => new URL(path, location.origin).href),
	allowed: [
		/https:\/\/secure\.gravatar\.com\/avatar\/*/,
		/https:\/\/i\.imgur\.com\/*/,
		/https:\/\/api\.openweathermap\.org\/*/,
		/https:\/\/*\.githubusercontent\.com\/u\/*/,
	]
};
