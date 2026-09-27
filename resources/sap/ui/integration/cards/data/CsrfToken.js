/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],()=>{"use strict";const e=new Map;class t{#e;#t;#i;#s;#n=-1;value;constructor(e,t,i){this.#e=e;this.#t=t;this.#i=i;this.#s=t.data.request.url}load(){return this.#r()}markExpired(){if(this.#n===e.get(this.#s)?.version){e.get(this.#s).expired=true}}async#r(){const t=await this.#i.fetchValueByHost(this.#t);if(t){this.#i.onTokenFetched(this.#e,t);this.value=t;return}let i=e.get(this.#s);if(!i||i?.expired){i={fetchPromise:this.#i.fetchValue(this.#t),version:(i?.version??0)+1,expired:false};e.set(this.#s,i)}const s=await i.fetchPromise;this.#n=e.get(this.#s).version;this.#i.onTokenFetched(this.#e,s);this.value=s}}return t});
//# sourceMappingURL=CsrfToken.js.map