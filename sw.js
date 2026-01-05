const CACHE_NAME = 'kb-portfolio-v5';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/js/main.js',
    '/js/theme.js',
    '/js/navigation.js',
    '/js/animations.js',
    '/js/command-palette.js',
    '/js/glass-effects.js',
    '/js/tilt-effect.js',
    '/js/magnetic-effect.js',
    '/js/cursor-spotlight.js',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png',
    '/icon-192.svg'
];

// Install service worker and cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

// Activate and clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        }).then(() => self.clients.claim())
    );
});

// Stale-while-revalidate for HTML, cache-first for assets
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip external requests (analytics, formspree)
    if (new URL(request.url).origin !== self.location.origin) return;

    if (request.headers.get('accept')?.includes('text/html')) {
        // Stale-while-revalidate for HTML
        event.respondWith(
            caches.match(request).then((cached) => {
                const fetchPromise = fetch(request).then((response) => {
                    if (response.ok) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                    }
                    return response;
                }).catch(() => cached);

                return cached || fetchPromise;
            })
        );
        return;
    }

    // Cache-first for assets
    event.respondWith(
        caches.match(request).then((cached) => {
            if (cached) return cached;
            return fetch(request).then((response) => {
                if (response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                }
                return response;
            });
        })
    );
});
