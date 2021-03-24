/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/f/CardRenderer"],function(e){"use strict";var t={TYPE:"/sap.card/type"};return e.extend("sap.ui.integration.widgets.CardRenderer",{apiVersion:2,renderContainerAttributes:function(r,n){e.renderContainerAttributes.apply(this,arguments);r.class("sapUiIntCard");var a=n._oCardManifest;if(a&&a.get(t.TYPE)&&a.get(t.TYPE).toLowerCase()==="analytical"){r.class("sapUiIntCardAnalytical")}},renderContentSection:function(t,r){var n=r.getAggregation("_filterBar");if(n){t.openStart("div").class("sapFCardFilterBar").openEnd();t.renderControl(n);t.close("div")}e.renderContentSection.apply(this,arguments)}})});