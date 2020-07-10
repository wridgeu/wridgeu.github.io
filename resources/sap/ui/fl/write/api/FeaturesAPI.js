/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/registry/Settings"],function(n){"use strict";var e={isPublishAvailable:function(){return n.getInstance().then(function(n){return!n.isProductiveSystem()})},isKeyUser:function(){return n.getInstance().then(function(n){return n.isKeyUser()})},isVersioningEnabled:function(e){return n.getInstance().then(function(n){return n.isVersioningEnabled(e)})}};return e});