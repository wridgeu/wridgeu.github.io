/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/f/library"],function(r){"use strict";var t={apiVersion:2};t.render=function(r,t){var o="sapFAvatarGroup",e=t.getGroupType(),a=o+e,s=t.getItems(),i=t._shouldShowMoreButton(),n=t.getProperty("_interactive");r.openStart("div",t).class(o).class(a).class(o+t.getAvatarDisplaySize());if(i){r.class("sapFAvatarGroupShowMore")}if(!n){r.class("sapFAvatarGroupNonInteractive")}if(t._bAutoWidth){r.style("width","auto")}if(e==="Group"){r.attr("role","button")}r.openEnd();for(var u=0;u<t._iAvatarsToShow;u++){r.renderControl(s[u])}if(i){r.renderControl(t._oShowMoreButton)}r.close("div")};return t},true);