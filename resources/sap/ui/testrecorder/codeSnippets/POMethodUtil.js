/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object"],function(e){"use strict";var n=null;var t=e.extend("sap.ui.testrecorder.codeSnippets.POMethodUtil",{constructor:function(){if(!n){Object.apply(this,arguments)}else{return n}}});t.prototype.getPOMethod=function(e,n){if(n&&n.formatAsPOMethod){var t=e.map(function(e){return e.replace(/^/gm,"    ")}).join("\n\n");return"<iDoAction>: function () {\n"+t+"\n}"}else{return e.join("\n\n")}};n=new t;return n});