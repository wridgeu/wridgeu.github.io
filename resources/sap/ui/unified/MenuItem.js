/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/IconPool","./MenuItemBase","./library","sap/ui/core/library"],function(t,e,i,s){"use strict";var a=e.extend("sap.ui.unified.MenuItem",{metadata:{library:"sap.ui.unified",properties:{text:{type:"string",group:"Appearance",defaultValue:""},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}}}});t.insertFontFaceStyle();a.prototype.render=function(t,e,i,a){var n=t,o=e.getSubmenu(),l=e.getEnabled();n.openStart("li",e);if(e.getVisible()){n.attr("tabindex","0")}n.class("sapUiMnuItm");if(a.iItemNo==1){n.class("sapUiMnuItmFirst")}else if(a.iItemNo==a.iTotalItems){n.class("sapUiMnuItmLast")}if(!i.checkEnabled(e)){n.class("sapUiMnuItmDsbl")}if(e.getStartsSection()){n.class("sapUiMnuItmSepBefore")}if(e.getTooltip_AsString()){n.attr("title",e.getTooltip_AsString())}if(a.bAccessible){n.accessibilityState(e,{role:"menuitem",disabled:!l,posinset:a.iItemNo,setsize:a.iTotalItems,labelledby:{value:this.getId()+"-txt",append:true}});if(o){n.attr("aria-haspopup",s.aria.HasPopup.Menu.toLowerCase());n.attr("aria-owns",o.getId())}}n.openEnd();n.openStart("div");n.class("sapUiMnuItmL");n.openEnd();n.close("div");if(e.getIcon()){n.openStart("div");n.class("sapUiMnuItmIco");n.openEnd();n.icon(e.getIcon(),null,{title:null});n.close("div")}n.openStart("div",this.getId()+"-txt");n.class("sapUiMnuItmTxt");n.openEnd();n.text(e.getText());n.close("div");n.openStart("div",this.getId()+"-scuttxt");n.class("sapUiMnuItmSCut");n.openEnd();n.close("div");n.openStart("div");n.class("sapUiMnuItmSbMnu");n.openEnd();if(o){n.openStart("div");n.class("sapUiIconMirrorInRTL");n.openEnd();n.close("div")}n.close("div");n.openStart("div");n.class("sapUiMnuItmR");n.openEnd();n.close("div");n.close("li")};a.prototype.hover=function(t,e){this.$().toggleClass("sapUiMnuItmHov",t)};a.prototype.focus=function(t){if(this.getVisible()){this.$().trigger("focus")}else{t.focus()}};return a});
//# sourceMappingURL=MenuItem.js.map