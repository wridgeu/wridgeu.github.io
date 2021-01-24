/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/validator/IsValidBinding","sap/base/util/restricted/_isNil"],function(e,t){"use strict";return{async:false,errorMessage:"BASE_EDITOR.VALIDATOR.NOT_A_JSONOBJECT",validate:function(i){var a=false;if(typeof i==="object"&&Object.prototype.toString.call(i).toLowerCase()==="[object object]"&&!i.length){a=true}return t(i)||a||e.validate(i,{allowPlainStrings:false})}}});