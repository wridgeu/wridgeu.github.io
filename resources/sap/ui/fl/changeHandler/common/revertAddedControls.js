/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Utils"],function(e){"use strict";return function(t,r,a){var i=a.modifier;var n=t.getDefinition();var o=n.content.targetAggregation;var g=a.view||e.getViewForControl(r);var f=a.appComponent;var v=t.getRevertData()||[];var c=v.map(function(e){var t;if(typeof e==="string"){t=e}else{t=e.id;o=o||e.aggregationName}return i.bySelector(t,f,g)||g&&g.createId&&i.bySelector(g.createId(t))});c.forEach(function(e){i.removeAggregation(r,o,e);if(e.destroy){e.destroy()}});t.resetRevertData();return true}});