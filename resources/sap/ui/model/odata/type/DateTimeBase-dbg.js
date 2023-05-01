/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"sap/base/Log",
	"sap/base/util/extend",
	"sap/ui/core/date/UI5Date",
	"sap/ui/core/format/DateFormat",
	"sap/ui/model/FormatException",
	"sap/ui/model/ParseException",
	"sap/ui/model/ValidateException",
	"sap/ui/model/odata/type/ODataType"
], function (Log, extend, UI5Date, DateFormat, FormatException, ParseException, ValidateException,
		ODataType) {
	"use strict";

	/*
	 * Returns true if the type uses only the date.
	 *
	 * @param {sap.ui.model.odata.type.DateTimeBase} oType
	 *   The type
	 */
	function isDateOnly(oType) {
		return oType.oConstraints && oType.oConstraints.isDateOnly;
	}

	/*
	 * Returns the formatter. Creates it lazily.
	 *
	 * @param {sap.ui.model.odata.type.DateTimeBase} oType
	 *   The type instance
	 * @returns {sap.ui.core.format.DateFormat}
	 *   The formatter
	 */
	function getFormatter(oType) {
		var oFormatOptions;

		if (!oType.oFormat) {
			oFormatOptions = extend({strictParsing : true}, oType.oFormatOptions);
			if (isDateOnly(oType)) {
				oFormatOptions.UTC = true;
				oType.oFormat = DateFormat.getDateInstance(oFormatOptions);
			} else {
				oType.oFormat = DateFormat.getDateTimeInstance(oFormatOptions);
			}
		}
		return oType.oFormat;
	}

	/*
	 * Sets the constraints.
	 *
	 * @param {sap.ui.model.odata.type.DateTimeBase} oType
	 *   The type instance
	 * @param {object} [oConstraints]
	 *   Constraints, see {@link #constructor}
	 */
	function setConstraints(oType, oConstraints) {
		var vNullable,
			iPrecision;

		oType.oConstraints = undefined;
		if (oConstraints) {
			vNullable = oConstraints.nullable;
			if (vNullable === false || vNullable === "false") {
				oType.oConstraints = {nullable : false};
			} else if (vNullable !== undefined && vNullable !== true && vNullable !== "true") {
				Log.warning("Illegal nullable: " + vNullable, null, oType.getName());
			}

			if (oConstraints.isDateOnly === true) {
				oType.oConstraints = oType.oConstraints || {};
				oType.oConstraints.isDateOnly = true;
			}

			iPrecision = oConstraints.precision;
			if (iPrecision !== undefined) {
				if (iPrecision === Math.floor(iPrecision) && iPrecision >= 1 && iPrecision <= 12) {
					oType.oConstraints = oType.oConstraints || {};
					oType.oConstraints.precision = iPrecision;
				} else if (iPrecision !== 0) {
					Log.warning("Illegal precision: " + iPrecision, null, oType.getName());
				} // else: 0 is the default!
			}
		}
		oType._handleLocalizationChange();
	}

	/**
	 * Base constructor for the primitive types <code>Edm.DateTime</code> and
	 * <code>Edm.DateTimeOffset</code>.
	 *
	 * @param {object} [oFormatOptions]
	 *   Type-specific format options; see subtypes
	 * @param {object} [oConstraints]
	 *   Constraints; {@link #validateValue validateValue} throws an error if any constraint is
	 *   violated
	 * @param {boolean} [oConstraints.isDateOnly=false]
	 *   If <code>true</code>, only the date part is used, the time part is always 00:00:00 and
	 *   the time zone is UTC to avoid time-zone-related problems
	 * @param {boolean|string} [oConstraints.nullable=true]
	 *   If <code>true</code>, the value <code>null</code> is accepted
	 * @param {boolean} [oConstraints.precision=0]
	 *   The number of decimal places allowed in the seconds portion of a valid string value
	 *   (OData V4 only); only integer values between 0 and 12 are valid (since 1.37.0)
	 *
	 * @abstract
	 * @alias sap.ui.model.odata.type.DateTimeBase
	 * @author SAP SE
	 * @class This is an abstract base class for the OData primitive types
	 *   <code>Edm.DateTime</code> and <code>Edm.DateTimeOffset</code>.
	 * @extends sap.ui.model.odata.type.ODataType
	 * @public
	 * @since 1.27.0
	 * @version 1.112.0
	 */
	var DateTimeBase = ODataType.extend("sap.ui.model.odata.type.DateTimeBase", {
			constructor : function (oFormatOptions, oConstraints) {
				ODataType.apply(this, arguments);
				setConstraints(this, oConstraints);
				this.oFormat = null;
				this.oFormatOptions = oFormatOptions;
			},
			metadata : {
				"abstract" : true
			}
		});

	/**
	 * Formats the given value to the given target type.
	 *
	 * @param {Date} oValue
	 *   The value to be formatted, which is represented in the model as a <code>Date</code>
	 *   instance (OData V2)
	 * @param {string} sTargetType
	 *   The target type, may be "any", "object" (since 1.69.0), "string", or a type with one of
	 *   these types as its {@link sap.ui.base.DataType#getPrimitiveType primitive type}.
	 *   See {@link sap.ui.model.odata.type} for more information.
	 * @returns {Date|module:sap/ui/core/date/UI5Date|string}
	 *   The formatted output value in the target type; <code>undefined</code> or <code>null</code>
	 *   are formatted to <code>null</code>
	 * @throws {sap.ui.model.FormatException}
	 *   If <code>sTargetType</code> is not supported or <code>oValue</code> is not a model value
	 *   for this type.
	 *
	 * @public
	 * @since 1.27.0
	 */
	DateTimeBase.prototype.formatValue = function (oValue, sTargetType) {
		if (oValue === null || oValue === undefined) {
			return null;
		}
		switch (this.getPrimitiveType(sTargetType)) {
			case "any":
			case "object":
				return oValue;
			case "string":
				if (!(oValue instanceof Date)) {
					throw new FormatException("Illegal " + this.getName() + " value: " + oValue);
				}
				return getFormatter(this).format(oValue);
			default:
				throw new FormatException("Don't know how to format " + this.getName() + " to "
					+ sTargetType);
		}
	};

	/**
	 * Returns the matching locale-dependent error message for the type based on the constraints.
	 *
	 * @returns {string}
	 *   The locale-dependent error message
	 *
	 * @private
	 */
	DateTimeBase.prototype._getErrorMessage = function () {
		var iFullYear = UI5Date.getInstance().getFullYear(),
			oDate = isDateOnly(this)
				// no need to use UI5Date.getInstance as only the UTC timestamp is used
				? new Date(Date.UTC(iFullYear, 11, 31))
				: UI5Date.getInstance(iFullYear, 11, 31, 23, 59, 58), // configured time zone
			sText = isDateOnly(this) ? "EnterDate" : "EnterDateTime",
			oResourceBundle = sap.ui.getCore().getLibraryResourceBundle();

		return oResourceBundle.getText(sText, [this.formatValue(oDate, "string")]);
	};

	/**
	 * Parses the given value to a <code>Date</code> instance (OData V2).
	 *
	 * @param {string|Date} vValue
	 *   The value to be parsed; the empty string and <code>null</code> are parsed to
	 *   <code>null</code>
	 * @param {string} sSourceType
	 *   The source type (the expected type of <code>vValue</code>), must be
	 *   "object" (since 1.69.0), "string", or a type with one of these types as its
	 *   {@link sap.ui.base.DataType#getPrimitiveType primitive type}.
	 *   See {@link sap.ui.model.odata.type} for more information.
	 * @returns {Date|module:sap/ui/core/date/UI5Date|string}
	 *   The parsed value
	 * @throws {sap.ui.model.ParseException}
	 *   If <code>sSourceType</code> is not supported or if the given string cannot be parsed to a
	 *   Date
	 *
	 * @public
	 * @since 1.27.0
	 */
	DateTimeBase.prototype.parseValue = function (vValue, sSourceType) {
		var oResult;

		if (vValue === null || vValue === "") {
			return null;
		}
		switch (this.getPrimitiveType(sSourceType)) {
			case "object":
				return vValue;
			case "string":
				oResult = getFormatter(this).parse(vValue);
				if (!oResult) {
					throw new ParseException(this._getErrorMessage());
				}
				return oResult;
			default:
				throw new ParseException("Don't know how to parse " + this.getName() + " from "
					+ sSourceType);
		}
	};

	/**
	 * Called by the framework when any localization setting is changed.
	 *
	 * @private
	 */
	DateTimeBase.prototype._handleLocalizationChange = function () {
		this.oFormat = null;
	};

	/**
	 * Validates whether the given value in model representation is valid and meets the
	 * defined constraints.
	 *
	 * @param {Date} oValue
	 *   The value to be validated
	 * @throws {sap.ui.model.ValidateException}
	 *   If the value is not valid
	 *
	 * @public
	 * @since 1.27.0
	 */
	DateTimeBase.prototype.validateValue = function (oValue) {
		if (oValue === null) {
			if (this.oConstraints && this.oConstraints.nullable === false) {
				throw new ValidateException(this._getErrorMessage());
			}
			return;
		} else if (oValue instanceof Date) {
			if (oValue.getFullYear() === 0) {
				throw new ValidateException(this._getErrorMessage());
			}
			return;
		}
		throw new ValidateException("Illegal " + this.getName() + " value: " + oValue);
	};

	/**
	 * Gets the model value according to this type's constraints and format options for the given
	 * date object which represents a timestamp in the configured time zone.
	 *
	 * @param {Date|module:sap/ui/core/date/UI5Date|null} oDate
	 *   The date object considering the configured time zone. Must be created via
	 *   {@link module:sap/ui/core/date/UI5Date.getInstance}
	 * @returns {Date|module:sap/ui/core/date/UI5Date|null}
	 *   The model representation of the timestamp
	 * @throws {Error}
	 *   If the given date object is not valid or it does not consider the configured time zone
	 *
	 * @private
	 */
	DateTimeBase.prototype._getModelValue = function (oDate) {
		var oResult;

		if (oDate === null) {
			return null;
		}

		UI5Date.checkDate(oDate);

		oResult = UI5Date.getInstance(oDate);
		if (isDateOnly(this)) {
			oResult.setUTCFullYear(oDate.getFullYear(), oDate.getMonth(), oDate.getDate());
			oResult.setUTCHours(0, 0, 0, 0);
		} else if (this.oFormatOptions && this.oFormatOptions.UTC) {
			oResult.setUTCFullYear(oDate.getFullYear(), oDate.getMonth(), oDate.getDate());
			oResult.setUTCHours(oDate.getHours(), oDate.getMinutes(), oDate.getSeconds(), oDate.getMilliseconds());
		}

		return oResult;
	};

	/**
	 * Returns the type's name.
	 *
	 * @abstract
	 * @alias sap.ui.model.odata.type.DateTimeBase#getName
	 * @protected
	 * @see sap.ui.model.Type#getName
	 */

	return DateTimeBase;
});