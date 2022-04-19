/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/write/_internal/condenser/Utils"],function(e){"use strict";return{addToReconstructionMap:function(t,n){return Promise.all([e.getContainerElementIds(n.sourceContainer,n.sourceAggregation),e.getContainerElementIds(n.targetContainer,n.targetAggregation)]).then(function(r){var a=r[0];var i=r[1];var o;var g;if(n.targetContainer===n.sourceContainer&&n.targetAggregation===n.sourceAggregation){o=e.getInitialUIContainerElementIds(t,n.targetContainer,n.targetAggregation,i);g=o.indexOf(n.affectedControl);e.shiftElement(o,g,n.sourceIndex)}else{o=e.getInitialUIContainerElementIds(t,n.targetContainer,n.targetAggregation,i);g=o.indexOf(n.affectedControl);o.splice(g,1);o=e.getInitialUIContainerElementIds(t,n.sourceContainer,n.sourceAggregation,a);o.splice(n.sourceIndex,0,n.affectedControl)}})},simulate:function(t,n,r){var a=n.affectedControl;var i=r.indexOf(a);e.extendElementsArray(t,i,undefined,a);var o=t.indexOf(a);var g=n.getTargetIndex(n.change);if(i===-1){t.splice(g,0,a)}else{t.splice(g,0,t.splice(o,1)[0])}}}});