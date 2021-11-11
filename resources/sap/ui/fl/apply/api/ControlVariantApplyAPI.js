/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/fl/ControlPersonalizationAPI","sap/ui/fl/Utils"],function(a,t,e){"use strict";var r={clearVariantParameterInURL:function(a){t.clearVariantParameterInURL(a.control)},activateVariant:function(a){return t.activateVariant(a.element,a.variantReference)},attachVariantApplied:function(a){var t=a.selector.id&&sap.ui.getCore().byId(a.selector.id)||a.selector;var r=e.getAppComponentForControl(t);var n=r.getModel(e.VARIANT_MODEL_NAME);n.attachVariantApplied({vmControlId:a.vmControlId,control:t,callback:a.callback,callAfterInitialVariant:a.callAfterInitialVariant})},detachVariantApplied:function(a){var t=a.selector.id&&sap.ui.getCore().byId(a.selector.id)||a.selector;var r=e.getAppComponentForControl(t);var n=r.getModel(e.VARIANT_MODEL_NAME);n.detachVariantApplied(a.vmControlId,t.getId())}};return r});