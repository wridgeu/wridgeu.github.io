/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/rta/plugin/iframe/AddIFrameDialog","sap/m/library"],function(e){"use strict";function r(r){var t=new e;var a=r.get_settings();var i={parameters:e.buildUrlBuilderParametersFor(r),frameUrl:a.url,frameWidth:a.width,frameHeight:a.height,updateMode:true};return t.open(i).then(function(e){if(!e){return[]}var t;var a;if(e.frameWidth){t=e.frameWidth+e.frameWidthUnit}else{t="100%"}if(e.frameHeight){a=e.frameHeight+e.frameHeightUnit}else{a="100%"}return[{selectorControl:r,changeSpecificData:{changeType:"updateIFrame",content:{url:e.frameUrl,width:t,height:a}}}]})}return{actions:{settings:function(){return{icon:"sap-icon://write-new",name:"CTX_EDIT_IFRAME",isEnabled:true,handler:r}},remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}}}});