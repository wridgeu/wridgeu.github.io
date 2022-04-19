/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/support/supportRules/Main","sap/ui/support/supportRules/RuleSetLoader"],function(t,s,r){"use strict";t.sap=t.sap||{};t.sap.support={analyze:function(t,e){if(r._bRulesCreated){return s.analyze(t,e)}return r._oMainPromise.then(function(){return s.analyze(t,e)})},getLastAnalysisHistory:function(){return s.getLastAnalysisHistory()},getAnalysisHistory:function(){return s.getAnalysisHistory()},getFormattedAnalysisHistory:function(t){return s.getFormattedAnalysisHistory(t)},addRule:function(t){return s.addRule(t)}};return t.sap.support});