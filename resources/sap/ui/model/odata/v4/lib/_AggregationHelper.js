/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_Helper","./_Parser","sap/ui/model/Filter"],function(e,t,r){"use strict";var n={grandTotal:"boolean",max:"boolean",min:"boolean",name:"string",subtotals:"boolean",with:"string"},i={aggregate:"object",group:"object",groupLevels:"array"},a=/,|%2C|%2c/,o=new RegExp(t.sWhitespace+"+"),u=new RegExp("^"+t.sODataIdentifier+"(?:"+t.sWhitespace+"+(?:asc|desc))?$"),s;function g(e,t,r){var n;function i(e){if(r){e+=" at property: "+r}throw new Error(e)}function a(e){return Array.isArray(e)?"array":typeof e}for(n in e){if(!(t&&n in t)){i("Unsupported '"+n+"'")}else if(a(e[n])!==t[n]){i("Not a "+t[n]+" value for '"+n+"'")}}}function f(e,t){var r;for(r in e){g(e[r],t,r)}}s={buildApply:function(e,t,r,a,o){var u,s="",l=[],c,p,d,h=[],$;function v(t){var r=e.aggregate[t],n=r.name||t,i=r.with;if(i){n+=" with "+i+" as "+t}else if(r.name){n+=" as "+t}return n}function b(n){var i=e.aggregate[n],a=i.name||n,o=i.with;if(i.grandTotal&&r<=1){p=true;if(!t.$skip){if(o){a+=" with "+o+" as UI5grand__"+n}l.push(a)}}}function m(t,r){var n,i=e.aggregate[t];if(i[r]){n="UI5"+r+"__"+t;h.push(t+" with "+r+" as "+n);if(o){o[n]={measure:t,method:r}}}}function y(){var e=[];if(t.$skip){e.push("skip("+t.$skip+")")}delete t.$skip;if(t.$top<Infinity){e.push("top("+t.$top+")")}delete t.$top;return e.join("/")}t=Object.assign({},t);r=r||1;g(e,i);e.groupLevels=e.groupLevels||[];d=r>e.groupLevels.length;e.aggregate=e.aggregate||{};f(e.aggregate,n);u=Object.keys(e.aggregate).sort();u.forEach(b);if(!a){u.forEach(function(e){m(e,"min");m(e,"max")})}u=u.filter(function(t){return d||e.aggregate[t].subtotals}).map(v);if(u.length){s="aggregate("+u.join(",")+")"}e.group=e.group||{};f(e.group);e.groupLevels.forEach(function(t){e.group[t]=e.group[t]||{}});c=d?Object.keys(e.group).sort().filter(function(t){return e.groupLevels.indexOf(t)<0}):[e.groupLevels[r-1]];if(c.length){s="groupby(("+c.join(",")+(s?"),"+s+")":"))")}if(a){delete t.$count}else if(t.$count){h.push("$count as UI5__count");delete t.$count}if(t.$filter){s+="/filter("+t.$filter+")";delete t.$filter}if(t.$orderby){s+="/orderby("+t.$orderby+")";delete t.$orderby}if(p){if(t.$skip){t.$skip-=1}else{t.$top-=1}}$=y();if(h.length){s+="/concat(aggregate("+h.join(",")+"),"+($||"identity")+")"}else if($){s+="/"+$}if(l.length){s="concat(aggregate("+l.join(",")+"),"+s+")"}if(t.$$filterBeforeAggregate){s="filter("+t.$$filterBeforeAggregate+")/"+s;delete t.$$filterBeforeAggregate}if(s){t.$apply=s}return t},createPlaceholder:function(t,r,n){var i={"@$ui5.node.level":t};e.setPrivateAnnotation(i,"index",r);e.setPrivateAnnotation(i,"parent",n);return i},filterOrderby:function(e,t,r){var n=r>t.groupLevels.length;if(e){return e.split(a).filter(function(e){var i;if(u.test(e)){i=e.split(o)[0];return i in t.aggregate&&(n||t.aggregate[i].subtotals)||n&&i in t.group&&t.groupLevels.indexOf(i)<0||!n&&t.groupLevels[r-1]===i}return true}).join(",")}},hasGrandTotal:function(e){return!!e&&Object.keys(e).some(function(t){return e[t].grandTotal})},hasMinOrMax:function(e){return!!e&&Object.keys(e).some(function(t){var r=e[t];return r.min||r.max})},isAffected:function(t,r,n){function i(t,r){if(t.endsWith("/*")){t=t.slice(0,-2)}return e.hasPathPrefix(r,t)||e.hasPathPrefix(t,r)}function a(e,t){return t.some(function(t){return t.aFilters?a(e,t.aFilters):i(e,t.sPath)})}return n.some(function(e){var n=i.bind(null,e);return e===""||e==="*"||Object.keys(t.aggregate).some(function(r){var n=t.aggregate[r];return i(e,n.name||r)})||Object.keys(t.group).some(n)||t.groupLevels.some(n)||a(e,r)})},setAnnotations:function(e,t,r,n,i){e["@$ui5.node.isExpanded"]=t;e["@$ui5.node.isTotal"]=r;e["@$ui5.node.level"]=n;i.forEach(function(t){if(!(t in e)){e[t]=null}})},splitFilter:function(e,t){var n=[],i=[];function a(e){return e.aFilters?e.aFilters.some(a):e.sPath in t.aggregate}function o(e){if(e.aFilters&&e.bAnd){e.aFilters.forEach(o)}else{(a(e)?n:i).push(e)}}function u(e){return e.length>1?new r(e,true):e[0]}if(!t||!t.aggregate){return[e]}o(e);return[u(n),u(i)]}};return s},false);