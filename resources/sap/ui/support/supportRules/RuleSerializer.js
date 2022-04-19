/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./util/EvalUtils"],function(e){"use strict";return{serialize:function e(i){var n=function(e,i){if(typeof i==="function"){return i.toString()}else{return i}};var t=JSON.stringify(i,n);return t},deserialize:function(i,n){var t;if(typeof i==="string"){t=JSON.parse(i)}else{t=i}if(!n&&t.check!==undefined){t.check=e.evalFunction(t.check)}return t}}},true);