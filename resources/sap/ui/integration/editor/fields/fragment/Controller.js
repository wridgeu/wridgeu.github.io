/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/integration/util/Utils"],function(t,e){"use strict";var i=t.extend("sap.ui.integration.editor.fields.fragment.Controller",{});i.prototype.init=function(){};i.prototype.setField=function(t){this._oField=t};i.prototype.saveValue=function(t){var i=e._language;var n=this._oField.getConfiguration();if(n.type==="string"&&n.translatable){this._oField.setTranslationValueInTexts(i,t)}else{this._oField._oSettingsModel.setProperty(n.manifestpath,t)}};return i});
//# sourceMappingURL=Controller.js.map