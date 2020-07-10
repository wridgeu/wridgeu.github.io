/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/ui/fl/write/_internal/connectors/BackendConnector","sap/ui/fl/apply/_internal/connectors/PersonalizationConnector"],function(e,n,r){"use strict";var t="/flex/personalization";var a="/v1";var o={isProductiveSystem:true};var s=e({},n,{layers:r.layers,ROUTES:{CHANGES:t+a+"/changes/",TOKEN:t+a+"/actions/getcsrftoken"},loadFeatures:function(){return Promise.resolve(o)}});s.applyConnector=r;return s},true);