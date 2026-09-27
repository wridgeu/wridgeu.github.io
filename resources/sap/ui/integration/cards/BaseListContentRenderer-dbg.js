/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"./BaseContentRenderer"
], function (BaseContentRenderer) {
	"use strict";

	/**
	 * BaseContent renderer.
	 * @author SAP SE
	 * @namespace
	 */
	var BaseListContentRenderer = BaseContentRenderer.extend("sap.ui.integration.cards.BaseListContentRenderer", {
		apiVersion: 2
	});

	/**
	 * @override
	 */
	BaseListContentRenderer.renderContent = function (oRm, oCardContent) {
		oRm.renderControl(oCardContent.getAggregation("_content"));
		oCardContent.getPaginator()?.render(oRm);
	};

	/**
	 * @override
	 */
	BaseListContentRenderer.renderLoadingClass = function (oRm, oCardContent) {
		if (oCardContent.getPaginator()?.isLoadingMore()) {
			return;
		}

		BaseContentRenderer.renderLoadingClass(oRm, oCardContent);
	};

	/**
	 * @override
	 */
	BaseListContentRenderer.renderLoadingPlaceholder = function (oRm, oCardContent) {
		if (oCardContent.getPaginator()?.isLoadingMore()) {
			return;
		}

		BaseContentRenderer.renderLoadingPlaceholder(oRm, oCardContent);
	};

	return BaseListContentRenderer;
});
