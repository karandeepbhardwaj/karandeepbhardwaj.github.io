/**
 * Main Entry Point
 * Imports and initializes all modules
 */

import { initTheme } from './theme.js';
import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initCommandPalette } from './command-palette.js';

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
    initTheme();
    initNavigation();
    initAnimations();
    initCommandPalette();
    initServiceWorker();
};

// Start the application
init();
