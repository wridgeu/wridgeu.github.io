/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";const e={};e.setValueAndKey=function(e,t,n){if(t){e.setSelectedKey(t);const n=e.getItems().find(e=>e.getKey()===t);e.setValue(n?n.getText():"");return}if(n){const t=e.getItems().find(e=>e.getText()===n);if(t){e.setSelectedItem(t)}else{e.setSelectedKey(null);e.setValue(n)}return}e.setSelectedKey(null);e.setValue(null)};return e});
//# sourceMappingURL=ComboBoxHelper.js.map