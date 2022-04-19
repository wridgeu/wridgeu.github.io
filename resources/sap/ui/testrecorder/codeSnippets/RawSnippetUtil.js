/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object"],function(e){"use strict";var n=null;var t=e.extend("sap.ui.testrecorder.codeSnippets.RawSnippetUtil",{constructor:function(){if(!n){e.apply(this,arguments)}else{return n}}});t.prototype.getJSON=function(e,n){if(n.multipleSnippets){var t=e.map(function(e){return e.replace(/^/gm,"        ")}).join(",\n");return'{\n    "selectors": [\n'+t+"\n    ]\n}"}else{return e[0]}};n=new t;return n});