/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge"],function(e){"use strict";var i={isKeyUser:false,isVariantSharingEnabled:false,isVariantPersonalizationEnabled:true,isAtoAvailable:false,isAtoEnabled:false,versioning:{},isProductiveSystem:true,isPublicLayerAvailable:false,isZeroDowntimeUpgradeRunning:false,system:"",client:""};function n(e){var i={};var n=!!e.features.isVersioningEnabled;e.layers.forEach(function(e){i[e]=n});return i}return{mergeResults:function(a){var s=i;a.forEach(function(i){Object.keys(i.features).forEach(function(e){if(e!=="isVersioningEnabled"){s[e]=i.features[e]}});s.versioning=e(s.versioning,n(i))});return s}}});