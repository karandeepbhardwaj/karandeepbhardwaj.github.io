/**
 * Navigation Module
 * Handles floating nav, active section tracking, scroll effects, and smooth scrolling
 */

const floatingNav = document.getElementById('floatingNav');
const backToTop = document.getElementById('backToTop');
const navIcons = document.querySelectorAll('.nav-icon[data-section]');

/**
 * Handle scroll events for back-to-top visibility
 */
const handleScroll = () => {
    const scrollTop = window.scrollY;
    backToTop?.classList.toggle('visible', scrollTop > 300);
};

/**
 * Track which section is currently in view and update active nav icon
 */
const initSectionObserver = () => {
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    navIcons.forEach(icon => {
                        icon.classList.toggle('active', icon.dataset.section === sectionId);
                    });
                }
            });
        },
        { threshold: 0.3, rootMargin: '-10% 0px -40% 0px' }
    );

    sections.forEach(section => observer.observe(section));
};

/**
 * Show floating nav with entrance animation
 */
const showFloatingNav = () => {
    setTimeout(() => {
        floatingNav?.classList.add('visible');
    }, 800);
};

/**
 * Smooth scroll to element
 */
const scrollToElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

/**
 * Scroll to top of page
 */
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Initialize navigation module
 */
export const initNavigation = () => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Back to top handler
    backToTop?.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToTop();
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = anchor.getAttribute('href');
            if (target === '#') {
                scrollToTop();
            } else if (target) {
                scrollToElement(target);
            }
        });
    });

    // Section observer for active nav state
    initSectionObserver();

    // Floating nav entrance animation
    showFloatingNav();
};

// Export for command palette
export { scrollToElement, scrollToTop };
