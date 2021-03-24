/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/ObjectPath"],function(r){"use strict";function a(a,t){if(a.operation!=="UPDATE"&&a.operation!=="UPSERT"){throw new Error("Only operation == 'UPDATE' and operation == 'UPSERT' are supported.")}var e=a.propertyPath.split("/");r.set(e,a.propertyValue,t)}var t={applyChange:function(r,t){if(r["sap.app"].dataSources){var e=t.getContent();var o=r["sap.app"].dataSources[e.dataSourceId];if(o){var n=e.entityPropertyChange;if(Array.isArray(n)){n.forEach(function(r){a(r,o)})}else{a(n,o)}}}else{throw Error("No sap.app/dataSource found in manifest.json")}return r}};return t},true);