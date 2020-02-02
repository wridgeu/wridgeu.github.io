/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ComboBoxTextFieldRenderer","sap/ui/core/Renderer","sap/ui/core/Core"],function(e,t,s){"use strict";var i=t.extend(e);i.apiVersion=2;i.CSS_CLASS_COMBOBOXBASE="sapMComboBoxBase";i.getAccessibilityState=function(t){var s=e.getAccessibilityState.call(this,t),i=t._getList();if(i){s.controls=i.getId()}return s};i.writeAccAttributes=function(t,i){e.writeAccAttributes.apply(this,arguments);if(s.getConfiguration().getAccessibility()){t.attr("aria-expanded",i.isOpen())}};i.addOuterClasses=function(t,s){e.addOuterClasses.apply(this,arguments);var a=i.CSS_CLASS_COMBOBOXBASE;t.class(a);if(!s.getEnabled()){t.class(a+"Disabled")}if(!s.getEditable()){t.class(a+"Readonly")}};i.addButtonClasses=function(t,s){e.addButtonClasses.apply(this,arguments);t.class(i.CSS_CLASS_COMBOBOXBASE+"Arrow")};return i},true);