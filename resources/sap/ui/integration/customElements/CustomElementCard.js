/*!
* OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.require(["sap/ui/integration/widgets/Card","sap/ui/integration/customElements/CustomElementBase","sap/f/cards/CardBadgeCustomData"],function(t,e,a){"use strict";var s=e.extend(t,{privateProperties:["width","height"],customProperties:{badge:{set:function(t,e){t.getCustomData().forEach(e=>{if(e.isA("sap.m.BadgeCustomData")||e.isA("sap.f.cards.CardBadgeCustomData")){t.removeCustomData(e)}});t.addCustomData(new a({value:e}))}}}});s.prototype.refresh=function(){this._getControl().refresh()};s.prototype.loadDesigntime=function(){return this._getControl().loadDesigntime()};e.define("ui-integration-card",s)});
//# sourceMappingURL=CustomElementCard.js.map