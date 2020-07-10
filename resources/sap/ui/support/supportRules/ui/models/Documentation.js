/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/m/library"],function(i,t){"use strict";var n={openTopic:function(t){var n="",r="",e=sap.ui.getVersionInfo().version,o=i.sap.Version(e).getMajor(),a=i.sap.Version(e).getMinor(),s=window.location.origin;if(a%2!==0){a--}r+=String(o)+"."+String(a);if(s.indexOf("veui5infra")!==-1){n=s+"/sapui5-sdk-internal/#/topic/"+t}else{n=s+"/demokit-"+r+"/#/topic/"+t}this._redirectToUrlWithFallback(n,t)},_redirectToUrlWithFallback:function(n,r){this._pingUrl(n).then(function i(){t.URLHelper.redirect(n,true)},function e(){i.sap.log.info("Support Assistant tried to load documentation link in "+n+"but fail");n="https://ui5.sap.com/#/topic/"+r;t.URLHelper.redirect(n,true)})},_pingUrl:function(t){return i.ajax({type:"HEAD",async:true,context:this,url:t})}};return n});