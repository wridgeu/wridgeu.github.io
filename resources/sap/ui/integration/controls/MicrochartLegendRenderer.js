/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/ui/core/Core","sap/ui/core/theming/Parameters"],function(e,r,t){"use strict";var a=e.ValueColor;var n={apiVersion:2};n.render=function(e,t){var a=r.byId(t.getChart()),o=[],i=t.getAggregation("_titles");if(a){o=a._calculateChartData().map(function(e){return e.color})}e.openStart("div",t).class("sapUiIntegrationMicrochartLegend").openEnd();o.forEach(function(r,t){e.openStart("div").class("sapUiIntegrationMicrochartLegendItem").openEnd();e.openStart("div");n.addColor(e,r);e.openEnd().close("div");e.renderControl(i[t]);e.close("div")});e.close("div")};n.addColor=function(e,r){if(a[r]){e.class("sapUiIntegrationMicrochartLegendItem"+r)}else{var n=t.get(r)||r;e.style("background",n)}};return n},true);