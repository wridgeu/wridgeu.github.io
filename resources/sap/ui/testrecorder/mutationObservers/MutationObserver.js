/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/ManagedObject","sap/ui/testrecorder/Constants"],function(t,e,i){"use strict";var r=e.extend("sap.ui.testrecorder.mutationObservers.MutationObserver",{metadata:{library:"sap.ui.testrecorder"},constructor:function(t){this._fnObservationCb=t;this._observer=new window.MutationObserver(this._onObservation.bind(this))},start:function(t){this._oTarget=t||document.body;this._observer.observe(this._oTarget,this._getOptions())},stop:function(){this._observer.disconnect()},_getOptions:function(){return{}},_onObservation:function(t){if(this._isValidMutation(t)){this._fnObservationCb()}},_isValidMutation:function(t){var e=true;t.forEach(function(t){if(this._isRecorderElement(t)){e=false}}.bind(this));return e},_isRecorderElement:function(t){return[i.HIGHLIGHTER_ID,i.CONTEXTMENU_ID].filter(function(e){return t.target.id===e||t.addedNodes.length&&t.addedNodes[0].id===e||t.removedNodes.length&&t.removedNodes[0].id===e}).length}});return r});