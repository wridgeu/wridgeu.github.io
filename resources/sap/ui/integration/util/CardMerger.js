/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/ui/model/json/JSONModel","sap/ui/core/Core","sap/base/util/deepClone"],function(e,r,t,a){"use strict";var n={layers:{admin:0,content:5,translation:10,all:20},mergeManifestPathChanges:function(e,r){var a=t.getConfiguration().getLanguage().replaceAll("_","-");Object.keys(r).forEach(function(t){if(t.charAt(0)==="/"){var a=r[t];e.setProperty(t,a)}});if(r.hasOwnProperty("texts")&&r.texts.hasOwnProperty(a)){var n=r.texts[a];for(var o in n){e.setProperty(o,n[o])}}},mergeCardDelta:function(t,a,o){var i=e({},t);if(typeof o==="undefined"){o="sap.card"}if(Array.isArray(a)&&a.length>0){var s;a.forEach(function(t){if(t.content){e(i[o],t.content)}else{s=s||new r(i);n.mergeManifestPathChanges(s,t)}})}return i},mergeCardDesigntimeMetadata:function(r,t){var a=e({},r);t.forEach(function(e){var r=e.content.entityPropertyChange||[];r.forEach(function(e){var r=e.propertyPath;switch(e.operation){case"UPDATE":if(a.hasOwnProperty(r)){a[r]=e.propertyValue}break;case"DELETE":delete a[r];break;case"INSERT":if(!a.hasOwnProperty(r)){a[r]=e.propertyValue}break;default:break}})});return a}};return n});