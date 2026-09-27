/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library"],function(t){"use strict";const e=t.Size;const i={apiVersion:2};i.render=function(t,i){const n="sapUiIntMicrochartValue"+i.getValueColor();t.openStart("div",i).class("sapUiIntMicrochartChartWrapper").openEnd();t.openStart("div").class("sapUiIntMicrochartChart").class("sapUiIntMicrochartSize"+i.getSize());if(i.getSize()===e.Responsive){t.style("height",i.getHeight())}t.openEnd();t.openStart("div").class("sapUiIntMicrochartChartInner").openEnd().renderControl(i.getChart()).close("div");t.close("div");const s=i.getDisplayValue();if(s){t.openStart("div").class("sapMSLIInfo").class(n).openEnd().text(s).close("div")}t.close("div")};return i},true);
//# sourceMappingURL=MicrochartRenderer.js.map