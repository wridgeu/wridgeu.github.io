/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Locale","sap/base/util/isPlainObject","sap/base/Log"],function(e,t,r){"use strict";var n={};n.isJson=function(e){if(typeof e!=="string"){return false}try{JSON.parse(e);return true}catch(e){return false}};n.processFormatArguments=function(r,n){var i=t(r)?r:{},s=typeof r==="string"?new e(r):n&&new e(n);return{formatOptions:i,locale:s}};var i=1,s=2,a=3;n.parseJsonDateTime=function(e){var t=/^\/Date\((-?\d+)(\+|-)?(\d+)?\)\/$/,n;if(typeof e==="string"){n=t.exec(e)}if(n){var o=new Date(parseInt(n[i]));if(n[s]){var u=parseInt(n[a]);if(n[s]==="-"){u=-u}var f=o.getUTCMinutes();o.setUTCMinutes(f-u)}if(isNaN(o.valueOf())){r.error("Invalid JSON Date format - "+e)}else{e=o}}return e};n.DEFAULT_PROMISE_TIMEOUT=5e3;n.timeoutPromise=function(e,t){var r;if(t===undefined){t=n.DEFAULT_PROMISE_TIMEOUT}r=new Promise(function(e,r){setTimeout(function(){r("The promise was not resolved after "+t+" ms so it timed out.")},t)});return Promise.race([e,r])};n.hasFalsyValueAsString=function(e){return typeof e=="string"&&["null","false","undefined",""].indexOf(e.trim())>-1};n.setNestedPropertyValue=function(e,t,r){var n=t.substring(1).split("/"),i;for(var s=0;s<n.length-1;s++){i=n[s];e=e.hasOwnProperty(i)?e[i]:undefined;if(e===null||typeof e!=="object"){break}}e[n[n.length-1]]=r};n.getNestedPropertyValue=function(e,t){var r=t.substring(1).split("/"),n;for(var i=0;i<r.length;i++){n=r[i];e=e.hasOwnProperty(n)?e[n]:undefined;if(e===null||typeof e!=="object"){break}}return e};return n});