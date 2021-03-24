/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/m/StandardListItemRenderer"],function(e,t){"use strict";var i=e.extend(t);i.apiVersion=2;i.renderLIAttributes=function(e,i){t.renderLIAttributes.apply(this,arguments);e.class("sapUiIntLCI");if(i.getIcon()){e.class("sapUiIntLCIIconSize"+i.getIconSize())}if(i.getMicrochart()){e.class("sapUiIntLCIWithChart")}};i.renderLIContent=function(e,t){var i=t.getInfo(),r=t.getTitle(),n=t.getDescription(),s=t.getAdaptTitleSize(),a=!r&&i;if(t.getIcon()||t.getIconInitials()){e.renderControl(t._getAvatar())}e.openStart("div").class("sapMSLIDiv");if(!n&&s&&i||a){e.class("sapMSLIInfoMiddle")}e.openEnd();this.renderTitleWrapper(e,t);if(r&&n){this.renderDescription(e,t)}if(a&&!t.getWrapping()){this.renderInfo(e,t)}if(t.getMicrochart()){e.renderControl(t.getMicrochart())}e.close("div")};return i},true);