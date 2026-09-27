/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	"sap/ui/core/Element"
], function (
	Element
) {
	"use strict";

	/**
	 * Constructor for a new <code>LoadingProvider</code>.
	 *
	 * @param {string} [sId] ID for the new data provider, generated automatically if no ID is given.
	 * @param {object} [mSettings] Initial settings for the new data provider.
	 *
	 * @class
	 *
	 * @extends sap.ui.core.Element
	 *
	 * @author SAP SE
	 * @version 1.152.0
	 *
	 * @constructor
	 * @private
	 * @alias sap.ui.integration.util.LoadingProvider
	 */
	var LoadingProvider = Element.extend("sap.ui.integration.util.LoadingProvider", {
		metadata: {
			library: "sap.ui.integration",

			properties: {
				/**
				 * The current loading state.
				 */
				loading: { type: "boolean", defaultValue: false }
			}
		}
	});

	return LoadingProvider;
});