/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/test/RecordReplay"],function(e,t){"use strict";var n=e.extend("sap.ui.testrecorder.controlSelectors.ControlSelectorGenerator",{});n.prototype.getSelector=function(e){var n=o(e);return t.findControlSelectorByDOMElement({domElement:n,settings:e.settings}).then(function(e){return e})};function o(e){if(e.domElementId&&typeof e.domElementId==="string"){return document.getElementById(e.domElementId)}else if(e.controlId){return sap.ui.getCore().byId(e.controlId).getFocusDomRef()}}return new n});