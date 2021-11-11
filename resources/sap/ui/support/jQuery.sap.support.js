/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/supportRules/Main","sap/ui/support/supportRules/RuleSetLoader"],function(t,s){"use strict";jQuery.sap.support={analyze:function(e,r){if(s._bRulesCreated){return t.analyze(e,r)}return s._oMainPromise.then(function(){return t.analyze(e,r)})},getLastAnalysisHistory:function(){return t.getLastAnalysisHistory()},getAnalysisHistory:function(){return t.getAnalysisHistory()},getFormattedAnalysisHistory:function(s){return t.getFormattedAnalysisHistory(s)},addRule:function(s){return t.addRule(s)}};return jQuery.sap.support});