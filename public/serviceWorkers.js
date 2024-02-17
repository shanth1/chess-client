const STATIC_CACHE_KEY = 'spa-template-app-v1';
const DYNAMIC_CACHE_NAME = '';

self.addEventListener('install', async () => {
  try {
    const cache = await caches.open(STATIC_CACHE_KEY);
    await cache.addAll(['index.html']);
  } catch (error) {
    console.error('[SW]: INSTALL ERROR', error);
  }
});

self.addEventListener('activate', async () => {
  const cacheKeys = await caches.keys();
  (
    await Promise.all(cacheKeys.filter((name) => name !== STATIC_CACHE_KEY))
  ).map((name) => caches.delete(name));
});

self.addEventListener('fetch', async (event) => {
  event.respondWith(networkFirst(event.request));
});

const networkFirst = async (request) => {
  try {
    const response = await fetch(request);
    const cached = await caches.open(STATIC_CACHE_KEY);
    cached.put(request, response.clone());
    return response;
  } catch (error) {
    console.log('network is off, work with cache');
    const cache = await caches.open(STATIC_CACHE_KEY);
    const cached = await cache.match(request);
    return cached || Promise.reject('no-cache');
  }
};
