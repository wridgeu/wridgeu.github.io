/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/thirdparty/adaptivecards","sap/ui/core/format/DateFormat","sap/ui/integration/cards/adaptivecards/overwrites/inputsGeneralOverwrites"],function(t,e,n){"use strict";function i(){t.TimeInput.apply(this,arguments)}var r="HH:mm";i.prototype=Object.create(t.TimeInput.prototype);i.prototype.overrideInternalRender=function(){var e=t.TextInput.prototype.overrideInternalRender.call(this,arguments);n.overwriteLabel(this);n.overwriteRequired(this);return e};i.prototype.internalRender=function(){var t="ui5-time-picker";this._timeInputElement=document.createElement(t);this._timeInputElement.id=this.id;this._timeInputElement.value=this.defaultValue||"";this._timeInputElement.formatPattern=r;n.createValueStateElement(this,this._timeInputElement);this._timeInputElement.addEventListener("input",function(t){this.valueChanged()}.bind(this));return this._timeInputElement};i.prototype.updateInputControlAriaLabelledBy=function(){n.overwriteAriaLabelling(this,"aria-labelledby")};i.prototype.showValidationErrorMessage=function(){if(this.renderedInputControlElement){this.renderedInputControlElement.valueState="Error"}};i.prototype.resetValidationFailureCue=function(){t.TextInput.prototype.resetValidationFailureCue.call(this,arguments);if(this.renderedInputControlElement){this.renderedInputControlElement.valueState="None"}};return i});