/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/editor/fields/BaseField","sap/m/CheckBox"],function(e,i){"use strict";var t=e.extend("sap.ui.integration.editor.fields.BooleanField",{metadata:{library:"sap.ui.integration"},renderer:e.getMetadata().getRenderer()});t.prototype.initVisualization=function(e){var t=e.visualization;if(!t){t={type:i,settings:{selected:{path:"currentSettings>value"},editable:e.editable}};e.withLabel=true}this._visualization=t};return t});