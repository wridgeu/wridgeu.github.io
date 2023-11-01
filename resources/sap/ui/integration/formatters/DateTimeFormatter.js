/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/format/DateFormat","sap/ui/core/date/UniversalDate","sap/ui/integration/util/Utils"],function(e,t,a){"use strict";const r={dateTime(r,n,s){const i=a.processFormatArguments(n,s);const o=e.getDateTimeInstance(i.formatOptions,i.locale);let m;if(Array.isArray(r)){m=r.map(e=>new t(a.parseJsonDateTime(e)))}else if(r!==undefined){m=new t(a.parseJsonDateTime(r))}if(m){return o.format(m)}return""},date(r,n,s){const i=a.processFormatArguments(n,s);const o=e.getDateInstance(i.formatOptions,i.locale);let m;if(Array.isArray(r)){m=r.map(e=>new t(a.parseJsonDateTime(e)))}else if(r!==undefined){m=new t(a.parseJsonDateTime(r))}if(m){return o.format(m)}return""}};return r});
//# sourceMappingURL=DateTimeFormatter.js.map