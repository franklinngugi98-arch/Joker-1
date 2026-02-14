// Your original simple caching + PWABuilder offline fallback combined

const CACHE_NAME = 'jokes-cache-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  // add icons if you have them: '/icon-192.png', '/icon-512.png'
  '/offline.html'   // ← add your fallback page here too
];

// ────────────────────────────────────────────────
// Install: cache static assets + offline page
// ────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
  // Optional: skip waiting so new SW activates immediately
  self.skipWaiting();
});

// ────────────────────────────────────────────────
// Activate: clean up old caches (optional but good)
// ────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  // Take control of the page immediately
  self.clients.claim();
});

// ────────────────────────────────────────────────
// Fetch: your original cache-first + navigation fallback
// ────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  // Handle navigation requests with offline fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/offline.html');
      })
    );
    return;
  }

  // For all other requests (css, js, api calls, images, etc.): cache-first
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
