/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_Helper","./_V2MetadataConverter","./_V4MetadataConverter","sap/base/Log","sap/ui/thirdparty/jquery"],function(e,t,a,r,n){"use strict";return{create:function(o,i,s){var d={},u=e.buildQuery(s);return{read:function(f,c,l){var p;function M(e){var r=i==="4.0"||c?a:t,n=e.$XML;delete e.$XML;return Object.assign((new r).convertXMLMetadata(n,f),e)}if(f in d){if(l){throw new Error("Must not prefetch twice: "+f)}p=d[f].then(M);delete d[f]}else{p=new Promise(function(t,a){n.ajax(c?f:f+u,{method:"GET",headers:o}).then(function(e,a,r){var n=r.getResponseHeader("Date"),o=r.getResponseHeader("ETag"),i={$XML:e},s=r.getResponseHeader("Last-Modified");if(n){i.$Date=n}if(o){i.$ETag=o}if(s){i.$LastModified=s}t(i)},function(t,n,o){var i=e.createError(t,"Could not load metadata");r.error("GET "+f,i.message,"sap.ui.model.odata.v4.lib._MetadataRequestor");a(i)});if(!c&&s&&"sap-context-token"in s){delete s["sap-context-token"];u=e.buildQuery(s)}});if(l){d[f]=p}else{p=p.then(M)}}return p}}}}},false);