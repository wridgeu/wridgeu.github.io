/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/ui/fl/write/_internal/connectors/LrepConnector","sap/ui/fl/initial/_internal/connectors/NeoLrepConnector"],function(e,n,t){"use strict";return e({},n,{initialConnector:t,layers:t.layers,isContextSharingEnabled:function(){return Promise.resolve(false)},loadContextDescriptions:function(){return Promise.reject("loadContextsDescriptions is not implemented")},getContexts:function(){return Promise.reject("getContexts is not implemented")}})},true);