/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/textAreaEditor/TextAreaEditor","sap/base/util/restricted/_isNil"],function(t,e){"use strict";var r=t.extend("sap.ui.integration.designtime.baseEditor.propertyEditor.objectArrayEditor.ObjectArrayEditor",{xmlFragment:"sap.ui.integration.designtime.baseEditor.propertyEditor.objectArrayEditor.ObjectArrayEditor",metadata:{library:"sap.ui.integration"},renderer:t.getMetadata().getRenderer().render});r.configMetadata=Object.assign({},t.configMetadata,{allowBindings:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"},typeLabel:{defaultValue:"BASE_EDITOR.TYPES.OBJECTARRAY"}});r.prototype._onLiveChange=function(){var t=this.getContent();var e=t.getValue();if(!e||e===""){this.setValue(undefined)}else{try{var r=JSON.parse(e);if(!(r instanceof Array)){t.setValueState("Error");t.setValueStateText(this.getI18nProperty("BASE_EDITOR.VALIDATOR.NOT_AN_ARRAY_OF_JSONOBJECTS"));return}this.setValue(r)}catch(e){t.setValueState("Error");t.setValueStateText(this.getI18nProperty("BASE_EDITOR.VALIDATOR.NOT_A_JSONOBJECT"))}}};return r});