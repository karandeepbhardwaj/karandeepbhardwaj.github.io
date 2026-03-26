/**
 * Animations Module
 * Single IntersectionObserver for all scroll-triggered animations
 */

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

    setTimeout(typeWriter, 500);
};

/**
 * Initialize all scroll-triggered animations with a single observer
 */
const initScrollAnimations = () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const el = entry.target;
                el.classList.add('visible');

                // Stagger skill tags when their container becomes visible
                if (el.classList.contains('skills-list')) {
                    el.querySelectorAll('.skill-tag').forEach((tag, i) => {
                        tag.style.transitionDelay = `${i * 30}ms`;
                    });
                    observer.unobserve(el);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all animation targets with a single observer
    // Note: skill tags previously used threshold: 0.2 — now unified at 0.1.
    // This triggers slightly earlier but is visually acceptable.
    document.querySelectorAll('.text-reveal, .skills-list').forEach(el => {
        observer.observe(el);
    });

    // Section content slide-in
    // DOMContentLoaded guard removed — safe because type="module" scripts are deferred
    document.querySelectorAll('.section-content').forEach(el => {
        el.classList.add('animate');
        observer.observe(el);
    });
};

/**
 * Initialize all animations
 */
export const initAnimations = () => {
    initTypingEffect();
    initScrollAnimations();
};
