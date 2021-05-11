/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Change"],function(n){"use strict";var e="$sap.ui.fl.changes";function t(t){var r=t&&t.getEntry&&t.getEntry(e)&&t.getEntry(e).descriptor||[];return r.map(function(e){return new n(e)})}var r={applyChanges:function(n,e,t){return t.registry().then(function(n){var t=e.map(function(e){return n[e.getChangeType()]});return Promise.all(t)}).then(function(r){r.forEach(function(r,a){try{var s=e[a];n=r.applyChange(n,s);if(!r.skipPostprocessing&&s.getTexts()){n=t.processTexts(n,s.getTexts())}}catch(n){t.handleError(n)}});return n})},applyChangesIncludedInManifest:function(n,r){var a=t(n);var s=n.getJson();delete s[e];if(a.length>0){return this.applyChanges(s,a,r).then(function(){return})}return Promise.resolve()}};return r});