/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/performance/Measurement"],function(e){"use strict";var r=performance&&performance.now;var t=performance&&performance.mark;function n(){if(r){return" Start since page load: "+performance.now()}return""}var a=new Map;var i={start:function(r,i){if(!e.getActive()){return}a.set(r,{detail:i});if(t){performance.mark(r+"-start")}e.start(r,i+n())},end:function(r){if(!e.getActive()){return}var n=a.get(r);if(t){performance.mark(r+"-end",{start:r,detail:n.detail})}e.end(r);n.ended=true},hasEnded:function(r){return e.getActive()&&a.get(r).ended}};return i});
//# sourceMappingURL=Measurement.js.map