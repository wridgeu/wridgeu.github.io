/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/dateEditor/DateEditor","sap/ui/core/format/DateFormat"],function(t,e){"use strict";var r=t.extend("sap.ui.fl.write._internal.fieldExtensibility.cap.editor.propertyEditor.dateEditor.DateEditor",{xmlFragment:"sap.ui.integration.designtime.baseEditor.propertyEditor.dateEditor.DateEditor",metadata:{library:"sap.ui.fl"},renderer:t.getMetadata().getRenderer().render});r.prototype._parse=function(t){if(t===""){return undefined}var r=new Date(t);var i=e.getDateInstance({pattern:"yyyy-MM-dd"});return this._isValidDate(r)?i.format(r):t};return r});