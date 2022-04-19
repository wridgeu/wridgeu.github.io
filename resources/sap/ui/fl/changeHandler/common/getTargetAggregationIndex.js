/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";return function(e,n,t){var r=t.modifier;var i=e.getDefinition();var o=i.content.targetAggregation;var g=i.content.index;if(g===undefined){return Promise.resolve().then(r.getAggregation.bind(r,n,o)).then(function(e){return e.length})}return Promise.resolve(g)}});