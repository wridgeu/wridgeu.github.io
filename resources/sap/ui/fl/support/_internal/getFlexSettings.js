/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/registry/Settings"],function(t){"use strict";return function(){return t.getInstance().then(function(t){return Object.keys(t._oSettings).map(function(n){return{key:n,value:t._oSettings[n]}})})}});