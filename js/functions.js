import { ready } from 'https://cdn.kernvalley.us/js/std-js/functions.js';
import { site } from './consts.js';

export async function stateHandler({ state }) {
	const { name = null, postalCode = NaN } = state || {};

	if (typeof name === 'string' && ! Number.isNaN(postalCode)) {
		await Promise.all([
			ready(),
			customElements.whenDefined('weather-current'),
			customElements.whenDefined('weather-forecast'),
		]);

		console.info({name, postalCode});
		document.title = `${name} | ${site.title}`;
		document.querySelectorAll('weather-current, weather-forecast').forEach(el => {
			el.postalCode = postalCode;
			el.update().catch(console.error);
		});

	}
}
