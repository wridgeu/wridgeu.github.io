/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_AggregationHelper"],function(e){"use strict";return{enhanceCacheWithGrandTotal:function(t,s,n){var i;t.getResourcePathWithQuery=function(t,n){var a=e.buildApply(s,Object.assign({},this.mQueryOptions,{$skip:t,$top:n-t}),1,i);i=true;return this.sResourcePath+this.oRequestor.buildQueryString(this.sMetaPath,a,false,true)};t.handleResponse=function(e,t,s,i){n(s.value.shift());s["@odata.count"]=s.value.shift().UI5__count;delete this.handleResponse;this.handleResponse(e,t,s,i)}}}},false);