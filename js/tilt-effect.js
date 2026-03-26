/**
 * 3D Tilt Effect Module
 * Subtle perspective transforms on hover for project cards
 */

const MAX_TILT = 5; // degrees

export const initTiltEffect = () => {
    if (!matchMedia('(pointer: fine)').matches) return;

    const cards = document.querySelectorAll('.project-card');
    if (!cards.length) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * MAX_TILT;
            const rotateX = ((centerY - y) / centerY) * MAX_TILT;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';

            const reset = () => {
                card.style.transition = '';
                card.removeEventListener('transitionend', reset);
            };
            card.addEventListener('transitionend', reset);
        });
    });
};
