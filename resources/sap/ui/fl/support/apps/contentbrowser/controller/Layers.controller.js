/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/fl/support/apps/contentbrowser/utils/ErrorUtils"],function(e,r){"use strict";return e.extend("sap.ui.fl.support.apps.contentbrowser.controller.Layers",{onLayerSelected:function(e){var r=e.getSource();var t=r.getBindingContextPath().substring(1);var o=this.getView().getModel("layers").getData();var s=o[t].name;var a=sap.ui.core.UIComponent.getRouterFor(this);a.navTo("LayerContentMaster",{layer:s})},handleMessagePopoverPress:function(e){var t=e.getSource();r.handleMessagePopoverPress(t)}})});