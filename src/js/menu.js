document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.getElementById('site-menu');

    const getSamePageHash = (link) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return null;
        if (href.startsWith('#')) return href.slice(1);

        let url;
        try {
            url = new URL(href, window.location.href);
        } catch (error) {
            return null;
        }

        if (url.origin !== window.location.origin) return null;
        if (url.pathname !== window.location.pathname) return null;
        return url.hash ? url.hash.slice(1) : null;
    };

    // Smooth scroll for same-page anchor links.
    document.addEventListener('click', (event) => {
        const link = event.target.closest('a[href]');
        if (!link || link.target === '_blank') return;

        const hash = getSamePageHash(link);
        if (!hash) return;

        const target = document.getElementById(hash);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (history.pushState) {
            history.pushState(null, '', `#${hash}`);
        } else {
            window.location.hash = hash;
        }
    });

    if (!menuBtn || !menu) return;

    const closeMenu = () => {
        menuBtn.setAttribute('aria-expanded', 'false');
        menu.hidden = true;
        document.body.classList.remove('is-menu-open');
    };

    const openMenu = () => {
        menuBtn.setAttribute('aria-expanded', 'true');
        menu.hidden = false;
        document.body.classList.add('is-menu-open');
    };

    const toggleMenu = () => {
        const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    menuBtn.addEventListener('click', toggleMenu);

    // Ferme le menu quand on clique sur un lien du menu
    menu.addEventListener('click', (event) => {
        if (event.target.closest('.menu__link')) {
            closeMenu();
        }
    });
});
