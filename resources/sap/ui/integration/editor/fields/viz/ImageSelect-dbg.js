/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	"sap/ui/integration/editor/fields/viz/IconSelect"
], function (
	IconSelect
) {
	"use strict";

	/**
	 * @class Image Select
	 * @extends sap.ui.integration.editor.fields.viz.IconSelect
	 * @alias sap.ui.integration.editor.fields.viz.ImageSelect
	 * @author SAP SE
	 * @since 1.119.0
	 * @version 1.152.0
	 * @private
	 * @ui5-restricted
	 */
	var ImageSelect = IconSelect.extend("sap.ui.integration.editor.fields.viz.ImageSelect", {
		metadata: {
			library: "sap.ui.integration",
			properties: {
				allowDefaultIcons: {
					type: "boolean",
					defaultValue: false
				}
			}
		},
		renderer: {
			apiVersion: 2
		}
	});

	return ImageSelect;
});