import 'https://cdn.kernvalley.us/js/std-js/deprefixer.js';
import 'https://cdn.kernvalley.us/js/std-js/shims.js';
import 'https://unpkg.com/@webcomponents/custom-elements@1.4.2/custom-elements.min.js';
import 'https://cdn.kernvalley.us/components/share-button.js';
import 'https://cdn.kernvalley.us/components/current-year.js';
import 'https://cdn.kernvalley.us/components/github/user.js';
import 'https://cdn.kernvalley.us/components/pwa/install.js';
import 'https://cdn.kernvalley.us/components/weather-current.js';
import 'https://cdn.kernvalley.us/components/weather-forecast.js';
import 'https://cdn.kernvalley.us/components/ad/block.js';
import { ready, $ } from 'https://cdn.kernvalley.us/js/std-js/functions.js';
import { loadScript } from 'https://cdn.kernvalley.us/js/std-js/loader.js';
import { importGa, externalHandler, telHandler, mailtoHandler } from 'https://cdn.kernvalley.us/js/std-js/google-analytics.js';
import { stateHandler } from './functions.js';
import { cities, site, appId, GA } from './consts.js';

document.documentElement.classList.replace('no-js', 'js');
document.body.classList.toggle('no-dialog', document.createElement('dialog') instanceof HTMLUnknownElement);
document.body.classList.toggle('no-details', document.createElement('details') instanceof HTMLUnknownElement);

if (typeof GA === 'string' && GA.length !== 0) {
	requestIdleCallback(() => {
		importGa(GA).then(async () => {
			/* global ga */
			ga('create', GA, 'auto');
			ga('set', 'transport', 'beacon');
			ga('send', 'pageview');

			await ready();

			$('a[rel~="external"]').click(externalHandler, { passive: true, capture: true });
			$('a[href^="tel:"]').click(telHandler, { passive: true, capture: true });
			$('a[href^="mailto:"]').click(mailtoHandler, { passive: true, capture: true });
		});
	});
}

function getByPostalCode(zip) {
	return Object.values(cities).find(city => city.postalCode === parseInt(zip));
}

Promise.all([
	customElements.whenDefined('weather-current'),
	customElements.whenDefined('weather-forecast'),
]).then(async () => {
	const WeatherCurrent = customElements.get('weather-current');
	const WeatherForecast = customElements.get('weather-forecast');
	const current = new WeatherCurrent({ appId });
	const forecast = new WeatherForecast({ appId });
	const cookie = await cookieStore.get({ name: 'last-viewed' });

	current.classList.add('card');
	forecast.classList.add('card', 'block');

	if (location.hash.length  > 1) {
		const city = cities[location.hash.substr(1)];
		document.title = `${city.name} | ${site.title}`;
		history.replaceState(city, document.title, location.href);
		current.postalCode = city.postalCode;
		forecast.postalCode = city.postalCode;
	} else if (history.state !== null) {
		const { name, postalCode } = history.state;
		document.title = `${name} | ${site.title}`;
		current.postalCode = postalCode;
		forecast.postalCode = postalCode;
	} else if (typeof cookie !== 'undefined') {
		const city = getByPostalCode(cookie.value);
		const url = new URL(location.href);
		url.hash = `#${city.key}`;
		document.title = `${city.name} | ${site.title}`;
		history.replaceState(city, document.title, url.href);
		current.postalCode = city.postalCode;
		forecast.postalCode = city.postalCode;
	} else {
		current.postalCode = cities.lakeIsabella.postalCode;
		forecast.postalCode = cities.lakeIsabella.postalCode;
	}

	document.getElementById('current-placeholder').replaceWith(current);
	document.getElementById('forecast-placeholder').replaceWith(forecast);
});

addEventListener('popstate', stateHandler);

addEventListener('hashchange', () => {
	if (location.hash !== '#') {
		const city = cities[location.hash.substr(1)];

		if (city) {
			cookieStore.set('last-viewed', city.postalCode);
			history.pushState(city, `${city.name} | ${site.title}`, location.href);
		} else {
			cookieStore.set('last-viewed', cities.lakeIsabella.postalCode);
			history.pushState(cities.lakeIsabella, document.title, location.href);
		}

		stateHandler(history);
	}
});

Promise.allSettled([
	ready(),
	loadScript('https://cdn.polyfill.io/v3/polyfill.min.js'),
]).then(async () => {
	const btns = Object.entries(cities).map(([key, {name}]) => {
		const a = document.createElement('a');
		a.href = `/#${key}`;
		a.title = name;
		a.textContent = name;
		a.classList.add('btn', 'btn-primary');
		return a;
	});
	document.getElementById('cities-list').append(...btns);
});
