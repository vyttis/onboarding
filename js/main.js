// KU Darbuotojo Atmintinė - Main JS

const CONFIG = {
    SCROLL_THRESHOLD: 300,
    DESKTOP_BREAKPOINT: 1024,
    SCROLL_OFFSET_DESKTOP: 20,
    SCROLL_OFFSET_MOBILE: 70,
    OBSERVER_ROOT_MARGIN: '-20% 0px -75% 0px',
    LANG_KEY: 'ku-atmintine-lang',
    DEFAULT_LANG: 'lt',
    TITLES: {
        lt: 'Darbuotojo atmintinė | Klaipėdos universitetas',
        en: 'Employee Handbook | Klaipėda University'
    }
};

document.addEventListener('DOMContentLoaded', () => {

    // ---- Mobile Navigation ----
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const sideNav = document.getElementById('sideNav');
    const navOverlay = document.getElementById('navOverlay');

    if (mobileToggle && sideNav && navOverlay) {
        function openNav() {
            sideNav.classList.add('open');
            navOverlay.classList.add('active');
            mobileToggle.classList.add('active');
            mobileToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        function closeNav() {
            sideNav.classList.remove('open');
            navOverlay.classList.remove('active');
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        mobileToggle.addEventListener('click', () => {
            if (sideNav.classList.contains('open')) {
                closeNav();
            } else {
                openNav();
            }
        });

        navOverlay.addEventListener('click', closeNav);

        // Close nav on link click (mobile)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= CONFIG.DESKTOP_BREAKPOINT) {
                    closeNav();
                }
            });
        });

        // Close nav on resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > CONFIG.DESKTOP_BREAKPOINT && sideNav.classList.contains('open')) {
                closeNav();
            }
        });
    }

    // ---- Active Navigation Highlight (IntersectionObserver) ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (sections.length && navLinks.length) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            root: null,
            rootMargin: CONFIG.OBSERVER_ROOT_MARGIN,
            threshold: 0
        });

        sections.forEach(section => navObserver.observe(section));
    }

    // ---- Checklist Interactive (with keyboard and aria support) ----
    document.querySelectorAll('.checklist-item').forEach(item => {
        function toggleCheck() {
            item.classList.toggle('checked');
            const isChecked = item.classList.contains('checked');
            item.setAttribute('aria-checked', isChecked.toString());
        }

        item.addEventListener('click', toggleCheck);
        item.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                toggleCheck();
            }
        });
    });

    // ---- Smooth scroll offset for fixed nav ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = window.innerWidth > CONFIG.DESKTOP_BREAKPOINT
                    ? CONFIG.SCROLL_OFFSET_DESKTOP
                    : CONFIG.SCROLL_OFFSET_MOBILE;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---- Back to Top Button ----
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > CONFIG.SCROLL_THRESHOLD) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- Accordion: force open on desktop ----
    function handleAccordions() {
        const accordions = document.querySelectorAll('.accordion-block');
        if (!accordions.length) return;

        if (window.innerWidth > CONFIG.DESKTOP_BREAKPOINT) {
            accordions.forEach(d => d.setAttribute('open', ''));
        }
    }

    window.addEventListener('resize', handleAccordions);
    handleAccordions();

    // ---- Language Switcher ----
    function setLanguage(lang) {
        document.documentElement.setAttribute('lang', lang);
        document.title = CONFIG.TITLES[lang] || CONFIG.TITLES[CONFIG.DEFAULT_LANG];

        document.querySelectorAll('.lang-btn').forEach(btn => {
            const isActive = btn.getAttribute('data-lang') === lang;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive.toString());
        });

        try {
            localStorage.setItem(CONFIG.LANG_KEY, lang);
        } catch (e) {
            // localStorage unavailable
        }
    }

    // Initialize language
    const savedLang = (() => {
        try {
            return localStorage.getItem(CONFIG.LANG_KEY);
        } catch (e) {
            return null;
        }
    })();
    setLanguage(savedLang || CONFIG.DEFAULT_LANG);

    // Attach event listeners to all lang buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang) setLanguage(lang);
        });
    });
});
