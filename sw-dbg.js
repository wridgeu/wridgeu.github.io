importScripts("util/serviceworker/ui5swlib.js");

self.worker.initFromManifest({
	manifestUrl: "https://wridgeu.github.io/manifest.json"
});