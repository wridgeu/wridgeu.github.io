/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"sap/ui/core/Element",
	"sap/ui/core/sample/common/Controller"
], function (Element, Controller) {
	"use strict";

	return Controller.extend("sap.ui.core.sample.ViewTemplate.types.Template", {
		onBeforeRendering : function () {
			Element.registry.forEach(function (oElement) {
				var oBinding = oElement.getBinding("value") || oElement.getBinding("dateValue");

				if (oElement.isA("sap.m.InputBase") && oBinding && oBinding.getType()
						&& oBinding.getType().getPlaceholderText) {
					oElement.setPlaceholder(oBinding.getType().getPlaceholderText());
				}
			});
		}
	});
});
