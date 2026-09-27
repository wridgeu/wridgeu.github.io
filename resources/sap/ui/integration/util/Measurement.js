/*!
 * OpenUI5
 * (c) Copyright 2026 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/config"],function(e){"use strict";var r=performance&&performance.mark;var t=performance&&performance.measure;var a={start:function(e,r){if(!this.getActive()){return null}return performance.mark(e+"-start",{detail:r})},end:function(e){if(!this.getActive()){return null}var r=performance.getEntriesByName(e+"-start")[0],t,a="";if(r){a=r.detail}t=performance.mark(e+"-end",{start:e,detail:a});performance.measure(e,{start:e+"-start",end:e+"-end",detail:a});return t},hasEnded:function(e){if(!this.getActive()){return false}var r=performance.getEntriesByName(e+"-end")[0];return!!r},getActive:function(){var a=e.get({name:"sapUiXxMeasureCards",type:e.Type.Boolean,external:true});return a&&r&&t}};return a});
//# sourceMappingURL=Measurement.js.map