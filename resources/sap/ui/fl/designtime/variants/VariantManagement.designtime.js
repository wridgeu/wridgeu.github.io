/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Utils"],function(e){"use strict";var t=function(t,n){var r=e.getAppComponentForControl(t);var a=t.getId();var o=r.getModel(e.VARIANT_MODEL_NAME);var i=r.getLocalId(a)||a;if(!o){return}o.setModelPropertiesForControl(i,n,t);o.checkUpdate(true)};return{annotations:{},properties:{showExecuteOnSelection:{ignore:false},showSetAsDefault:{ignore:false},manualVariantKey:{ignore:false},inErrorState:{ignore:false},editable:{ignore:false},modelName:{ignore:false},updateVariantInURL:{ignore:false}},variantRenameDomRef:function(e){return e.getTitle().getDomRef("inner")},customData:{},tool:{start:function(e){var n=true;t(e,n)},stop:function(e){var n=false;t(e,n)}}}});