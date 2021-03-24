/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={applyChanges:function(e,t,r){var n=Object.assign({},e);return r.registry().then(function(e){t.forEach(function(t){try{var s=e[t.getChangeType()];n=s.applyChange(n,t);if(!s.skipPostprocessing&&t.getTexts()){n=r.processTexts(n,t.getTexts())}}catch(e){r.handleError(e)}});return n})}};return e},true);