/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Utils"],function(e){"use strict";return function(t,r,n){var i=n.modifier;var a=t.getDefinition();var o=a.content.targetAggregation;var u=n.view||e.getViewForControl(r);var c=n.appComponent;var f=t.getRevertData()||[];var v=f.map(function(e){var t;if(typeof e==="string"){t=e}else{t=e.id;o=o||e.aggregationName}return i.bySelector(t,c,u)||u&&u.createId&&i.bySelector(u.createId(t))});var g=[];v.forEach(function(e){var t=function(){return Promise.resolve().then(i.removeAggregation.bind(i,r,o,e)).then(function(){if(e.destroy){e.destroy()}})};g.push(t)});return e.execPromiseQueueSequentially(g,true,true).then(function(){t.resetRevertData();return true})}});