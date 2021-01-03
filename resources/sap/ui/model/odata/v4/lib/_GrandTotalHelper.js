/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_AggregationHelper"],function(e){"use strict";return{enhanceCacheWithGrandTotal:function(t,n,a){var i=Object.keys(n.aggregate).concat(Object.keys(n.group)),s,u=t.handleResponse;t.getResourcePathWithQuery=function(t,i){var u=Object.assign({},a,{$skip:t,$top:i-t});u=e.buildApply(n,u,1,s);s=true;return this.sResourcePath+this.oRequestor.buildQueryString(this.sMetaPath,u,false,true)};t.handleResponse=function(t,n,a,s){var o=a.value[0],r=this;function c(e){r.iLeafCount=parseInt(a.value[e].UI5__count);a["@odata.count"]=r.iLeafCount+1;a.value.splice(e,1)}if("UI5__count"in o){c(0)}else if(a.value.length>1&&"UI5__count"in a.value[1]){c(1)}if(t===0){e.setAnnotations(o,true,true,0,i);Object.keys(o).forEach(function(e){if(e.startsWith("UI5grand__")){o[e.slice(10)]=o[e];delete o[e]}})}u.call(this,t,n,a,s)}}}},false);