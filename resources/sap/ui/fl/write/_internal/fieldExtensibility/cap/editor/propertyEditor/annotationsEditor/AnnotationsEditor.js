/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/mapEditor/MapEditor"],function(t){"use strict";var e=t.extend("sap.ui.fl.write._internal.fieldExtensibility.cap.editor.propertyEditor.annotationsEditor.AnnotationsEditor",{xmlFragment:"sap.ui.integration.designtime.baseEditor.propertyEditor.mapEditor.MapEditor",metadata:{library:"sap.ui.fl"},renderer:t.getMetadata().getRenderer().render});e.prototype.processInputValue=function(t){return{value:t,type:"json"}};e.prototype._isValidItem=function(){return true};return e});