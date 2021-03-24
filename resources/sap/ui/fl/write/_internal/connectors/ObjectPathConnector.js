/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/ui/fl/write/connectors/BaseConnector","sap/ui/fl/initial/_internal/StorageUtils","sap/base/util/LoaderExtensions"],function(e,t,n,r){"use strict";var a;return e({},t,{layers:[],setJsonPath:function(e){a=e},loadFlexData:function(e){var t=a||e.path;if(t){return r.loadResource({dataType:"json",url:t,async:true}).then(function(e){return Object.assign(n.getEmptyFlexDataResponse(),e)})}return Promise.resolve()},loadFeatures:function(e){var t=a||e.path;if(t){return r.loadResource({dataType:"json",url:t,async:true}).then(function(e,t){t.componentClassName=e;return t.settings||{}}.bind(null,e.flexReference))}return Promise.resolve({})}})},true);