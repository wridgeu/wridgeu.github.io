/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";return function(n,e,t){var i=t.modifier;var r=n.getDefinition();var g=r.content.targetAggregation;var a=r.content.index;if(a===undefined){var o=i.getAggregation(e,g);a=o.length}return a}});