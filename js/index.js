import '@shgysk8zer0/kazoo/theme-cookie.js';
import { ready, loaded, on, toggleClass, attr } from '@shgysk8zer0/kazoo/dom.js';
import { init } from '@shgysk8zer0/kazoo/data-handlers.js';
import { importGa, externalHandler } from '@shgysk8zer0/kazoo/google-analytics.js';
import { getGooglePolicy } from '@shgysk8zer0/kazoo/trust-policies.js';
import { stateHandler, getByPostalCode } from './functions.js';
import { cities, site, appId, GA } from './consts.js';
import './components.js';

toggleClass([document.documentElement], {
	'no-dialog': document.createElement('dialog') instanceof HTMLUnknownElement,
	'no-details': document.createElement('details') instanceof HTMLUnknownElement,
	'no-js': false,
	'js': true,
});

if (typeof GA === 'string' && GA.length !== 0) {
	loaded().then(() => {
		requestIdleCallback(() => {
			importGa(GA, {}, { policy: getGooglePolicy() }).then(async ({ ga, hasGa }) => {
				if (hasGa()) {
					ga('create', GA, 'auto');
					ga('set', 'transport', 'beacon');
					ga('send', 'pageview');

					on('a[rel~="external"]', ['click'], externalHandler, { passive: true, capture: true });
				}
			});
		});
	});
}

Promise.all([
	customElements.whenDefined('weather-current'),
	customElements.whenDefined('weather-forecast'),
	customElements.whenDefined('install-prompt'),
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
