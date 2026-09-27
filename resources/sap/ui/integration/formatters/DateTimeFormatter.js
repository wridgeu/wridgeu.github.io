/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/format/DateFormat","sap/ui/core/date/UniversalDate","sap/ui/integration/util/Utils"],function(e,t,n){"use strict";function r(e){let r;if(Array.isArray(e)){r=e.map(e=>new t(n.parseJsonDateTime(e)))}else if(e!==undefined){r=new t(n.parseJsonDateTime(e))}return r}const o={dateTime(t,o,a){const s=n.processFormatArguments(o,a);const i=e.getDateTimeInstance(s.formatOptions,s.locale);const m=r(t);if(m){return i.format(m)}return""},date(t,o,a){const s=n.processFormatArguments(o,a);const i=e.getDateInstance(s.formatOptions,s.locale);const m=r(t);if(m){return i.format(m)}return""},dateTimeWithTimezone(t,o,a,s){const i=n.processDateTimeWithTimezoneFormatArguments(o,a,s);const m=e.getDateTimeWithTimezoneInstance(i.formatOptions,i.locale);const c=r(t);if(c){return m.format(c,i.timezone)}return""}};return o});
//# sourceMappingURL=DateTimeFormatter.js.map