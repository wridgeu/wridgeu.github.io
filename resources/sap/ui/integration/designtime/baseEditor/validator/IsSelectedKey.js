/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/validator/IsValidBinding"],function(i){"use strict";return{async:false,errorMessage:"BASE_EDITOR.VALIDATOR.FORBIDDEN_CUSTOM_VALUE",validate:function(e,n){return e===undefined||(n.keys||[]).includes(e)||i.validate(e,{allowPlainStrings:false})}}});