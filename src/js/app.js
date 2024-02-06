import layout from './layout/layout';
import { indexPage } from './pages';
import { pageLoad } from './utils';

const app = () => {
	layout();
	pageLoad(() => {
		indexPage();
		document.body.classList.add('body--loaded');
	});
};

export default app;
