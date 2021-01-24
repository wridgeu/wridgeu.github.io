/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/validator/IsValidBinding"],function(e){"use strict";return{async:false,errorMessage:"BASE_EDITOR.VALIDATOR.INVALID_DATE",validate:function(i){var a=new Date(i);return i===undefined||e.validate(i,{allowPlainStrings:false})||a&&!isNaN(new Date(a).getTime())}}});