import { page } from '../utils';
import Accordion from '../components/accordion';

export const indexPage = page(() => {
	console.log('homepage loaded');

	const accordion = Accordion({
		triggers: document.querySelectorAll('.accordion__item_head'),
		activeStateName: 'accordion__item--active-mod',
	});
});
