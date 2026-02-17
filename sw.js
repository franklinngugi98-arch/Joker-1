const CACHE_NAME = 'jokes-cache-v6';  // Bump version to force update and clean old caches

const filesToCache = [
  '/',                     // Root navigation → serves index.html
  '/index.html',           // Explicit app shell
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/offline.html',         // Custom offline fallback page
  // Your current icons (adjust if you renamed/deleted some)
  '/1024.png',
  '/144.png',
  '/120.png',
  '/100.png'
  // Add any other static files here if you add more later
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching app shell and offline fallback');
      return cache.addAll(filesToCache);
    })
  );
  // Activate new SW immediately (aggressive update)
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  // Immediately control all open clients/pages
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Aggressive offline: For navigation (page loads, reloads, home screen opens)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      // 1. Try cache first (fast & offline-proof) → most aggressive path
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;  // Serve cached index.html instantly
        }

        // 2. Cache miss (rare after first install) → try network
        return fetch(event.request).catch(() => {
          // Network failed → serve your nice offline.html as ultimate fallback
          return caches.match('/offline.html');
        });
      })
    );
    return;
  }

  // For all other requests (CSS, JS, images, API calls, etc.) → cache-first
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        // Optional: could return a placeholder, but usually browser handles
        return new Response('Resource unavailable offline', { status: 503 });
      });
    })
  );
});
