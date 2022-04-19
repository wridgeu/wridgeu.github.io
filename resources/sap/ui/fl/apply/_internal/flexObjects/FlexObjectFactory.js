/* !
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/ObjectPath","sap/ui/fl/apply/_internal/flexObjects/FlexObject"],function(e,t){"use strict";var r={BASE_FLEX_OBJECT:t};function n(){return r.BASE_FLEX_OBJECT}var a={};a.createFromFileContent=function(t){var r=Object.assign({},t);var a=n(r);if(!a){throw new Error("Unknown file type")}r.support=Object.assign({generator:"FlexObjectFactory.createFromFileContent"},r.support||{});var i=a.getMappingInfo();var o=a.mapFileContent(r,i);var c=Object.entries(o).reduce(function(t,r){e.set(r[0].split("."),r[1],t);return t},{});var s=new a(c);return s};return a});