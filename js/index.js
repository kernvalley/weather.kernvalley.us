import 'https://cdn.kernvalley.us/js/std-js/deprefixer.js';
import 'https://cdn.kernvalley.us/js/std-js/shims.js';
import 'https://cdn.kernvalley.us/js/std-js/theme-cookie.js';
import 'https://cdn.kernvalley.us/components/share-button.js';
import 'https://cdn.kernvalley.us/components/current-year.js';
import 'https://cdn.kernvalley.us/components/github/user.js';
import 'https://cdn.kernvalley.us/components/weather/current.js';
import 'https://cdn.kernvalley.us/components/weather/forecast.js';
import 'https://cdn.kernvalley.us/components/ad/block.js';
import 'https://cdn.kernvalley.us/components/app/list-button.js';
import 'https://cdn.kernvalley.us/components/app/stores.js';
import 'https://cdn.kernvalley.us/components/install/prompt.js';
import { ready, loaded, on, toggleClass, attr } from 'https://cdn.kernvalley.us/js/std-js/dom.js';
import { getCustomElement } from 'https://cdn.kernvalley.us/js/std-js/custom-elements.js';
import { init } from 'https://cdn.kernvalley.us/js/std-js/data-handlers.js';
import { importGa, externalHandler, telHandler, mailtoHandler } from 'https://cdn.kernvalley.us/js/std-js/google-analytics.js';
import { stateHandler, getByPostalCode } from './functions.js';
import { cities, site, appId, GA } from './consts.js';

toggleClass([document.documentElement], {
	'no-dialog': document.createElement('dialog') instanceof HTMLUnknownElement,
	'no-details': document.createElement('details') instanceof HTMLUnknownElement,
	'no-js': false,
	'js': true,
});

if (typeof GA === 'string' && GA.length !== 0) {
	loaded().then(() => {
		requestIdleCallback(() => {
			importGa(GA).then(async ({ ga, hasGa }) => {
				if (hasGa()) {
					ga('create', GA, 'auto');
					ga('set', 'transport', 'beacon');
					ga('send', 'pageview');

					on('a[rel~="external"]', ['click'], externalHandler, { passive: true, capture: true });
					on('a[href^="tel:"]', ['click'], telHandler, { passive: true, capture: true });
					on('a[href^="mailto:"]', ['click'], mailtoHandler, { passive: true, capture: true });
				}
			});
		});
	});
}

Promise.all([
	getCustomElement('weather-current'),
	getCustomElement('weather-forecast'),
	getCustomElement('install-prompt'),
]).then(async ([WeatherCurrent, WeatherForecast, HTMLInstallPromptElement]) => {
	const current = new WeatherCurrent({ appId });
	const forecast = new WeatherForecast({ appId });

	on('#install-btn', ['click'], () => new HTMLInstallPromptElement().show())
		.forEach(el => el.hidden = false);

	cookieStore.get({ name: 'theme' }).then(cookie => {
		if (cookie && typeof cookie.value === 'string') {
			attr([current, forecast], { theme: cookie.value });
		} else {
			attr([current, forecast], { theme: 'auto' });
		}
	});

	current.theme = 'auto';
	forecast.theme = 'auto';
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
	} else if (cookie) {
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

ready().then(async () => {
	const btns = Object.entries(cities).map(([key, {name}]) => {
		const a = document.createElement('a');
		a.href = `/#${key}`;
		a.title = name;
		a.textContent = name;
		a.classList.add('btn', 'btn-primary');
		return a;
	});

	document.getElementById('cities-list').append(...btns);

	init();
});
