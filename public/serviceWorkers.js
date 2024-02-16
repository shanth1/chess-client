const cacheKey = 'chess-app-v1';
const dynamicCacheName = 'dynamic-data';

self.addEventListener('install', async (event) => {
  try {
    const cache = await caches.open(cacheKey);
    await cache.addAll(['index.html']);
  } catch (error) {
    console.error('[SW]: INSTALL ERROR', error);
  }
});

self.addEventListener('activate', () => {});

self.addEventListener('fetch', async (event) => {
  event.respondWith(networkFirst(event.request));
});

const networkFirst = async (request) => {
  try {
    const response = await fetch(request);
    const cached = await caches.open(cacheKey);
    cached.put(request, response.clone());
    return response;
  } catch (error) {
    console.log('network is off, work with cache');
    const cache = await caches.open(cacheKey);
    const cached = await cache.match(request);
    return cached || Promise.reject('no-cache');
  }
};
