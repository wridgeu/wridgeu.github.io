/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/deepClone","sap/ui/fl/apply/_internal/flexState/ManifestUtils","sap/ui/fl/initial/_internal/Storage","sap/ui/fl/Utils"],function(e,n,t,a){"use strict";function i(e){if(typeof e==="string"){e={id:e}}e.idIsLocal=true;return e}function r(e,n){if(e){[n.changes,n.variantChanges,n.variantDependentControlChanges,n.variantManagementChanges].forEach(function(e){e.forEach(function(e){if(!e.selector.idIsLocal){e.selector=i(e.selector);if(e.dependentSelector){Object.keys(e.dependentSelector).forEach(function(n){e.dependentSelector[n]=e.dependentSelector[n].map(i)})}}})})}return n}function o(e){return e&&!!n.getOvpEntry(e)}function c(e){return{changes:e,cacheKey:e.cacheKey}}return{loadFlexData:function(e){var i=n.getBaseComponentNameFromManifest(e.manifest);if(e.partialFlexData){return t.completeFlexData({reference:e.reference,componentName:i,partialFlexData:e.partialFlexData}).then(c)}var s=e.reInitialize?undefined:n.getCacheKeyFromAsyncHints(e.reference,e.asyncHints);return t.loadFlexData({reference:e.reference,componentName:i,cacheKey:s,siteId:a.getSiteIdByComponentData(e.componentData),appDescriptor:e.manifest.getRawJson?e.manifest.getRawJson():e.manifest,version:e.version,allContexts:e.allContexts}).then(r.bind(undefined,o(e.manifest))).then(c)}}});