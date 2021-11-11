/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/dateTimeEditor/DateTimeEditor"],function(e){"use strict";var t=e.extend("sap.ui.fl.write._internal.fieldExtensibility.cap.editor.propertyEditor.dateTimeEditor.DateTimeEditor",{xmlFragment:"sap.ui.integration.designtime.baseEditor.propertyEditor.dateTimeEditor.DateTimeEditor",metadata:{library:"sap.ui.fl"},renderer:e.getMetadata().getRenderer().render});t.prototype._parse=function(e){if(e===""){return undefined}var t=new Date(e);return this._isValidDate(t)?t.toISOString().split(".")[0]+"Z":e};return t});