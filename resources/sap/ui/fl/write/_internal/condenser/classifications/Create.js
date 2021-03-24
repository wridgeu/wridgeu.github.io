/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/fl/write/_internal/condenser/Utils"],function(e,t){"use strict";return{addToReconstructionMap:function(n,a){var r=e.byId(a.affectedControl);var i=r&&r.sParentAggregationName||a.targetAggregation;var o=t.getContainerElementIds(a.targetContainer,i);var g=t.getInitialUIContainerElementIds(n,a.targetContainer,a.targetAggregation,o);var c=g.indexOf(a.affectedControl);if(c>-1){g.splice(c,1)}},simulate:function(e,t){e.splice(t.getTargetIndex(t.change),0,t.affectedControl)}}});