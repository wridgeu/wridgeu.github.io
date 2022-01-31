/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/core/Core","sap/ui/fl/Variant","sap/ui/fl/Utils"],function(e,t,n,r){"use strict";function a(e,t){if(!t){return undefined}if(e.indexOf(t.getId())>-1){return t.getId()}return a(e,t.getParent())}function o(e,n){var a=r.getAppComponentForControl(e);var o=a.getRootControl();var i=[];if(!n&&o.getDomRef()){i=Array.from(o.getDomRef().querySelectorAll(".sapUiFlVarMngmt"))}if(n||i.length===0){i=Array.from(t.getStaticAreaRef().querySelectorAll(".sapUiFlVarMngmt"))}return i.map(function(e){return e.id})}var i={DEFAULT_AUTHOR:"SAP",VARIANT_TECHNICAL_PARAMETER:"sap-ui-fl-control-variant-id",compareVariants:function(e,t){if(e.content.content.title.toLowerCase()<t.content.content.title.toLowerCase()){return-1}else if(e.content.content.title.toLowerCase()>t.content.content.title.toLowerCase()){return 1}return 0},getIndexToSortVariant:function(e,t){var n=e.length;e.some(function(e,r){if(i.compareVariants(t,e)<0){n=r;return true}});return n},createVariant:function(t){var r;var a;var o=t.variantSpecificData.content.variantManagementReference;if(o){var i=e.checkControlId(o,t.model.oAppComponent);if(!i){throw new Error("Generated ID attribute found - to offer flexibility a stable VariantManagement ID is needed to assign the changes to, but for this VariantManagement control the ID was generated by SAPUI5 "+o)}}t.variantSpecificData.content.reference=t.model.sFlexReference;t.variantSpecificData.content.packageName="$TMP";a=n.createInitialFileContent(t.variantSpecificData);r=new n(a);return r},getRelevantVariantManagementControlId:function(e,n,r){var i={};if(!n||!n.length){n=o(e,r)}var c=n.reduce(function(e,n){var r=t.byId(n);var a=r.getFor();a.forEach(function(e){i[e]=n});return e.concat(a)},[]);var f=a(c,e);return i[f]},belongsToVariantManagement:function(e){var t=o(e);return!!i.getRelevantVariantManagementControlId(e,t)},getAllVariantManagementControlIds:function(e){return o(e)}};return i});