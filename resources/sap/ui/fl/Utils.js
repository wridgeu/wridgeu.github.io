/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/strings/formatMessage","sap/base/util/isPlainObject","sap/base/util/uid","sap/base/util/UriParameters","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/base/ManagedObject","sap/ui/core/util/reflection/BaseTreeModifier","sap/ui/core/Component","sap/ui/thirdparty/hasher","sap/ui/thirdparty/jquery"],function(e,t,r,n,o,i,a,s,u,p,f){"use strict";var c={APP_ID_AT_DESIGN_TIME:"${pro"+"ject.art"+"ifactId}",VARIANT_MODEL_NAME:"$FlexVariants",formatAndLogMessage:function(t,r,n,i){var a=r.join(" ");a=e(a,n);o[t](a,i||"")},isVariantByStartupParameter:function(e){if(e){var t=this.getAppComponentForControl(e);if(t){return!!this._getComponentStartUpParameter(t,"sap-app-id")}}return false},getAppDescriptor:function(e){var t=null;var r=null;var n=null;if(e){r=this.getAppComponentForControl(e);if(r&&r.getMetadata){n=r.getMetadata();if(n&&n.getManifest){t=n.getManifest()}}}return t},getSiteIdByComponentData:function(e){return this._getStartUpParameter(e,"hcpApplicationId")},isBinding:function(e){return typeof e==="string"&&!!a.bindingParser(e)||t(e)&&((e.hasOwnProperty("path")||e.hasOwnProperty("parts"))&&!e.hasOwnProperty("ui5object"))},isChangeRelatedToVariants:function(e){return e.getFileType()==="ctrl_variant_change"||e.getFileType()==="ctrl_variant_management_change"||e.getFileType()==="ctrl_variant"||e.getVariantReference()},_getComponentStartUpParameter:function(e,t){var r=null;if(t){if(e&&e.getComponentData){r=this._getStartUpParameter(e.getComponentData(),t)}}return r},_getStartUpParameter:function(e,t){if(e&&e.startupParameters&&t){if(Array.isArray(e.startupParameters[t])){return e.startupParameters[t][0]}}},_getComponent:function(e){var t;if(e){t=u.get(e)}return t},_getComponentIdForControl:function(e){var t=c._getOwnerIdForControl(e);if(!t){if(e&&typeof e.getParent==="function"){var r=e.getParent();if(r){return c._getComponentIdForControl(r)}}}return t||""},getComponentForControl:function(e){return c._getComponentForControl(e)},getAppComponentForControl:function(e){var t=e instanceof u?e:this._getComponentForControl(e);return this._getAppComponentForComponent(t)},getAppDescriptorComponentObjectForControl:function(e){var t=this.getAppComponentForControl(e);var r=t.getManifest();return{name:this.getAppIdFromManifest(r)}},_getComponentForControl:function(e){var t=null;var r=null;if(e){r=c._getComponentIdForControl(e);if(r){t=c._getComponent(r)}}return t},_getAppComponentForComponent:function(e){var t=null;if(e&&e.getAppComponent&&e.getAppComponent()instanceof u){return e.getAppComponent()}if(e&&e.oComponentData&&e.oComponentData.appComponent){return e.oComponentData.appComponent}if(e&&e.getManifestEntry){t=e.getManifestEntry("sap.app")}else{return e}if(t&&t.type&&t.type!=="application"){if(e instanceof u){e=this._getComponentForControl(e)}return this.getAppComponentForControl(e)}return e},getViewForControl:function(e){return c.getFirstAncestorOfControlWithControlType(e,sap.ui.core.mvc.View)},getFirstAncestorOfControlWithControlType:function(e,t){if(e instanceof t){return e}if(e&&typeof e.getParent==="function"){e=e.getParent();return c.getFirstAncestorOfControlWithControlType(e,t)}},_getOwnerIdForControl:function(e){return u.getOwnerIdFor(e)},getClient:function(){var e;var t;e=this._getUriParameters();t=e.get("sap-client");return t||undefined},_getUriParameters:function(){return n.fromQuery(window.location.search)},isHotfixMode:function(){var e;var t;e=this._getUriParameters();t=e.get("hotfix");return t==="true"},convertBrowserLanguageToISO639_1:function(e){if(!e||typeof e!=="string"){return""}var t=e.indexOf("-");if(t<0&&e.length<=2){return e.toUpperCase()}if(t>0&&t<=2){return e.substring(0,t).toUpperCase()}return""},getLrepUrl:function(){var e=sap.ui.getCore().getConfiguration().getFlexibilityServices();var t=e.find(function(e){return e.connector==="LrepConnector"});return t?t.url:""},getCurrentLanguage:function(){var e=sap.ui.getCore().getConfiguration().getLanguage();return c.convertBrowserLanguageToISO639_1(e)},getControlType:function(e){var t;if(e&&typeof e.getMetadata==="function"){t=e.getMetadata();if(t&&typeof t.getElementName==="function"){return t.getElementName()}}},asciiToString:function(e){var t=e.split(",");var r="";f.each(t,function(e,t){r+=String.fromCharCode(t)});return r},stringToAscii:function(e){var t="";for(var r=0;r<e.length;r++){t+=e.charCodeAt(r)+","}t=t.substring(0,t.length-1);return t},checkControlId:function(e,t){if(!t){e=e instanceof a?e:sap.ui.getCore().byId(e);t=c.getAppComponentForControl(e)}return s.checkControlId(e,t)},hasLocalIdSuffix:s.hasLocalIdSuffix,_getAllUrlParameters:function(){return window.location.search.substring(1)},getParsedURLHash:function(e){if(e){return e.parseShellHash(p.getHash())||{}}return{}},getUrlParameter:function(e){return n.fromQuery(window.location.search).get(e)},getUshellContainer:function(){return sap.ushell&&sap.ushell.Container},createDefaultFileName:function(e){var t=r().replace(/-/g,"_");if(e){t+="_"+e}return t},createNamespace:function(e,t){var r="changes";if(t==="ctrl_variant"){r="variants"}var n=e.reference.replace(".Component","");var o="apps/"+n+"/"+r+"/";return o},buildLrepRootNamespace:function(e,t,r){var n="apps/";var o=new Error("Error in sap.ui.fl.Utils#buildLrepRootNamespace: ");if(!e){o.message+="for every scenario you need a base ID";throw o}switch(t){case sap.ui.fl.Scenario.VersionedAppVariant:if(!r){o.message+="in a versioned app variant scenario you additionally need a project ID";throw o}n+=e+"/appVariants/"+r+"/";break;case sap.ui.fl.Scenario.AppVariant:if(!r){o.message+="in an app variant scenario you additionally need a project ID";throw o}n+=e+"/appVariants/"+r+"/";break;case sap.ui.fl.Scenario.AdaptationProject:if(!r){o.message+="in a adaptation project scenario you additionally need a project ID";throw o}n+=e+"/adapt/"+r+"/";break;case sap.ui.fl.Scenario.FioriElementsFromScratch:case sap.ui.fl.Scenario.UiAdaptation:default:n+=e+"/"}return n},_getComponentTypeFromManifest:function(e){return e&&e.getEntry&&e.getEntry("sap.app")&&e.getEntry("sap.app").type},_getComponentTypeFromRawManifest:function(e){return e&&e["sap.app"]&&e["sap.app"].type},isApplication:function(e,t){var r=t?c._getComponentTypeFromRawManifest(e):c._getComponentTypeFromManifest(e);return r==="application"},isApplicationComponent:function(e){return e instanceof u&&c.isApplication(e.getManifestObject())},isEmbeddedComponent:function(e){return e instanceof u&&c._getComponentTypeFromManifest(e.getManifestObject())==="component"},getAppIdFromManifest:function(e){if(e){var t=e.getEntry?e.getEntry("sap.app"):e["sap.app"];var r=t&&t.id;if(r===c.APP_ID_AT_DESIGN_TIME){if(e.getComponentName){return e.getComponentName()}if(e.name){return e.name}}return r}throw new Error("No Manifest received, descriptor changes are not possible")},indexOfObject:function(e,t){var r=-1;e.some(function(e,n){var o;var i;if(!e){o=[]}else{o=Object.keys(e)}if(!t){i=[]}else{i=Object.keys(t)}var a=o.length===i.length;var s=a&&!o.some(function(r){return e[r]!==t[r]});if(s){r=n}return s});return r},execPromiseQueueSequentially:function(e,t,r){if(e.length===0){if(r){return Promise.resolve()}return new c.FakePromise}var n=e.shift();if(typeof n==="function"){var i;try{i=n()}catch(e){i=Promise.reject(e)}return i.then(function(){if(!r&&i instanceof Promise){r=true}}).catch(function(e){var r="Error during execPromiseQueueSequentially processing occured";r+=e?": "+e.message:"";o.error(r,e);if(t){throw new Error(r)}}).then(function(){return this.execPromiseQueueSequentially(e,t,r)}.bind(this))}o.error("Changes could not be applied, promise not wrapped inside function.");return this.execPromiseQueueSequentially(e,t,r)},FakePromise:function(e,t,r){c.FakePromise.fakePromiseIdentifier="sap.ui.fl.Utils.FakePromise";this.vValue=e;this.vError=t;this.bContinueWithFakePromise=arguments.length<3||r===c.FakePromise.fakePromiseIdentifier;var n=function(e,t){try{var r=t(e,c.FakePromise.fakePromiseIdentifier);if(i.isThenable(r)){return r}return new c.FakePromise(r)}catch(e){var n=e;return new c.FakePromise(undefined,n)}};c.FakePromise.prototype.then=function(e,t){if(!this.bContinueWithFakePromise){return Promise.resolve(e(this.vValue))}if(!this.vError){return n(this.vValue,e)}else if(t){return n(this.vError,t)}return this};c.FakePromise.prototype.catch=function(e){if(!this.bContinueWithFakePromise){return Promise.reject(e(this.vError))}if(this.vError){return n(this.vError,e)}return this};if(this.vValue instanceof Promise||this.vValue instanceof c.FakePromise){return this.vValue}},getChangeFromChangesMap:function(e,t){var r;Object.keys(e).forEach(function(n){e[n].some(function(e){if(e.getId()===t){r=e;return true}})});return r},requireAsync:function(e){var t=sap.ui.require(e);if(t){return Promise.resolve(t)}return new Promise(function(t,r){sap.ui.require([e],function(e){t(e)},function(e){r(e)})})},normalizeReference:function(e){return e.replace(/(.Component)$/g,"")},handleUrlParameters:function(e,t,r,n){if(this.hasParameterAndValue(t,r,n)){if(e.startsWith("?")){e=e.substr(1,e.length)}var o=e.split("&").filter(function(e){return e!==t+"="+r});e="";if(o.length>0){e="?"+o.toString()}}else{e+=(e.length>0?"&":"?")+t+"="+r}return e},hasParameterAndValue:function(e,t,r){return this.getParameter(e,r)===t},getParameter:function(e,t){if(t){var r=c.getParsedURLHash(t);return r.params&&r.params[e]&&r.params[e][0]}var o=n.fromQuery(document.location.search);if(!o){return false}return o.get(e)},findAggregation:function(e,t){if(e){if(e.getMetadata){var r=e.getMetadata();var n=r.getAllAggregations();if(n){return n[t]}}}return undefined},getAggregation:function(e,t){var r=c.findAggregation(e,t);if(r){return e[r._sGetter]()}return undefined},getProperty:function(e,t){var r=e.getMetadata().getPropertyLikeSetting(t);if(r){var n=r._sGetter;return e[n]()}return undefined},getUShellService:function(e){if(e){var t=this.getUshellContainer();if(t){return t.getServiceAsync(e)}}return Promise.resolve()},getUShellServices:function(e){var t=e.map(function(e){return this.getUShellService(e)}.bind(this));return Promise.all(t).then(function(t){return e.reduce(function(e,r,n){e[r]=t&&t[n];return e},{})})}};return c},true);