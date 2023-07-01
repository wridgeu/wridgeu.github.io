/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./PluginBase","sap/base/Log","sap/ui/core/Core","sap/base/strings/formatMessage","sap/m/OverflowToolbarButton"],function(t,e,r,o,n){"use strict";var i=t.extend("sap.m.plugins.CopyProvider",{metadata:{library:"sap.m",properties:{extractData:{type:"function",invalidate:false},copySparse:{type:"boolean",defaultValue:false,invalidate:false},excludeContext:{type:"function",invalidate:false},visible:{type:"boolean",defaultValue:true,invalidate:false}},events:{copy:{allowPreventDefault:true,parameters:{data:{type:"any[][]"}}}}}});function a(t){return t!=null}function s(t){if(a(t)){var e=String(t);return/\n|\r|\t/.test(e)?'"'+e.replaceAll('"','""')+'"':e}else{return""}}function l(t){var e=t.map(function(t){return t.map(s).join("\t")}).join("\n");return navigator.clipboard.writeText(e)}i.prototype._shouldManageExtractData=function(){var t=this.getControl();var e=this.getParent();return t!==e&&e.indexOfDependent(this)==-1};i.prototype.isApplicable=function(){if(!navigator.clipboard){throw new Error(this+" requires a secure context in order to access the clipboard API.")}if(this._shouldManageExtractData()){if(this.getExtractData()){throw new Error("extractData property must not be defined for "+this)}if(!this.getParent().getColumnClipboardSettings){throw new Error("getColumnClipboardSettings method must be defined for "+this.getParent())}}else if(!this.getExtractData()){throw new Error("extractData property must be defined for "+this)}return true};i.prototype.onActivate=function(t){this._oDelegate={onkeydown:this.onkeydown};t.addEventDelegate(this._oDelegate,this);this._oCopyButton&&this._oCopyButton.setEnabled(true);this._shouldManageExtractData()&&this.setExtractData(this._extractData.bind(this))};i.prototype.onDeactivate=function(t){t.removeEventDelegate(this._oDelegate,this);this._oDelegate=null;this._oCopyButton&&this._oCopyButton.setEnabled(false);this._shouldManageExtractData()&&this.setExtractData()};i.prototype.setVisible=function(t){this.setProperty("visible",t,true);this._oCopyButton&&this._oCopyButton.setVisible(this.getVisible());return this};i.prototype.setParent=function(){t.prototype.setParent.apply(this,arguments);if(!this.getParent()&&this._oCopyButton){this._oCopyButton.destroy(true);this._oCopyButton=null}};i.prototype.getCopyButton=function(t){if(!this._oCopyButton){this._oCopyButton=new n(Object.assign({icon:"sap-icon://copy",visible:this.getVisible(),tooltip:r.getLibraryResourceBundle("sap.m").getText("COPYPROVIDER_COPY"),press:this.copySelectionData.bind(this,true)},t))}return this._oCopyButton};i.prototype.exit=function(){if(this._oCopyButton){this._oCopyButton.destroy(true);this._oCopyButton=null}if(this._mColumnClipboardSettings){this._mColumnClipboardSettings=null}};i.prototype.getSelectionData=function(){var e=this.getControl();var o=this.getExtractData();if(!e||!o||!navigator.clipboard){return[]}var n=this.getConfig("selectableColumns",e);if(!n.length){return[]}if(e.getParent().isA("sap.ui.mdc.Table")){n=n.map(function(t){return r.byId(t.getId().replace(/\-innerColumn$/,""))})}var i=[];var s=[];var l=this.getCopySparse();var u=this.getExcludeContext();var p=t.getPlugin(e,"sap.m.plugins.CellSelector");var c=p&&p.getSelectionRange();var f=c?p.getSelectedRowContexts():[];var g=Boolean(f.length);var h=g||l;var d=this.getConfig("selectedContexts",e,h);if(g){f=Array(c.from.rowIndex).concat(f);Object.assign(s,d,f)}else{s=d}for(var y=0;y<s.length;y++){var C=s[y];if(!C){if(l&&i.length){i.push(Array(i[0].length))}}else if(u&&u(C)){continue}else{var v=[];var m=C==d[y];n.forEach(function(t,e){if(m||e>=c.from.colIndex&&e<=c.to.colIndex){var r=o(C,t);if(a(r)){v.push[Array.isArray(r)?"apply":"call"](v,r)}}else if(d.length){v.push(undefined)}});if(l||v.some(a)){i.push(v)}}}return i};i.prototype.copySelectionData=function(t){var e=this.getSelectionData();if(!e.length||t&&!this.fireCopy({data:e},true)){return Promise.resolve()}return l(e)};i.prototype.onkeydown=function(t){if(t.isMarked()||t.code!="KeyC"||!(t.ctrlKey||t.metaKey)||!t.target.matches(this.getConfig("allowForCopySelector"))){return}t.setMarked();t.preventDefault();this.copySelectionData(true)};i.prototype._extractData=function(t,r){if(!this._mColumnClipboardSettings){this._mColumnClipboardSettings=new WeakMap}var n=this._mColumnClipboardSettings.get(r);if(n===undefined){n=this.getParent().getColumnClipboardSettings(r);this._mColumnClipboardSettings.set(r,n)}if(!n){return}var i=n.properties.map(function(r,o){var i=t.getProperty(r);var s=n.types[o];if(s){try{i=s.formatValue(i,"string")}catch(t){e.error(this+': Formatting error during copy "'+t.message+'"')}}return a(i)?i:""});var s=n.unitFormatter;if(s){i[0]=s(i[0],i[1])}var l=o(n.template,i).trim();return l};t.setConfigs({"sap.m.Table":{allowForCopySelector:".sapMLIBFocusable,.sapMLIBSelectM,.sapMLIBSelectS",selectedContexts:function(t,e){var r=[];var o=t.getBindingInfo("items");t.getItems(true).forEach(function(t,n){if(t.isSelectable()&&t.getVisible()){if(t.getSelected()){var i=o?t.getBindingContext(o.model):t;var a=e?n:r.length;r[a]=i}}});return r},selectableColumns:function(t){return t.getColumns(true).filter(function(t){return t.getVisible()&&(t.isPopin()||!t.isPopin()&&!t.isHidden())}).sort(function(t,e){var r=t.getIndex(),o=e.getIndex(),n=r-o;if(n==0){return 0}if(r<0){return 1}if(o<0){return-1}return n})}},"sap.ui.table.Table":{allowForCopySelector:".sapUiTableCell",selectedContexts:function(e,r){var o=t.getPlugin(e,"sap.ui.table.plugins.SelectionPlugin")||e;if(o.getSelectedContexts){return o.getSelectedContexts()}var n=[];o.getSelectedIndices().forEach(function(t){var o=e.getContextByIndex(t);if(o){var i=r?t:n.length;n[i]=o}});return n},selectableColumns:function(t){return t.getColumns().filter(function(t){return t.getDomRef()})}}},i);return i});
//# sourceMappingURL=CopyProvider.js.map