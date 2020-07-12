/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Utils","sap/base/util/ObjectPath","sap/base/Log","sap/ui/fl/Change","sap/base/util/includes","sap/ui/fl/apply/_internal/controlVariants/Utils","sap/base/util/isEmptyObject","sap/base/util/each","sap/base/util/values","sap/base/util/merge","sap/ui/core/Component","sap/ui/fl/LayerUtils"],function(e,n,t,a,r,i,c,o,s,u,f,l){"use strict";function v(e,n){var t=u({},e);n.forEach(function(e){t[e.fileName]={content:e,controlChanges:[],variantChanges:{}}});return t}function g(e,n){var t=u({},e);n.forEach(function(e){t[e.variantReference]=t[e.variantReference]||N(e.variantReference);t[e.variantReference].controlChanges.push(e)});return t}function h(e,n){var t=u({},e);n.forEach(function(e){t[e.selector.id]=t[e.selector.id]||N(e.selector.id);var n=t[e.selector.id].variantChanges[e.changeType]||[];n.push(e);t[e.selector.id].variantChanges[e.changeType]=n});return t}function p(e){var t=u({},e);s(e).forEach(function(e){var a=n.get("variantChanges.setVisible",e);if(a&&a.length>0){var r=x(a);if(!r.getContent().visible&&r.getContent().createdByReset){delete t[e.content.fileName]}}});return t}function C(e){var n=u({},e);s(n).forEach(function(e){var t=e.content.variantReference;var a;if(t){a=m(n,t,e.content.variantManagementReference)}e.controlChanges=b(a,e.content.layer).concat(e.controlChanges)});return n}function b(e,n){if(!e){return[]}return s(u({},e.controlChanges)).filter(function(e){return l.compareAgainstCurrentLayer(e.layer,n)===-1})}function m(e,n,t){var a=e[n];if(!a&&n===t){a=N(n);e[n]=a}return a}function R(e){var n={};n=v(n,e.variants);n=g(n,e.variantDependentControlChanges);n=h(n,e.variantChanges);n=p(n);n=C(n);return n}function d(){return{variantManagementChanges:{},variants:[]}}function T(e,n,t){var a=u({},e);s(n).forEach(function(e){var n=e.content.variantManagementReference;if(!a[n]){a[n]=d()}e=O(e);e=V(e);if(!a[n].currentVariant&&e.content.content.visible&&r(t,e.content.fileName)){a[n].currentVariant=e.content.fileName}a[n].defaultVariant=n;var c=i.getIndexToSortVariant(a[n].variants,e);a[n].variants.splice(c,0,e)});return a}function E(e,n){var t=u({},e);n.forEach(function(e){var n=e.selector.id;if(!t[n]){t[n]=d()}var a=e.changeType;if(!t[n].variantManagementChanges[a]){t[n].variantManagementChanges[a]=[]}t[n].variantManagementChanges[a].push(e);t[n]=M(t[n])});return t}function A(e){var n=u({},e);o(n,function(e,n){var t=n.variants.findIndex(function(n){return n.content.fileName===e});var a;if(t===-1){a=N(e)}else{a=n.variants[t];n.variants.splice(t,1)}n.variants.unshift(a)});return n}function y(e,n,t){var a={};a=T(a,e,t);a=E(a,n);a=A(a);return a}function N(e){var n=sap.ui.getCore().getLibraryResourceBundle("sap.ui.fl");return{content:{fileName:e,variantManagementReference:e,content:{title:n.getText("STANDARD_VARIANT_TITLE"),favorite:true,visible:true},support:{user:i.DEFAULT_AUTHOR}},variantChanges:{},controlChanges:[]}}function M(e){var n=u({},e);var t=n.variantManagementChanges;var a;if(!c(t)){a=x(t["setDefault"]);if(a){n.defaultVariant=a.getContent().defaultVariant}}return n}function V(e){var n=u({},e);var a=n.variantChanges;var r;o(a,function(e,a){switch(e){case"setTitle":r=x(a);if(r){n.content.content.title=r.getText("title")}break;case"setFavorite":r=x(a);if(r){n.content.content.favorite=r.getContent().favorite}break;case"setExecuteOnSelect":r=x(a);if(r){n.content.content.executeOnSelect=r.getContent().executeOnSelect}break;case"setVisible":r=x(a);if(r){n.content.content.visible=r.getContent().visible}break;default:t.error("No valid changes on variant "+n.content.content.title+" available")}});return n}function x(e){if(e.length>0){return new a(e[e.length-1])}return false}function L(e){return sap.ui.getCore().getLibraryResourceBundle("sap.ui.fl").getText(e)}function O(e){var t=u({},e);if(t.content.fileName===t.content.variantManagementReference){if(!n.get("content.support.user",t)){var a={support:{user:i.DEFAULT_AUTHOR}};u(t.content,a)}}if(!t.content.content.favorite){t.content.content.favorite=true}if(!t.content.content.visible){t.content.content.visible=true}if(!t.content.content.executeOnSelect){t.content.content.executeOnSelect=false}var r=t.content.content.title.match(/.i18n>(\w+)./);if(r){t.content.content.title=L(r[1])}return t}return function(e){if(c(e)||!n.get("storageResponse.changes.variants",e)){return{}}var t=n.get(["technicalParameters",i.VARIANT_TECHNICAL_PARAMETER],e.componentData)||[];var a=R(e.storageResponse.changes);a=y(a,e.storageResponse.changes.variantManagementChanges,t);return a}});