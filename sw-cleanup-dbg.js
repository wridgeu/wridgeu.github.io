// Deletes the caches of the pre-Workbox worker, named "<app|STRATEGY>-<semver>" (app-1.25.1,
// STATIC-0.0.0). Matched exactly: project pages under wridgeu.github.io/* share this origin's caches.
const legacyCache = /^(app|[A-Z]+)-\d+\.\d+\.\d+$/;

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) => Promise.all(keys.filter((key) => legacyCache.test(key)).map((key) => caches.delete(key)))),
	);
});
