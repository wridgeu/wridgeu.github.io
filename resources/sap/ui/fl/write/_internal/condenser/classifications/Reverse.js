/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/each"],function(e){"use strict";return{addToChangesMap:function(e,n,a){if(!e[n]){e[n]=[]}e[n].push(a)},getChangesFromMap:function(n,a){var t=[];e(n[a],function(e,n){n.reverse();var a;n.forEach(function(e){if(a&&a.getChangeType()!==e.getChangeType()){a=null}else{a=e}});if(a){t.push(a)}});return t}}});