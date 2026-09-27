/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer"],function(e){"use strict";var t={apiVersion:2};t.render=function(e,t){e.openStart("div",t).class("sapUiIntImageWithOverlay");if(t.getPadding()==="MediumStart"){e.class("sapUiIntImageWithOverlayPaddingMediumStart")}e.openEnd();e.renderControl(t.getAggregation("image"));e.renderControl(t._getTextsLayout());e.close("div")};return t});
//# sourceMappingURL=ImageWithOverlayRenderer.js.map