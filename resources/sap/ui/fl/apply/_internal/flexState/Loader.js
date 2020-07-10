/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexState/ManifestUtils","sap/ui/fl/apply/_internal/Storage","sap/ui/fl/Utils"],function(e,a,t){"use strict";function n(e){return{changes:e,cacheKey:e.cacheKey}}return{loadFlexData:function(r){var i=e.getBaseComponentNameFromManifest(r.manifest);if(r.partialFlexData){return a.completeFlexData({reference:r.reference,componentName:i,partialFlexData:r.partialFlexData}).then(n)}return a.loadFlexData({reference:r.reference,appVersion:t.getAppVersionFromManifest(r.manifest)||t.DEFAULT_APP_VERSION,componentName:i,cacheKey:e.getCacheKeyFromAsyncHints(r.asyncHints),siteId:t.getSiteIdByComponentData(r.componentData),appDescriptor:r.manifest.getRawJson?r.manifest.getRawJson():r.manifest,draftLayer:r.draftLayer}).then(n)}}});