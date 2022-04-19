/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/library","sap/ui/core/Renderer","sap/ui/core/Core","sap/ui/Device","sap/m/StandardListItemRenderer"],function(t,e,s,i,r){"use strict";var n=e.extend(r);n.apiVersion=2;var a=t.AttributesLayoutType;n.renderLIAttributes=function(t,e){r.renderLIAttributes.apply(this,arguments);t.class("sapUiIntLCI");if(e.getIcon()){t.class("sapUiIntLCIIconSize"+e.getIconSize())}if(e.getMicrochart()){t.class("sapUiIntLCIWithChart")}if(e.getActionsStrip()){t.class("sapUiIntLCIWithActionsStrip")}if(e.getAttributes().length){t.class("sapUiIntLCIWithAttributes")}};n.renderLIContent=function(t,e){var s=e.getInfo(),i=e.getTitle(),r=e.getDescription(),n=e.getAdaptTitleSize(),a=!i&&s;if(e.getIcon()||e.getIconInitials()){t.renderControl(e._getAvatar())}t.openStart("div").class("sapMSLIDiv");if(!r&&n&&s||a){t.class("sapMSLIInfoMiddle")}t.openEnd();this.renderTitleWrapper(t,e);if(i&&r){this.renderDescription(t,e)}if(a&&!e.getWrapping()){this.renderInfo(t,e)}t.close("div")};n.render=function(t,e){if(!e.getVisible()){this.renderInvisible(t,e);return}this.openItemTag(t,e);t.class("sapMLIB");t.class("sapMLIB-CTX");t.class("sapMLIBShowSeparator");t.class("sapMLIBType"+e.getType());t.class("sapMLIB");if(i.system.desktop&&e.isActionable()){t.class("sapMLIBActionable");t.class("sapMLIBHoverable")}if(e.getSelected()){t.class("sapMLIBSelected")}if(e.getListProperty("showUnread")&&e.getUnread()){t.class("sapMLIBUnread")}this.addFocusableClasses(t,e);this.renderTooltip(t,e);this.renderTabIndex(t,e);if(s.getConfiguration().getAccessibility()){t.accessibilityState(e,this.getAccessibilityState(e))}this.renderLIAttributes(t,e);t.openEnd();this.renderContentFormer(t,e);this.renderLIContentWrapper(t,e);this.renderContentLatter(t,e);this.renderItemAttributes(t,e);this.renderFooter(t,e);this.closeItemTag(t,e)};n.renderItemAttributes=function(t,e){var s=e.getAttributes(),i=e.getAttributesLayoutType(),r=s.length,n;if(!r){return}t.openStart("div").class("sapUiIntLCIAttrs").openEnd();for(n=0;n<r;n++){t.openStart("div").class("sapUiIntLCIAttrRow").openEnd();t.openStart("span").class("sapUiIntLCIAttrCell").openEnd();t.renderControl(s[n]);t.close("span");if(i===a.TwoColumns){n++;if(s[n]){t.openStart("span").class("sapUiIntLCIAttrCell").class("sapUiIntLCIAttrSecondCell").openEnd();t.renderControl(s[n]);t.close("span")}}t.close("div")}t.close("div")};n.renderFooter=function(t,e){var s=e.getMicrochart(),i=e.getActionsStrip();if(!s&&!i){return}t.openStart("div").class("sapUiIntLCIFooter").openEnd();if(s){t.renderControl(s)}if(i){t.renderControl(i)}t.close("div")};return n},true);