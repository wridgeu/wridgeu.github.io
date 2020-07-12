/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/ui/fl/write/connectors/BaseConnector","sap/ui/fl/apply/_internal/connectors/LrepConnector","sap/ui/fl/apply/_internal/connectors/Utils","sap/ui/fl/write/_internal/connectors/Utils","sap/ui/fl/write/_internal/transport/TransportSelection","sap/ui/fl/registry/Settings","sap/ui/fl/Layer","sap/ui/fl/LayerUtils","sap/ui/fl/Utils","sap/ui/fl/Change","sap/ui/core/Component","sap/ui/core/BusyIndicator","sap/base/Log","sap/m/MessageBox","sap/base/util/restricted/_pick"],function(e,t,n,r,a,s,i,o,l,u,c,p,f,d,g,v){"use strict";var T={FLEX_INFO:"/flex/info/",PUBLISH:"/actions/make_changes_transportable/",CHANGES:"/changes/",VARIANTS:"/variants/",SETTINGS:"/flex/settings",TOKEN:"/actions/getcsrftoken/",APPVARIANTS:"/appdescr_variants/",APPVARIANTS_OVERVIEW:"/app_variant_overview/",UI2PERSONALIZATION:"/ui2personalization/"};var R=function(e){var t;if(e.isLegacyVariant){t=T.VARIANTS}else if(e.isAppVariant){t=T.APPVARIANTS}else{t=T.CHANGES}var s=e.transport?{changelist:e.transport}:{};if(e.skipIam){s.skipIam=e.skipIam}r.addLanguageInfo(s);n._addClientInfo(s);if(e.flexObject&&!e.isAppVariant){e.fileName=e.flexObject.fileName}var i=r.getUrl(t,e,s);delete e.reference;delete e.fileName;var o=r.getUrl(T.TOKEN,e);var l=a.getRequestOptions(n,o,e.flexObjects||e.flexObject,"application/json; charset=utf-8","json");return a.sendRequest(i,e.method,l)};var h=function(e){var t=e.getDefinition().layer===o.VENDOR?e.getPackage():"";return new c({fileName:e.getDefinition().fileName,fileType:e.getDefinition().fileType,packageName:t,namespace:e.getNamespace()})};var m=function(e){var t;if(e.transport){t=Promise.resolve({transport:e.transport})}else if(e.isForSmartBusiness){return Promise.resolve()}else{var n=h(e.appVariant);t=(new s).openTransportSelection(n)}return t.then(function(e){if(e==="cancel"){return Promise.reject("cancel")}if(e&&e.transport!==undefined){return e.transport}return Promise.reject(new Error("Transport information could not be determined"))})};return e({},t,{applyConnector:n,layers:n.layers,reset:function(e){f.show(0);var t=[];var l=Promise.resolve();if(e.layer!==o.USER){t=e.changes;l=i.getInstance().then(function(n){if(!n.isProductiveSystem()){return(new s).setTransports(t,p.get(e.reference)).then(function(){t.some(function(t){if(t.getRequest()){e.changelist=t.getRequest();return true}return false})})}})}return l.then(function(){f.show(0);var t=["reference","layer","appVersion","changelist","generator"];var s=v(e,t);n._addClientInfo(s);if(e.selectorIds){s.selector=e.selectorIds}if(e.changeTypes){s.changeType=e.changeTypes}delete e.reference;var i=r.getUrl(T.CHANGES,e,s);var o=r.getUrl(T.TOKEN,e);var l=a.getRequestOptions(n,o);return a.sendRequest(i,"DELETE",l).then(function(e){f.hide();return e}).catch(function(e){f.hide();return Promise.reject(e)})})},publish:function(e){var t=function(t){f.hide();var n=sap.ui.getCore().getLibraryResourceBundle("sap.ui.fl");var r=n.getText("MSG_TRANSPORT_ERROR",t?[t.message||t]:undefined);var a=n.getText("HEADER_TRANSPORT_ERROR");d.error("transport error"+t);g.show(r,{icon:g.Icon.ERROR,title:a,styleClass:e.transportDialogSettings.styleClass});return"Error"};var n=new s;return n.openTransportSelection(null,e.transportDialogSettings.rootControl,e.transportDialogSettings.styleClass).then(function(t){if(n.checkTransportInfo(t)){f.show(0);var r={reference:e.reference,appVersion:e.appVersion,layer:e.layer};return n._prepareChangesForTransport(t,e.localChanges,e.appVariantDescriptors,r).then(function(){f.hide()})}return"Cancel"})["catch"](t)},getFlexInfo:function(e){var t=["layer","appVersion"];var a=v(e,t);n._addClientInfo(a);var s=r.getUrl(T.FLEX_INFO,e,a);return r.sendRequest(s).then(function(e){return e.response})},loadFeatures:function(e){if(n.settings){n.settings.isVersioningEnabled=false;return Promise.resolve(n.settings)}var t={};n._addClientInfo(t);var a=r.getUrl(T.SETTINGS,e,t);return r.sendRequest(a).then(function(e){e.response.isVersioningEnabled=false;return e.response})},write:function(e){e.method="POST";return R(e)},update:function(e){if(e.flexObject.fileType==="variant"){e.isLegacyVariant=true}e.method="PUT";return R(e)},remove:function(e){var t={namespace:e.flexObject.namespace,layer:e.flexObject.layer};if(e.transport){t.changelist=e.transport}n._addClientInfo(t);e.fileName=e.flexObject.fileName;var s=e.flexObject.fileType==="variant"?T.VARIANTS:T.CHANGES;var i=r.getUrl(s,e,t);i=decodeURIComponent(i);delete e.fileName;var o=r.getUrl(T.TOKEN,e);var l=a.getRequestOptions(n,o,undefined,"application/json; charset=utf-8","json");return a.sendRequest(i,"DELETE",l)},appVariant:{getManifest:function(e){var t=e.appVarUrl;var r=a.getRequestOptions(n,undefined,undefined,"application/json; charset=utf-8","json");return a.sendRequest(t,"GET",r)},load:function(e){var t=r.getUrl(T.APPVARIANTS,e);var s=a.getRequestOptions(n,undefined,undefined,"application/json; charset=utf-8","json");return a.sendRequest(t,"GET",s)},create:function(e){e.method="POST";e.isAppVariant=true;return R(e)},assignCatalogs:function(e){var t={};t.action=e.action;delete e.action;t.assignFromAppId=e.assignFromAppId;delete e.assignFromAppId;var s=r.getUrl(T.APPVARIANTS,e,t);delete e.reference;var i=r.getUrl(T.TOKEN,e);var o=a.getRequestOptions(n,i,undefined,"application/json; charset=utf-8","json");return a.sendRequest(s,"POST",o)},unassignCatalogs:function(e){var t={};t.action=e.action;delete e.action;var s=r.getUrl(T.APPVARIANTS,e,t);delete e.reference;var i=r.getUrl(T.TOKEN,e);var o=a.getRequestOptions(n,i,undefined,"application/json; charset=utf-8","json");return a.sendRequest(s,"POST",o)},update:function(e){return m(e).then(function(t){if(t){e.transport=t}delete e.isForSmartBusiness;e.method="PUT";e.isAppVariant=true;return R(e)})},remove:function(e){return m(e).then(function(t){var s={};if(t){s.changelist=t}delete e.isForSmartBusiness;var i=r.getUrl(T.APPVARIANTS,e,s);delete e.reference;var o=r.getUrl(T.TOKEN,e);var l=a.getRequestOptions(n,o,undefined,"application/json; charset=utf-8","json");return a.sendRequest(i,"DELETE",l)})},list:function(e){var t={};t.layer=e.layer;t["sap.app/id"]=e.reference;delete e.layer;delete e.reference;var s=r.getUrl(T.APPVARIANTS_OVERVIEW,e,t);var i=a.getRequestOptions(n,undefined,undefined,"application/json; charset=utf-8","json");return a.sendRequest(s,"GET",i)}},ui2Personalization:{create:function(e){e.applyConnector=this.applyConnector;var t=u.getLrepUrl();var r=a.getRequestOptions(n,t+T.TOKEN,e.flexObjects||e.flexObject,"application/json; charset=utf-8","json");var s=t+T.UI2PERSONALIZATION;return a.sendRequest(s,"PUT",r)},remove:function(e){e.applyConnector=this.applyConnector;var t=r.getUrl(T.UI2PERSONALIZATION,{url:u.getLrepUrl()},{reference:e.reference,containerkey:e.containerKey,itemname:e.itemName});return a.sendRequest(t,"DELETE")}}})},true);