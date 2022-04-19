/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/Object"],function(e,t){"use strict";var r=t.extend("sap.ui.testrecorder.codeSnippets.ControlSnippetGenerator",{});r.prototype.getSnippet=function(t){return new Promise(function(r,n){if(!t||!t.controlSelector){n(new Error("Control selector is required!"))}var o=this._generate(e.extend(true,{},t));r(o)}.bind(this))};r.prototype._generate=function(){return""};r.prototype._getSelectorAsString=function(e){var t=JSON.stringify(e,undefined,4);return t.replace(/\"([^(\")"]+)\":/g,"$1:")};r.prototype._getIndentation=function(e){var t="";for(var r=0;r<e*4;r+=1){t+=" "}return t};r.prototype._escapeQuotes=function(e){return e.replace(/"/g,'\\"')};return r});