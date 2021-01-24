/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/cards/BaseContent","./ComponentContentRenderer","sap/ui/core/ComponentContainer"],function(t,n,e){"use strict";var o=t.extend("sap.ui.integration.cards.ComponentContent",{metadata:{library:"sap.ui.integration"},renderer:n});o.prototype.setConfiguration=function(n){t.prototype.setConfiguration.apply(this,arguments);if(!n){return}var o=new e({manifest:n.componentManifest,async:true,componentCreated:function(t){var n=t.getParameter("component"),e=this.getParent();if(n.onCardReady){n.onCardReady(e)}this.fireEvent("_actionContentReady");this.fireEvent("_updated")}.bind(this),componentFailed:function(){this.fireEvent("_actionContentReady");this._handleError("Card content failed to create component")}.bind(this)});this.setAggregation("_content",o)};return o});