/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library"],function(e){"use strict";var t={apiVersion:2};t.render=function(t,r){var n=e.Priority;t.openStart("div",r);t.class("sapMATC");t.openEnd();if(r.getPriority()!==n.None&&r.getPriorityText()){this._renderPriority(t,r)}this._renderContent(t,r);t.close("div")};t._renderPriority=function(e,t){var r=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("TEXT_CONTENT_PRIORITY"),n=t.getPriorityText();e.openStart("div",t.getId()+"-priority-value");e.class("sapMTilePriorityValue");e.class(t.getPriority());e.openEnd();e.text(n+" "+r);e.close("div")};t._renderContent=function(e,t){e.openStart("div",t.getId()+"-contentContainer");e.class("sapMContainer");e.openEnd();t.getAttributes().forEach(function(r,n){this._renderAttribute(e,t,r,n)}.bind(this));e.close("div")};t._renderAttribute=function(e,t,r,n){e.openStart("div",t.getId()+"-wrapper-"+n);e.class("sapMElementWrapper");e.openEnd();this._renderElement(e,t,r,n,true);this._renderElement(e,t,r,n,false);e.close("div")};t._renderElement=function(e,t,r,n,i){var a=i?"sapMATCLabel":"sapMATCValue",o=i?"-label":"-value",s=i?r.getLabel():r.getValue();e.openStart("div",t.getId()+"-"+n+o);e.class(a);e.openEnd();e.text(s);e.close("div")};return t},true);
//# sourceMappingURL=ActionTileContentRenderer.js.map