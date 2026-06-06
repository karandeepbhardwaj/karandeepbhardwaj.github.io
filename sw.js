// Minimal service worker. The document is network-first (always fresh after a
// deploy); static assets are cache-first; everything works offline once cached.
const CACHE_NAME = 'kb-portfolio-v13';
const urlsToCache = [
    '/',
    '/index.html',
    '/js/app.js',
    '/manifest.json',
    '/fonts/hanken-grotesk-latin.woff2',
    '/Karandeep_Resume_2026.pdf',
    '/karandeep-bhardwaj.vcf',
    '/og-cover.png',
    '/icon-192.svg',
    '/icon-192.png',
    '/icon-512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((names) =>
            Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;
    if (new URL(request.url).origin !== self.location.origin) return;

    const isDoc = request.mode === 'navigate' ||
        (request.headers.get('accept') || '').includes('text/html');

    if (isDoc) {
        // Network-first: always serve fresh HTML, fall back to cache offline.
        event.respondWith(
            fetch(request).then((response) => {
                if (response && response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                }
                return response;
            }).catch(() => caches.match(request).then((c) => c || caches.match('/index.html')))
        );
        return;
    }

    // Cache-first for static assets.
    event.respondWith(
        caches.match(request).then((cached) => cached || fetch(request).then((response) => {
            if (response && response.ok) {
                const clone = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return response;
        }))
    );
});
