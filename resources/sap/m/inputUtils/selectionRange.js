/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device"],function(e){"use strict";var t=function(t,n){if(!t){return null}var r=t.selectionStart,i=t.selectionEnd,s=t.value,u={start:r,end:i};if((e.browser.msie||e.browser.edge)&&n){u.start=s.length;u.end=s.length}return u};return t});