const CACHE_NAME = 'jokes-cache-v5';  // ← Bump version so old cache is cleaned

const filesToCache = [
  '/',                    // Important: root navigation
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/offline.html',
  // Add your current icons here (adjust names if different)
  '/1024.png',
  '/144.png',
  '/120.png',
  '/100.png'
  // Add any other static files if you have them
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching app shell + offline page');
      return cache.addAll(filesToCache);
    })
  );
  // Skip waiting → new SW activates immediately
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
  // Take control of all open pages right away
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Strategy: For page loads (navigation) → cache-first, fallback to offline.html if shell missing
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;  // Serve cached index.html if available
        }
        // If no cache (very first offline attempt) → try network, fallback to offline page
        return fetch(event.request).catch(() => {
          return caches.match('/offline.html');
        });
      })
    );
    return;
  }

  // For all other requests (css, js, images, etc.) → cache-first, fallback to network
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        // Optional: could return a fallback image or JSON here, but usually not needed
        return new Response('Offline resource not available', { status: 503 });
      });
    })
  );
});
