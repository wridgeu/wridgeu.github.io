/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/Bootstrap","sap/ui/support/supportRules/Main","sap/ui/support/supportRules/RuleSetLoader"],function(t,n,e){"use strict";var r={analyze:function(r,s,u){var i=new Promise(function(n){t.initSupportRules(["true","silent"],{onReady:function(){n()}})});return i.then(function(){if(e._bRulesCreated){return n.analyze(r,s,u)}return e._oMainPromise.then(function(){return n.analyze(r,s,u)})})},getLastAnalysisHistory:function(){return n.getLastAnalysisHistory()},getAnalysisHistory:function(){return n.getAnalysisHistory()},getFormattedAnalysisHistory:function(t){return n.getFormattedAnalysisHistory(t)},addRule:function(t){return n.addRule(t)}};return r});