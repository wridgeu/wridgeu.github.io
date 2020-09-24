/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/registry/Settings","sap/ui/fl/Utils","sap/ui/fl/Layer"],function(n,e,t){"use strict";var i={isPublishAvailable:function(){return n.getInstance().then(function(n){return!n.isProductiveSystem()})},isSaveAsAvailable:function(e){return n.getInstance().then(function(n){if(n.isAppVariantSaveAsEnabled()&&e===t.CUSTOMER&&!!sap.ushell_abap){return true}return false})},isKeyUser:function(){return n.getInstance().then(function(n){return n.isKeyUser()})},isVersioningEnabled:function(e){return n.getInstance().then(function(n){return n.isVersioningEnabled(e)})}};return i});