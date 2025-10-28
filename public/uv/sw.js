/*global UVServiceWorker,__uv$config*/
// importent: dont move these scripts or things will break
importScripts('uv.bundle.js');
importScripts('uv.config.js');
importScripts(__uv$config.sw || 'uv.sw.js');

const uv = new UVServiceWorker();

async function handleRequest(event) {
    if (uv.route(event)) {
        return await uv.fetch(event);
    }
    
    return await fetch(event.request)
}

// this handles all the fetches for the serviec worker
self.addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event));
});
