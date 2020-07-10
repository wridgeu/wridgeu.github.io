/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge"],function(n){"use strict";var e={};function r(n,e){var r=n.reduce(function(n,r){if(r[e]){return n.concat(r[e])}return n},[]);var a=[];return r.filter(function(n){var e=n.fileName;var r=a.indexOf(e)!==-1;if(r){return false}a.push(e);return true})}function a(e){return e.reduce(function(e,r){return n({},e,r.ui2personalization)},{})}function t(n){return n.reduce(function(n,e){return e.cacheKey?n+=e.cacheKey:n},"")||null}e.merge=function(n){return{appDescriptorChanges:r(n,"appDescriptorChanges"),changes:r(n,"changes"),ui2personalization:a(n),variants:r(n,"variants"),variantChanges:r(n,"variantChanges"),variantDependentControlChanges:r(n,"variantDependentControlChanges"),variantManagementChanges:r(n,"variantManagementChanges"),cacheKey:t(n)}};return e});