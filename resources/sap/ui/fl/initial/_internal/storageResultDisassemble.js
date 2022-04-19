/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/initial/_internal/StorageUtils","sap/base/util/merge","sap/base/util/isEmptyObject"],function(a,e,n){"use strict";function t(a,e){if(e.content.fileName!==e.content.variantManagementReference){a.push(e.content)}e.controlChanges.forEach(function(e){a.push(e)});for(var n in e.variantChanges){a=a.concat(e.variantChanges[n])}return a}function r(a){var e=true;if(a){Object.keys(a).some(function(n){if(a[n].length){e=false;return true}})}return e}return function(i){var s;if(!n(i.variantSection)){s=i.changes||[];for(var c in i.variantSection){var o=i.variantSection[c];for(var u in o.variantManagementChanges){s=s.concat(o.variantManagementChanges[u])}s=o.variants.reduce(t,s)}var f=a.getGroupedFlexObjects(s);var v=a.filterAndSortResponses(f);delete i.changes;delete i.variantSection;e(v[0]||{},i);return v}if(r(i.comp)){s=i.changes||[];i.comp={variants:[],changes:[],defaultVariants:[],standardVariants:[]};s.slice().reverse().forEach(function(a,e,n){var t=false;if(a.fileType==="variant"){i.comp.variants.unshift(a);t=true}else{switch(a.changeType){case"addFavorite":case"removeFavorite":case"updateVariant":i.comp.changes.unshift(a);t=true;break;case"defaultVariant":i.comp.defaultVariants.unshift(a);t=true;break;case"standardVariant":i.comp.standardVariants.unshift(a);t=true;break;default:break}}if(t){var r=n.length-1-e;i.changes.splice(r,1)}})}return[i]}});