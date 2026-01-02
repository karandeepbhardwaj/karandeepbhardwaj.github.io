/**
 * Cursor Spotlight Module
 * Radial glow that follows the cursor across the page
 */

export const initCursorSpotlight = () => {
    if (!matchMedia('(pointer: fine)').matches) return;

    const spotlight = document.getElementById('cursorSpotlight');
    if (!spotlight) return;

    let rafId = null;
    let mouseX = 0;
    let mouseY = 0;

    const updatePosition = () => {
        spotlight.style.left = mouseX + 'px';
        spotlight.style.top = mouseY + 'px';
        rafId = null;
    };

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!spotlight.classList.contains('active')) {
            spotlight.classList.add('active');
        }

        if (!rafId) {
            rafId = requestAnimationFrame(updatePosition);
        }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        spotlight.classList.remove('active');
    });
};
