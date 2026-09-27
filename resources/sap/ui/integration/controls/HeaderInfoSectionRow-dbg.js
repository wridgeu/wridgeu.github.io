/*!
* OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/

sap.ui.define([
	"sap/ui/core/Control",
	"sap/ui/integration/types/HeaderInfoSectionJustifyContent",
	"./HeaderInfoSectionRowRenderer"
], function (
	Control,
	HeaderInfoSectionJustifyContent,
	HeaderInfoSectionRowRenderer
) {
	"use strict";

	/**
	 * Constructor for a new HeaderInfoSectionRow.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @class
	 *
	 * @extends sap.ui.core.Control
	 *
	 * @author SAP SE
	 * @version 1.152.0
	 *
	 * @constructor
	 * @private
	 * @alias sap.ui.integration.controls.HeaderInfoSectionRow
	 */
	var HeaderInfoSectionRow = Control.extend("sap.ui.integration.controls.HeaderInfoSectionRow", {
		metadata: {
			library: "sap.ui.integration",
			properties: {
				justifyContent : {
					type : "sap.ui.integration.types.HeaderInfoSectionJustifyContent",
					group : "Appearance",
					defaultValue : HeaderInfoSectionJustifyContent.SpaceBetween
				}
			},
			defaultAggregation : "items",
			aggregations: {
				columns: {
					type: "sap.ui.core.Control",
					multiple: true
				},
				items: {
					type: "sap.ui.core.Control",
					multiple: true
				}
			}
		},
		renderer: HeaderInfoSectionRowRenderer
	});
	return HeaderInfoSectionRow;
});