/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={apiVersion:2};e.render=function(e,a){var t=a.getId(),i=a.mBindingInfos,r=a.getStatusText(),s=a.getAggregation("_title"),d=a.getAggregation("_subtitle"),n=a.getSubtitle()||i.subtitle,o=a.getAggregation("_avatar"),l=a.getAggregation("_dataTimestamp"),p=a.getDataTimestamp()||i.dataTimestamp,c=a.isLoading(),g=a.getAggregation("_error"),C=a.getToolbar(),f=a.getIconVisible?a.getIconVisible():true;e.openStart("div",a).class("sapFCardHeader");if(c){e.class("sapFCardHeaderLoading")}if(a._isInteractive()){e.class("sapFCardClickable")}if(g){e.class("sapFCardHeaderError")}e.openEnd();e.openStart("div").attr("id",t+"-focusable").class("sapFCardHeaderWrapper");if(a.getProperty("focusable")&&!a._isInsideGridContainer()){e.attr("tabindex","0")}if(!a._isInsideGridContainer()){e.accessibilityState({labelledby:{value:a._getAriaLabelledBy(),append:true},role:a.getFocusableElementAriaRole(),roledescription:a.getAriaRoleDescription()})}e.openEnd();if(g){e.renderControl(g);e.close("div");e.close("div");return}if(f&&(!a.isPropertyInitial("iconSrc")||!a.isPropertyInitial("iconInitials"))){e.openStart("div").class("sapFCardHeaderImage").openEnd();if(i.iconSrc&&i.iconSrc.binding&&!i.iconSrc.binding.getValue()){o.addStyleClass("sapFCardHeaderItemBinded")}e.renderControl(o);e.renderControl(a._oAriaAvatarText);e.close("div")}e.openStart("div").class("sapFCardHeaderText").openEnd();if(a.getTitle()||i.title){e.openStart("div").class("sapFCardHeaderTextFirstLine").openEnd();if(i.title){s.addStyleClass("sapFCardHeaderItemBinded")}e.renderControl(s);if(r){e.openStart("span",t+"-status").class("sapFCardStatus");if(i.statusText){e.class("sapFCardHeaderItemBinded")}e.openEnd().text(r).close("span")}e.close("div");if(n||p){e.openStart("div").class("sapFCardHeaderTextSecondLine");if(p){e.class("sapFCardHeaderLineIncludesDataTimestamp")}e.openEnd();if(n){if(i.subtitle){d.addStyleClass("sapFCardHeaderItemBinded")}e.renderControl(d)}if(p){e.renderControl(l)}e.close("div")}}e.close("div");e.close("div");if(C){e.openStart("div").class("sapFCardHeaderToolbarCont").openEnd();e.renderControl(C);e.close("div")}e.close("div")};return e},true);
//# sourceMappingURL=HeaderRenderer.js.map