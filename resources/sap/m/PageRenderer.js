/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/ui/Device"],function(e,a){"use strict";var t={apiVersion:2};t.render=function(e,a){var t=null,r=a.getFooter(),n=a.getShowFooter(),o=null,s=this._isLightHeader(a),i=a.getLandmarkInfo();if(a.getShowHeader()){t=a._getAnyHeader()}if(a.getShowSubHeader()){o=a.getSubHeader()}e.openStart("div",a).class("sapMPage").class("sapMPageBg"+a.getBackgroundDesign());if(t){e.class("sapMPageWithHeader")}if(o){e.class("sapMPageWithSubHeader")}if(r&&n){e.class("sapMPageWithFooter")}if(!a.getContentOnlyBusy()){e.class("sapMPageBusyCoversAll")}if(a.getFloatingFooter()){e.class("sapMPageWithFloatingFooter")}e.accessibilityState(a,a._formatLandmarkInfo(i,"Root"));e.openEnd();if(t){this.renderHeader(e,a,t,i,s)}if(o){this.renderSubHeader(e,a,o,i,s)}this.renderChildControls(e,a,i);if(r){this.renderFooter(e,a,r,i)}e.close("div")};t.renderBarControl=function(e,a,t,r){if(!t){return}t._applyContextClassFor(r.context.toLowerCase());t.addStyleClass(r.styleClass||"");e.renderControl(t)};t.renderHeader=function(e,a,t,r,n){var o=a._getHeaderTag(r);e.openStart(o).class("sapMPageHeader").accessibilityState(a,a._formatLandmarkInfo(r,"Header")).openEnd();this.renderBarControl(e,a,t,{context:"header",styleClass:n?"":"sapContrastPlus"});e.close(o)};t.renderSubHeader=function(a,t,r,n,o){var s=t._getSubHeaderTag(n);a.openStart(s).class("sapMPageSubHeader").accessibilityState(t,t._formatLandmarkInfo(n,"SubHeader"));if(r.getDesign()==e.ToolbarDesign.Info){a.class("sapMPageSubHeaderInfoBar")}a.openEnd();this.renderBarControl(a,t,r,{context:"subHeader",styleClass:o?"":"sapContrastPlus"});a.close(s)};t.renderChildControls=function(e,t,r){e.openStart("section",t.getId()+"-cont");e.accessibilityState(t,t._formatLandmarkInfo(r,"Content"));if(a.browser.firefox){e.attr("tabindex","-1")}if(t.getEnableScrolling()){e.class("sapMPageEnableScrolling")}e.openEnd();var n=t.getContent();var o=n.length;for(var s=0;s<o;s++){e.renderControl(n[s])}e.close("section")};t.renderFooter=function(e,a,t,r){var n=a._getFooterTag(r);e.openStart(n).class("sapMPageFooter");if(!a.getShowFooter()){e.class("sapUiHidden")}if(a.getFloatingFooter()){e.class("sapMPageFloatingFooter")}e.accessibilityState(a,a._formatLandmarkInfo(r,"Footer")).openEnd();this.renderBarControl(e,a,t,{context:"footer"});e.close(n)};t._isLightHeader=function(e){var a=e,t=e.getParent(),r,n;while(t){r=t&&t.getMetadata().getName()||"";n=a.getMetadata().getName();if((r==="sap.m.Popover"||r==="sap.m.Dialog")&&n==="sap.m.NavContainer"||(r==="sap.ui.comp.smartvariants.SmartVariantManagement"||r==="sap.ui.comp.smartvariants.SmartVariantManagementUi2"||r==="sap.ui.comp.variants.VariantManagement"||r==="sap.ui.fl.variants.VariantManagement")&&n==="sap.m.ResponsivePopover"){return true}if(t&&["sap.m.SplitApp","sap.m.SplitContainer"].indexOf(r)>-1&&n==="sap.m.NavContainer"&&/\-Master$/.test(a.getId())){return true}a=t;t=a.getParent()}return false};return t},true);