/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexState/ManifestUtils","sap/ui/fl/initial/_internal/Storage","sap/ui/fl/Utils"],function(e,a,t){"use strict";function n(e){return{changes:e,cacheKey:e.cacheKey}}return{loadFlexData:function(i){var r=e.getBaseComponentNameFromManifest(i.manifest);if(i.partialFlexData){return a.completeFlexData({reference:i.reference,componentName:r,partialFlexData:i.partialFlexData}).then(n)}var s=i.reInitialize?undefined:e.getCacheKeyFromAsyncHints(i.reference,i.asyncHints);return a.loadFlexData({reference:i.reference,componentName:r,cacheKey:s,siteId:t.getSiteIdByComponentData(i.componentData),appDescriptor:i.manifest.getRawJson?i.manifest.getRawJson():i.manifest,version:i.version}).then(n)}}});