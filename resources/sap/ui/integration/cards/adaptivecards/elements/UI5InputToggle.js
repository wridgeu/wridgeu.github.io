/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/thirdparty/adaptivecards","sap/ui/integration/cards/adaptivecards/overwrites/inputsGeneralOverwrites"],function(e,t){"use strict";function n(){e.ToggleInput.apply(this,arguments)}n.prototype=Object.create(e.ToggleInput.prototype);n.prototype.overrideInternalRender=function(){var n=e.TextInput.prototype.overrideInternalRender.call(this,arguments);t.overwriteLabel(this);t.overwriteRequired(this);return n};n.prototype.internalRender=function(){this._checkboxInputElement=document.createElement("ui5-checkbox");this._checkboxInputElement.id=this.id;this._checkboxInputElement.text=this.title||"";this._checkboxInputElement.wrappingType=this.wrap?"Normal":"None";this._checkboxInputElement.checked=false;if(this.defaultValue===this.valueOn){this._checkboxInputElement.checked=true}this._checkboxInputElement.addEventListener("change",function(){this.valueChanged()}.bind(this));return this._checkboxInputElement};n.prototype.updateInputControlAriaLabelledBy=function(){t.overwriteAriaLabelling(this,"aria-labelledby")};n.prototype.showValidationErrorMessage=function(){if(this._checkboxInputElement){this._checkboxInputElement.valueState="Error"}};n.prototype.resetValidationFailureCue=function(){e.TextInput.prototype.resetValidationFailureCue.call(this,arguments);if(this._checkboxInputElement){this._checkboxInputElement.valueState="None"}};return n});