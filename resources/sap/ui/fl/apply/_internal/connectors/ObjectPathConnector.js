/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/StorageUtils","sap/base/util/LoaderExtensions"],function(e,t){"use strict";var a;return{layers:[],setJsonPath:function(e){a=e},loadFlexData:function(n){var s=a||n.path;if(s){return t.loadResource({dataType:"json",url:s,async:true}).then(function(t){return Object.assign(e.getEmptyFlexDataResponse(),t)})}return Promise.resolve()}}});