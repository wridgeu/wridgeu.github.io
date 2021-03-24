/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={validateVersion:function(e){if(!e||typeof e!=="string"){return false}var t=/^\*$|^\-$|^\d\.\d\d$/;if(e.match(t)){return true}return false},validateRuleCollection:function(e,t){if(e&&Array.isArray(e)&&e.length){for(var r=0;r<e.length;r++){if(t.hasOwnProperty(e[r])){continue}else{return false}}return true}return false},validateId:function(e){var t=/^[a-z][a-zA-Z]+$/;if(!e||typeof e!=="string"){return false}if(e.match(t)&&this.validateStringLength(e,6,50)){return true}return false},validateStringLength:function(e,t,r){return t<=e.length&&e.length<=r}};return e},false);