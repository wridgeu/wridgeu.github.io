/*!
* OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/

sap.ui.define([
	"sap/ui/integration/library",
	"./ListContentItemRenderer",
	"sap/m/Avatar",
	"sap/m/AvatarShape",
	"sap/m/AvatarSize",
	"sap/m/ListItemBase",
	"sap/ui/core/Core",
	"sap/ui/core/library"
], function (
	library,
	ListContentItemRenderer,
	Avatar,
	AvatarShape,
	AvatarSize,
	ListItemBase,
	Core,
	coreLibrary
) {
	"use strict";

	var AttributesLayoutType = library.AttributesLayoutType;
	var ValueState = coreLibrary.ValueState;

	/**
	 * Constructor for a new ListContentItem.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @class
	 *
	 * @extends sap.m.ListItemBase
	 *
	 * @author SAP SE
	 * @version 1.112.0
	 *
	 * @constructor
	 * @private
	 * @alias sap.ui.integration.controls.ListContentItem
	 */
	var ListContentItem = ListItemBase.extend("sap.ui.integration.controls.ListContentItem", {
		metadata: {
			library: "sap.ui.integration",
			properties: {
				/**
				 * Defines the title of the list item.
				 */
				title: { type: "string", group: "Misc", defaultValue: null },

				/**
				 * Defines the additional information for the title.
				 */
				description: { type: "string", group: "Misc", defaultValue: null },

				/**
				 * Defines the list item icon.
				 */
				icon: { type: "sap.ui.core.URI", group: "Misc", defaultValue: null },

				/**
				 * Defines an alt text for the avatar or icon.
				 * @since 1.82
				 */
				iconAlt: { type: "string", defaultValue: "" },

				/**
				 * Defines the shape of the icon.
				 * @since 1.82
				 */
				iconDisplayShape: { type: "sap.m.AvatarShape", defaultValue: AvatarShape.Square },

				/**
				 * Defines the initials of the icon.
				 * @since 1.82
				 */
				iconInitials: { type: "string", defaultValue: "" },

				/**
				 * Defines the size of the icon.
				 * @since 1.82
				 */
				iconSize: { type: "sap.m.AvatarSize", defaultValue: AvatarSize.XS },

				/**
				 * Defines the background color of the icon.
				 * @since 1.83
				 */
				iconBackgroundColor: { type: "sap.m.AvatarColor" },

				/**
				 * Defines whether the icon should be visible.
				 */
				iconVisible: { type: "boolean", defaultValue: true },

				/**
				 * Defines an additional information text.
				 */
				info: { type : "string", group: "Misc", defaultValue: null },

				/**
				 * Defines the value state of the information text.
				 */
				infoState: { type : "sap.ui.core.ValueState", group: "Misc", defaultValue: ValueState.None },

				/**
				 * Defines if info state icon should be shown.
				 */
				showInfoStateIcon: { type: "boolean", defaultValue: false },

				/**
				 * Defines the layout type of the attributes.
				 */
				attributesLayoutType: { type: "sap.ui.integration.AttributesLayoutType", defaultValue: AttributesLayoutType.TwoColumns }
			},
			aggregations: {
				microchart: { type: "sap.ui.integration.controls.Microchart", multiple: false },

				actionsStrip: { type: "sap.ui.integration.controls.ActionsStrip", multiple: false },

				attributes: { type: "sap.m.ObjectStatus", multiple: true },

				/**
				 * Defines the inner avatar control.
				 */
				_avatar: { type: "sap.m.Avatar", multiple: false, visibility: "hidden" }
			}
		},
		renderer: ListContentItemRenderer
	});

	ListContentItem.getLinesCount = function (oConfiguration) {
		var iLines = 1; // at least 1 line for the mandatory title

		if (oConfiguration.description) {
			iLines += 1;
		}

		if (oConfiguration.attributes) {
			if (oConfiguration.attributesLayoutType === AttributesLayoutType.OneColumn) {
				iLines = oConfiguration.attributes.length;
			} else {
				iLines += Math.ceil(oConfiguration.attributes.length / 2);
			}
		}

		if (oConfiguration.chart) {
			iLines += 1;
		}

		return iLines;
	};

	ListContentItem.prototype.getLinesCount = function () {
		var iLines = 1; // at least 1 line for the mandatory title

		if (this.getDescription()) {
			iLines += 1;
		}

		if (this.getAttributesLayoutType() === AttributesLayoutType.OneColumn) {
			iLines += this._getVisibleAttributes().length;
		} else {
			iLines += Math.ceil(this._getVisibleAttributes().length / 2);
		}

		if (this.getMicrochart()) {
			iLines += 1;
		}

		return iLines;
	};

	/**
	 * ListItemBase hook
	 * @override
	 */
	ListContentItem.prototype.getContentAnnouncement = function () {
		var sInfoState = this.getInfoState(),
			sTitle = this.getTitle(),
			sDescription = this.getDescription(),
			aOutput = [],
			sInfo = this.getInfo(),
			oMBundle = Core.getLibraryResourceBundle("sap.m");

		if (sTitle) {
			aOutput.push(sTitle);
		}

		if (sDescription) {
			aOutput.push(sDescription);
		}

		if (sInfo) {
			aOutput.push(sInfo);
		}

		if (sInfoState != ValueState.None && sInfoState !== this.getHighlight()) {
			aOutput.push(oMBundle.getText("LIST_ITEM_STATE_" + sInfoState.toUpperCase()));
		}

		return aOutput.join(" . ").trim();
	};

	ListContentItem.prototype._getAvatar = function () {
		var oAvatar = this.getAggregation("_avatar");

		if (!oAvatar) {
			oAvatar = new Avatar().addStyleClass("sapFCardIcon");
			this.setAggregation("_avatar", oAvatar);
		}

		oAvatar
			.setSrc(this.getIcon())
			.setDisplayShape(this.getIconDisplayShape())
			.setTooltip(this.getIconAlt())
			.setInitials(this.getIconInitials())
			.setDisplaySize(this.getIconSize())
			.setBackgroundColor(this.getIconBackgroundColor())
			.setVisible(this.getIconVisible());

		return oAvatar;
	};

	ListContentItem.prototype._getVisibleAttributes = function () {
		return this.getAttributes().filter(function (oAttribute) {
			return oAttribute.getVisible();
		});
	};

	return ListContentItem;
});