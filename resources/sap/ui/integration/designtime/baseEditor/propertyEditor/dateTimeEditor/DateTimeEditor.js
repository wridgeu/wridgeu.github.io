/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/BasePropertyEditor","sap/ui/integration/designtime/baseEditor/propertyEditor/dateEditor/DateEditor","sap/ui/core/format/DateFormat"],function(t,e,i){"use strict";var r=e.extend("sap.ui.integration.designtime.baseEditor.propertyEditor.dateTimeEditor.DateTimeEditor",{xmlFragment:"sap.ui.integration.designtime.baseEditor.propertyEditor.dateTimeEditor.DateTimeEditor",metadata:{library:"sap.ui.integration"},renderer:t.getMetadata().getRenderer().render});r.prototype.getFormatterInstance=function(){return i.getDateTimeInstance()};r.configMetadata=Object.assign({},e.configMetadata);return r});