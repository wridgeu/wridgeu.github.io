/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/validator/IsValidBinding"],function(e){"use strict";return{async:false,errorMessage:"BASE_EDITOR.VALIDATOR.NOT_AN_INTEGER",validate:function(i){if(i!==undefined&&i!==""){i=parseFloat(i)}return i===undefined||e.validate(i,{allowPlainStrings:false})||!isNaN(i)&&Number.isInteger(i)}}});