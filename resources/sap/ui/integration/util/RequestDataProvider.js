/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/util/DataProvider","jquery.sap.global","sap/base/Log"],function(e,t,r){"use strict";var a=["no-cors","same-origin","cors"];var i=["GET","POST"];var s=e.extend("sap.ui.integration.util.RequestDataProvider",{metadata:{properties:{allowCustomDataType:{type:"boolean",defaultValue:false}}}});s.prototype.getData=function(){var e=this.getSettings().request;if(this._oDestinations){return this._oDestinations.process(e).then(this._fetch.bind(this))}return this._fetch(e)};s.prototype._isValidRequest=function(e){if(!e){return false}if(a.indexOf(e.mode)===-1){return false}if(i.indexOf(e.method)===-1){return false}if(typeof e.url!=="string"){return false}return true};s.prototype._fetch=function(e){var a="Invalid request";return new Promise(function(i,s){if(!e||!e.url){r.error(a);s(a);return}if(!this.getAllowCustomDataType()&&e.dataType){r.error("To specify dataType property in the Request Configuration, first set allowCustomDataType to 'true'.")}var o=e.parameters;if(this._hasHeader(e,"Content-Type","application/json")){o=JSON.stringify(e.parameters)}var n={mode:e.mode||"cors",url:e.url,method:e.method&&e.method.toUpperCase()||"GET",dataType:this.getAllowCustomDataType()&&e.dataType||"json",data:o,headers:e.headers,timeout:15e3,xhrFields:{withCredentials:!!e.withCredentials}};if(this._isValidRequest(n)){t.ajax(n).done(function(e){i(e)}).fail(function(e,t,r){s(r)})}else{r.error(a);s(a)}}.bind(this))};s.prototype._hasHeader=function(e,t,r){if(!e.headers){return false}for(var a in e.headers){if(a.toLowerCase()===t.toLowerCase()&&e.headers[a]===r){return true}}return false};return s});