/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/connectors/ObjectStorageUtils","sap/ui/fl/apply/_internal/StorageUtils"],function(e,n){"use strict";function t(n){var t=[];return e.forEachObjectInStorage(n,function(e){t.push(e.changeDefinition)}).then(function(){return t})}return{oStorage:undefined,layers:["ALL"],loadFlexData:function(e){return t({storage:this.oStorage,reference:e.reference}).then(function(e){var t=n.getGroupedFlexObjects(e);return n.filterAndSortResponses(t)})}}});