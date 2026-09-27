/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/core/Element","sap/ui/integration/util/BindingResolver"],function(e,t,n){"use strict";var i=e.extend("sap.ui.integration.cards.actions.BaseAction",{metadata:{library:"sap.ui.integration",properties:{config:{type:"object"},parameters:{type:"object"},actionHandler:{type:"object"}},associations:{card:{type:"sap.ui.integration.widgets.Card",multiple:false},source:{type:"sap.ui.base.EventProvider",multiple:false}}}});i.prototype.execute=function(){};i.prototype.getResolvedConfig=function(){var e=this.getSourceInstance(),t=e.getBindingContext(),i;if(t){i=e.getBindingContext().getPath()}return n.resolveValue(this.getConfig(),e,i)};i.prototype.getCardInstance=function(){return t.getElementById(this.getCard())};i.prototype.getSourceInstance=function(){return t.getElementById(this.getSource())};return i});
//# sourceMappingURL=BaseAction.js.map