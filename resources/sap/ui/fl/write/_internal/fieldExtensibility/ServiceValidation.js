/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Utils","sap/ui/util/Storage","sap/ui/fl/write/_internal/fieldExtensibility/UriParser"],function(e,r,t){"use strict";var i={};var n="sap.ui.fl.fieldExt.Access";var u=1*7*24*60*60*1e3;function a(){return Date.now()}function f(){return i.getLocalStorage()}function s(){return f()&&f().isSupported()}function c(){if(!s()){return{}}var e=f().get(n);if(!e){return{}}return JSON.parse(e)}function o(e){return e.expirationDate<=a()}function l(e){return c()[e.serviceKey]||null}function v(e){var r=a()+u;var t=S();var i=p(e);return{serviceKey:t.getName()+t.getClient()+i.serviceName+i.serviceVersion,expirationDate:r}}function p(e){if(typeof e==="string"){return t.parseServiceUri(e)}return e}function g(){return S()}function S(){var r=e.getUshellContainer();return r&&r.getLogonSystem()}function d(e){if(s()){f().put(n,JSON.stringify(e))}}i.getLocalStorage=function(){return new r(r.Type.local)};i.isServiceOutdated=function(e){if(!g()){return false}var r=l(v(e));if(r){if(o(r)){this.setServiceValid(e);return false}return true}return false};i.setServiceValid=function(e){if(g()){var r=c();delete r[v(e).serviceKey];d(r)}};i.setServiceInvalid=function(e){if(g()){var r=c();var t=v(e);r[t.serviceKey]=t;d(r)}};return i});