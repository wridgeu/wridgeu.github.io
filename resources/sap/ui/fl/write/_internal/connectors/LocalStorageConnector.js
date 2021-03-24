/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/ui/fl/write/api/connectors/ObjectStorageConnector"],function(e,t){"use strict";var r=e({},t,{storage:window.localStorage});r.loadFeatures=function(){return t.loadFeatures.apply(this,arguments).then(function(e){e.isPublicLayerAvailable=true;return e})};return r},true);