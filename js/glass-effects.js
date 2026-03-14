/**
 * Glass Effects Module
 * Mouse-reactive light reflections for liquid glass elements
 * Mimics iOS 26 liquid glass: soft caustic light that drifts across surfaces
 */

const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

/**
 * Create a subtle, natural light overlay for a glass surface
 */
const createLightOverlay = (el, opts = {}) => {
    const {
        size = 500,
        borderGlow = true
    } = opts;

    const computed = getComputedStyle(el);
    if (computed.position === 'static') {
        el.style.position = 'relative';
    }

    // Light container
    const light = document.createElement('div');
    light.style.cssText = `
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        z-index: 5;
        opacity: 0;
        transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
    `;
    el.appendChild(light);

    // The glow element — soft caustic
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        will-change: left, top;
        transition: background 0.3s ease;
    `;
    light.appendChild(glow);

    const updateGlow = () => {
        if (isDark()) {
            // Dark mode: very soft, wide, low-opacity — like moonlight on glass
            glow.style.background = `radial-gradient(
                circle,
                rgba(200, 210, 230, 0.07) 0%,
                rgba(200, 210, 230, 0.04) 20%,
                rgba(200, 210, 230, 0.015) 40%,
                transparent 65%
            )`;
        } else {
            // Light mode: warm specular highlight, nearly invisible
            glow.style.background = `radial-gradient(
                circle,
                rgba(255, 255, 255, 0.55) 0%,
                rgba(255, 255, 255, 0.2) 15%,
                rgba(255, 255, 255, 0.05) 35%,
                transparent 60%
            )`;
        }
    };
    updateGlow();

    // Edge border glow — bright specular on the border only
    let edgeGlow = null;
    if (borderGlow) {
        edgeGlow = document.createElement('div');
        edgeGlow.style.cssText = `
            position: absolute;
            inset: 0;
            border-radius: inherit;
            pointer-events: none;
            z-index: 6;
            opacity: 0;
            transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
        `;

        const edgeInner = document.createElement('div');
        edgeInner.style.cssText = `
            position: absolute;
            width: ${size * 0.7}px;
            height: ${size * 0.7}px;
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            will-change: left, top;
        `;

        const updateEdge = () => {
            if (isDark()) {
                edgeInner.style.background = `radial-gradient(
                    circle,
                    rgba(180, 200, 230, 0.2) 0%,
                    rgba(180, 200, 230, 0.06) 35%,
                    transparent 60%
                )`;
            } else {
                edgeInner.style.background = `radial-gradient(
                    circle,
                    rgba(255, 255, 255, 0.7) 0%,
                    rgba(255, 255, 255, 0.15) 35%,
                    transparent 60%
                )`;
            }
        };
        updateEdge();

        edgeGlow.appendChild(edgeInner);

        // CSS mask: only show border ring, exclude interior
        edgeGlow.style.maskImage = `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`;
        edgeGlow.style.maskComposite = 'exclude';
        edgeGlow.style.webkitMaskImage = `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`;
        edgeGlow.style.webkitMaskComposite = 'xor';
        edgeGlow.style.padding = '1px';

        el.appendChild(edgeGlow);
        edgeGlow._inner = edgeInner;
        edgeGlow._update = updateEdge;
    }

    // React to theme changes
    const observer = new MutationObserver(() => {
        updateGlow();
        if (edgeGlow?._update) edgeGlow._update();
    });
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });

    let rafId = null;

    el.addEventListener('mouseenter', () => {
        updateGlow();
        if (edgeGlow?._update) edgeGlow._update();
        light.style.opacity = '1';
        if (edgeGlow) edgeGlow.style.opacity = '1';
    });

    el.addEventListener('mousemove', (e) => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            glow.style.left = `${x}px`;
            glow.style.top = `${y}px`;
            if (edgeGlow?._inner) {
                edgeGlow._inner.style.left = `${x}px`;
                edgeGlow._inner.style.top = `${y}px`;
            }
            rafId = null;
        });
    });

    el.addEventListener('mouseleave', () => {
        light.style.opacity = '0';
        if (edgeGlow) edgeGlow.style.opacity = '0';
    });
};

/**
 * Initialize all glass effects
 */
export const initGlassEffects = () => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    // Panels — large, soft caustic
    document.querySelectorAll('.glass-panel').forEach(el => {
        createLightOverlay(el, { size: 650, borderGlow: true });
    });

    // Buttons — smaller specular
    document.querySelectorAll('.glass-button').forEach(el => {
        createLightOverlay(el, { size: 280, borderGlow: false });
    });

    // Nav bar
    const nav = document.querySelector('.floating-nav.glass-pill');
    if (nav) {
        createLightOverlay(nav, { size: 180, borderGlow: false });
    }
};
