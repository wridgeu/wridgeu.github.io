/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./isCrossOriginURL"],function(r){"use strict";var e=function e(n,i,t){n=typeof n==="string"?n.trim():n;if(!n&&t&&t!=="_self"&&r(i)){return"noopener noreferrer"}return n};return e});