/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/Button","sap/m/ButtonRenderer"],function(t,e){"use strict";var r=t.extend("sap.m.OverflowToolbarButton",{metadata:{interfaces:["sap.f.IShellBar","sap.m.IOverflowToolbarContent"]},renderer:e.render});r.prototype._getText=function(){if(this._bInOverflow){return t.prototype._getText.call(this)}return""};r.prototype._getTooltip=function(){var e=t.prototype._getTooltip.call(this);if(this._bInOverflow){return this._getText()===e?"":e}return e};r.prototype._onBeforeEnterOverflow=function(){this._bInOverflow=true};r.prototype._onAfterExitOverflow=function(){this._bInOverflow=false};r.prototype.getOverflowToolbarConfig=function(){var t={canOverflow:true};t.onBeforeEnterOverflow=this._onBeforeEnterOverflow.bind(this);t.onAfterExitOverflow=this._onAfterExitOverflow.bind(this);return t};return r});