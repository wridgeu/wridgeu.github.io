/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_AggregationHelper","./_Cache"],function(e,t){"use strict";return{createCache:function(r,n,s,u){var i={},o,a=false,h,c;if(s.groupLevels.length){throw new Error("Unsupported group levels together with min/max")}o=t.create(r,n,u,true);h=new Promise(function(e){c=e});o.getMeasureRangePromise=function(){return h};o.getResourcePathWithQuery=function(t,r){var n=e.buildApply(s,Object.assign({},this.mQueryOptions,{$skip:t,$top:r-t}),1,a,i);a=true;return this.sResourcePath+this.oRequestor.buildQueryString(this.sMetaPath,n,false,true)};o.handleResponse=function(e,t,r,n){var s,u={},o=r.value.shift();function a(e){u[e]=u[e]||{};return u[e]}r["@odata.count"]=o.UI5__count;for(s in i){a(i[s].measure)[i[s].method]=o[s]}c(u);delete this.handleResponse;this.handleResponse(e,t,r,n)};return o}}},false);