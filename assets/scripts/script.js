/* === Header on scroll === */
window.addEventListener('scroll', () => {
	document.querySelector('.header').classList.toggle('window-scroll', window.scrollY > 0);
});

/* === Menu burger === */
const menuBtn = document.querySelector('.header__btn-menu');
const menuBody = document.querySelector('.menu__body');
const menuOverlay = document.querySelector('.menu__overlay');
const menuList = document.querySelector('.menu__list');
const menuLinks = menuList.querySelectorAll('.menu__link');
let menuScrollPosition = 0;
const mediaMobile = window.matchMedia('(max-width: 47.9988rem)');

if (menuBtn) {
	menuBtn.addEventListener('click', () => {
		toggleMenu();
	});
}

if (menuOverlay) {
	menuOverlay.addEventListener('click', toggleMenu);
}

function syncMenuInert() {
	const isOpen = menuBody.classList.contains('open');
	const hidden = mediaMobile.matches && !isOpen;
	menuBody.inert = hidden;
	menuBody.setAttribute('aria-hidden', hidden);
}

document.addEventListener('keydown', e => {
	if (e.key === 'Escape' && menuBtn.classList.contains('open')) {
		toggleMenu();
	}
});

menuBody.addEventListener('keydown', trapFocus);

function trapFocus(e) {
	if (!menuBody.classList.contains('open')) return;

	if (e.key === 'Tab') {
		const firstFocusable = menuLinks[0];
		const lastFocusable = menuLinks[menuLinks.length - 1];

		// Also consider the menu button
		const allFocusables = [menuBtn, ...menuLinks];
		const first = allFocusables[0];
		const last = allFocusables[allFocusables.length - 1];

		if (e.shiftKey && document.activeElement === first) {
			e.preventDefault();
			last.focus();
		} else if (!e.shiftKey && document.activeElement === last) {
			e.preventDefault();
			first.focus();
		}
	}
}

function toggleMenu() {
	menuBody.classList.toggle('open');
	menuOverlay.classList.toggle('open');
	menuBtn.classList.toggle('open');
	if (menuBtn.classList.contains('open')) {
		menuScrollPosition = window.scrollY;
		menuBtn.setAttribute('aria-expanded', true);
		menuBtn.setAttribute('aria-label', 'Close navigation menu');
		menuList.querySelector('.menu__link').focus();
		menuOverlay.setAttribute('aria-hidden', 'false');
	} else {
		menuBtn.setAttribute('aria-expanded', false);
		menuBtn.setAttribute('aria-label', 'Open navigation menu');
		menuBtn.focus();
		menuOverlay.setAttribute('aria-hidden', 'true');
	}
	document.body.classList.toggle('no-scroll', menuBtn.classList.contains('open'));
	document.body.style.top = menuBtn.classList.contains('open') ? -menuScrollPosition + 'px' : '';
	// menuBody.setAttribute('aria-hidden', !menuBody.classList.contains('open'));
	syncMenuInert();
	if (!menuBtn.classList.contains('open')) {
		window.scrollTo(0, menuScrollPosition);
	}
}

// Close menu when clicking menu links
menuLinks.forEach(link => {
	link.addEventListener('click', e => {
		e.preventDefault();
		if (menuBtn.classList.contains('open')) {
			toggleMenu();
		}
	});
});

// Keep state correct when the user resizes across the breakpoint
mediaMobile.addEventListener('change', syncMenuInert);
// Set the correct initial state on load (mobile = closed = inert)
syncMenuInert();

/* === Slider === */
const swiper = new Swiper('.slider-hero', {
	slidesPerView: 1,
	spaceBetween: 0,
	loop: true,
	speed: 900,
	observer: true,
	observeParents: true,
	autoHeight: true,

	keyboard: {
		enabled: true,
		onlyInViewport: true,
	},

	// Navigation arrows
	navigation: {
		nextEl: '.slider-hero__control--next',
		prevEl: '.slider-hero__control--prev',
	},
});
