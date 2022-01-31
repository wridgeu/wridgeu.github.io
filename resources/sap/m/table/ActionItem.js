/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/table/ItemBase"],function(e){"use strict";var t=e.extend("sap.m.table.ActionItem",{metadata:{library:"sap.m",properties:{label:{type:"string"},icon:{type:"sap.ui.core.URI"}},events:{press:{}}}});t.prototype.onPress=function(e){e.preventDefault();this.firePress()};t.prototype.getContent=function(){return null};return t});