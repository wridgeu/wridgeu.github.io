/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/library","sap/base/Log","sap/ui/base/ManagedObject"],function(t,i,o){"use strict";var e=o.extend("sap.ui.integration.editor.Extension",{metadata:{library:"sap.ui.integration",properties:{formatters:{type:"object"}}}});e.prototype.init=function(){this._oEditorInterface=null;this._oEditor=null};e.prototype.exit=function(){this._oEditorInterface=null;this._oEditor=null};e.prototype.setFormatters=function(t){this.setProperty("formatters",t);if(!this._oEditor){return}if(this._oEditor.getAggregation("_extension")!==this){i.error("Extension formatters must be set before the initialization of the editor. Do this inside Extension#init().")}};e.prototype.onEditorReady=function(){};e.prototype.getEditor=function(){return this._oEditorInterface};e.prototype._setEditor=function(t,i){this._oEditor=t;this._oEditorInterface=i};return e});