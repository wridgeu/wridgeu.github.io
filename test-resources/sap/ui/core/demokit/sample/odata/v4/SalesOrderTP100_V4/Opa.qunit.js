/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sap/ui/core/sample/common/Helper",
		"sap/ui/core/sample/common/pages/Any",
		"sap/ui/core/sample/odata/v4/SalesOrderTP100_V4/pages/Main",
		"sap/ui/test/opaQunit"
	], function (Helper, Any, Main, opaTest) {
		Helper.qUnitModule("sap.ui.core.sample.odata.v4.SalesOrderTP100_V4");

		//*****************************************************************************
		opaTest("Start sales orders TP100 app and check log", function (Given, When, Then) {
			When.onAnyPage.applySupportAssistant();
			Given.iStartMyUIComponent({
				autoWait : true,
				componentConfig : {
					name : "sap.ui.core.sample.odata.v4.SalesOrderTP100_V4"
				}
			});

			When.onTheMainPage.pressMoreButton("SalesOrders");
			When.onTheMainPage.selectSalesOrder(1);
			When.onTheMainPage.pressMoreButton("SalesOrderItems");

			Then.onAnyPage.checkLog();
			Then.onAnyPage.analyzeSupportAssistant();
			Then.iTeardownMyUIComponent();
		});

		QUnit.start();
	});
});
