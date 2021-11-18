/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/ControlPersonalizationAPI","sap/ui/fl/Utils","sap/ui/fl/apply/_internal/ChangesController"],function(e,n,t){"use strict";var r={isPersonalized:function(n){return e.isPersonalized(n.selectors,n.changeTypes)},waitForChanges:function(e){var n;var r;if(e.element){n=[{selector:e.element}];r=e.element}else if(e.selectors){n=e.selectors.map(function(e){return{selector:e}});r=e.selectors[0]}else if(e.complexSelectors){n=e.complexSelectors;r=e.complexSelectors[0].selector}return t.getFlexControllerInstance(r).waitForChangesToBeApplied(n)},isFlexSupported:function(e){return!!n.getAppComponentForControl(e.element)},hasVariantManagement:function(n){return e.hasVariantManagement(n.element)}};return r});