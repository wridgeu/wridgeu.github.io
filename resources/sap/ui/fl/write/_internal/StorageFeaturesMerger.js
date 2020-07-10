/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge"],function(e){"use strict";var n={isKeyUser:false,isVariantSharingEnabled:false,isAtoAvailable:false,isAtoEnabled:false,versioning:{},isProductiveSystem:true,isZeroDowntimeUpgradeRunning:false,system:"",client:""};function i(e){var n={};var i=!!e.features.isVersioningEnabled;e.layers.forEach(function(e){n[e]=i});return n}return{mergeResults:function(s){var r=n;s.forEach(function(n){Object.keys(n.features).forEach(function(e){if(e!=="isVersioningEnabled"){r[e]=n.features[e]}});r.versioning=e(r.versioning,i(n))});return r}}});