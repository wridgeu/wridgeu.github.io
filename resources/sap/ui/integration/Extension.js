/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/library","sap/base/Log","sap/ui/base/ManagedObject"],function(t,e,r){"use strict";var i=r.extend("sap.ui.integration.Extension",{metadata:{library:"sap.ui.integration",properties:{actions:{type:"sap.ui.integration.CardMenuAction[]",deprecated:true},formatters:{type:"object"}},events:{action:{allowPreventDefault:true,parameters:{card:{type:"sap.ui.core.Control"},actionConfig:{type:"object"},actionSource:{type:"sap.ui.core.Control"},parameters:{type:"object"},type:{type:"sap.ui.integration.CardActionType"}}}}}});i.prototype.init=function(){this._oCardInterface=null;this._oCard=null};i.prototype.exit=function(){this._oCardInterface=null;this._oCard=null};i.prototype.setActions=function(t){this.setProperty("actions",t);if(this._oCard){this._oCard._refreshActionsMenu()}};i.prototype.setFormatters=function(t){this.setProperty("formatters",t);if(!this._oCard){return}if(!this._oCard._bApplyManifest||this._oCard.getAggregation("_extension")!==this){e.error("Extension formatters must be set before the initialization of the card. Do this inside Extension#init().")}};i.prototype.onCardReady=function(){};i.prototype.getCard=function(){return this._oCardInterface};i.prototype._setCard=function(t,e){this._oCard=t;this._oCardInterface=e};return i});