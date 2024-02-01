// ------------------- imports
import { onWindowResize } from 'utils';
// ------------------- imports###

// ------------------  import components
import { calcViewportHeight } from '../utils';
// ------------------  import components###
import header from '../components/header';

const layout = () => {
	onWindowResize(() => {
		calcViewportHeight();
	});
	calcViewportHeight();
	header();
};

export default layout;
