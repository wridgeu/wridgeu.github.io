/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/base/Log","sap/base/util/deepExtend","sap/base/util/isPlainObject","sap/ui/integration/util/Utils"],function(t,e,r,i,n){"use strict";var o=/\{\{destinations.([^\}]+)/;var s=t.extend("sap.ui.integration.util.Destinations",{metadata:{library:"sap.ui.integration"},constructor:function(e){t.call(this);this._oHost=e.host;this._oCard=e.card;this._oConfiguration=e.manifestConfig;this._mResolved=new Map}});s.prototype.setHost=function(t){this._oHost=t;this._mResolved.clear()};s.prototype.process=function(t){var r=[];this._processObject(t,undefined,r);return Promise.all(r).then(function(){return t}).catch(function(r){e.error(r);return t})};s.prototype._processObject=function(t,e,r){if(!t){return Promise.resolve(t)}var n=t.hasOwnProperty(e)?t[e]:t;if(typeof n==="string"){r.push(this.processString(n).then(function(r){if(e!==undefined){t[e]=r}}).catch(function(){if(e!==undefined){t[e]=""}}))}if(i(n)){Object.keys(n).forEach(function(t){this._processObject(n,t,r)}.bind(this))}if(Array.isArray(n)){n.forEach(function(t,e){this._processObject(n,e,r)}.bind(this))}};s.prototype.getUrl=function(t){var e;if(this._mResolved.has(t)){return this._mResolved.get(t)}e=this._resolveUrl(t);this._mResolved.set(t,e);return e};s.prototype._resolveUrl=function(t){var r=this._oConfiguration?this._oConfiguration[t]:null,i,o,s;if(!r){return Promise.reject("Configuration for destination '"+t+"' was not found in the manifest.")}i=r.name;o=r.defaultUrl;if(!i&&!o){return Promise.reject("Can not resolve destination '"+t+"'. Neither 'name' nor 'defaultUrl' is configured.")}if(!i&&o){return Promise.resolve(o)}if(!this._oHost&&!o){return Promise.reject("Can not resolve destination '"+t+"'. There is no 'host' and no defaultUrl specified.")}if(!this._oHost&&o){return Promise.resolve(o)}s=n.timeoutPromise(this._oHost.getDestination(i,this._oCard));if(o){return s.catch(function(t){e.error(t+" Fallback to default url.");return o})}return s};s.prototype.hasDestination=function(t){return!!t.match(o)};s.prototype.processString=function(t){var e=t.match(o),r;if(!e){return Promise.resolve(t)}r=e[1];return this.getUrl(r).then(function(e){return this._replaceUrl(t,r,e)}.bind(this))};s.prototype._replaceUrl=function(t,e,r){var i=r.trim().replace(/\/$/,"");return t.replace("{{destinations."+e+"}}",i)};return s});