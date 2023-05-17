import { ready } from '@shgysk8zer0/kazoo/dom.js';
import { site, cities } from './consts.js';

export function getByPostalCode(zip) {
	return Object.values(cities).find(city => city.postalCode === parseInt(zip));
}

export async function stateHandler({ state }) {
	const { name = null, postalCode = NaN } = state || {};

	if (typeof name === 'string' && ! Number.isNaN(postalCode)) {
		await Promise.all([
			ready(),
			customElements.whenDefined('weather-current'),
			customElements.whenDefined('weather-forecast'),
		]);

		cookieStore.set({ name: 'last-viewed', value: postalCode });

		document.title = `${name} | ${site.title}`;
		document.querySelectorAll('weather-current, weather-forecast').forEach(el => {
			el.postalCode = postalCode;
			el.update().catch(console.error);
		});

	}
}
