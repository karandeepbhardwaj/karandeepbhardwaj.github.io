/**
 * Animations Module
 * Handles scroll reveal animations and typing effect
 */

/**
 * Initialize text reveal animation on scroll
 */
const initTextReveal = () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    document.querySelectorAll('.text-reveal').forEach(el => observer.observe(el));
};

/**
 * Initialize section content scroll animations
 */
const initSectionAnimations = () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    document.querySelectorAll('.section-content').forEach(el => {
        el.classList.add('animate');
        observer.observe(el);
    });
};

/**
 * Initialize typing effect for hero title
 */
const initTypingEffect = () => {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;
    
    const name = 'Karandeep Bhardwaj';
    let charIndex = 0;
    
    const typeWriter = () => {
        if (charIndex < name.length) {
            typingText.textContent += name.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
};

/**
 * Initialize all animations
 */
export const initAnimations = () => {
    initTextReveal();
    initTypingEffect();
    
    // Section animations after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSectionAnimations);
    } else {
        initSectionAnimations();
    }
};
