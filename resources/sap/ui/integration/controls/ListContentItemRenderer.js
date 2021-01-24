/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/m/StandardListItemRenderer"],function(e,t){"use strict";var r=e.extend(t);r.apiVersion=2;r.renderLIAttributes=function(e,r){t.renderLIAttributes.apply(this,arguments);e.class("sapUiIntegrationLCI");e.class("sapUiIntegrationLCIIconSize"+r.getIconSize());if(r.getMicrochart()){e.class("sapUiIntegrationLCIWithChart")}};r.renderLIContent=function(e,t){var r=t.getInfo(),i=t.getTitle(),n=t.getDescription(),a=t.getAdaptTitleSize(),s=!i&&r;if(t.getIcon()||t.getIconInitials()){e.renderControl(t._getAvatar())}e.openStart("div").class("sapMSLIDiv");if(!n&&a&&r||s){e.class("sapMSLIInfoMiddle")}e.openEnd();this.renderTitleWrapper(e,t);if(i&&n){this.renderDescription(e,t)}if(s&&!t.getWrapping()){this.renderInfo(e,t)}if(t.getMicrochart()){e.renderControl(t.getMicrochart())}e.close("div")};return r},true);