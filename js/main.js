// KU Darbuotojo Atmintinė - Main JS

document.addEventListener('DOMContentLoaded', () => {
    // ---- Mobile Navigation ----
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const sideNav = document.getElementById('sideNav');
    const navOverlay = document.getElementById('navOverlay');

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
            if (window.innerWidth <= 1024) {
                closeNav();
            }
        });
    });

    // Close nav on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && sideNav.classList.contains('open')) {
            closeNav();
        }
    });

    // ---- Active Navigation Highlight (throttled) ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    let ticking = false;

    function updateActiveNav() {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateActiveNav);
            ticking = true;
        }
    }, { passive: true });

    updateActiveNav();

    // ---- Checklist Interactive ----
    document.querySelectorAll('.checklist-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('checked');
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
                const offset = window.innerWidth > 1024 ? 20 : 70;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
});
