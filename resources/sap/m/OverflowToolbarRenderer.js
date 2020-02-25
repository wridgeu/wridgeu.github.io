/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Renderer","./ToolbarRenderer","sap/m/BarInPageEnabler"],function(e,r,o,n){"use strict";var t=e.OverflowToolbarPriority;var l=r.extend(o);l.apiVersion=2;l.renderBarContent=function(e,r){var o=false;r._getVisibleContent().forEach(function(l){n.addChildClassTo(l,r);if(r._getControlPriority(l)!==t.AlwaysOverflow){e.renderControl(l)}else{o=o||l.getVisible()}});if(o||r._getOverflowButtonNeeded()){l.renderOverflowButton(e,r)}l.renderOverflowButtonClone(e,r)};l.renderOverflowButton=function(e,r){var o=r._getOverflowButton();n.addChildClassTo(o,r);e.renderControl(o)};l.renderOverflowButtonClone=function(e,r){var o=r._getOverflowButtonClone();n.addChildClassTo(o,r);e.renderControl(o)};return l},true);