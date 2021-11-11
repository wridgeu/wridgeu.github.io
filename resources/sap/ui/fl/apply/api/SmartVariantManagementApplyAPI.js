/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexState/compVariants/CompVariantMerger","sap/ui/fl/apply/_internal/flexState/compVariants/Utils","sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/apply/_internal/flexState/ManifestUtils","sap/ui/fl/Utils","sap/ui/fl/LayerUtils"],function(t,e,n,r,a,i){"use strict";function o(t){var a=r.getFlexReferenceForControl(t);var i=e.getPersistencyKey(t);var o=n.getCompVariantsMap(a);return o._getOrCreate(i)}function l(t){var i=t.control;var o=r.getFlexReferenceForControl(i);return n.initialize({reference:o,componentData:{},manifest:a.getAppDescriptor(i),componentId:a.getAppComponentForControl(i).getId()}).then(function(){var r=e.getPersistencyKey(i);var a=n.getCompVariantsMap(o);n.setInitialNonFlCompVariantData(o,r,t.standardVariant,t.variants);return a._initialize(r,t.variants)})}var p={loadVariants:function(n){return l(n).then(function(r){var a=e.getPersistencyKey(n.control);return t.merge(a,r,n.standardVariant)})},isApplicationVariant:function(t){var e=t.control;if(a.isApplicationVariant(e)){return true}var n=a.getComponentForControl(e);if(n&&n.getAppComponent){n=n.getAppComponent();if(n){return true}}return false},isVendorLayer:function(){return i.isVendorLayer()},isVariantDownport:function(){return p.isVendorLayer()&&a.isHotfixMode()},getDefaultVariantId:function(t){var e=o(t.control).defaultVariants;var n=e[e.length-1];return n?n.getContent().defaultVariantName:""}};return p});