/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge"],function(e){"use strict";var i={isKeyUser:false,isKeyUserTranslationEnabled:false,isVariantSharingEnabled:false,isPublicFlVariantEnabled:false,isVariantPersonalizationEnabled:true,isAtoAvailable:false,isAtoEnabled:false,versioning:{},isProductiveSystem:true,isPublicLayerAvailable:false,isZeroDowntimeUpgradeRunning:false,system:"",client:""};function a(e){var i={};var a=!!e.features.isVersioningEnabled;e.layers.forEach(function(e){i[e]=a});return i}return{mergeResults:function(n){var s=i;n.forEach(function(i){Object.keys(i.features).forEach(function(e){if(e!=="isVersioningEnabled"){s[e]=i.features[e]}});s.versioning=e(s.versioning,a(i))});return s}}});