/* ============================================
   HAZAR İNŞAAT — Premium JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- LOADER ---------- */
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => loader.classList.add('hidden'), 1200);
    });

    /* ---------- NAVBAR SCROLL ---------- */
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        navbar.classList.toggle('scrolled', y > 60);
        scrollTop.classList.toggle('visible', y > 500);
    });

    /* ---------- MOBILE MENU ---------- */
    const toggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    /* ---------- SMOOTH SCROLL ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ---------- SCROLL TOP ---------- */
    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ---------- ACTIVE NAV LINK ---------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinksList = document.querySelectorAll('.nav-link');

    const observerNav = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinksList.forEach(l => {
                    l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(s => observerNav.observe(s));

    /* ---------- SCROLL REVEAL ---------- */
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observerReveal = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observerReveal.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach(el => observerReveal.observe(el));

    /* ---------- ANIMATED COUNTERS ---------- */
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = new Set();

    const observerCounter = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated.has(entry.target)) {
                countersAnimated.add(entry.target);
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observerCounter.observe(c));

    function animateCounter(el) {
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
            const current = Math.floor(eased * target);
            el.textContent = current.toLocaleString('tr-TR');
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    /* ---------- HERO PARTICLES ---------- */
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            const size = Math.random() * 4 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 10;
            const opacity = Math.random() * 0.3 + 0.1;

            Object.assign(p.style, {
                position: 'absolute',
                width: size + 'px',
                height: size + 'px',
                background: i % 5 === 0 ? '#e63946' : 'rgba(255,255,255,' + opacity + ')',
                borderRadius: '50%',
                left: x + '%',
                top: y + '%',
                animation: `particleFloat ${duration}s ease-in-out ${delay}s infinite`,
                pointerEvents: 'none'
            });

            if (i % 5 === 0) {
                p.style.boxShadow = '0 0 6px rgba(230,57,70,0.5)';
            }

            particlesContainer.appendChild(p);
        }

        // Inject particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% { transform: translate(0, 0) scale(1); opacity: var(--o, 0.3); }
                25% { transform: translate(${rand()}px, ${rand()}px) scale(1.2); }
                50% { transform: translate(${rand()}px, ${rand()}px) scale(0.8); opacity: calc(var(--o, 0.3) * 0.5); }
                75% { transform: translate(${rand()}px, ${rand()}px) scale(1.1); }
            }
        `;
        document.head.appendChild(style);
    }

    function rand() {
        return (Math.random() - 0.5) * 60;
    }

    /* ---------- CONTACT FORM ---------- */
    const form = document.getElementById('contact-form');
    const toast = document.getElementById('toast');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
            form.reset();
        });
    }

    /* ---------- PRODUCT CARD TILT ---------- */
    document.querySelectorAll('.p-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `translateY(-6px) perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

});
