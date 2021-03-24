/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control"],function(a){"use strict";var e=a.extend("sap.f.cards.BaseHeader",{metadata:{library:"sap.f",abstract:true,aggregations:{toolbar:{type:"sap.ui.core.Control",multiple:false}}}});e.prototype.onBeforeRendering=function(){var a=this.getToolbar();if(a){a.addStyleClass("sapFCardHeaderToolbar")}};return e});