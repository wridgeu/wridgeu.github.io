/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseListContentRenderer","../controls/ListContentItem","../controls/ActionsStrip"],function(t,e,n){"use strict";var i=t.extend("sap.ui.integration.cards.ListContentRenderer",{apiVersion:2});i.renderContent=function(t,e){t.renderControl(e.getAggregation("_content"));if(e.getAggregation("_legend")){t.renderControl(e.getAggregation("_legend"))}e.getPaginator()?.render(t)};i.getMinHeight=function(t,e,n){if(e._fMinHeight){return e._fMinHeight+"px"}var i=n.getContentMinItems(t),r;if(!t||!t.item||i==null){return this.DEFAULT_MIN_HEIGHT}r=this.getItemMinHeight(t,e);return i*r+"rem"};i.getItemMinHeight=function(t,i){if(!t||!t.item){return 0}var r=this.isCompact(i),o=t.item,g=r?2:2.75,s=0,a=e.getLinesCount(o,i);if(a===2){g=5}else if(a>2){g=a+(a-1)*.5;s=2}if(o.actionsStrip&&n.hasVisibleTemplateItems(o.actionsStrip,i)){g+=r?2:2.75;s+=.5;if(a>2){g+=.5;s=1.5}}g+=s;return g};return i});
//# sourceMappingURL=ListContentRenderer.js.map