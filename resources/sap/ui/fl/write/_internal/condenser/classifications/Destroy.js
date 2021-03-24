/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/write/_internal/condenser/Utils"],function(e){"use strict";return{addToReconstructionMap:function(t,n){var i=e.getContainerElementIds(n.targetContainer,n.targetAggregation);var r=e.getInitialUIContainerElementIds(t,n.targetContainer,n.targetAggregation,i);if(r.length-1<n.sourceIndex){while(r.length-1<n.sourceIndex){var a=r.length;r.splice(r.length,0,e.PLACEHOLDER+a)}r[n.sourceIndex]=n.affectedControl}else{r.splice(n.sourceIndex,0,n.affectedControl)}},simulate:function(t,n,i){var r=t.indexOf(n.affectedControl);if(r===-1){var a=e.PLACEHOLDER+i.indexOf(n.affectedControl);r=t.indexOf(a)}if(r>-1){t.splice(r,1)}}}});