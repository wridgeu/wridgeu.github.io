/*!
* OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["sap/ui/fl/apply/_internal/extensionPoint/Processor","sap/base/util/merge"],function(n,t){"use strict";var e={applyExtensionPoint:function(e){var i=t({defaultContent:[]},e);return n.registerExtensionPoint(i).then(n.createDefaultContent.bind(this,e,[])).then(n.addDefaultContentToExtensionPointInfo.bind(this,i))}};return e});