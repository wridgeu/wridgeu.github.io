/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/editor/fields/BaseField","sap/m/CheckBox"],function(e,t){"use strict";var i=e.extend("sap.ui.integration.designtime.editor.fields.BooleanField",{renderer:e.getMetadata().getRenderer()});i.prototype.initVisualization=function(e){var i=e.visualization;if(!i){i={type:t,settings:{selected:{path:"currentSettings>value"},editable:{path:"currentSettings>editable"}}};e.withLabel=true}this._visualization=i};return i});