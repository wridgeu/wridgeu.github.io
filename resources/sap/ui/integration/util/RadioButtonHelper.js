/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";const e={};e.getValueForModel=function(e){const t=e.getSelectedIndex(),n=e.getButtons();let d=null,c=null;if(t>=0&&n&&n[t]){const e=n[t];d=e.getText()||null;c=e.data("key")}return{selectedIndex:t,selectedKey:c,selectedText:d}};e.setSelectedIndexAndKey=function(e,t,n){if(t!==undefined){e.setSelectedIndex(t);return}if(n!==undefined){const t=e.getButtons();const d=n;const c=t.findIndex(function(e){const t=e.data("key");return t&&t.toString()===d});e.setSelectedIndex(c)}};return e});
//# sourceMappingURL=RadioButtonHelper.js.map