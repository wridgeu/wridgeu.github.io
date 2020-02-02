/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./InputBaseRenderer","sap/ui/core/Renderer","sap/ui/core/LabelEnablement","sap/ui/Device"],function(t,e,i,r){"use strict";var a=e.extend(t);a.apiVersion=2;a.CSS_CLASS_COMBOBOXTEXTFIELD="sapMComboBoxTextField";a.writeInnerAttributes=function(t,e){t.attr("autocomplete","off");t.attr("autocorrect","off");t.attr("autocapitalize","off");t.attr("type","text")};a.writeAccAttributes=function(t,e){if(sap.ui.getCore().getConfiguration().getAccessibility()){t.attr("aria-haspopup","listbox");t.attr("aria-autocomplete","inline");t.attr("role","combobox")}};a.getAriaRole=function(){};a.getAriaDescribedBy=function(e){var i=t.getAriaDescribedBy.apply(this,arguments);if(r.browser.msie){return(i||"")+" "+e.oInvisibleText.getId()}return i};a.addOuterStyles=function(t,e){t.style("max-width",e.getMaxWidth())};return a},true);