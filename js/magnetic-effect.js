/**
 * Magnetic Effect Module
 * Buttons subtly follow cursor before snapping back
 */

const PULL_STRENGTH = 0.3; // how far the button moves toward cursor (0–1)
const TRIGGER_DISTANCE = 80; // px from button center to start effect

export const initMagneticEffect = () => {
    if (!matchMedia('(pointer: fine)').matches) return;

    const buttons = document.querySelectorAll('.glass-button, .form-submit');
    if (!buttons.length) return;

    buttons.forEach(btn => {
        btn.style.transition = 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)';

        const onMove = (e) => {
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < TRIGGER_DISTANCE) {
                btn.style.transform = `translate(${dx * PULL_STRENGTH}px, ${dy * PULL_STRENGTH}px)`;
            } else {
                btn.style.transform = '';
            }
        };

        const onLeave = () => {
            btn.style.transform = '';
        };

        document.addEventListener('mousemove', onMove, { passive: true });
        btn.addEventListener('mouseleave', onLeave);
    });
};
