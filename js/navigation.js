/**
 * Navigation Module
 * Handles mobile menu, scroll effects, and smooth scrolling
 */

const nav = document.querySelector('.nav');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');
const backToTop = document.getElementById('backToTop');
const scrollProgress = document.getElementById('scrollProgress');

/**
 * Toggle mobile menu open/closed
 */
const toggleMobileMenu = () => {
    hamburger?.classList.toggle('active');
    navLinks?.classList.toggle('active');
    navOverlay?.classList.toggle('active');
    document.body.style.overflow = navLinks?.classList.contains('active') ? 'hidden' : '';
};

/**
 * Close mobile menu
 */
const closeMobileMenu = () => {
    hamburger?.classList.remove('active');
    navLinks?.classList.remove('active');
    navOverlay?.classList.remove('active');
    document.body.style.overflow = '';
};

/**
 * Handle scroll events for nav, progress bar, and back-to-top
 */
const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Update scroll progress bar
    if (scrollProgress) {
        scrollProgress.style.width = `${(scrollTop / docHeight) * 100}%`;
    }
    
    // Nav scroll effect
    nav?.classList.toggle('scrolled', scrollTop > 50);
    
    // Back to top button visibility
    backToTop?.classList.toggle('visible', scrollTop > 300);
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
    // Scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Mobile menu handlers
    hamburger?.addEventListener('click', toggleMobileMenu);
    navOverlay?.addEventListener('click', closeMobileMenu);
    
    // Close menu when nav link is clicked
    navLinks?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
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
            if (target) scrollToElement(target);
        });
    });
};

// Export for command palette
export { scrollToElement, scrollToTop };
