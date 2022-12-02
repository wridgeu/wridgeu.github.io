/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/f/CardRenderer","sap/ui/integration/library"],function(e,r){"use strict";var t={TYPE:"/sap.card/type"};var n=r.CardDesign;return e.extend("sap.ui.integration.widgets.CardRenderer",{apiVersion:2,renderContainerAttributes:function(r,a){e.renderContainerAttributes.apply(this,arguments);r.class("sapUiIntCard");var i=a._oCardManifest;if(i&&i.get(t.TYPE)&&i.get(t.TYPE).toLowerCase()==="analytical"){r.class("sapUiIntCardAnalytical")}if(a.getCardFooter()&&a.getCardFooter().getVisible()){r.class("sapUiIntCardWithFooter")}if(a.getDesign()===n.Transparent){r.class("sapFCardTransparent")}},renderContentSection:function(r,t){var n=t.getAggregation("_filterBar");if(n){r.renderControl(n)}e.renderContentSection.apply(this,arguments)},renderFooterSection:function(e,r){var t=r.getAggregation("_footer");if(t){e.renderControl(t)}}})});