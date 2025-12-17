document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.getElementById('site-menu');

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

    // Ferme avec la touche Échap
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
});
