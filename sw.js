const CACHE_NAME = 'PWASkeletonPWA-1';
const expectedCaches = [CACHE_NAME];

// the list of files that need to be cached
const staticFiles = [
  './',
  './index.html',
  './config.js',
  './browserconfig.xml',
  './favicon.ico',
  './dist/main.css',
  './dist/main.js',
  './manifest.json',
  './images/icons/android-icon-144x144.png',
  './images/icons/android-icon-192x192.png',
  './images/icons/android-icon-36x36.png',
  './images/icons/android-icon-48x48.png',
  './images/icons/android-icon-72x72.png',
  './images/icons/android-icon-96x96.png',
  './images/icons/apple-icon-114x114.png',
  './images/icons/apple-icon-120x120.png',
  './images/icons/apple-icon-144x144.png',
  './images/icons/apple-icon-152x152.png',
  './images/icons/apple-icon-180x180.png',
  './images/icons/apple-icon-57x57.png',
  './images/icons/apple-icon-60x60.png',
  './images/icons/apple-icon-72x72.png',
  './images/icons/apple-icon-76x76.png',
  './images/icons/apple-icon.png',
  './images/icons/apple-icon-precomposed.png',
  './images/icons/favicon-16x16.png',
  './images/icons/favicon-32x32.png',
  './images/icons/favicon-96x96.png',
  './images/icons/ms-icon-144x144.png',
  './images/icons/ms-icon-150x150.png',
  './images/icons/ms-icon-310x310.png',
  './images/icons/ms-icon-70x70.png',
  './dist/material-icons.css',
  './dist/MaterialIcons-Regular.eot',
  './dist/MaterialIcons-Regular.ijmap',
  './dist/MaterialIcons-Regular.svg',
  './dist/MaterialIcons-Regular.ttf',
  './dist/MaterialIcons-Regular.woff',
  './dist/MaterialIcons-Regular.woff2',
];

/**
 * Adds a way to communicate with window
 */
const channel = new BroadcastChannel('sw-messages');
/**
 * Performs install steps.
 */
addEventListener('install', (event) => {
  // install this service worker as soon as a new one is available
  skipWaiting();
  // event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(staticFiles)));
  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    return Promise.all(
      staticFiles.map(function (url) {
          return cache.add(url).catch(function (reason) {
            // return logInTheUIWhenActivated([url + "failed: " + String(reason)]);
            console.log(`Caching: ${url} -> Error: ${String(reason)}`);
          });
      })
    );
  }));
});

/**
 * Handles requests: responds with cache or else network.
 */
addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});

/**
 * Cleans up static cache and activates the Service Worker.
 */
addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map((key) => {
    if (!expectedCaches.includes(key)) {
      return caches.delete(key);
    }
  }))).then(() => {
    channel.postMessage({ action: "setVersion", version: CACHE_NAME});
    console.log(`${CACHE_NAME} now ready to handle fetches!`);
    return clients.claim();
  }));
});
