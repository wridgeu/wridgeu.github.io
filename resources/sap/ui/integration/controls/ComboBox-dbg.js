/*!
* OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/

sap.ui.define([
	"sap/m/ComboBox",
	"sap/m/ComboBoxRenderer"
], function (
	MComboBox,
	MComboBoxRenderer
) {
	"use strict";

	/**
	 * Constructor for a new ComboBox.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @class
	 *
	 * @extends sap.m.ComboBox
	 *
	 * @author SAP SE
	 * @version 1.152.0
	 *
	 * @constructor
	 * @private
	 * @alias sap.ui.integration.controls.ComboBox
	 */
	var ComboBox = MComboBox.extend("sap.ui.integration.controls.ComboBox", {
		metadata: {
			library: "sap.ui.integration",
			properties: {
				customSelectedIndex: {
					type: "int",
					defaultValue: -1
				}
			}
		},
		renderer: MComboBoxRenderer
	});

	return ComboBox;
});