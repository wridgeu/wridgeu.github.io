/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/testrecorder/codeSnippets/OPA5ControlSnippetGenerator","sap/ui/testrecorder/codeSnippets/RawControlSnippetGenerator","sap/ui/testrecorder/codeSnippets/UIVeri5ControlSnippetGenerator","sap/ui/testrecorder/DialectRegistry","sap/ui/testrecorder/Dialects"],function(e,t,r,n,i,o){"use strict";var p=null;var s=e.extend("sap.ui.testrecorder.codeSnippets.ControlSnippetProvider",{constructor:function(){if(!p){Object.apply(this,arguments)}else{return p}}});s.prototype.getSnippet=function(e){var t=s.getGenerator(i.getActiveDialect());return t.getSnippet(e).then(function(e){return e})};s.getGenerator=function(e){switch(e){case o.OPA5:return t;case o.RAW:return r;case o.UIVERI5:return n;default:return r}};p=new s;return p});