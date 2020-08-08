/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/CustomData","sap/base/Log"],function(t,e){"use strict";var a=t.extend("sap.m.BadgeCustomData",{metadata:{properties:{key:{type:"string",group:"Data",defaultValue:"badge"}}}});a.prototype.init=function(){var t=this.getParent();if(t&&!t.isA("sap.m.IBadge")){e.warning("BadgeCustomData must be attached only to controls, which implement sap.m.IBadge")}};a.prototype.setValue=function(e){var a=this.getParent();t.prototype.setValue.call(this,e);if(a&&typeof e==="string"){a.updateBadge(e)}return this};a.prototype.setKey=function(){return this};return a});