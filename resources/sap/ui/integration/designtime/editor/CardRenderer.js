/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/widgets/CardRenderer","sap/f/library"],function(e,t){"use strict";var r=t.cards.HeaderPosition;return e.extend("sap.ui.integration.designtime.editor.CardRenderer",{apiVersion:2,render:function(e,t){var n=t.getCardHeader(),i=n&&t.getCardHeaderPosition()===r.Top;e.openStart("div",t);this.renderContainerAttributes(e,t);e.openEnd();if(t.getReadonly()){e.openStart("div",t.getId()+"-readonly");e.attr("tabindex","-1");e.style("z-index",t.getReadonlyZIndex());e.style("position","absolute");e.style("width","100%");e.style("height","100%");e.style("opacity","0.01");e.style("background-color","rgba(222, 222, 222, 0.5)");e.openEnd();e.close("div")}if(i){e.renderControl(n)}this.renderContentSection(e,t);if(!i){e.renderControl(n)}this.renderFooterSection(e,t);e.renderControl(t._ariaText);e.renderControl(t._ariaContentText);e.close("div")}})});
//# sourceMappingURL=CardRenderer.js.map