/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/each"],function(e){"use strict";return{addToChangesMap:function(e,n,t){if(!e[n]){e[n]=[]}e[n].push(t)},getChangesFromMap:function(n,t){var a=[];e(n[t],function(e,n){n.reverse();var t;n.forEach(function(e,a){if(t&&t.getChangeType()!==e.getChangeType()){t=null;n[a].condenserState="delete";n[a-1].condenserState="delete"}else{t=e;if(a>0){n[a-1].condenserState="delete"}n[a].condenserState="select"}});if(t){a.push(t)}});return a}}});