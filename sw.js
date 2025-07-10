// sw.js - Service Worker para AffiliatePro
const CACHE_NAME = 'affiliatepro-v1';
const ASSETS = [
  './',
  './index.html',
  './auth.html',
  './dashboard.html',
  './admin.html',
  './css/main.css',
  './css/auth.css',
  './css/dashboard.css',
  './css/admin.css',
  './js/app.js',
  './js/auth.js',
  './js/config.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request)
          .then((resp) => {
            const respClone = resp.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, respClone));
            return resp;
          })
          .catch(() => caches.match('./index.html'))
      );
    })
  );
});