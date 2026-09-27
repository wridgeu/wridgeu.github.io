/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/model/ClientPropertyBinding"],function(e,i){"use strict";var t=e.extend("sap.ui.integration.model.ObservableModel",{constructor:function(t,n){e.apply(this,arguments);this._observedBinding=new i(this,"/",this.getContext("/"));this._observedBinding.attachChange(this._handleChange.bind(this));this._fireChangeBound=this._fireChange.bind(this)}});t.prototype.destroy=function(){this._observedBinding.destroy();this._observedBinding=null;clearTimeout(this._iFireChangeCallId)};t.prototype._handleChange=function(){this._scheduleFireChange()};t.prototype._scheduleFireChange=function(){if(this._iFireChangeCallId){clearTimeout(this._iFireChangeCallId)}this._iFireChangeCallId=setTimeout(this._fireChangeBound,0)};t.prototype._fireChange=function(){this.fireEvent("change")};return t});
//# sourceMappingURL=ObservableModel.js.map