/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/assert","sap/base/Log","sap/base/strings/formatMessage","sap/base/util/Properties","sap/base/util/merge"],function(e,r,n,t,i){"use strict";var a=/^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;var o={he:"iw",yi:"ji",nb:"no",sr:"sh"};var l={iw:"he",ji:"yi",no:"nb"};var s={en_US_saptrc:"1Q",en_US_sappsd:"2Q",en_US_saprigi:"3Q"};var u="en";var f=/(?:^|-)(saptrc|sappsd|saprigi)(?:-|$)/i;function c(e,r){var n;if(typeof e==="string"&&(n=a.exec(e.replace(/_/g,"-")))){var t=n[1].toLowerCase();if(!r){t=o[t]||t}var i=n[2]?n[2].toLowerCase():undefined;var l=n[3]?n[3].toUpperCase():undefined;var s=n[4]?n[4].slice(1):undefined;var u=n[6];if(u&&(n=f.exec(u))||s&&(n=f.exec(s))){return"en_US_"+n[1].toLowerCase()}if(t==="zh"&&!l){if(i==="hans"){l="CN"}else if(i==="hant"){l="TW"}}if(t==="sr"&&i==="latn"){if(r){t="sr_Latn"}else{t="sh"}}return t+(l?"_"+l+(s?"_"+s.replace("-","_"):""):"")}}function h(e,r){if(e===""){return e}var n=c(e,r);if(n===undefined){throw new TypeError("Locale '"+e+"' is not a valid BCP47 language tag")}return n}function p(e){var r;if(window.sap&&window.sap.ui&&sap.ui.getCore){r=sap.ui.getCore().getConfiguration().getLanguage();r=c(r)}return r||e}function d(){if(window.sap&&window.sap.ui&&sap.ui.getCore){return sap.ui.getCore().getConfiguration().getSupportedLanguages()}return[]}function g(e,r){var n;if(typeof e==="string"&&(n=a.exec(e.replace(/_/g,"-")))){var t=n[1].toLowerCase();var i=n[2]?n[2].toLowerCase():undefined;if(r&&t==="sh"&&!i){t="sr_Latn"}else if(!r&&t==="sr"&&i==="latn"){t="sh"}t=l[t]||t;return t+(n[3]?"-"+n[3].toUpperCase()+(n[4]?"-"+n[4].slice(1).replace("_","-"):""):"")}}var v=/^((?:[^?#]*\/)?[^\/?#]*)(\.[^.\/?#]+)((?:\?([^#]*))?(?:#(.*))?)$/;var b=[".properties",".hdbtextbundle"];function _(e){var r=v.exec(e);if(!r||b.indexOf(r[2])<0){throw new Error("resource URL '"+e+"' has unknown type (should be one of "+b.join(",")+")")}return{url:e,prefix:r[1],ext:r[2],query:r[4],hash:r[5]||"",suffix:r[2]+(r[3]||"")}}function y(e,r,n,t,i,a,o){this.sLocale=c(r)||p(a===undefined?u:a);this.oUrlInfo=_(e);this.bIncludeInfo=n;this.aCustomBundles=[];this.aPropertyFiles=[];this.aPropertyOrigins=[];this.aLocales=[];this._aFallbackLocales=F(this.sLocale,i||d(),a," of the bundle '"+this.oUrlInfo.url+"'",o);if(t){var l=function(){return this}.bind(this);return m(this).then(l,l)}L(this)}y.prototype._enhance=function(e){if(e instanceof y){this.aCustomBundles.push(e)}else{r.error("Custom resource bundle is either undefined or not an instanceof sap/base/i18n/ResourceBundle. Therefore this custom resource bundle will be ignored!")}};y.prototype.getText=function(r,n,t){var i=this._getTextFromProperties(r,n);if(i!=null){return i}i=this._getTextFromFallback(r,n);if(i!=null){return i}if(t){return undefined}else{e(false,"could not find any translatable text for key '"+r+"' in bundle file(s): '"+this.aPropertyOrigins.join("', '")+"'");return this._formatValue(r,r,n)}};y.prototype._formatValue=function(e,r,t){if(typeof e==="string"){if(t){e=n(e,t)}if(this.bIncludeInfo){e=new String(e);e.originInfo={source:"Resource Bundle",url:this.oUrlInfo.url,locale:this.sLocale,key:r}}}return e};y.prototype._getTextFromFallback=function(e,r){var n,t;for(t=this.aCustomBundles.length-1;t>=0;t--){n=this.aCustomBundles[t]._getTextFromFallback(e,r);if(n!=null){return n}}while(typeof n!=="string"&&this._aFallbackLocales.length){var i=L(this);if(i){n=i.getProperty(e);if(typeof n==="string"){return this._formatValue(n,e,r)}}}return null};y.prototype._getTextFromProperties=function(e,r){var n=null,t;for(t=this.aCustomBundles.length-1;t>=0;t--){n=this.aCustomBundles[t]._getTextFromProperties(e,r);if(n!=null){return n}}for(t=0;t<this.aPropertyFiles.length;t++){n=this.aPropertyFiles[t].getProperty(e);if(typeof n==="string"){return this._formatValue(n,e,r)}}return null};y.prototype.hasText=function(e){return this.aPropertyFiles.length>0&&typeof this.aPropertyFiles[0].getProperty(e)==="string"};function m(e){if(e._aFallbackLocales.length){return w(e,true).then(function(r){return r||m(e)})}return Promise.resolve(null)}function L(e){while(e._aFallbackLocales.length){var r=w(e,false);if(r){return r}}return null}function w(e,r){var n=e._aFallbackLocales.shift();if(n!=null){var i=e.oUrlInfo,a,o;if(i.ext===".hdbtextbundle"){if(s[n]){a=i.prefix+i.suffix+"?"+(i.query?i.query+"&":"")+"sap-language="+s[n]+(i.hash?"#"+i.hash:"")}else{a=i.url}o={"Accept-Language":g(n)||""}}else{a=i.prefix+(n?"_"+n:"")+i.suffix}var l=t.create({url:a,headers:o,async:!!r,returnNullIfMissing:true});var u=function(r){if(r){e.aPropertyFiles.push(r);e.aPropertyOrigins.push(a);e.aLocales.push(n)}return r};return r?l.then(u):u(l)}return r?Promise.resolve(null):null}y._getUrl=function(e,r){var n=e;if(r){r=r.replace(/\./g,"/");n=sap.ui.require.toUrl(r)+".properties"}return n};function x(e,r,n,t,i,a,o){if(!r){return[]}var l=[];r.forEach(function(r){if(r.fallbackLocale===undefined){r.fallbackLocale=a}if(r.supportedLocales===undefined){r.supportedLocales=o}var s=y._getUrl(r.bundleUrl,r.bundleName);var u=new y(s,n,t,i,r.supportedLocales,r.fallbackLocale);l.push(u);if(r.terminologies){l=l.concat(C(e,r.terminologies,n,t,i))}});return l}function C(e,r,n,t,i){if(!e){return[]}e=e.filter(function(e){return r.hasOwnProperty(e)});e.reverse();return e.map(function(e){var a=r[e];var o=y._getUrl(a.bundleUrl,a.bundleName);var l=a.supportedLocales;return new y(o,n,t,i,l,null,true)})}y.create=function(e){e=i({url:"",includeInfo:false},e);if(e.bundleUrl||e.bundleName){e.url=e.url||y._getUrl(e.bundleUrl,e.bundleName)}e=y._enrichBundleConfig(e);var r=new y(e.url,e.locale,e.includeInfo,!!e.async,e.supportedLocales,e.fallbackLocale);var n=[];if(e.terminologies){n=n.concat(C(e.activeTerminologies,e.terminologies,e.locale,e.includeInfo,!!e.async))}if(e.enhanceWith){n=n.concat(x(e.activeTerminologies,e.enhanceWith,e.locale,e.includeInfo,!!e.async,e.fallbackLocale,e.supportedLocales))}if(n.length){if(r instanceof Promise){r=r.then(function(e){return Promise.all(n).then(function(r){r.forEach(e._enhance,e)}).then(function(){return e})})}else{n.forEach(r._enhance,r)}}return r};y._enrichBundleConfig=function(e){return e};function P(e,r){if(!r||r.length===0||r.indexOf(e)>=0){return e}e=g(e,true);if(e){e=c(e,true)}if(r.indexOf(e)>=0){return e}return undefined}function F(e,n,t,i,a){n=n&&n.map(function(e){return h(e,true)});if(!a){var o=t!==undefined;t=o?t:u;t=h(t);if(t!==""&&!P(t,n)){var l="The fallback locale '"+t+"' is not contained in the list of supported locales ['"+n.join("', '")+"']"+i+" and will be ignored.";if(o){throw new Error(l)}r.error(l)}}var s=[],f;while(e!=null){f=P(e,n);if(f!==undefined&&s.indexOf(f)===-1){s.push(f)}if(!e){e=null}else if(e==="zh_HK"){e="zh_TW"}else if(e.lastIndexOf("_")>=0){e=e.slice(0,e.lastIndexOf("_"))}else if(a){e=null}else if(t){e=t;t=null}else{e=""}}return s}y._getFallbackLocales=function(e,r,n){return F(c(e),r,n,"")};return y});