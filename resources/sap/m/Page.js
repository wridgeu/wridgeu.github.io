/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/delegate/ScrollEnablement","sap/m/Title","sap/m/Button","sap/m/Bar","sap/ui/core/ContextMenuSupport","sap/ui/core/util/ResponsivePaddingsEnablement","sap/ui/core/library","sap/ui/core/Element","./TitlePropagationSupport","./PageRenderer","sap/ui/thirdparty/jquery"],function(e,t,a,n,r,o,i,s,l,p,u,g,d){"use strict";var h=l.AccessibleLandmarkRole;var f=e.ButtonType;var c=e.PageBackgroundDesign;var y=l.TitleLevel;var _=e.TitleAlignment;var v="div";var m="header";var B="footer";var T=t.extend("sap.m.Page",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Data",defaultValue:null},titleLevel:{type:"sap.ui.core.TitleLevel",group:"Appearance",defaultValue:y.Auto},showNavButton:{type:"boolean",group:"Appearance",defaultValue:false},showHeader:{type:"boolean",group:"Appearance",defaultValue:true},showSubHeader:{type:"boolean",group:"Appearance",defaultValue:true},navButtonText:{type:"string",group:"Misc",defaultValue:null,deprecated:true},navButtonTooltip:{type:"string",group:"Misc",defaultValue:null},enableScrolling:{type:"boolean",group:"Behavior",defaultValue:true},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null,deprecated:true},backgroundDesign:{type:"sap.m.PageBackgroundDesign",group:"Appearance",defaultValue:c.Standard},navButtonType:{type:"sap.m.ButtonType",group:"Appearance",defaultValue:f.Back,deprecated:true},showFooter:{type:"boolean",group:"Appearance",defaultValue:true},contentOnlyBusy:{type:"boolean",group:"Appearance",defaultValue:false},floatingFooter:{type:"boolean",group:"Appearance",defaultValue:false},titleAlignment:{type:"sap.m.TitleAlignment",group:"Misc",defaultValue:_.Auto}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},customHeader:{type:"sap.m.IBar",multiple:false},footer:{type:"sap.m.IBar",multiple:false},subHeader:{type:"sap.m.IBar",multiple:false},headerContent:{type:"sap.ui.core.Control",multiple:true,singularName:"headerContent",forwarding:{getter:"_getInternalHeader",aggregation:"contentRight"}},landmarkInfo:{type:"sap.m.PageAccessibleLandmarkInfo",multiple:false},_internalHeader:{type:"sap.m.IBar",multiple:false,visibility:"hidden"}},events:{navButtonTap:{deprecated:true},navButtonPress:{}},dnd:{draggable:false,droppable:true},designtime:"sap/m/designtime/Page.designtime"}});i.apply(T.prototype);s.call(T.prototype,{header:{suffix:"intHeader"},subHeader:{selector:".sapMPageSubHeader .sapMIBar"},content:{suffix:"cont"},footer:{selector:".sapMPageFooter:not(.sapMPageFloatingFooter) .sapMIBar"},floatingFooter:{selector:".sapMPageFloatingFooter.sapMPageFooter"}});u.call(T.prototype,"content",function(){return this._headerTitle?this._headerTitle.getId():false});T.FOOTER_ANIMATION_DURATION=350;T.prototype.init=function(){this._initTitlePropagationSupport();this._initResponsivePaddingsEnablement()};T.prototype._hasScrolling=function(){return this.getEnableScrolling()};T.prototype.onBeforeRendering=function(){var e=this.getCustomHeader()||this.getAggregation("_internalHeader");if(this._oScroller&&!this._hasScrolling()){this._oScroller.destroy();this._oScroller=null}else if(this._hasScrolling()&&!this._oScroller){this._oScroller=new a(this,null,{scrollContainerId:this.getId()+"-cont",horizontal:false,vertical:true})}if(this._headerTitle){this._headerTitle.setLevel(this.getTitleLevel())}this._ensureNavButton();if(e&&e.setTitleAlignment){e.setProperty("titleAlignment",this.getTitleAlignment(),true)}};T.prototype.onAfterRendering=function(){this.$().toggleClass("sapMPageBusyCoversAll",!this.getContentOnlyBusy());this._sBusySection=this.getContentOnlyBusy()?"cont":null};T.prototype.exit=function(){if(this._oScroller){this._oScroller.destroy();this._oScroller=null}if(this._headerTitle){this._headerTitle.destroy();this._headerTitle=null}if(this._navBtn){this._navBtn.destroy();this._navBtn=null}if(this._appIcon){this._appIcon.destroy();this._appIcon=null}};T.prototype.setBackgroundDesign=function(e){var t=this.getBackgroundDesign();this.setProperty("backgroundDesign",e,true);this.$().removeClass("sapMPageBg"+t).addClass("sapMPageBg"+this.getBackgroundDesign());return this};T.prototype.setTitle=function(e){var t=!this._headerTitle;this._headerTitle=this._headerTitle||new n(this.getId()+"-title",{level:this.getTitleLevel()});this._headerTitle.setText(e);if(t){this._updateHeaderContent(this._headerTitle,"middle",0)}this.setProperty("title",e,true);return this};T.prototype._ensureNavButton=function(){if(!this.getShowNavButton()){return}var e=this.getNavButtonTooltip()||sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("PAGE_NAVBUTTON_TEXT");if(!this._navBtn){this._navBtn=new r(this.getId()+"-navButton",{press:function(){this.fireNavButtonPress();this.fireNavButtonTap()}.bind(this)})}this._navBtn.setType(this.getNavButtonType());this._navBtn.setTooltip(e)};T.prototype.setShowNavButton=function(e){var t=!!this.getShowNavButton();if(e===t){return this}this.setProperty("showNavButton",e,true);if(e){this._ensureNavButton();if(this._appIcon){this._updateHeaderContent(this._appIcon,"left",-1)}this._updateHeaderContent(this._navBtn,"left",0)}else if(this._navBtn){this._updateHeaderContent(this._navBtn,"left",-1)}return this};T.prototype.setShowFooter=function(e){if(this.getDomRef()){e?this.$().addClass("sapMPageWithFooter"):this.$().removeClass("sapMPageWithFooter")}var t=d(this.getDomRef()).find(".sapMPageFooter").last(),a=sap.ui.getCore().getConfiguration().getAnimation();if(!this.getFloatingFooter()){this.setProperty("showFooter",e);return this}this.setProperty("showFooter",e,true);t.removeClass("sapUiHidden");t.toggleClass("sapMPageFooterControlShow",e);t.toggleClass("sapMPageFooterControlHide",!e);if(e){return this}if(a){setTimeout(function(){t.toggleClass("sapUiHidden",!e)},T.FOOTER_ANIMATION_DURATION)}else{t.toggleClass("sapUiHidden",!e)}return this};T.prototype._updateHeaderContent=function(e,t,a){var n=this._getInternalHeader();if(n){switch(t){case"left":if(a==-1){if(n.getContentLeft()){n.removeContentLeft(e)}}else{if(n.indexOfContentLeft(e)!=a){n.insertContentLeft(e,a);n.invalidate()}}break;case"middle":if(a==-1){if(n.getContentMiddle()){n.removeContentMiddle(e)}}else{if(n.indexOfContentMiddle(e)!=a){n.insertContentMiddle(e,a);n.invalidate()}}break;case"right":if(a==-1){if(n.getContentRight()){n.removeContentRight(e)}}else{if(n.indexOfContentRight(e)!=a){n.insertContentRight(e,a);n.invalidate()}}break;default:break}}};T.prototype._getInternalHeader=function(){var e=this.getAggregation("_internalHeader");if(!e){this.setAggregation("_internalHeader",new o(this.getId()+"-intHeader",{titleAlignment:this.getTitleAlignment()}),true);e=this.getAggregation("_internalHeader");if(this.getShowNavButton()&&this._navBtn){this._updateHeaderContent(this._navBtn,"left",0)}if(this.getTitle()&&this._headerTitle){this._updateHeaderContent(this._headerTitle,"middle",0)}}return e};T.prototype._getAnyHeader=function(){var e=this.getCustomHeader();if(e){return e.addStyleClass("sapMPageHeader")}return this._getInternalHeader().addStyleClass("sapMPageHeader")};T.prototype.getScrollDelegate=function(){return this._oScroller};T.prototype._formatLandmarkInfo=function(e,t){if(e){var a=e["get"+t+"Role"]()||"",n=e["get"+t+"Label"]()||"";if(a===h.None){a=""}return{role:a.toLowerCase(),label:n}}return{}};T.prototype._getHeaderTag=function(e){if(e&&e.getHeaderRole()){return v}return m};T.prototype._getSubHeaderTag=function(e){if(e&&e.getSubHeaderRole()){return v}return m};T.prototype._getFooterTag=function(e){if(e&&e.getFooterRole()){return v}return B};T.prototype.scrollTo=function(e,t){if(this._oScroller){this._oScroller.scrollTo(0,e,t)}return this};T.prototype.scrollToElement=function(e,t,a){if(e instanceof p){e=e.getDomRef()}if(this._oScroller){this._oScroller.scrollToElement(e,t,a)}return this};T.prototype.setCustomHeader=function(e){this.setAggregation("customHeader",e);this.toggleStyleClass("sapFShellBar-CTX",e&&e.isA("sap.f.ShellBar"));if(e&&this.mEventRegistry["_adaptableContentChange"]){this.fireEvent("_adaptableContentChange",{parent:this,adaptableContent:e})}return this};T.prototype._getAdaptableContent=function(){return this._getAnyHeader()};return T});