/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/testrecorder/mutationObservers/MutationObserver"],function(t){"use strict";var e=t.extend("sap.ui.testrecorder.mutationObservers.ElementMutationObserver",{metadata:{library:"sap.ui.testrecorder"},_onObservation:function(t){if(this._isValidMutation(t)){this._fnObservationCb({domElementId:this._oTarget.id})}},_getOptions:function(){return{subtree:true,attributes:true}}});return e});