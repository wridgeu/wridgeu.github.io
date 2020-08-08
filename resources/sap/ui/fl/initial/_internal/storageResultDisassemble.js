/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/initial/_internal/StorageUtils","sap/base/util/merge","sap/base/util/isEmptyObject"],function(n,e,a){"use strict";function t(n,e){if(e.content.fileName!==e.content.variantManagementReference){n.push(e.content)}e.controlChanges.forEach(function(e){n.push(e)});for(var a in e.variantChanges){n=n.concat(e.variantChanges[a])}return n}return function(r){if(!a(r.variantSection)){var i=r.changes||[];for(var c in r.variantSection){var s=r.variantSection[c];for(var o in s.variantManagementChanges){i=i.concat(s.variantManagementChanges[o])}i=s.variants.reduce(t,i)}var u=n.getGroupedFlexObjects(i);var v=n.filterAndSortResponses(u);delete r.changes;delete r.variantSection;e(v[0]||{},r);return v}return[r]}});