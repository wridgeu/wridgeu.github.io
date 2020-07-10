/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/FlexControllerFactory","sap/ui/fl/Utils"],function(e,t){"use strict";var r={getFlexControllerInstance:function(t,r){if(typeof t==="string"){return e.create(t,r)}var n=t.appComponent||t;return e.createForControl(n)},getDescriptorFlexControllerInstance:function(r){if(typeof r.appId==="string"){return e.create(r.appId,r.appVersion)}var n=r.appComponent||r;var o=t.getAppDescriptorComponentObjectForControl(n);return e.create(o.name,o.version)},getAppComponentForSelector:function(e){if(typeof e.appId==="string"){return e}return e.appComponent||t.getAppComponentForControl(e)}};return r},true);