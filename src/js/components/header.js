import gsap from 'gsap';
import { onWindowScroll, exist } from '../utils';

const header = () => {
	const SELECTORS = {
		header: '.js-header',
		menuTrigger: '.js-header-menu-trigger',
		submenu: '.js-submenu',
		langBtn: '.js-lang-btn',
	};

	const CLASSNAMES = {
		bodyOpenMenuState: 'body--open_menu_state',
		headerScrollPos: 'header--pos_state',
		langActive: 'header__lang_item--active_state',
		submenuActiveState: 'header__submenu--active_state',
	};

	const $body = document.body;
	const $header = document.querySelector(SELECTORS.header);
	const $menuTriggers = document.querySelectorAll(SELECTORS.menuTrigger);
	const $submenus = document.querySelectorAll(SELECTORS.submenu);
	const $langBtn = document.querySelectorAll(SELECTORS.langBtn);

	let isMenuOpen = false;
	let prevScrollPos = window.scrollY;

	const headerHeight = $header.clientHeight;
	const matchMedia = gsap.matchMedia();
	const MAX_WIDTH_MEDIA = '(max-width: 1023px)';
	const MIN_WIDTH_MEDIA = '(min-width: 1024px)';

	$langBtn.forEach(($lang) => {
		$lang.addEventListener('click', () => {
			if (!$lang.classList.contains(CLASSNAMES.langActive)) {
				$langBtn.forEach(($lang) => {
					$lang.classList.remove(CLASSNAMES.langActive);
				});
				$lang.classList.add(CLASSNAMES.langActive);
			}
		});
	});

	const handleTriggerClick = () => {
		if (!isMenuOpen) {
			$body.classList.add(CLASSNAMES.bodyOpenMenuState);
			isMenuOpen = true;
		} else {
			$body.classList.remove(CLASSNAMES.bodyOpenMenuState);
			isMenuOpen = false;
		}
	};

	const headerScroll = (scrollY) => {
		if (prevScrollPos < window.scrollY && scrollY > headerHeight) {
			$header.classList.add(CLASSNAMES.headerScrollPos);
		} else {
			$header.classList.remove(CLASSNAMES.headerScrollPos);
		}
		prevScrollPos = window.scrollY;
	};

	const initializeEventListeners = () => {
		if (!exist($menuTriggers)) return;

		$menuTriggers.forEach(($trigger) => {
			$trigger.addEventListener('click', () => {
				handleTriggerClick();
			});
		});
	};

	const initializeMouseEvent = ($submenu) => {
		const matchMedia = gsap.matchMedia();
		const $menuItem = $submenu.previousElementSibling;

		const clickHandler = () => {
			if (!$submenu.classList.contains(CLASSNAMES.submenuActiveState)) {
				$submenus.forEach(($item) => {
					$item.classList.remove(CLASSNAMES.submenuActiveState);
				});
				$submenu.classList.add(CLASSNAMES.submenuActiveState);
			} else {
				$submenu.classList.remove(CLASSNAMES.submenuActiveState);
			}
		};

		matchMedia.add(MIN_WIDTH_MEDIA, () => {
			$menuItem.removeEventListener('click', clickHandler);
		});

		matchMedia.add(MAX_WIDTH_MEDIA, () => {
			$menuItem.addEventListener('click', clickHandler);
		});
	};

	$submenus.forEach(($item) => {
		initializeMouseEvent($item);
	});

	if (!exist($header)) return;

	onWindowScroll(headerScroll);
	initializeEventListeners();
};

export default header;
