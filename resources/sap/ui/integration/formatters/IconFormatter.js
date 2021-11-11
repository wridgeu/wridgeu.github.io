/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/core/Core","sap/ui/core/IconPool"],function(t,e,i){"use strict";var r=t.extend("sap.ui.integration.formatters.IconFormatter",{metadata:{library:"sap.ui.integration",properties:{destinations:{type:"object"}},associations:{card:{type:"sap.ui.integration.widgets.Card",multiple:false}}}});r.prototype.formatSrc=function(t){if(!t){return t}if(t.startsWith("data:")||i.isIconURI(t)){return t}if(this.getDestinations().hasDestination(t)){return this.getDestinations().processString(t).then(function(t){return this._format(t)}.bind(this))}return this._format(t)};r.prototype._format=function(t){return this._getCardInstance().getRuntimeUrl(t)};r.prototype._getCardInstance=function(){return e.byId(this.getCard())};return r});