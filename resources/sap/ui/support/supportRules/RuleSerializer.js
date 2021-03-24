/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";return{serialize:function e(r){var i=function(e,r){if(typeof r==="function"){return r.toString()}else{return r}};var u=JSON.stringify(r,i);return u},deserialize:function(serializedRule,stringifyCheck){var rule;if(typeof serializedRule==="string"){rule=JSON.parse(serializedRule)}else{rule=serializedRule}if(!stringifyCheck&&rule.check!==undefined){eval("rule.check = "+rule.check)}return rule}}},true);