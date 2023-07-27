/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"./QuickActionItem",
	"./QuickAction",
	"sap/m/ToggleButton",
	"sap/m/library",
	"sap/ui/core/library"
], function (
	QuickActionItem,
	QuickAction,
	ToggleButton,
	library,
	CoreLibrary
) {
	"use strict";

	var SortOrder = CoreLibrary.SortOrder;

	/**
	 * Constructor for a new <code>QuickSortItem</code>.
	 *
	 * @param {string} [sId] ID for the new <code>QuickSortItem</code>, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new <code>QuickSortItem</code>
	 *
	 * @class
	 * The <code>QuickSortItem</code> class is used for items for the <code>sap.m.table.columnmenu.QuickSort</code>.
	 * It can be used to specify control- and application-specific items for sorting.
	 *
	 * @extends sap.m.table.columnmenu.QuickActionItem
	 *
	 * @author SAP SE
	 * @version 1.116.0
	 *
	 * @public
	 * @since 1.110
	 *
	 * @alias sap.m.table.columnmenu.QuickSortItem
	 */
	var QuickSortItem = QuickActionItem.extend("sap.m.table.columnmenu.QuickSortItem", {

		metadata: {
			library: "sap.m",
			properties: {
				/**
				 * Specifies the sort order that is applied for the respective column.
				 */
				sortOrder: { type: "sap.ui.core.SortOrder", defaultValue: CoreLibrary.SortOrder.None }
			},
			aggregations: {
				/**
				 * Defines the quick action of the quick sort item.
				 */
				quickAction: { type: "sap.m.table.columnmenu.QuickAction", multiple: false, visibility: "hidden" }
			}
		}
	});

	QuickSortItem.prototype._getAction = function() {
		var oQuickAction = this.getAggregation("quickAction");
		var sLabel = this._getLabel();

		if (oQuickAction) {
			oQuickAction.setLabel(sLabel);
		} else {
			oQuickAction = new QuickAction({
				label: sLabel,
				content: [this._createContent()],
				category: library.table.columnmenu.Category.Sort
			});
		}

		this.setAggregation("quickAction", oQuickAction, true);
		return oQuickAction;
	};

	QuickSortItem.prototype._getLabel = function() {
		var oBundle = sap.ui.getCore().getLibraryResourceBundle("sap.m");
		return oBundle.getText("table.COLUMNMENU_QUICK_SORT", this.getLabel());
	};

	QuickSortItem.prototype._createContent = function() {
		var oBundle = sap.ui.getCore().getLibraryResourceBundle("sap.m");
		return [
			new ToggleButton({
				text: oBundle.getText("table.COLUMNMENU_SORT_ASCENDING"),
				pressed: this.getSortOrder() === SortOrder.Ascending,
				press: [{item: this, sortOrder: SortOrder.Ascending}, this._onSortChange, this]
			}),
			new ToggleButton({
				text: oBundle.getText("table.COLUMNMENU_SORT_DESCENDING"),
				pressed: this.getSortOrder() === SortOrder.Descending,
				press: [{item: this, sortOrder: SortOrder.Descending}, this._onSortChange, this]
			})
		];
	};

	QuickSortItem.prototype._onSortChange = function (oEvent, mSortInfo) {
		this.setSortOrder(oEvent.getParameters().pressed ? mSortInfo.sortOrder : SortOrder.None, true);
		this.getParent().onChange(mSortInfo.item);
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	QuickSortItem.prototype.setSortOrder = function(sSortOrder) {
		this.setProperty("sortOrder", sSortOrder);

		var oQuickAction = this.getAggregation("quickAction");
		if (oQuickAction) {
			var aButtons = oQuickAction.getContent();
			aButtons[0].setPressed(sSortOrder === SortOrder.Ascending);
			aButtons[1].setPressed(sSortOrder === SortOrder.Descending);
		}
	};

	return QuickSortItem;
});