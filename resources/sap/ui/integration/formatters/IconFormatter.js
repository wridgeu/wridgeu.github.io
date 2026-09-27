/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/core/Element","sap/ui/core/IconPool"],function(t,e,r){"use strict";var i=t.extend("sap.ui.integration.formatters.IconFormatter",{metadata:{library:"sap.ui.integration",associations:{card:{type:"sap.ui.integration.widgets.Card",multiple:false}}}});i.SRC_FOR_HIDDEN_ICON="SRC_FOR_HIDDEN_ICON";i.prototype.formatSrc=function(t){if(!t||!t.trim()){return t}if(t===i.SRC_FOR_HIDDEN_ICON){return i.SRC_FOR_HIDDEN_ICON}if(t==="sap-icon://"){return""}if(t.startsWith("data:")||r.isIconURI(t)){return t}if(!t.includes("/")&&!t.includes(".")&&!t.startsWith("http")){return""}const e=this._getCardInstance();return e.resolveUrl(t)};i.prototype._getCardInstance=function(){return e.getElementById(this.getCard())};return i});
//# sourceMappingURL=IconFormatter.js.map