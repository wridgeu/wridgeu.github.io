/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
/*
 * This is the OData V4 configuration file for BeforePush.js. It adds 1Ring, analyzes the team's
 * testsuites and adds all OPA tests therein.
 */
sap.ui.define([
	"sap/ui/core/qunit/internal/testsuite.feature-odata-v4.qunit",
	"sap/ui/core/qunit/odata/v4/testsuite.odatav4.qunit"
], function (oFeatureSuite, oODataSuite) {
	"use strict";

	var mApps = {},
		mTests = {
			'qunit/internal/1Ring.qunit.html?hidepassed&coverage&realOData=true' : 'full',
			// realOData=true is appended so that the module is run in variant "POC verification"
			'qunit/internal/1Ring.qunit.html?hidepassed&coverage&module=sap.ui.model.odata.v4.ODataModel.integration&realOData=true' : 'integration',
			'qunit/internal/1Ring.qunit.html?hidepassed&coverage&module=sap.ui.model.odata.v4.ODataModel.realOData&realOData=true' : 'integration'
		};

	function addAppsAndTests(oSuite, sName) {
		var sSuite = "Test.qunit.html?testsuite=test-resources/sap/ui/core/qunit/" + sName
				+ "&test=";

		Object.keys(oSuite.tests).forEach(function (sTest) {
			if (sTest.startsWith("OPA.")) {
				var aLinks,
					sName = sTest.slice(4),
					sOpa = sSuite + sTest,
					oTest = oSuite.tests[sTest],
					sApp = oTest.$app
						? oTest.$app.replace("test-resources/sap/ui/core/", "")
						: "demokit/sample/common/index.html?component=odata.v4." + sName;

				aLinks = [
					sApp,
					sApp + (sApp.includes("?") ? "&" : "?") + "realOData=true",
					sOpa + "&supportAssistant=true"
				];

				mApps[sName] = aLinks;
				mTests[sOpa + "&supportAssistant=true"] = "both";
				if (oTest.realOData !== false) {
					mTests[sOpa + "&realOData=true"] = "both";
					aLinks.push(sOpa + "&realOData=true");
				}
			}
		});
	}

	addAppsAndTests(oODataSuite, "odata/v4/testsuite.odatav4.qunit");
	addAppsAndTests(oFeatureSuite, "internal/testsuite.feature-odata-v4.qunit");

	return {
		apps : mApps,
		tests: mTests
	};
});
