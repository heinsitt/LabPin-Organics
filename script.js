/* ============================================
   LAB-PINS ORGANIC — Interactive Behaviors
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    /* === AOS INITIALIZATION === */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
            disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'all' : false
        });
    }

    /* === MOBILE MENU === */
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');

    function closeMobileMenu() {
        if (!navLinks || !mobileToggle) return;
        navLinks.classList.remove('mobile-open');
        document.body.style.overflow = '';
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('mobile-open');
            document.body.style.overflow = isOpen ? 'hidden' : '';
            const spans = mobileToggle.querySelectorAll('span');
            if (isOpen) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                closeMobileMenu();
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    /* === ACTIVE NAV ON SCROLL === */
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    function setActiveNav() {
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + id) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    /* === NAVBAR SCROLL EFFECT === */
    function handleNavbarScroll() {
        if (!navbar) return;
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        setActiveNav();
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    /* === SMOOTH SCROLL FOR ANCHOR LINKS === */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* === HERO PARALLAX (desktop only) === */
    const heroImage = document.querySelector('.hero-image img');
    const heroContent = document.querySelector('.hero-content');

    if (heroImage && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroHeight = window.innerHeight;
            if (scrolled < heroHeight) {
                heroImage.style.transform = 'translateY(' + (scrolled * 0.35) + 'px) scale(1.08)';
                if (heroContent) {
                    const opacity = 1 - (scrolled / (heroHeight * 0.55));
                    heroContent.style.opacity = Math.max(0, opacity);
                    heroContent.style.transform = 'translateY(' + (scrolled * 0.25) + 'px)';
                }
            }
        }, { passive: true });
    }

    /* === DELIVERY TRUCK SCROLL TRIGGER === */
    const deliveryRoad = document.querySelector('.delivery-road');
    if (deliveryRoad) {
        const truckObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    deliveryRoad.classList.add('animate-in');
                    truckObserver.unobserve(deliveryRoad);
                }
            });
        }, { threshold: 0.2 });

        truckObserver.observe(deliveryRoad);
    }

    /* === REFRESH AOS ON RESIZE === */
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (typeof AOS !== 'undefined') AOS.refresh();
        }, 250);
    });

});
