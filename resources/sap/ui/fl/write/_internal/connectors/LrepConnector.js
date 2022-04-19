/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/ui/fl/write/connectors/BaseConnector","sap/ui/fl/initial/_internal/connectors/LrepConnector","sap/ui/fl/initial/_internal/connectors/Utils","sap/ui/fl/write/_internal/connectors/Utils","sap/ui/fl/write/_internal/transport/TransportSelection","sap/ui/fl/registry/Settings","sap/ui/fl/Layer","sap/ui/fl/LayerUtils","sap/ui/fl/Utils","sap/ui/fl/Change","sap/ui/core/Component","sap/ui/core/BusyIndicator","sap/base/Log","sap/m/MessageBox","sap/base/util/restricted/_pick"],function(e,t,n,r,a,i,s,o,u,l,c,f,p,d,g,v){"use strict";var T={FLEX_INFO:"/flex/info/",PUBLISH:"/actions/make_changes_transportable/",CHANGES:"/changes/",CONDENSE:"/actions/condense/",VARIANTS:"/variants/",SETTINGS:"/flex/settings",TOKEN:"/actions/getcsrftoken/",APPVARIANTS:"/appdescr_variants/",APPVARIANTS_OVERVIEW:"/app_variant_overview/",UI2PERSONALIZATION:"/ui2personalization/",CONTEXTS:"/flex/contexts/",VERSIONS:{GET:"/flex/versions/",ACTIVATE:"/flex/versions/activate/",DISCARD:"/flex/versions/draft/"}};var E=function(e){var t;if(e.isLegacyVariant){t=T.VARIANTS}else if(e.isAppVariant){t=T.APPVARIANTS}else if(e.isContextSharing){t=T.CONTEXTS}else if(e.isCondensingEnabled){t=T.CONDENSE}else{t=T.CHANGES}var i=e.transport?{changelist:e.transport}:{};if(e.skipIam){i.skipIam=e.skipIam}if(e.parentVersion){i.parentVersion=e.parentVersion}r.addLanguageInfo(i);n._addClientInfo(i);if(e.flexObject&&!e.isAppVariant){e.fileName=e.flexObject.fileName}var s=r.getUrl(t,e,i);delete e.reference;delete e.fileName;var o=r.getUrl(T.TOKEN,e);var u=a.getRequestOptions(n,o,e.flexObjects||e.flexObject,"application/json; charset=utf-8","json");return a.sendRequest(s,e.method,u)};var O=function(e){var t=e.getDefinition().layer===o.VENDOR?e.getPackage():"";return new c({fileName:e.getDefinition().fileName,fileType:e.getDefinition().fileType,packageName:t,namespace:e.getNamespace()})};var R=function(e){var t;if(e.transport){t=Promise.resolve({transport:e.transport})}else if(e.isForSmartBusiness){return Promise.resolve()}else{var n=O(e.appVariant);t=(new i).openTransportSelection(n)}return t.then(function(e){if(e==="cancel"){return Promise.reject("cancel")}if(e&&e.transport!==undefined){return e.transport}return Promise.reject(new Error("Transport information could not be determined"))})};function N(e){e.version=e.versionId;delete e.versionId;return e}return e({},t,{initialConnector:n,layers:n.layers,reset:function(e){p.show(0);var t=[];var u=Promise.resolve();if(e.layer!==o.USER){t=e.changes;u=s.getInstance().then(function(n){if(!n.isProductiveSystem()){return(new i).setTransports(t,f.get(e.reference)).then(function(){t.some(function(t){if(t.getRequest()){e.changelist=t.getRequest();return true}return false})})}})}return u.then(function(){p.show(0);var t=["reference","layer","changelist","generator"];var i=v(e,t);n._addClientInfo(i);if(e.selectorIds){i.selector=e.selectorIds}if(e.changeTypes){i.changeType=e.changeTypes}delete e.reference;var s=r.getUrl(T.CHANGES,e,i);var o=r.getUrl(T.TOKEN,e);var u=a.getRequestOptions(n,o);return a.sendRequest(s,"DELETE",u).then(function(e){if(e&&e.response){e.response.forEach(function(e){e.fileName=e.name;delete e.name})}p.hide();return e}).catch(function(e){p.hide();return Promise.reject(e)})})},publish:function(e){var t=sap.ui.getCore().getLibraryResourceBundle("sap.ui.fl");var n=function(n){p.hide();var r=t.getText("MSG_TRANSPORT_ERROR",n?[n.message||n]:undefined);var a=t.getText("HEADER_TRANSPORT_ERROR");d.error("transport error"+n);g.show(r,{icon:g.Icon.ERROR,title:a,styleClass:e.transportDialogSettings.styleClass});return"Error"};var r=new i;return r.openTransportSelection(null,e.transportDialogSettings.rootControl,e.transportDialogSettings.styleClass).then(function(n){if(r.checkTransportInfo(n)){p.show(0);var a={reference:e.reference,layer:e.layer};return r._prepareChangesForTransport(n,e.localChanges,e.appVariantDescriptors,a).then(function(){p.hide();if(n.transport==="ATO_NOTIFICATION"){return t.getText("MSG_ATO_NOTIFICATION")}return t.getText("MSG_TRANSPORT_SUCCESS")})}return"Cancel"})["catch"](n)},getFlexInfo:function(e){var t=["layer"];var a=v(e,t);n._addClientInfo(a);var i=r.getUrl(T.FLEX_INFO,e,a);return r.sendRequest(i).then(function(e){return e.response})},getContexts:function(e){var t=["type","$skip","$filter"];var a=v(e,t);n._addClientInfo(a);var i=r.getUrl(T.CONTEXTS,e,a);return r.sendRequest(i).then(function(e){return e.response})},loadContextDescriptions:function(e){e.method="POST";e.isContextSharing=true;return E(e).then(function(e){return e.response})},isContextSharingEnabled:function(){return Promise.resolve(true)},loadFeatures:function(e){if(n.settings){return Promise.resolve(n.settings)}var t={};n._addClientInfo(t);var a=r.getUrl(T.SETTINGS,e,t);return r.sendRequest(a).then(function(e){e.response.isVariantAdaptationEnabled=!!e.response.isPublicLayerAvailable;return e.response})},write:function(e){e.method="POST";return E(e)},condense:function(e){e.method="POST";e.isCondensingEnabled=true;return E(e)},update:function(e){if(e.flexObject.fileType==="variant"){e.isLegacyVariant=true}e.method="PUT";return E(e)},remove:function(e){var t={namespace:e.flexObject.namespace,layer:e.flexObject.layer};if(e.transport){t.changelist=e.transport}n._addClientInfo(t);e.fileName=e.flexObject.fileName;var i=e.flexObject.fileType==="variant"?T.VARIANTS:T.CHANGES;var s=r.getUrl(i,e,t);s=decodeURIComponent(s);delete e.fileName;var o=r.getUrl(T.TOKEN,e);var u=a.getRequestOptions(n,o,undefined,"application/json; charset=utf-8","json");return a.sendRequest(s,"DELETE",u)},appVariant:{getManifest:function(e){var t=e.appVarUrl;var r=a.getRequestOptions(n,l.getLrepUrl()+T.TOKEN,undefined,"application/json; charset=utf-8","json");return a.sendRequest(t,"GET",r)},load:function(e){var t=r.getUrl(T.APPVARIANTS,e);var i=a.getRequestOptions(n,l.getLrepUrl()+T.TOKEN,undefined,"application/json; charset=utf-8","json");return a.sendRequest(t,"GET",i)},create:function(e){e.method="POST";e.isAppVariant=true;return E(e)},assignCatalogs:function(e){var t={};t.action=e.action;delete e.action;t.assignFromAppId=e.assignFromAppId;delete e.assignFromAppId;var i=r.getUrl(T.APPVARIANTS,e,t);delete e.reference;var s=r.getUrl(T.TOKEN,e);var o=a.getRequestOptions(n,s,undefined,"application/json; charset=utf-8","json");return a.sendRequest(i,"POST",o)},unassignCatalogs:function(e){var t={};t.action=e.action;delete e.action;var i=r.getUrl(T.APPVARIANTS,e,t);delete e.reference;var s=r.getUrl(T.TOKEN,e);var o=a.getRequestOptions(n,s,undefined,"application/json; charset=utf-8","json");return a.sendRequest(i,"POST",o)},update:function(e){return R(e).then(function(t){if(t){e.transport=t}delete e.isForSmartBusiness;e.method="PUT";e.isAppVariant=true;return E(e)})},remove:function(e){return R(e).then(function(t){var i={};if(t){i.changelist=t}delete e.isForSmartBusiness;var s=r.getUrl(T.APPVARIANTS,e,i);delete e.reference;var o=r.getUrl(T.TOKEN,e);var u=a.getRequestOptions(n,o,undefined,"application/json; charset=utf-8","json");return a.sendRequest(s,"DELETE",u)})},list:function(e){var t={};t.layer=e.layer;t["sap.app/id"]=e.reference;delete e.layer;delete e.reference;var i=r.getUrl(T.APPVARIANTS_OVERVIEW,e,t);var s=a.getRequestOptions(n,undefined,undefined,"application/json; charset=utf-8","json");return a.sendRequest(i,"GET",s)}},ui2Personalization:{create:function(e){e.initialConnector=this.initialConnector;var t=l.getLrepUrl();var r=a.getRequestOptions(n,t+T.TOKEN,e.flexObjects||e.flexObject,"application/json; charset=utf-8","json");var i=t+T.UI2PERSONALIZATION;return a.sendRequest(i,"PUT",r)},remove:function(e){e.initialConnector=this.initialConnector;var t=r.getUrl(T.UI2PERSONALIZATION,{url:l.getLrepUrl()},{reference:e.reference,containerkey:e.containerKey,itemname:e.itemName});return a.sendRequest(t,"DELETE")}},versions:{load:function(e){var t=a.getRequestOptions(n,T.TOKEN);var i={};r.addLanguageInfo(i);i.limit=e.limit;var s=r.getUrl(T.VERSIONS.GET,e,i);return a.sendRequest(s,"GET",t).then(function(e){return e.response.versions.map(function(e){return N(e)})})},activate:function(e){var t=a.getRequestOptions(n,T.TOKEN,{title:e.title},"application/json; charset=utf-8","json");var i={version:e.version};r.addLanguageInfo(i);var s=r.getUrl(T.VERSIONS.ACTIVATE,e,i);return a.sendRequest(s,"POST",t).then(function(e){var t=e.response;return N(t)})},discardDraft:function(e){var t=a.getRequestOptions(n,T.TOKEN);var i=r.getUrl(T.VERSIONS.DISCARD,e);return a.sendRequest(i,"DELETE",t)}}})});