self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('todo-cache-v1').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './icons/icon-192.png'
        // Removed './style.css' since your CSS is in index.html
      ]);
    })
  );
  console.log('Service Worker installed.');
});

self.addEventListener('activate', (event) => {
  // Clean up old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== 'todo-cache-v1') {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  console.log('Service Worker activated.');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
