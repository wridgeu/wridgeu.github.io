/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/util/DataProvider","sap/ui/thirdparty/jquery","sap/base/Log","sap/ui/model/odata/v4/ODataUtils","sap/ui/core/Core"],function(e,t,r,s,i){"use strict";var o=[429,503];var n=["no-cors","same-origin","cors"];var a=["GET","POST","HEAD","PUT","PATCH","DELETE","OPTIONS"];var u=e.extend("sap.ui.integration.util.RequestDataProvider",{metadata:{properties:{allowCustomDataType:{type:"boolean",defaultValue:false}},associations:{host:{type:"sap.ui.integration.Host",multiple:false},card:{type:"sap.ui.integration.widgets.Card",multiple:false}}}});u.prototype.destroy=function(){if(this._iRetryAfterTimeout){clearTimeout(this._iRetryAfterTimeout)}e.prototype.destroy.apply(this,arguments)};u.prototype.getLastJQXHR=function(){return this._lastJQXHR};u.prototype.getData=function(){var e=this.getSettings().request,t=Promise.resolve(e);if(this._oDestinations){t=this._oDestinations.process(e)}if(this._oCsrfTokenHandler){t=t.then(function(e){return this._oCsrfTokenHandler.resolveToken(e)}.bind(this))}t=t.then(this._fetch.bind(this));if(this._oCsrfTokenHandler){t=t.catch(this._handleExpiredToken.bind(this))}return t};u.prototype._handleExpiredToken=function(e){if(this._oCsrfTokenHandler.isExpiredToken(this.getLastJQXHR())){this._oCsrfTokenHandler.resetTokenByRequest(this.getSettings().request);return this.getData().catch(function(e){throw e})}throw e};u.prototype._fetch=function(e){var t="Invalid request",i=this._oSettings;if(!e||!e.url){r.error(t);return Promise.reject(t)}if(!this.getAllowCustomDataType()&&e.dataType){r.error("To specify dataType property in the Request Configuration, first set allowCustomDataType to 'true'.")}var o=e.parameters,n=e.url,a=this.getAllowCustomDataType()&&e.dataType||"json",u=e.headers||{},d=e.batch,f,h;if(!n.startsWith("/")){n=this._getRuntimeUrl(e.url)}if(this._hasHeader(e,"Content-Type","application/json")){o=JSON.stringify(e.parameters)}if(d){f=s.serializeBatchRequest(Object.values(d));a="text";o=f.body;u=Object.assign({},u,f.headers)}u=this._prepareHeaders(u,i);h={mode:e.mode||"cors",url:n,method:e.method&&e.method.toUpperCase()||"GET",dataType:a,data:o,headers:u,timeout:15e3,xhrFields:{withCredentials:!!e.withCredentials}};if(!o){delete h.data}if(!this._isValidRequest(h)){r.error(t);return Promise.reject(t)}return this._request(h).then(function(e){var t=e[0];if(d){return this._deserializeBatchResponse(d,t)}return t}.bind(this))};u.prototype._request=function(e,r){return new Promise(function(s,i){t.ajax(e).done(function(e,t,r){if(this.bIsDestroyed){i("RequestDataProvider is already destroyed before the response is received.");return}this._lastJQXHR=r;s([e,r])}.bind(this)).fail(function(t,o,n){var a=[n,t];if(this.bIsDestroyed){i("RequestDataProvider is already destroyed while error in the response occurred.");return}this._lastJQXHR=t;if(r){i(a);return}this._retryRequest(a,e).then(s,i)}.bind(this))}.bind(this))};u.prototype._retryRequest=function(e,t){var s=e[1],i=this._getRetryAfter(s);if(!o.includes(s.status)){return Promise.reject(e)}if(!i){r.warning("Request could be retried, but Retry-After header or configuration parameter retryAfter are missing.");return Promise.reject(e)}if(this._iRetryAfterTimeout){return Promise.reject("The retry was already scheduled.")}return new Promise(function(e,r){this._iRetryAfterTimeout=setTimeout(function(){this._request(t,true).then(e,r);this._iRetryAfterTimeout=null}.bind(this),i*1e3)}.bind(this))};u.prototype._getRetryAfter=function(e){var t=this.getSettings().request,s=e.getResponseHeader("Retry-After")||t.retryAfter;if(!s){return 0}if(Number.isInteger(s)){return s}if(!s.match(/^\d+$/)){r.error("Only number of seconds is supported as value of retry-after. Given '"+s+"'.");return 0}return parseInt(s)};u.prototype._hasHeader=function(e,t,r){if(!e.headers){return false}for(var s in e.headers){if(s.toLowerCase()===t.toLowerCase()&&e.headers[s]===r){return true}}return false};u.prototype._isValidRequest=function(e){if(!e){return false}if(n.indexOf(e.mode)===-1){return false}if(a.indexOf(e.method)===-1){return false}if(typeof e.url!=="string"){return false}return true};u.prototype._deserializeBatchResponse=function(e,t){return new Promise(function(r,i){var o=this.getLastJQXHR().getResponseHeader("Content-Type"),n=s.deserializeBatchResponse(o,t,false),a=Object.keys(e),u={};a.forEach(function(e,t){var r=n[t],s;if(!r){i("Batch responses do not match the batch requests.");return}s=new Response(r.responseText,r);if(!s.ok){i("One of batch requests fails with '"+s.status+" "+s.statusText+"'");return}u[e]=r.responseText?JSON.parse(r.responseText):{}});r(u)}.bind(this))};u.prototype._prepareHeaders=function(e,t){var r=i.byId(this.getCard()),s=i.byId(this.getHost());if(s&&s.modifyRequestHeaders){return s.modifyRequestHeaders(Object.assign({},e),t,r)}return e};return u});