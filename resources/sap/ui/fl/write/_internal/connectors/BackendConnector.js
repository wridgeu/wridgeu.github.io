/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/ui/fl/write/connectors/BaseConnector","sap/ui/fl/initial/_internal/connectors/BackendConnector","sap/ui/fl/initial/_internal/connectors/Utils","sap/ui/fl/write/_internal/connectors/Utils","sap/base/util/restricted/_pick"],function(e,t,n,r,i,s){"use strict";function a(e){var t={};if(e.parentVersion!==undefined){t.parentVersion=e.parentVersion}if(this.isLanguageInfoRequired){r.addLanguageInfo(t)}var n=r.getUrl(this.ROUTES.CHANGES,e,t);delete e.fileName;delete t["sap-language"];var s=r.getUrl(this.ROUTES.TOKEN,e,t);var a=i.getRequestOptions(this.initialConnector,s,e.flexObjects||e.flexObject,"application/json; charset=utf-8","json");return i.sendRequest(n,e.method,a)}function o(e){e.fileName=e.flexObject.fileName;return a.call(this,e)}var l=e({},t,{xsrfToken:null,reset:function(e){var t=["reference","generator"];var n=s(e,t);if(e.selectorIds){n.selector=e.selectorIds}if(e.changeTypes){n.changeType=e.changeTypes}delete e.reference;var a=r.getUrl(this.ROUTES.CHANGES,e,n);var o=r.getUrl(this.ROUTES.TOKEN,e);var l=i.getRequestOptions(this.initialConnector,o);return i.sendRequest(a,"DELETE",l)},write:function(e){e.method="POST";return a.call(this,e).then(function(e){if(e.response&&!Array.isArray(e.response)){e.response=[e.response]}return e})},update:function(e){e.method="PUT";return o.call(this,e)},remove:function(e){var t={namespace:e.flexObject.namespace};e.fileName=e.flexObject.fileName;var n=r.getUrl(this.ROUTES.CHANGES,e,t);delete e.fileName;var s=r.getUrl(this.ROUTES.TOKEN,e);var a=i.getRequestOptions(this.initialConnector,s,undefined,"application/json; charset=utf-8","json");return i.sendRequest(n,"DELETE",a)},loadFeatures:function(e){if(this.initialConnector.settings){return Promise.resolve({response:this.initialConnector.settings})}var t=r.getUrl(this.ROUTES.SETTINGS,e);return r.sendRequest(t).then(function(e){return e.response})}});l.initialConnector=n;return l});