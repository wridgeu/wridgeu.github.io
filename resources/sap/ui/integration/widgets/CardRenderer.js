/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/f/CardRenderer","sap/ui/integration/library"],function(e,r){"use strict";var t={TYPE:"/sap.card/type"};var a=r.CardDesign;var n=r.CardPreviewMode;return e.extend("sap.ui.integration.widgets.CardRenderer",{apiVersion:2,renderContainerAttributes:function(r,i){e.renderContainerAttributes.apply(this,arguments);r.class("sapUiIntCard");var s=i._oCardManifest;if(s&&s.get(t.TYPE)&&s.get(t.TYPE).toLowerCase()==="analytical"){r.class("sapUiIntCardAnalytical")}if(i.getCardFooter()&&i.getCardFooter().getVisible()){r.class("sapUiIntCardWithFooter")}if(i.getDesign()===a.Transparent){r.class("sapFCardTransparent")}if(i.getPreviewMode()===n.Abstract){r.class("sapFCardPreview")}},renderContentSection:function(r,t){var a=t.getAggregation("_filterBar");if(a){r.renderControl(a)}e.renderContentSection.apply(this,arguments)},renderFooterSection:function(e,r){var t=r.getAggregation("_footer");if(t){e.renderControl(t)}}})});
//# sourceMappingURL=CardRenderer.js.map