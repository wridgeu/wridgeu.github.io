/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/core/Core","sap/ui/core/IconPool"],function(t,r,e){"use strict";var a=t.extend("sap.ui.integration.formatters.IconFormatter",{metadata:{library:"sap.ui.integration",associations:{card:{type:"sap.ui.integration.widgets.Card",multiple:false}}}});a.SRC_FOR_HIDDEN_ICON="SRC_FOR_HIDDEN_ICON";a.prototype.formatSrc=function(t){if(!t){return t}if(t===a.SRC_FOR_HIDDEN_ICON){return a.SRC_FOR_HIDDEN_ICON}if(t.startsWith("data:")||e.isIconURI(t)){return t}return this._format(t)};a.prototype._format=function(t){return this._getCardInstance().getRuntimeUrl(t)};a.prototype._getCardInstance=function(){return r.byId(this.getCard())};return a});
//# sourceMappingURL=IconFormatter.js.map