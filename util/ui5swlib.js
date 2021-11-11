self.worker=(()=>{"use strict";var e={190:(e,t,i)=>{i.r(t),i.d(t,{CacheStrategyBase:()=>I,addStrategy:()=>C,enableLogging:()=>V,init:()=>O,initFromManifest:()=>j,onClientMessage:()=>x,sendToClient:()=>b,status:()=>_,strategies:()=>E,version:()=>M});class r{constructor(e,t,i){this.major=e,this.minor=t,this.fix=i,this._major,this._minor,this._fix}static validate(e){if("number"!=typeof e)throw Error("Not a valid number given")}asString(){return`${this.major}.${this.minor}.${this.fix}`}get major(){return this._major}get minor(){return this._minor}get fix(){return this._fix}set major(e){r.validate(e),this._major=e}set minor(e){r.validate(e),this._minor=e}set fix(e){r.validate(e),this._fix=e}compare(e){return this.major>e.major?1:this.major<e.major?-1:this.minor>e.minor?1:this.minor<e.minor?-1:this.fix>e.fix?1:this.fix<e.fix?-1:0}static extractGroups(e){const t=e.match(/(\d+)\.(\d+)\.(\d+)/),i=t[1],r=t[2],s=t[3];return{major:Number(i),minor:Number(r),fix:Number(s)}}}class s extends r{constructor(e,t,i,r,s){super(e,t,i),this.prefix=r,this.delimiter=s||"-",this._prefix,this._delimiter}static fromStringWithDelimiter(e,t="-"){const i=e.split(t);if(i.length<2)throw Error("string does not include a delimiter");const r=i[1],n=i[0];return s.fromString(r,n,t)}static fromString(e,t,i){var{major:r,minor:n,fix:a}=super.extractGroups(e);return new s(r,n,a,t,i)}set delimiter(e){if("string"!=typeof e)throw Error("Delimiter must be of type string");this._delimiter=e}get delimiter(){return this._delimiter}set prefix(e){if("string"!=typeof e)throw Error("Prefix must be of type string");this._prefix=e}get prefix(){return this._prefix}compare(e){if(this.prefix!==e.prefix)throw new Error("Comparing different types of prefixes");if(this.delimiter!==e.delimiter)throw new Error("Comparing different types of delimiters");return super.compare(e)}asString(){return`${this.prefix}${this.delimiter}${super.asString()}`}}const n=new Map;let a=!1;class o{log(e){a&&console.log(e)}error(e){a&&console.error(e)}static enable(){a=!0}static setlogger(e,t){n.set(e,t)}static getLogger(e="default"){const t=n.get(e);if(t)return t;const i=new o;return o.setlogger(e,i),i}}class c{static async create({version:e}){return await(new c).open({version:e})}static async cleanup(e){o.getLogger().log("Clear outdated for current version: "+e.asString());const t=(await self.caches.keys()).filter(function(t){o.getLogger().log("Cache: "+t);try{return 0!==s.fromStringWithDelimiter(t,e.delimiter).compare(e)}catch(e){return!1}}).map(function(e){return o.getLogger().log("Delete: "+e),self.caches.delete(e)});return await Promise.all(t)}async open({version:e}){return this.cache=await self.caches.open(e),this}async get(e){return await this.cache.match(e)}async truncate(e){const t=e||await self.caches.keys();return await Promise.all(t.map(self.caches.delete.bind(self.caches))),this}async put(e,t){return"HEAD"===e.method||"POST"===e.method||await this.cache.put(e,t.clone()),this}async delete(e){return await this.cache.delete(e),this}}class l{constructor(e){this._version=void 0,this._matcher=e}get version(){return this._version}static isOffline(){return!navigator.onLine}matches(e){return Array.isArray(this._matcher)?this._matcher.includes(e):this._matcher instanceof RegExp?this._matcher.test(e):"function"==typeof this._matcher?this._matcher(e):"string"==typeof this._matcher&&e.startsWith(this._matcher)}async fetchVersion(){throw new Error("must be implemented by strategy")}isInitialRequest(e){throw new Error("must be implemented by strategy")}async init(){this.cache?l.isOffline()||await this.reinitialize():(this._version=await this.fetchVersion(),this.cache=await c.create({version:this.version.asString()}))}async reinitialize(){const e=this.version&&this.version.asString();this._version=await this.fetchVersion(),e!==this.version.asString()&&(this.cache=await c.create({version:this.version.asString()})),await c.cleanup(this.version)}async applyStrategy(e){if(!(e&&e instanceof self.Request))throw new Error("request is required");const t=this.getCache();return l.isOffline()?await this.handleOffline(t,e):await this.handleOnline(t,e)}async handleOnline(e,t){if("only-if-cached"===t.cache&&"same-origin"!==t.mode)return;let i=await e.get(t);return i||(i=await self.fetch(t),e.put(t,i)),i}async handleOffline(e,t){return e?await e.get(t):new self.Response("<h1>Please ensure that you're online</h1>")}getCache(){return this.cache}}class h{static async fetchManifest(e="manifest.json"){const t=await self.fetch(e);return await t.json()}static async loadFromManifest(e="manifest.json"){const t=await h.fetchManifest(e);return t["sap.app"]&&t["sap.app"].serviceWorker?t["sap.app"].serviceWorker.config:[]}}class u extends l{constructor(e){super(e.url),this.rootUrl=e.manifestRootUrl||e.url,this.initialRequestEndings=e.initialRequestEndings||["/index.html"]}isInitialRequest(e){return this.initialRequestEndings.some(t=>e.endsWith(t))}getVersionFromJson(e={}){const t=e["sap.app"];if(t&&t.applicationVersion&&t.applicationVersion.version)return s.fromString(t.applicationVersion.version,"app");throw Error("Cannot get version from manifest")}async fetchVersion(){const e=await h.fetchManifest(`${this.rootUrl}/manifest.json`);return this.getVersionFromJson(e)}}class f extends l{constructor(e){super(e.url),this.rootUrl=e.url}isInitialRequest(e){return e.endsWith("/sap-ui-core.js")}async waitForVersionJSON(e){const t=await self.fetch(`${e}/sap-ui-version.json`);return await t.json()}getVersionFromJson(e={}){return s.fromString(e.version,"resources")}async fetchVersion(){const e=await this.waitForVersionJSON(this.rootUrl);return this.getVersionFromJson(e)}}class g extends l{constructor(e){super(e.url),this._isInitial=!0,this.name=e.name||"STATIC"}async fetchVersion(){return s.fromString("0.0.0",this.name)}isInitialRequest(e){return this._isInitial&&(this._isInitial=!1),this._isInitial}}class p extends l{constructor(e){super(e.url),this._isInitial=!0,this._timeInMs=e.timeInMs}async fetchVersion(){return s.fromString("0.0.0","TIMED")}isExpired(){return(new Date).getTime()-this.lastAccessTime<this._timeInMs}async handleOnline(e,t){let i=await e.get(t);return i&&!this.isExpired()||(i=await self.fetch(t),e.put(t,i)),this.lastAccessTime=(new Date).getTime(),i}isInitialRequest(e){return this._isInitial&&(this._isInitial=!1),this._isInitial}}class m extends l{constructor(e){super(e.url),this._isInitial=!0}async fetchVersion(){return s.fromString("0.0.0","NETWORKUPDATE")}async handleOnline(e,t){let i=await e.get(t);return i?self.fetch(t).then(i=>{e.put(t,i)}):(i=await self.fetch(t),e.put(t,i)),i}isInitialRequest(e){return this._isInitial&&(this._isInitial=!1),this._isInitial}}class d extends l{constructor(e){super(e.urls),this.aUrls=e.urls,this.sVersion=e.version,this._isInitial=!0}isInitialRequest(e){return this._isInitial&&(this._isInitial=!1),this._isInitial}async fetchVersion(){return s.fromString(this.sVersion,"PRE")}async init(){await super.init();const e=this.aUrls.map(e=>this.handleOnline(this.getCache(),e));await Promise.all(e)}}class y{constructor(){this.strategies=[]}addStrategy(e){e.priority=e.priority||0,this.strategies.push(e),e.priority&&this.strategies.sort((e,t)=>e.priority===t.priority?0:t.priority>e.priority?1:-1)}static async ensureStrategyIsInitialized(e){e._version||(o.getLogger().log("Strategy init called"),await e.init())}getStrategy(e){return this.strategies.find(t=>{if(t.matches(e))return t})}async applyStrategy(e){const t=this.getStrategy(e.url);return t?(t.isInitialRequest(e.url)&&await t.init(),await y.ensureStrategyIsInitialized(t),t.applyStrategy(e)):self.fetch(e)}static create(){return new y}}class w{constructor(){this.clientMessageHandler=void 0}setClientMessageHandler(e){o.getLogger().log("client message handler set"),this.clientMessageHandler=e}async sentMessageToClient2(e,t){return new Promise(function(i,r){var s=new MessageChannel;s.port1.onmessage=function(e){e.data.error?r(e.data.error):i(e.data)},e.postMessage("SW Says: '"+t+"'",[s.port2])})}async sendMessageToClient(e,t){return e.postMessage({msg:t})}async sendMessageToAllClients(e){const t=(await clients.matchAll()).map(t=>this.sendMessageToClient(t,e));return await Promise.all(t)}handleClientMessage(e,t){this.clientMessageHandler?this.clientMessageHandler(e,t):o.getLogger().log("Unhandled Client message received: "+e.data)}static create(){return new w}}const S=y.create(),v=w.create(),_={};self.addEventListener("install",e=>{self.skipWaiting()}),self.addEventListener("activate",e=>{self.clients.claim()}),self.addEventListener("fetch",e=>{o.getLogger().log("FETCH "+e.request.url),e.respondWith(async function(){try{const t=e.request;return await S.applyStrategy(t)}catch(e){throw o.getLogger().error("Error in fetch: ",e),e}}())}),self.addEventListener("message",e=>{v.handleClientMessage(e,_)});const x=v.setClientMessageHandler.bind(v),b=v.sendMessageToAllClients.bind(v),C=S.addStrategy.bind(S),I=l,E={CacheAllStrategy:g,UI5ResourceCacheStrategy:f,ApplicationCacheStrategy:u,PreCacheStrategy:d,CacheWithExpirationStrategy:p,CacheNetworkUpdateStrategy:m},M="0.0.1",j=async(e={})=>{const t=await h.loadFromManifest(e.manifestUrl);await O(t)},O=async e=>{const t=e.map(e=>{const t=Object.assign({},e),i=t.type;if(!i)throw new Error('type not specified. Must be a function, an instance of CacheStrategyBase or one of ["application", "ui5resource", "static", "precache", "networkupdate"]');let r;if(delete t.type,"object"==typeof i)r=i;else if("function"==typeof i&&i.constructor)r=new i(t);else if("string"==typeof i)switch(i.toLowerCase()){case"application":r=new u(t);break;case"ui5resource":r=new f(t);break;case"static":r=new g(t);break;case"precache":r=new d(t);break;case"networkupdate":r=new m(t);break;case"expiration":r=new p(t);break;default:throw new Error(`Cannot find strategy: ${i}. Allowed values are: ["application", "ui5resource", "static", "precache", "networkupdate"]`)}if(r instanceof I)return t.priority&&(r.priority=t.priority),S.addStrategy(r),r.init();throw new Error("Strategy must be of type CacheStrategyBase")});await Promise.all(t);const i=e.map(e=>{if("string"==typeof e.type)return e.type});_.init=i},V=()=>{o.enable()}}},t={};function i(r){if(t[r])return t[r].exports;var s=t[r]={exports:{}};return e[r](s,s.exports,i),s.exports}return i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i(190)})();