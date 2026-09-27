/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/ui/model/json/JSONModel"],function(e,t){"use strict";var a={layers:{admin:0,content:5,translation:10,all:20},mergeManifestPathChanges:function(e,t){Object.keys(t).forEach(function(a){if(a.charAt(0)==="/"){var r=t[a];e.setProperty(a,r)}})},mergeDelta:function(r,n,i){var o=e({},r);if(typeof i==="undefined"){i="sap.card"}if(Array.isArray(n)&&n.length>0){var s;n.forEach(function(r){if(r.content){e(o[i],r.content)}else{s=s||new t(o);a.mergeManifestPathChanges(s,r)}})}return o},mergeDesigntimeMetadata:function(t,a){var r=e({},t);a.forEach(function(e){var t=e.content.entityPropertyChange||[];t.forEach(function(e){var t=e.propertyPath;switch(e.operation){case"UPDATE":if(r.hasOwnProperty(t)){r[t]=e.propertyValue}break;case"DELETE":delete r[t];break;case"INSERT":if(!r.hasOwnProperty(t)){r[t]=e.propertyValue}break;default:break}})});return r}};return a});
//# sourceMappingURL=Merger.js.map