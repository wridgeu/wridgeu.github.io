/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./isCrossOriginURL","sap/ui/Device"],function(e,n){"use strict";var r=function r(i,o){var u;if(o!=="_self"&&e(i)){u="noopener,noreferrer";if(n.browser.msie){var s=window.open("about:blank",o,u);if(s){s.opener=null;s.location.href=i}return null}}return window.open(i,o,u)};return r});