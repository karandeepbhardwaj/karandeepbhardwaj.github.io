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
 * Track which section is currently in view and update active nav icon.
 * Uses scroll position (offset from top) — more reliable than IntersectionObserver
 * for sections of varying heights.
 */
const initSectionTracking = () => {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    if (!sections.length) return;

    let ticking = false;

    const updateActiveNav = () => {
        const scrollTop = window.scrollY;
        const viewportHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        // If near bottom of page, activate last section
        if (scrollTop + viewportHeight >= docHeight - 50) {
            const lastId = sections[sections.length - 1].id;
            navIcons.forEach(icon => {
                icon.classList.toggle('active', icon.dataset.section === lastId);
            });
            return;
        }

        // Find which section's top is closest to 30% of viewport from top
        const trigger = scrollTop + viewportHeight * 0.3;
        let activeId = sections[0].id;

        for (const section of sections) {
            if (section.offsetTop <= trigger) {
                activeId = section.id;
            } else {
                break;
            }
        }

        navIcons.forEach(icon => {
            icon.classList.toggle('active', icon.dataset.section === activeId);
        });
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Initial call
    updateActiveNav();
};

/**
 * Show floating nav with entrance animation
 */
const showFloatingNav = () => {
    setTimeout(() => {
        floatingNav?.classList.add('visible');
    }, 1800);
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

    // Section tracking for active nav state
    initSectionTracking();

    // Floating nav entrance animation
    showFloatingNav();
};

// Export for command palette
export { scrollToElement, scrollToTop };
