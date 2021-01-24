/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/editor/fields/BaseField","sap/m/Input","sap/ui/model/type/Integer"],function(e,t,i){"use strict";var n=e.extend("sap.ui.integration.designtime.editor.fields.IntegerField",{renderer:e.getMetadata().getRenderer()});n.prototype.initVisualization=function(e){var n=e.visualization;if(!n){n={type:t,settings:{value:{path:"currentSettings>value",type:new i},editable:{path:"currentSettings>editable"},type:"Number"}}}this._visualization=n};return n});