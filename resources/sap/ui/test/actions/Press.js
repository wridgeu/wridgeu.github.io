/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/test/actions/Action","sap/ui/thirdparty/jquery"],function(t,e){"use strict";var r=t.extend("sap.ui.test.actions.Press",{metadata:{properties:{altKey:{type:"boolean"},shiftKey:{type:"boolean"},ctrlKey:{type:"boolean"}},publicMethods:["executeOn"]},init:function(){t.prototype.init.apply(this,arguments);this.controlAdapters=e.extend(this.controlAdapters,r.controlAdapters)},executeOn:function(t){var e=this.$(t),r=e[0];var s=this.getAltKey();var a=this.getCtrlKey();var o=this.getShiftKey();if(e.length){this.oLogger.timestamp("opa.actions.press");this.oLogger.debug("Pressed the control "+t);this._tryOrSimulateFocusin(e,t);this._createAndDispatchMouseEvent("mousedown",r);this.getUtils().triggerEvent("selectstart",r);this._createAndDispatchMouseEvent("mouseup",r);this._createAndDispatchMouseEvent("click",r,o,s,a)}}});r.controlAdapters={};r.controlAdapters["sap.m.Input"]="vhi";r.controlAdapters["sap.m.SearchField"]="search";r.controlAdapters["sap.m.ListBase"]="trigger";r.controlAdapters["sap.m.Page"]="navButton";r.controlAdapters["sap.m.semantic.FullscreenPage"]="navButton";r.controlAdapters["sap.m.semantic.DetailPage"]="navButton";r.controlAdapters["sap.m.ComboBox"]="arrow";r.controlAdapters["sap.ui.comp.smartfilterbar.SmartFilterBar"]="btnGo";r.controlAdapters["sap.m.ObjectAttribute"]="text";r.controlAdapters["sap.m.ObjectIdentifier"]=function(t){if(t.getTitleActive()){return"link"}else if(t.getTitle()){return"title"}else if(t.getText()){return"text"}else{return null}};return r});