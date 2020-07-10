/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/ObjectPath"],function(r){"use strict";var a={applyChange:function(a,t){if(a["sap.app"].dataSources){var e=t.getContent();var o=a["sap.app"].dataSources[e.dataSourceId];if(o){var p=e.entityPropertyChange;if(Array.isArray(p)||p.operation!=="UPDATE"){throw new Error("Only operation == 'UPDATE' and entityPropertyChanges of type object are supported.")}var n=p.propertyPath.split("/");r.set(n,p.propertyValue,o)}}else{throw Error("No sap.app/dataSource found in manifest.json")}return a}};return a},true);