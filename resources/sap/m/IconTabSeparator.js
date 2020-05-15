/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Core","sap/ui/core/Element","sap/ui/core/Item"],function(e,t,o,r){"use strict";var a=e.ImageHelper;var i=o.extend("sap.m.IconTabSeparator",{metadata:{interfaces:["sap.m.IconTab"],library:"sap.m",designtime:"sap/m/designtime/IconTabSeparator.designtime",properties:{icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:""},visible:{type:"boolean",group:"Behavior",defaultValue:true},iconDensityAware:{type:"boolean",group:"Appearance",defaultValue:true}}}});i.prototype._getImageControl=function(e,t){var o={src:this.getIcon(),densityAware:this.getIconDensityAware(),useIconTooltip:false};this._oImageControl=a.getImageControl(this.getId()+"-icon",this._oImageControl,t,o,e);return this._oImageControl};i.prototype.exit=function(e){if(this._oImageControl){this._oImageControl.destroy()}if(r.prototype.exit){r.prototype.exit.call(this,e)}};i.prototype.render=function(e){if(!this.getVisible()){return}var o=this.getIcon(),r=this.getParent(),a=t.getLibraryResourceBundle("sap.m"),i={};if(o){i.role="img";i.label=a.getText("ICONTABBAR_NEXTSTEP")}else{i.role="separator"}e.openStart("div",this).accessibilityState(i).class("sapMITBItem").class("sapMITBSep");if(!o){e.class("sapMITBSepLine")}e.openEnd();if(o){e.renderControl(this._getImageControl(["sapMITBSepIcon"],r))}e.close("div")};i.prototype.renderInSelectList=function(e,t){};return i});