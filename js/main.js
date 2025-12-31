/**
 * Main Entry Point
 * Imports and initializes all modules
 */

import { initTheme } from './theme.js';
import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initCommandPalette } from './command-palette.js';
import { initGlassEffects } from './glass-effects.js';

/**
 * Initialize Service Worker for PWA
 */
const initServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').catch(() => {
                // Service worker registration failed silently
            });
        });
    }
};

/**
 * Initialize all modules
 */
const init = () => {
    // Critical path — runs immediately
    initTheme();
    initNavigation();
    initAnimations();
    initCommandPalette();
    initServiceWorker();

    // Non-critical — defer to idle time
    const deferGlass = () => initGlassEffects();
    if ('requestIdleCallback' in window) {
        requestIdleCallback(deferGlass, { timeout: 2000 });
    } else {
        setTimeout(deferGlass, 200);
    }
};

// Start the application
init();
