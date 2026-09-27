/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/BasePropertyEditor","sap/ui/integration/designtime/baseEditor/propertyEditor/dateEditor/DateEditor","sap/ui/core/format/DateFormat"],function(t,e,i){"use strict";var a=e.extend("sap.ui.integration.designtime.baseEditor.propertyEditor.dateTimeEditor.DateTimeEditor",{xmlFragment:"sap.ui.integration.designtime.baseEditor.propertyEditor.dateTimeEditor.DateTimeEditor",metadata:{library:"sap.ui.integration"},renderer:t.getMetadata().getRenderer()});a.prototype.getFormatterInstance=function(t){return i.getDateTimeInstance(t||{pattern:"yyyy-MM-dd'T'HH:mm:ss.SSSSZ"})};a.configMetadata=Object.assign({},e.configMetadata,{typeLabel:{defaultValue:"BASE_EDITOR.TYPES.DATETIME"},utc:{defaultValue:true}});return a});
//# sourceMappingURL=DateTimeEditor.js.map