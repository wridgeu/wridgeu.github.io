/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object"],function(e){"use strict";var t=null;var n=e.extend("sap.ui.testrecorder.codeSnippets.RawSnippetUtil",{constructor:function(){if(!t){Object.apply(this,arguments)}else{return t}}});n.prototype.getJSON=function(e,t){if(t.multipleSnippets){var n=e.map(function(e){return e.replace(/^/gm,"        ")}).join(",\n");return'{\n    "selectors": [\n'+n+"\n    ]\n}"}else{return e[0]}};t=new n;return t});