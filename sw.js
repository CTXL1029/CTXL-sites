const CACHE_NAME = 'ctxl-tools-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Điều kiện tối thiểu để Chromium nhận diện PWA
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
