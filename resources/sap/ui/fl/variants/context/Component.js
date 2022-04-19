/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/UIComponent"],function(e){"use strict";return e.extend("sap.ui.fl.variants.context.Component",{metadata:{manifest:"json"},getSelectedContexts:function(){var e=this.getModel("selectedContexts").getProperty("/selected");var t=e.map(function(e){return e.id});return{role:t}},setSelectedContexts:function(e){var t=e.role.map(function(e){return{id:e,description:""}});var n=this.getModel("selectedContexts");n.setProperty("/selected",t);n.refresh(true)},hasErrorsAndShowErrorMessage:function(){return false}})});