/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/util/changePropertyValueByPath","sap/ui/fl/util/checkChangesConsistency"],function(a,e){"use strict";var t=["UPDATE","UPSERT"];var r=["uri","settings/maxAge"];var n={applyChange:function(n,o){var i=n["sap.app"].dataSources;var s=o.getContent();e(s,r,t);if(i){var u=i[s.dataSourceId];if(u){a(s.entityPropertyChange,u)}else{throw new Error('Nothing to update. DataSource with ID "'+s.dataSourceId+'" does not exist.')}}else{throw Error("No sap.app/dataSource found in manifest.json")}return n}};return n});