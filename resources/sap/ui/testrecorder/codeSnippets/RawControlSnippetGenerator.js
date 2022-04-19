/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/testrecorder/codeSnippets/ControlSnippetGenerator"],function(e){"use strict";var t=e.extend("sap.ui.testrecorder.codeSnippets.RawControlSnippetGenerator",{});t.prototype._generate=function(e){return JSON.stringify(e.controlSelector,undefined,4)};return new t});