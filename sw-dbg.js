// Development worker: caches nothing, only removes the legacy caches.
// `npm run build:deploy` replaces it with the generated Workbox worker (see build-sw.mjs).
importScripts("sw-cleanup.js");
