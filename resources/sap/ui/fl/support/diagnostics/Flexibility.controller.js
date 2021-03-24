/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/fl/support/apps/uiFlexibilityDiagnostics/helper/Extractor"],function(e,t){"use strict";return e.extend("sap.ui.fl.support.diagnostics.Flexibility",{refreshApps:function(){this.getView().getViewData().plugin.onRefresh()},extractAppData:function(e){var i=e.getSource();var r=i.getBindingContext("flexApps");var a=r.getProperty("data");t.createDownloadFile(a)}})});