/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/ui/fl/write/connectors/BaseConnector","sap/ui/fl/apply/_internal/connectors/ObjectPathConnector","sap/base/util/LoaderExtensions"],function(e,n,t,r){"use strict";return e({},n,{layers:t.layers,loadFeatures:function(e){var n=t.jsonPath||e.path;if(n){return r.loadResource({dataType:"json",url:n,async:true}).then(function(e,n){n.componentClassName=e;return n.settings||{}}.bind(null,e.flexReference))}return Promise.resolve({})}})},true);