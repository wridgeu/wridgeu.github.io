/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var t={validateVersion:function(t){if(!t||typeof t!=="string"){return false}var e=/^\*$|^\-$|^\d\.\d\d$/;if(t.match(e)){return true}return false},validateRuleCollection:function(t,e){if(t&&Array.isArray(t)&&t.length){for(var r=0;r<t.length;r++){if(e.hasOwnProperty(t[r])){continue}else{return false}}return true}return false},validateId:function(t){var e=/^[a-z][a-zA-Z]+$/;if(!t||typeof t!=="string"){return false}if(t.match(e)&&this.validateStringLength(t,6,50)){return true}return false},validateStringLength:function(t,e,r){return e<=t.length&&t.length<=r}};return t});