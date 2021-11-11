/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/util/DescriptorChangeCheck"],function(t){"use strict";var n=["BEGINNING","END"];function e(t,n){return Object.keys(t).indexOf(n)>=0}function a(t,n){return!t[n].type||t[n].type==="OData"}function o(t,n,e){return t[e]&&t[e].type==="ODataAnnotation"||n[e]}function r(t,n){return t[n].type&&t[n].type==="ODataAnnotation"}function i(t,n){return t.indexOf(n)>=0}function s(t,n){if(n){if(Object.keys(t).length>0){if(!e(t,n)){throw new Error("There is no dataSource '"+n+"' existing in the manifest. You can only add annotations to already existing dataSources in the manifest")}if(!a(t,n)){throw new Error("The dataSource '"+n+"' is existing in the manifest but is not type of 'OData'. The type of the dataSource in the manifest is '"+t[n].type+"'")}}else{throw new Error("There are no dataSources in the manifest at all")}}else{throw new Error("Invalid change format: The mandatory 'dataSourceId' is not defined. Please define the mandatory property 'dataSourceId' and refer it to an existing OData")}}function f(t){if(t){if(t.length===0){throw new Error("Invalid change format: The 'annotations' array property is empty")}}else{throw new Error("Invalid change format: The mandatory 'annotations' array property is not defined. Please define the 'annotations' array property")}}function c(t){if(!(n.indexOf(t)>=0)&&!(t===undefined)){throw new Error("The defined insert position '"+t+"' is not supported. The supported insert positions are: "+n.join("|"))}}function d(n,e,a){if(n){if(Object.keys(n).length===0){throw new Error("The 'dataSource' object is empty")}Object.keys(n).forEach(function(o){t.checkIdNamespaceCompliance(o,a);if(!r(n,o)){throw new Error("The dataSource annotation '"+o+"' is type of '"+n[o].type+"'. Only dataSource annotations of type 'ODataAnnotation' is supported")}if(!i(e,o)){throw new Error("The annotation '"+o+"' is not part of 'annotations' array property. Please add the annotation '"+o+"' in the 'annotations' array property")}})}else{throw new Error("Invalid change format: The mandatory 'dataSource' object is not defined. Please define the mandatory 'dataSource' object")}}function p(t,n,e,a,o){u(t[n],e,a);h(t,o)}function u(t,n,e){if(!t["settings"]){t["settings"]={}}if(!t["settings"].annotations){t["settings"].annotations=[]}var a=t["settings"].annotations.filter(function(t){return n.indexOf(t)<0});t["settings"].annotations=a;if(e==="END"){t["settings"].annotations=t["settings"].annotations.concat(n)}else{t["settings"].annotations=n.concat(t["settings"].annotations)}}function h(t,n){Object.assign(t,n)}function y(t,n,e){e.forEach(function(e){if(!o(t,n,e)){throw new Error("The annotation '"+e+"' is part of 'annotations' array property but does not exists in the change property 'dataSource' and in the manifest (or it is not type of 'ODataAnnotation' in the manifest)")}})}var g={applyChange:function(t,n){var e=n.getContent().dataSourceId;var a=n.getContent().annotations;var o=n.getContent().annotationsInsertPosition;var r=n.getContent().dataSource;s(t["sap.app"].dataSources,e);f(a);c(o);d(r,a,n);y(t["sap.app"]["dataSources"],r,a);p(t["sap.app"]["dataSources"],e,a,o,r);return t}};return g});