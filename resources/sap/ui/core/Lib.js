/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/assert","sap/base/config","sap/base/i18n/ResourceBundle","sap/base/Log","sap/base/util/deepExtend","sap/base/util/LoaderExtensions","sap/base/util/mixedFetch","sap/base/util/ObjectPath","sap/base/util/Version","sap/base/util/array/uniqueSort","sap/ui/Global","sap/ui/VersionInfo","sap/ui/base/DataType","sap/ui/base/EventProvider","sap/ui/base/Object","sap/ui/base/SyncPromise","sap/ui/core/Configuration","sap/ui/core/_UrlResolver"],function(e,n,t,r,i,a,s,o,u,l,c,f,d,p,h,g,y,m){"use strict";var b={};var v={};var _=new Set(["sap.suite.ui.generic.template","sap.ui.comp","sap.ui.layout","sap.ui.unified"]);function S(e,n){return sap.ui.require.toUrl(e.replace(/\./g,"/")+n)}function j(e,n){a.registerResourcePath(e.replace(/\./g,"/"),n)}function L(e,n){var t=e.modules,r=function(e){return/^jquery\.sap\./.test(e)?e:e.replace(/\./g,"/")};if(u(e.version||"1.0").compareTo("2.0")<0){t={};for(var i in e.modules){t[r(i)+".js"]=e.modules[i]}}sap.ui.require.preload(t,e.name,n)}var O={};y.getValue("xx-libraryPreloadFiles").forEach(function(e){var n=String(e).trim().split(/\s*:\s*/),t=n[0],r=n[1];if(n.length===1){r=t;t=""}if(/^(?:none|js|json|both)$/.test(r)){O[t]=r}});var P=[];var w;function T(e){var n=sap.ui.require("sap/ui/core/theming/ThemeManager");if(!w){if(!n){w=new Promise(function(e,n){sap.ui.require(["sap/ui/core/theming/ThemeManager"],function(n){e(n)},n)})}else{w=Promise.resolve(n)}}if(n&&e){n.reset()}return w}var E=Symbol("sap.ui.core.Lib");var C={configurable:true,enumerable:true,writable:false};function R(e){C.value=e;return C}function z(e){if(e&&typeof e==="object"&&!Object.isFrozen(e)){Object.freeze(e);for(var n in e){if(e.hasOwnProperty(n)){z(e[n])}}}}function B(){var e=n.get({name:"sapUiPreloadLibCss",type:n.Type.StringArray,external:true});if(e.length>0){if(e[0].startsWith("!")){e[0]=e[0].slice(1)}if(e[0]==="*"){e.shift();Object.keys(b).forEach(function(n){if(!e.includes(n)){e.unshift(n)}})}}return e}var F=h.extend("sap.ui.core.Lib",{constructor:function(n){h.call(this);e(typeof n==="object","A settings object must be given to the constructor of sap/ui/base/Library");e(typeof n.name==="string"&&n.name,"The settings object that is given to the constructor of sap/ui/base/Library must contain a 'name' property which is a non-empty string");if(n._key!==E){throw new Error("The constructor of sap/ui/core/Lib is restricted to the internal usage. To get an instance of Library with name '"+n.name+"', use the static method 'get' from sap/ui/core/Lib instead.")}this.name=n.name;var t=["dependencies","types","interfaces","controls","elements"];t.forEach(function(e){Object.defineProperty(this,e,R([]))}.bind(this));Object.defineProperty(this,"_resourceBundles",{value:{},writable:true});Object.defineProperty(this,"_loadingStatus",{value:null,writable:true});Object.defineProperty(this,"_settingsEnhanced",{value:false,writable:true});Object.defineProperty(this,"_manifestFailed",{value:false,writable:true})},getInterface:function(){return this},isSettingsEnhanced:function(){return this._settingsEnhanced},enhanceSettings:function(e){if(this._settingsEnhanced){return this}this._settingsEnhanced=true;var n,t,i;for(n in e){t=e[n];i=undefined;if(t!==undefined){if(Array.isArray(this[n])){if(this[n].length===0){i=t}else{i=l(this[n].concat(t))}}else if(this[n]===undefined){i=t}else if(n!="name"){r.warning("library info setting ignored: "+n+"="+t)}if(i!==undefined){Object.defineProperty(this,n,R(i))}}}return this},_getFileType:function(e){var n;var t=O[this.name]||O[""]||"both";if(e===true){n="json"}else if(e===false){n="js"}else{n=t}if(t!=="both"&&n!=="both"&&t!==n){n="none"}return n},preload:function(e){if(e&&(e.hasOwnProperty("async")||e.hasOwnProperty("sync"))){r.error("The 'preload' function of class sap/ui/core/Lib only support preloading a library asynchronously. The given 'async' or 'sync' setting is ignored.")}if(e&&e.hasOwnProperty("json")){r.error("The 'preload' function of class sap/ui/core/Lib only support preloading in JS Format. The given 'json' setting is ignored.")}return this._preload(["url","lazy"].reduce(function(n,t){if(e&&e.hasOwnProperty(t)){n[t]=e[t]}return n},{}))},_preload:function(e){e=e||{};var n=this._getFileType(e.json),t=this.name.replace(/\./g,"/"),i=!!sap.ui.loader._.getModuleState(t+"/library.js"),a=y.getDepCache();if(n==="none"){return e.sync?this:Promise.resolve(this)}if(this._loadingStatus==null&&e.url){j(this.name,e.url)}this._loadingStatus=this._loadingStatus||{};if(this._loadingStatus.pending){if(e.sync){if(e.lazy){return this}else if(this._loadingStatus.async){r.warning("request to load "+this.name+" synchronously while async loading is pending; this causes a duplicate request and should be avoided by caller")}else{r.warning("request to load "+this.name+" synchronously while sync loading is pending (cycle, ignored)");return this}}else if(this._loadingStatus.preloadFinished){return Promise.resolve(this)}}if(e.sync&&this._loadingStatus.pending===false||!e.sync&&this._loadingStatus.promise){return e.sync?this:this._loadingStatus.promise}if(e.lazy){r.debug("Lazy dependency to '"+this.name+"' encountered, loading library-preload-lazy.js");if(e.sync){try{sap.ui.requireSync(t+"/library-preload-lazy")}catch(e){r.error("failed to load '"+t+"/library-preload-lazy.js"+"' synchronously ("+(e&&e.message||e)+")")}return this}else{return sap.ui.loader._.loadJSResourceAsync(t+"/library-preload-lazy.js",true)}}this._loadingStatus.pending=true;this._loadingStatus.async=!e.sync;var s;if(i){s=(e.sync?g:Promise).resolve()}else{s=n!=="json"?this._preloadJSFormat({fallbackToJSON:n!=="js",http2:a,sync:e.sync}):this._preloadJSONFormat({sync:e.sync})}this._loadingStatus.promise=s.then(function(n){n=n||this._getDependencies();this._loadingStatus.preloadFinished=true;var t=this.getManifest(),r;if(n&&n.length){if(!e.sync){var i=[],a=[];n.forEach(function(e){if(e.lazy){a.push(e)}else{i.push(e.name)}});i=f._getTransitiveDependencyForLibraries(i).map(function(e){return{name:e}});n=i.concat(a)}r=n.map(function(n){var t=F._get(n.name,true);return t._preload({sync:e.sync,lazy:n.lazy})})}else{r=[]}if(!e.sync&&t&&u(t._version).compareTo("1.9.0")>=0){r.push(this.loadResourceBundle())}var s=e.sync?g.all(r):Promise.all(r);return s.then(function(){this._loadingStatus.pending=false;return this}.bind(this))}.bind(this));return e.sync?this._loadingStatus.promise.unwrap():this._loadingStatus.promise},_preloadJSFormat:function(e){e=e||{};var n=this;var t=this.name.replace(/\./g,"/")+(e.http2?"/library-h2-preload":"/library-preload")+(e.sync?"":".js");var i;if(e.sync){i=g.resolve().then(function(){sap.ui.requireSync(t)})}else{i=sap.ui.loader._.loadJSResourceAsync(t)}return i.catch(function(i){if(e.fallbackToJSON){var a;if(e.sync){var s=i;while(s&&s.cause){s=s.cause}a=s&&s.name==="XHRLoadError"}else{a=true}if(a){r.error("failed to load '"+t+"' ("+(i&&i.message||i)+"), falling back to library-preload.json");return n._preloadJSONFormat({sync:e.sync})}}})},_preloadJSONFormat:function(e){e=e||{};var n=S(this.name,"/library-preload.json");return s(n,{headers:{Accept:s.ContentTypes.JSON}},e.sync).then(function(e){if(e.ok){return e.json().then(function(e){if(e){L(e,n);if(Array.isArray(e.dependencies)){return e.dependencies.map(function(e){return{name:e.replace(/\.library-preload$/,"")}})}else{return e.dependencies}}})}else{throw Error(e.statusText||e.status)}}).catch(function(e){r.error("failed to load '"+n+"': "+e.message)})},getManifest:function(e){if(!this.oManifest){var n=this.name.replace(/\./g,"/")+"/manifest.json";if(sap.ui.loader._.getModuleState(n)||e&&!this._manifestFailed){try{this.oManifest=a.loadResource(n,{dataType:"json",async:false,failOnError:!this.isSettingsEnhanced()});if(this._oManifest){z(this.oManifest)}else{this._manifestFailed=true}}catch(e){this._manifestFailed=true}}}return this.oManifest},_getDependencies:function(){var e=this.getManifest();var n=[];var t=e&&e["sap.ui5"]&&e["sap.ui5"].dependencies&&e["sap.ui5"].dependencies.libs;if(t){return Object.keys(t).reduce(function(e,n){if(!t[n].lazy){e.push({name:n})}else if(_.has(n)){e.push({name:n,lazy:true})}return e},n)}else{return n}},_getI18nSettings:function(){var e=this.getManifest(),n;if(e&&u(e._version).compareTo("1.9.0")>=0){n=e["sap.ui5"]&&e["sap.ui5"].library&&e["sap.ui5"].library.i18n}n=this._normalizeI18nSettings(n);return n},_normalizeI18nSettings:function(e){if(e==null||e===true){e={bundleUrl:"messagebundle.properties"}}else if(typeof e==="string"){e={bundleUrl:e}}else if(typeof e==="object"){e=i({},e)}return e},_includeTheme:function(e,n){var t=this.name,r=B().indexOf(t)!==-1;P.push({name:t,version:this.version,variant:e,preloadedCss:r});T().then(function(r){r.includeLibraryTheme(t,e,n)})},getResourceBundle:function(e){return this._loadResourceBundle(e,true)},loadResourceBundle:function(e){return this._loadResourceBundle(e)},_loadResourceBundle:function(n,r){var i=this,a=this.getManifest(r),s=!!a,o,u,l,c;e(n===undefined||typeof n==="string","sLocale must be a string or omitted");n=n||y.getLanguage();l=n+"/manifest-not-available";if(s){c=n;delete this._resourceBundles[l]}else{c=l}o=this._resourceBundles[c];if(!o||r&&o instanceof Promise){u=this._getI18nSettings();if(u){var f=S(this.name+"/",u.bundleUrl);v[f]=this;o=t.create({bundleUrl:f,supportedLocales:u.supportedLocales,fallbackLocale:u.fallbackLocale,locale:n,async:!r,activeTerminologies:y.getActiveTerminologies()});if(o instanceof Promise){o=o.then(function(e){i._resourceBundles[c]=e;return e})}this._resourceBundles[c]=o}}return r?o:Promise.resolve(o)}});F.getAllInstancesRequiringCss=function(){return P.slice()};F.get=function(e){return F._get(e)};F._get=function(e,n){var t=b[e];if(!t&&n){b[e]=t=new F({name:e,_key:E})}return t};F._getByBundleUrl=function(e){if(e){if(v[e]){return v[e]}var n=sap.ui.loader._.guessResourceName(e);if(n){for(var t in b){if(!b[t].isSettingsEnhanced()){continue}var r=t.replace(/\./g,"/");var i=b[t];if(r!==""&&n.startsWith(r+"/")){var a=n.replace(r+"/","");var s=i._getI18nSettings();if(s){var o=S(r,"/"+s.bundleUrl);a=S(r,"/"+a);if(a===o){v[e]=i;return i}v[e]=false}}}}}};F.all=function(){return F._all(false)};F._all=function(e){var n={};Object.keys(b).forEach(function(t){if(e||b[t].isSettingsEnhanced()){n[t]=b[t]}});return n};F.init=function(n){e(typeof n==="object","mSettings given to 'sap/ui/core/Lib.init' must be an object");e(typeof n.name==="string"&&n.name,"mSettings given to 'sap/ui/core/Lib.init' must have the 'name' property set");var t="sap/ui/core/Lib.init";r.debug("Analyzing Library "+n.name,null,t);var i=F._get(n.name,true);i.enhanceSettings(n);var a=o.create(n.name),s;for(s=0;s<i.dependencies.length;s++){var u=i.dependencies[s];var l=F._get(u,true);r.debug("resolve Dependencies to "+u,null,t);if(!l.isSettingsEnhanced()){r.warning("Dependency from "+n.name+" to "+u+" has not been resolved by library itself",null,t);F._load({name:u},{sync:true})}}d.registerInterfaceTypes(i.interfaces);for(s=0;s<i.types.length;s++){if(!/^(any|boolean|float|int|string|object|void)$/.test(i.types[s])){sap.ui.loader._.declareModule(i.types[s].replace(/\./g,"/")+".js");var c=i.types[s].substring(0,i.types[s].lastIndexOf("."));if(o.get(c)===undefined){o.create(c)}}}var f=i.controls.concat(i.elements);for(s=0;s<f.length;s++){sap.ui.lazyRequire(f[s],"new extend getMetadata")}if(!i.noLibraryCSS){var p={name:i.name,version:i.version,preloadedCss:B().indexOf(i.name)!==-1};P.push(p);T(!p.preloadedCss).then(function(e){e._includeLibraryThemeAndEnsureThemeRoot(p)})}i.sName=i.name;i.aControls=i.controls;F.fireLibraryChanged({name:n.name,stereotype:"library",operation:"add",metadata:i});return a};function A(e){return e.map(function(e){return e.name.replace(/\./g,"/")+"/library"})}function q(e){var n=A(e);return new Promise(function(t,r){sap.ui.require(n,function(){t(e)},r)})}F.load=function(e){if(typeof e==="string"){e={name:e}}else{e=["name","url"].reduce(function(n,t){if(e&&e.hasOwnProperty(t)){n[t]=e[t]}return n},{})}return F._load(e).then(function(e){return e[0]})};F._load=function(e,n){n=n||{};if(!Array.isArray(e)){e=[e]}var t={};var i=[];e.forEach(function(e){if(typeof e==="object"){if(e.hasOwnProperty("url")||e.hasOwnProperty("json")){t[e.name]=e}i.push(e.name)}else{i.push(e)}});var a=y.getPreload()==="sync"||y.getPreload()==="async",s=!n.preloadOnly;if(!n.sync){i=f._getTransitiveDependencyForLibraries(i)}var o=i.map(function(e){var n=F._get(e,true);if(n._loadingStatus==null&&t[e]&&t[e].url){j(e,t[e].url)}return n});if(!n.sync){var u=a?Promise.all(o.map(function(e){var n={};if(t[e.name]&&t[e.name].hasOwnProperty("json")){n.json=t[e.name].json}return e._preload(n)})):Promise.resolve(o);return s?u.then(q):u}else{if(a){o.forEach(function(e){var n={sync:true};if(t[e.name]&&t[e.name].hasOwnProperty("json")){n.json=t[e.name].json}e._preload(n)})}if(s){A(o).forEach(function(e,n){if(o[n].isSettingsEnhanced()){return}sap.ui.requireSync(e);if(!o[n].isSettingsEnhanced()){r.warning("library "+o[n].name+" didn't initialize itself");F.init({name:o[n].name})}})}return o}};F.getResourceBundleFor=function(e,n){var t=F._get(e,true);return t.getResourceBundle(n)};F._registerElement=function(e){var n=e.getName(),t=e.getLibraryName()||"",i=F.get(t),a=e.isA("sap.ui.core.Control")?"controls":"elements";if(!i){o.create(t);i=F._get(t,true)}if(i[a].indexOf(n)<0){i[a].push(n);r.debug("Class "+n+" registered for library "+t);F.fireLibraryChanged({name:n,stereotype:e.getStereotype(),operation:"add",metadata:e})}};var M=new p;F.attachLibraryChanged=function(e,n){M.attachEvent("LibraryChanged",e,n)};F.detachLibraryChanged=function(e,n){M.detachEvent("LibraryChanged",e,n)};F.fireLibraryChanged=function(e){M.fireEvent("LibraryChanged",e)};t._enrichBundleConfig=function(e){if(!e.terminologies||!e.enhanceWith){var n=F._getByBundleUrl(e.url);if(n){var t=n._getI18nSettings();if(t){var r=n.name.replace(/\./g,"/");r=r.endsWith("/")?r:r+"/";r=sap.ui.require.toUrl(r);m._processResourceConfiguration(t,{alreadyResolvedOnRoot:true,relativeTo:r});e.fallbackLocale=e.fallbackLocale||t.fallbackLocale;e.supportedLocales=e.supportedLocales||t.supportedLocales;e.terminologies=e.terminologies||t.terminologies;e.enhanceWith=e.enhanceWith||t.enhanceWith;e.activeTerminologies=e.activeTerminologies||y.getActiveTerminologies()}}}return e};F.getVersionedLibCss=function(){return n.get({name:"sapUiVersionedLibCss",type:n.Type.Boolean,external:true})};return F});
//# sourceMappingURL=Lib.js.map