/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={apiVersion:2};e.render=function(e,t){var a,n=t.getItems(),r=t.getExpanded(),s=[],i=false;n.forEach(function(e){if(e.getVisible()){s.push(e);if(e.getIcon()){i=true}}});e.openStart("ul",t);var o=t.getWidth();if(o&&r){e.style("width",o)}e.class("sapTntNavLI");if(!r){e.class("sapTntNavLICollapsed")}if(!i){e.class("sapTntNavLINoIcons")}a=!r||t.hasStyleClass("sapTntNavLIPopup")?"menubar":"tree";e.attr("role",a);if(a==="menubar"){e.attr("aria-orientation","vertical")}e.openEnd();s.forEach(function(a){a.render(e,t)});e.close("ul")};return e},true);