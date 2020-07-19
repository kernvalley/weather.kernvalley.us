import 'https://cdn.kernvalley.us/js/std-js/deprefixer.js';
import 'https://cdn.kernvalley.us/js/std-js/shims.js';
import 'https://unpkg.com/@webcomponents/custom-elements@1.3.2/custom-elements.min.js';
import 'https://cdn.kernvalley.us/components/share-button.js';
import 'https://cdn.kernvalley.us/components/current-year.js';
import 'https://cdn.kernvalley.us/components/github/user.js';
import 'https://cdn.kernvalley.us/components/pwa/install.js';
import 'https://cdn.kernvalley.us/components/weather-current.js';
import 'https://cdn.kernvalley.us/components/weather-forecast.js';
import 'https://cdn.kernvalley.us/components/ad-block.js';
import { ready } from 'https://cdn.kernvalley.us/js/std-js/functions.js';
import { stateHandler } from './functions.js';
import { cities, site } from './consts.js';

document.documentElement.classList.replace('no-js', 'js');
document.body.classList.toggle('no-dialog', document.createElement('dialog') instanceof HTMLUnknownElement);
document.body.classList.toggle('no-details', document.createElement('details') instanceof HTMLUnknownElement);

addEventListener('popstate', stateHandler);
addEventListener('hashchange', () => {
	if (location.hash !== '#') {
		const city = cities[location.hash.substr(1)];

		if (city) {
			history.pushState(city, `${city.name} | ${site.title}`, location.href);
		} else {
			history.pushState(cities.lakeIsabella, document.title, location.href);
		}

		stateHandler(history);
	}
});

if (history.state === null && location.hash !== '') {
	const city = cities[location.hash.substr(1)];

	if (city) {
		history.replaceState(city, `${city.name} | ${site.title}`, location.href);
	} else {
		history.replaceState(cities.lakeIsabella, document.title, location.href);
	}
	stateHandler(history);
} else {
	stateHandler(history);
}

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
});
