/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/security/encodeURLParameters","sap/base/Log","sap/ui/fl/Layer","sap/ui/fl/LayerUtils","sap/base/util/isEmptyObject"],function(n,e,t,r,a){"use strict";var o={load:{LrepConnector:"sap/ui/fl/initial/_internal/connectors/LrepConnector",NeoLrepConnector:"sap/ui/fl/initial/_internal/connectors/NeoLrepConnector",PersonalizationConnector:"sap/ui/fl/initial/_internal/connectors/PersonalizationConnector",KeyUserConnector:"sap/ui/fl/initial/_internal/connectors/KeyUserConnector",StaticFileConnector:"sap/ui/fl/initial/_internal/connectors/StaticFileConnector",ObjectStorageConnector:"sap/ui/fl/apply/_internal/connectors/ObjectStorageConnector",JsObjectConnector:"sap/ui/fl/write/_internal/connectors/JsObjectConnector",ObjectPathConnector:"sap/ui/fl/write/_internal/connectors/ObjectPathConnector",LocalStorageConnector:"sap/ui/fl/write/_internal/connectors/LocalStorageConnector",SessionStorageConnector:"sap/ui/fl/write/_internal/connectors/SessionStorageConnector"},write:{LrepConnector:"sap/ui/fl/write/_internal/connectors/LrepConnector",NeoLrepConnector:"sap/ui/fl/write/_internal/connectors/NeoLrepConnector",PersonalizationConnector:"sap/ui/fl/write/_internal/connectors/PersonalizationConnector",KeyUserConnector:"sap/ui/fl/write/_internal/connectors/KeyUserConnector",StaticFileConnector:"sap/ui/fl/write/_internal/connectors/StaticFileConnector",JsObjectConnector:"sap/ui/fl/write/_internal/connectors/JsObjectConnector",ObjectPathConnector:"sap/ui/fl/write/_internal/connectors/ObjectPathConnector",LocalStorageConnector:"sap/ui/fl/write/_internal/connectors/LocalStorageConnector",SessionStorageConnector:"sap/ui/fl/write/_internal/connectors/SessionStorageConnector"}};var i="sap/ui/fl/initial/_internal/connectors/";var c={connector:"StaticFileConnector"};function s(n,e){return n.filter(function(n){return e.indexOf(n)!==-1||e[0]==="ALL"})}function l(n){function e(n,e){return new Date(n.creation)-new Date(e.creation)}["changes","variantChanges","variants","variantDependentControlChanges","variantManagementChanges"].forEach(function(t){n[t]=n[t].sort(e)});return n}function u(n,e,t){return t.map(function(n){var t=n.connector;var r;if(!n.loadConnector&&!n.applyConnector&&!n.loadConnector){r=e?o.load[t]:o.write[t]}else if(e){r=n.loadConnector||n.applyConnector}else{r=n.writeConnector||"sap/ui/fl/write/connectors/BaseConnector"}return r})}function f(n,e,t){var r=u(n,e,t);return new Promise(function(n){sap.ui.require(r,function(){Array.from(arguments).forEach(function(n,r){if(!t[r].layers){t[r].layers=n.layers}else{t[r].layers=s(t[r].layers,n.layers)}if(e){t[r].loadConnectorModule=n}else{t[r].writeConnectorModule=n}});n(t)})})}return{getConnectors:function(n,e){var t=sap.ui.getCore().getConfiguration().getFlexibilityServices();var r=[];if(e){r=[c]}r=r.concat(t);return f(n,e,r)},getLoadConnectors:function(){return this.getConnectors(i,true)},getStaticFileConnector:function(){return f(i,true,[c])},logAndResolveDefault:function(n,t,r,a){e.error("Connector ("+t.connector+") failed call '"+r+"': "+a+"\nApplication startup continues without data from this storage.");return n},filterAndSortResponses:function(n){var e=[];Object.keys(n).forEach(function(t){e.push(n[t])});e=e.filter(function(n){return n.changes.length>0||n.variants.length>0||n.variantChanges.length>0||n.variantManagementChanges.length>0||n.variantDependentControlChanges.length>0||n.comp.variants.length>0||n.comp.changes.length>0||n.comp.defaultVariants.length>0||n.comp.standardVariants.length>0});e.sort(function(n,e){return n.index-e.index});return e},getGroupedFlexObjects:function(n){var e={};Object.keys(t).forEach(function(n){e[n]=this.getEmptyFlexDataResponse();e[n].index=r.getLayerIndex(n)}.bind(this));n.forEach(function(n){var t=n.layer;if(n.fileType==="ctrl_variant"&&n.variantManagementReference){e[t].variants.push(n)}else if(n.fileType==="ctrl_variant_change"){e[t].variantChanges.push(n)}else if(n.fileType==="ctrl_variant_management_change"){e[t].variantManagementChanges.push(n)}else if(n.fileType==="variant"){e[t].comp.variants.push(n)}else if(n.fileType==="change"){if(n.variantReference){e[t].variantDependentControlChanges.push(n)}else{switch(n.changeType){case"addFavorite":case"removeFavorite":e[t].comp.changes.push(n);break;case"defaultVariant":e[t].comp.defaultVariants.push(n);break;case"standardVariant":e[t].comp.standardVariants.push(n);break;default:e[t].changes.push(n)}}}});Object.keys(e).forEach(function(n){l(e[n])});return e},getEmptyFlexDataResponse:function(){return Object.assign({},{appDescriptorChanges:[],changes:[],comp:{variants:[],changes:[],defaultVariants:[],standardVariants:[]},variants:[],variantChanges:[],variantDependentControlChanges:[],variantManagementChanges:[],ui2personalization:{}})},isStorageResponseFilled:function(n){return Object.keys(n||{}).some(function(e){if(Array.isArray(n[e])){return n[e].length!==0}return!a(n[e])})},addLanguageInfo:function(n){if(!n){n={}}n["sap-language"]=sap.ui.getCore().getConfiguration().getLanguage()}}});