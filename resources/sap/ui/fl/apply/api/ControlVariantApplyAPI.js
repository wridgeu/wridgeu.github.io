/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/fl/ControlPersonalizationAPI","sap/ui/fl/Utils"],function(t,a,e){"use strict";var r={clearVariantParameterInURL:function(t){a.clearVariantParameterInURL(t.control)},activateVariant:function(t){return a.activateVariant(t.element,t.variantReference)},attachVariantApplied:function(t){var a=t.selector.id&&sap.ui.getCore().byId(t.selector.id)||t.selector;var r=e.getAppComponentForControl(a);var n=r.getModel(e.VARIANT_MODEL_NAME);n.attachVariantApplied({vmControlId:t.vmControlId,control:a,callback:t.callback,callAfterInitialVariant:t.callAfterInitialVariant})},detachVariantApplied:function(t){var a=t.selector.id&&sap.ui.getCore().byId(t.selector.id)||t.selector;var r=e.getAppComponentForControl(a);var n=r.getModel(e.VARIANT_MODEL_NAME);n.detachVariantApplied(t.vmControlId,a.getId())}};return r},true);