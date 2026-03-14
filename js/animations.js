/**
 * Animations Module
 * Handles scroll reveal animations, typing effect, and skill tag stagger
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
 * Initialize skill tag stagger animation
 */
const initSkillTagStagger = () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Apply stagger delay to each tag
                    const tags = entry.target.querySelectorAll('.skill-tag');
                    tags.forEach((tag, i) => {
                        tag.style.transitionDelay = `${i * 30}ms`;
                    });
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    document.querySelectorAll('.skills-list').forEach(el => observer.observe(el));
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

    setTimeout(typeWriter, 500);
};

/**
 * Initialize all animations
 */
export const initAnimations = () => {
    initTextReveal();
    initTypingEffect();
    initSkillTagStagger();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSectionAnimations);
    } else {
        initSectionAnimations();
    }
};
