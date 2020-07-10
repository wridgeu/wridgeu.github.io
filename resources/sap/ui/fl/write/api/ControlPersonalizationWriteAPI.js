/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/ControlPersonalizationAPI","sap/ui/fl/Utils"],function(e,n){"use strict";var t={add:function(n){n.changes.forEach(function(e){e.selectorControl=e.selectorElement});n.controlChanges=n.changes;return e.addPersonalizationChanges(n)},reset:function(n){n.selectors=n.selectors||[];return e.resetChanges(n.selectors,n.changeTypes)},save:function(t){var o=t.selector.appComponent||n.getAppComponentForControl(t.selector);return e.saveChanges(t.changes,o)},buildSelectorFromElementIdAndType:function(e){var t=n.getAppComponentForControl(e.element);if(!t||!e.elementId||!e.elementType){throw new Error("Not enough information given to build selector.")}return{elementId:e.elementId,elementType:e.elementType,appComponent:t,id:e.elementId,controlType:e.elementType}}};return t},true);