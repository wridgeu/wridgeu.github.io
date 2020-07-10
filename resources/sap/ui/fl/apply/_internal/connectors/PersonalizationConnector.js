/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/ui/fl/apply/_internal/connectors/BackendConnector","sap/ui/fl/Layer"],function(a,e,n){"use strict";var r="/flex/personalization";var i="/v1";var s=a({},e,{layers:[n.USER],ROUTES:{DATA:r+i+"/data/"}});return s});