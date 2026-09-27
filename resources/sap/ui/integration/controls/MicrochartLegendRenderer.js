/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/ui/core/Element"],function(e,r){"use strict";var t=e.ValueColor;var n={apiVersion:2};n.render=function(e,t){var a=r.getElementById(t.getChart()),o=[],i=t.getAggregation("_titles");if(a){o=a._calculateChartData().map(function(e){return e.color})}e.openStart("div",t).class("sapUiIntMicrochartLegend").openEnd();o.forEach(function(r,a){e.openStart("div").class("sapUiIntMicrochartLegendItem").openEnd();e.openStart("div");n.addColor(e,t,r);e.openEnd().close("div");e.renderControl(i[a]);e.close("div")});e.close("div")};n.addColor=function(e,r,n){if(t[n]){e.class("sapUiIntMicrochartLegendItem"+n)}else{var a=r._mLegendColors[n]||n;e.style("background",a)}};return n},true);
//# sourceMappingURL=MicrochartLegendRenderer.js.map