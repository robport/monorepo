const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened Cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(() => {
        return fetch(event.request)
          .catch(() => {
            console.log('failed to fetch');
            return caches.match('offline.html')
          })
      })
  )
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  console.log('activate');
  cacheWhitelist.push(CACHE_NAME);
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        console.log(cacheNames)
        return Promise.all(
          cacheNames.map(cacheName => {
            if ( !cacheWhitelist.includes((cacheName))) {
              console.log('delete ', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
  )
});



