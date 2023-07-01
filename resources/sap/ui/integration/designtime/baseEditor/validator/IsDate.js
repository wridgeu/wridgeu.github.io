/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/validator/IsValidBinding","sap/ui/core/date/UI5Date"],function(e,a){"use strict";return{async:false,errorMessage:"BASE_EDITOR.VALIDATOR.INVALID_DATE",validate:function(t,i){var n=i.formatterInstance;var s=n&&n.parse(t)||a.getInstance(t);return t===undefined||e.validate(t,{allowPlainStrings:false})||s&&!isNaN(a.getInstance(s).getTime())}}});
//# sourceMappingURL=IsDate.js.map