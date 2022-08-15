/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","./ListBase","./ListRenderer"],function(e,t,i){"use strict";var s=e.BackgroundDesign;var a=t.extend("sap.m.List",{metadata:{library:"sap.m",properties:{backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:s.Solid}}}});a.prototype.getAriaRole=function(){return this._sAriaRole||"list"};a.prototype.applyAriaRole=function(e){this._sAriaRole=e};a.prototype.enhanceAccessibilityState=function(e,i){t.prototype.enhanceAccessibilityState.apply(this,arguments);if(this.getAriaRole()==="listbox"&&e.isA("sap.m.ListItemBase")){i.roledescription=null;i.role="option";i.owns=null;if(e.isSelectable()){i.selected=e.getSelected()}}};return a});