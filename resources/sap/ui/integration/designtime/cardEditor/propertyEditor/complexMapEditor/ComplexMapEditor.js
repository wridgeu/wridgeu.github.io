/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/BasePropertyEditor","sap/base/util/restricted/_omit","sap/base/util/restricted/_merge","sap/base/util/deepClone","sap/ui/integration/cards/filters/DateRangeFilter"],function(e,t,a,i,r){"use strict";var n=e.extend("sap.ui.integration.designtime.cardEditor.propertyEditor.complexMapEditor.ComplexMapEditor",{xmlFragment:"sap.ui.integration.designtime.cardEditor.propertyEditor.complexMapEditor.ComplexMapEditor",metadata:{library:"sap.ui.integration"},renderer:e.getMetadata().getRenderer().render});n.configMetadata=Object.assign({},e.configMetadata,{allowKeyChange:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"},allowAddAndRemove:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"},keyLabel:{defaultValue:"{i18n>CARD_EDITOR.COMPLEX_MAP.KEY}"}});n.prototype.getExpectedWrapperCount=function(){return 1};n.prototype.onFragmentReady=function(){this._oNestedArrayEditor=this.getContent();this._oNestedArrayEditor.attachValueChange(function(e){var r=e.getParameter("previousValue")||[];var n=i(e.getParameter("value")||[]);var o={};var s=this.getDesigntimeProperties();n=n.map(function(e,a){if(typeof e.key==="undefined"){var r="key";var u=0;var l=function(e){return e.key===r};while(n.some(l)){r="key"+ ++u}e.key=r}var p={};s.forEach(function(t){p[t]=i(e[t])});o[e.key]={__value:p};return t(e,s)});var u=this._processOutputValue(n);r.forEach(function(e){var t=e.key;if(t!==undefined&&!u.hasOwnProperty(t)){o[t]=null}});this.setValue(u);this.setDesigntimeMetadata(a({},this.getConfig().designtime,o))},this)};n.prototype._processInputValue=function(e){var t=this.getDesigntimeProperties();if(!e){e={}}var a=Object.keys(e).map(function(a){var r=i(e[a]);r.key=a;var n=this.getNestedDesigntimeMetadataValue(a);t.forEach(function(e){r[e]=n[e]});return r}.bind(this));if(this.getConfig().type==="filters"){for(var r=0;r<a.length;r++){if(!a[r].options){var n=this._getDefaultFilterOptions();a[r].options=n}if(a[r].type===undefined){a[r].selectedOptions=[]}if(a[r].type==="Select"){a[r].sValue=a[r].value;delete a[r].value;a[r].selectedOptions=[]}else if(a[r].type==="DateRange"){if(!a[r].value){a[r].value={option:"today",values:[]}}a[r].dValue=a[r].value;delete a[r].value;var o=[];for(var s=0;s<a[r].options.length;s++){o.push({key:a[r].options[s],title:a[r].options[s]})}a[r].selectedOptions=o}}}return a};n.prototype.getDesigntimeProperties=function(){return[]};n.prototype.onBeforeConfigChange=function(e){var t={};if(e["allowKeyChange"]){t={key:{label:e["keyLabel"],type:"string",path:"key",validators:{uniqueKey:{type:"isUniqueKey",config:{keys:function(){return Object.keys(this.getValue())}.bind(this),currentKey:function(e){return e.getValue()}}}}}}}var i=a({},{template:t,allowSorting:false},e,{type:"array",path:""});this._oDefaultModel.setData(Object.assign({},this._oDefaultModel.getData(),{nestedConfig:i}));return e};n.prototype.setValue=function(t){var a=this._processInputValue(t);this._oDefaultModel.setData(Object.assign({},this._oDefaultModel.getData(),{nestedValue:a}));e.prototype.setValue.call(this,t)};n.prototype._processOutputValue=function(e){if(this.getConfig().type==="filters"){for(var a=0;a<e.length;a++){if(e[a].type==="Select"){e[a].value=e[a].sValue;delete e[a].sValue}else if(e[a].type==="DateRange"&&e[a].selectedOptions){e[a].value=e[a].dValue;delete e[a].dValue;delete e[a].selectedOptions}}}var i={};e.forEach(function(e){i[e.key]=t(e,"key")});return i};n.prototype._getDefaultFilterOptions=function(){var e=new r;var t=e._getDefaultOptions();return t};return n});