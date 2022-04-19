/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/base/security/encodeCSS","sap/ui/core/library"],function(e,a,t){"use strict";var i=e.ImageMode;var r=t.aria.HasPopup;var s={apiVersion:2};s.render=function(e,t){var s=t.getMode(),n=t.getAlt(),o=t.getTooltip_AsString(),g=t.hasListeners("press"),l=t.getDetailBox(),p=t.getUseMap(),d=t.getAriaLabelledBy(),c=t.getAriaDescribedBy(),u=t.getAriaDetails(),f=s===i.Image,y=t.getLazyLoading(),b=t.getAriaHasPopup();if(l){e.openStart("span",t);e.class("sapMLightBoxImage");e.openEnd();e.openStart("span").class("sapMLightBoxMagnifyingGlass").openEnd().close("span")}if(f){e.voidStart("img",!l?t:t.getId()+"-inner");if(y){e.attr("loading","lazy")}}else{e.openStart("span",!l?t:t.getId()+"-inner")}if(!t.getDecorative()){if(d&&d.length>0){e.attr("aria-labelledby",d.join(" "))}if(c&&c.length>0){e.attr("aria-describedby",c.join(" "))}if(u&&u.length>0){e.attr("aria-details",u.join(" "))}}if(f){e.attr("src",t._getDensityAwareSrc())}else{t._preLoadImage(t._getDensityAwareSrc());if(t._isValidBackgroundSizeValue(t.getBackgroundSize())){e.style("background-size",t.getBackgroundSize())}if(t._isValidBackgroundPositionValue(t.getBackgroundPosition())){e.style("background-position",t.getBackgroundPosition())}e.style("background-repeat",a(t.getBackgroundRepeat()))}e.class("sapMImg");if(t.hasListeners("press")||t.hasListeners("tap")){e.class("sapMPointer")}if(p||!t.getDecorative()||g){e.class("sapMImgFocusable")}if(p){if(!p.startsWith("#")){p="#"+p}e.attr("usemap",p)}if(t.getDecorative()&&!p&&!g){e.attr("role","presentation");e.attr("aria-hidden","true");e.attr("alt","")}else if(n||o){e.attr("alt",n||o)}if(n||o){e.attr("aria-label",n||o)}if(o){e.attr("title",o)}if(b!==r.None){e.attr("aria-haspopup",b.toLowerCase())}if(g){e.attr("role","button");e.attr("tabindex",0)}e.style("width",t.getWidth());e.style("height",t.getHeight());f?e.voidEnd():e.openEnd().close("span");if(l){e.close("span")}};return s},true);