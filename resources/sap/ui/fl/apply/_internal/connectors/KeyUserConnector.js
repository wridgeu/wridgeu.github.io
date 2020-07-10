/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/ui/fl/apply/_internal/connectors/BackendConnector","sap/ui/fl/Layer"],function(e,a,r){"use strict";var n="/flex/keyuser";var s="/v1";var u=e({},a,{layers:[r.CUSTOMER],ROUTES:{DATA:n+s+"/data/"},isLanguageInfoRequired:true});return u});