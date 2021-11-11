/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/core/Component","sap/ui/core/util/reflection/BaseTreeModifier","sap/ui/thirdparty/hasher","sap/base/Log","sap/base/util/UriParameters","sap/base/util/uid","sap/base/strings/formatMessage","sap/ui/base/ManagedObject","sap/ui/core/mvc/View","sap/base/util/isPlainObject","sap/ui/base/SyncPromise"],function(e,t,r,n,a,o,i,s,u,p,f,c){"use strict";function g(e){if(e.length>0&&e.indexOf(".Component")<0){e+=".Component"}return e}var l={APP_ID_AT_DESIGN_TIME:"${pro"+"ject.art"+"ifactId}",VARIANT_MODEL_NAME:"$FlexVariants",formatAndLogMessage:function(e,t,r,n){var o=t.join(" ");o=s(o,r);a[e](o,n||"")},getXSRFTokenFromControl:function(e){var t;if(!e){return""}if(e&&typeof e.getModel==="function"){t=e.getModel();return l._getXSRFTokenFromModel(t)}return""},_getXSRFTokenFromModel:function(e){var t;if(!e){return""}if(typeof e.getHeaders==="function"){t=e.getHeaders();if(t){return t["x-csrf-token"]}}return""},getComponentClassName:function(e){var t;if(e){t=this.getAppComponentForControl(e);if(t){var r=this._getComponentStartUpParameter(t,"sap-app-id");if(r){return r}if(t.getManifestEntry("sap.ui5")&&t.getManifestEntry("sap.ui5").appVariantId){return t.getManifestEntry("sap.ui5").appVariantId}}}return l.getComponentName(t)},isVariantByStartupParameter:function(e){if(e){var t=this.getAppComponentForControl(e);if(t){return!!this._getComponentStartUpParameter(t,"sap-app-id")}}return false},getAppComponentClassNameForComponent:function(e){return l.getComponentClassName(e)},getAppDescriptor:function(e){var t=null;var r=null;var n=null;if(e){r=this.getAppComponentForControl(e);if(r&&r.getMetadata){n=r.getMetadata();if(n&&n.getManifest){t=n.getManifest()}}}return t},getSiteId:function(e){var t=null;var r=null;if(e){r=this.getAppComponentForControl(e);if(r){t=this._getComponentStartUpParameter(r,"hcpApplicationId")}}return t},getSiteIdByComponentData:function(e){return this._getStartUpParameter(e,"hcpApplicationId")},isBinding:function(e){return typeof e==="string"&&!!u.bindingParser(e)||f(e)&&((e.hasOwnProperty("path")||e.hasOwnProperty("parts"))&&!e.hasOwnProperty("ui5object"))},isApplicationVariant:function(e){var t=l.getComponentClassName(e);var r=l.getAppComponentForControl(e);var n=l.getComponentName(r);return t!==n},isChangeRelatedToVariants:function(e){return e.getFileType()==="ctrl_variant_change"||e.getFileType()==="ctrl_variant_management_change"||e.getFileType()==="ctrl_variant"||e.getVariantReference()},_getComponentStartUpParameter:function(e,t){var r=null;if(t){if(e&&e.getComponentData){r=this._getStartUpParameter(e.getComponentData(),t)}}return r},_getStartUpParameter:function(e,t){if(e&&e.startupParameters&&t){if(Array.isArray(e.startupParameters[t])){return e.startupParameters[t][0]}}},getComponentName:function(e){var t="";if(e){t=e.getMetadata().getName()}return g(t)},_getComponent:function(e){var r;if(e){r=t.get(e)}return r},_getComponentIdForControl:function(e){var t=l._getOwnerIdForControl(e);if(!t){if(e&&typeof e.getParent==="function"){var r=e.getParent();if(r){return l._getComponentIdForControl(r)}}}return t||""},getComponentForControl:function(e){return l._getComponentForControl(e)},getAppComponentForControl:function(e){var r=e instanceof t?e:this._getComponentForControl(e);return this._getAppComponentForComponent(r)},getAppDescriptorComponentObjectForControl:function(e){var t=this.getAppComponentForControl(e);var r=t.getManifest();return{name:this.getAppIdFromManifest(r)}},_getComponentForControl:function(e){var t=null;var r=null;if(e){r=l._getComponentIdForControl(e);if(r){t=l._getComponent(r)}}return t},_getAppComponentForComponent:function(e){var r=null;if(e&&e.getAppComponent&&e.getAppComponent()instanceof t){return e.getAppComponent()}if(e&&e.oComponentData&&e.oComponentData.appComponent){return e.oComponentData.appComponent}if(e&&e.getManifestEntry){r=e.getManifestEntry("sap.app")}else{return e}if(r&&r.type&&r.type!=="application"){if(e instanceof t){e=this._getComponentForControl(e)}return this.getAppComponentForControl(e)}return e},getViewForControl:function(e){return l.getFirstAncestorOfControlWithControlType(e,sap.ui.core.mvc.View)},getFirstAncestorOfControlWithControlType:function(e,t){if(e instanceof t){return e}if(e&&typeof e.getParent==="function"){e=e.getParent();return l.getFirstAncestorOfControlWithControlType(e,t)}},hasControlAncestorWithId:function(e,t){var r;if(e===t){return true}r=sap.ui.getCore().byId(e);while(r){if(r.getId()===t){return true}if(typeof r.getParent==="function"){r=r.getParent()}else{return false}}return false},_isView:function(e){return e instanceof p},_getOwnerIdForControl:function(e){return t.getOwnerIdFor(e)},getClient:function(){var e;var t;e=this._getUriParameters();t=e.get("sap-client");return t||undefined},_getUriParameters:function(){return o.fromQuery(window.location.search)},isHotfixMode:function(){var e;var t;e=this._getUriParameters();t=e.get("hotfix");return t==="true"},convertBrowserLanguageToISO639_1:function(e){if(!e||typeof e!=="string"){return""}var t=e.indexOf("-");if(t<0&&e.length<=2){return e.toUpperCase()}if(t>0&&t<=2){return e.substring(0,t).toUpperCase()}return""},getLrepUrl:function(){var e=sap.ui.getCore().getConfiguration().getFlexibilityServices();var t=e.find(function(e){return e.connector==="LrepConnector"});return t?t.url:""},getCurrentLanguage:function(){var e=sap.ui.getCore().getConfiguration().getLanguage();return l.convertBrowserLanguageToISO639_1(e)},getControlType:function(e){var t;if(e&&typeof e.getMetadata==="function"){t=e.getMetadata();if(t&&typeof t.getElementName==="function"){return t.getElementName()}}},asciiToString:function(t){var r=t.split(",");var n="";e.each(r,function(e,t){n+=String.fromCharCode(t)});return n},stringToAscii:function(e){var t="";for(var r=0;r<e.length;r++){t+=e.charCodeAt(r)+","}t=t.substring(0,t.length-1);return t},checkControlId:function(e,t){if(!t){e=e instanceof u?e:sap.ui.getCore().byId(e);t=l.getAppComponentForControl(e)}return r.checkControlId(e,t)},hasLocalIdSuffix:r.hasLocalIdSuffix,_getAllUrlParameters:function(){return window.location.search.substring(1)},getTechnicalParametersForComponent:function(e){return e&&e.getComponentData&&e.getComponentData()&&e.getComponentData().technicalParameters},getParsedURLHash:function(){return l.ifUShellContainerThen(function(e){var t=e[0].parseShellHash(n.getHash());return t||{}},["URLParsing"])||{}},ifUShellContainerThen:function(e,t){var r=l.getUshellContainer();if(r){var n=t.map(function(e){return r.getService(e)});return e(n)}},isDebugEnabled:function(){var e=this._getUriParameters();var t=e.get("sap-ui-debug")||"";if(sap.ui.getCore().getConfiguration().getDebug()||t==="true"){return true}var r=t.split(",");return r.indexOf("sap/ui/fl")!==-1||r.indexOf("sap/ui/fl/")!==-1},getUrlParameter:function(e){return o.fromQuery(window.location.search).get(e)},getUshellContainer:function(){return sap.ushell&&sap.ushell.Container},createDefaultFileName:function(e){var t=i().replace(/-/g,"_");if(e){t+="_"+e}return t},createNamespace:function(e,t){var r="changes";if(t==="ctrl_variant"){r="variants"}var n=e.reference.replace(".Component","");var a="apps/"+n+"/"+r+"/";return a},buildLrepRootNamespace:function(e,t,r){var n="apps/";var a=new Error("Error in sap.ui.fl.Utils#buildLrepRootNamespace: ");if(!e){a.message+="for every scenario you need a base ID";throw a}switch(t){case sap.ui.fl.Scenario.VersionedAppVariant:if(!r){a.message+="in a versioned app variant scenario you additionally need a project ID";throw a}n+=e+"/appVariants/"+r+"/";break;case sap.ui.fl.Scenario.AppVariant:if(!r){a.message+="in an app variant scenario you additionally need a project ID";throw a}n+=e+"/appVariants/"+r+"/";break;case sap.ui.fl.Scenario.AdaptationProject:if(!r){a.message+="in a adaptation project scenario you additionally need a project ID";throw a}n+=e+"/adapt/"+r+"/";break;case sap.ui.fl.Scenario.FioriElementsFromScratch:case sap.ui.fl.Scenario.UiAdaptation:default:n+=e+"/"}return n},_getComponentTypeFromManifest:function(e){return e&&e.getEntry&&e.getEntry("sap.app")&&e.getEntry("sap.app").type},_getComponentTypeFromRawManifest:function(e){return e&&e["sap.app"]&&e["sap.app"].type},isApplication:function(e,t){var r=t?l._getComponentTypeFromRawManifest(e):l._getComponentTypeFromManifest(e);return r==="application"},isApplicationComponent:function(e){return e instanceof t&&l.isApplication(e.getManifestObject())},isEmbeddedComponent:function(e){return e instanceof t&&l._getComponentTypeFromManifest(e.getManifestObject())==="component"},getFlexReference:function(e){if(e){if(e.getEntry("sap.ui5")){if(e.getEntry("sap.ui5").appVariantId){return e.getEntry("sap.ui5").appVariantId}if(e.getEntry("sap.ui5").componentName){return g(e.getEntry("sap.ui5").componentName)}}if(e.getEntry("sap.app")&&e.getEntry("sap.app").id){return g(l.getAppIdFromManifest(e))}}a.warning("No Manifest received.");return""},getAppIdFromManifest:function(e){if(e){var t=e.getEntry?e.getEntry("sap.app"):e["sap.app"];var r=t&&t.id;if(r===l.APP_ID_AT_DESIGN_TIME&&e.getComponentName){r=e.getComponentName()}return r}throw new Error("No Manifest received, descriptor changes are not possible")},getODataServiceUriFromManifest:function(e){var t="";if(e){var r=e.getEntry?e.getEntry("sap.app"):e["sap.app"];if(r&&r.dataSources&&r.dataSources.mainService&&r.dataSources.mainService.uri){t=r.dataSources.mainService.uri}}else{a.warning("No Manifest received.")}return t},indexOfObject:function(e,t){var r=-1;e.some(function(e,n){var a;var o;if(!e){a=[]}else{a=Object.keys(e)}if(!t){o=[]}else{o=Object.keys(t)}var i=a.length===o.length;var s=i&&!a.some(function(r){return e[r]!==t[r]});if(s){r=n}return s});return r},execPromiseQueueSequentially:function(e,t,r){if(e.length===0){if(r){return Promise.resolve()}return new l.FakePromise}var n=e.shift();if(typeof n==="function"){try{var o=n()}catch(e){o=Promise.reject(e)}return o.then(function(){if(!r&&o instanceof Promise){r=true}}).catch(function(e){var r="Error during execPromiseQueueSequentially processing occured";r+=e?": "+e.message:"";a.error(r);if(t){throw new Error(r)}}).then(function(){return this.execPromiseQueueSequentially(e,t,r)}.bind(this))}a.error("Changes could not be applied, promise not wrapped inside function.");return this.execPromiseQueueSequentially(e,t,r)},FakePromise:function(e,t,r){l.FakePromise.fakePromiseIdentifier="sap.ui.fl.Utils.FakePromise";this.vValue=e;this.vError=t;this.bContinueWithFakePromise=arguments.length<3||r===l.FakePromise.fakePromiseIdentifier;var n=function(e,t){try{var r=t(e,l.FakePromise.fakePromiseIdentifier);if(c.isThenable(r)){return r}return new l.FakePromise(r)}catch(e){var n=e;return new l.FakePromise(undefined,n)}};l.FakePromise.prototype.then=function(e,t){if(!this.bContinueWithFakePromise){return Promise.resolve(e(this.vValue))}if(!this.vError){return n(this.vValue,e)}else if(t){return n(this.vError,t)}return this};l.FakePromise.prototype.catch=function(e){if(!this.bContinueWithFakePromise){return Promise.reject(e(this.vError))}if(this.vError){return n(this.vError,e)}return this};if(this.vValue instanceof Promise||this.vValue instanceof l.FakePromise){return this.vValue}},getChangeFromChangesMap:function(e,t){var r;Object.keys(e).forEach(function(n){e[n].some(function(e){if(e.getId()===t){r=e;return true}})});return r},requireAsync:function(e){var t=sap.ui.require(e);if(t){return Promise.resolve(t)}return new Promise(function(t,r){sap.ui.require([e],function(e){t(e)},function(e){r(e)})})},normalizeReference:function(e){return e.replace(/(.Component)$/g,"")},handleUrlParameters:function(e,t,r){if(this.hasParameterAndValue(t,r)){if(e.startsWith("?")){e=e.substr(1,e.length)}var n=e.split("&").filter(function(e){return e!==t+"="+r});e="";if(n.length>0){e="?"+n.toString()}}else{e+=(e.length>0?"&":"?")+t+"="+r}return e},hasParameterAndValue:function(e,t){return this.getParameter(e)===t},getParameter:function(e){var t=this.getUshellContainer();if(t){var r=this.getParsedURLHash();return r.params&&r.params[e]&&r.params[e][0]}var n=o.fromQuery(document.location.search);if(!n){return false}return n.get(e)},findAggregation:function(e,t){if(e){if(e.getMetadata){var r=e.getMetadata();var n=r.getAllAggregations();if(n){return n[t]}}}return undefined},getAggregation:function(e,t){var r=l.findAggregation(e,t);if(r){return e[r._sGetter]()}return undefined},getProperty:function(e,t){var r=e.getMetadata().getPropertyLikeSetting(t);if(r){var n=r._sGetter;return e[n]()}return undefined}};return l},true);