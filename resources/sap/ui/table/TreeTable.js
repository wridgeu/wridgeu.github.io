/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Table","./TableRenderer","sap/ui/model/ClientTreeBindingAdapter","sap/ui/model/TreeBindingCompatibilityAdapter","./library","sap/ui/core/Element","./utils/TableUtils","./plugins/BindingSelection","sap/base/Log","sap/base/assert"],function(e,t,r,o,n,i,s,a,p,l){"use strict";var u=e.extend("sap.ui.table.TreeTable",{metadata:{library:"sap.ui.table",properties:{expandFirstLevel:{type:"boolean",defaultValue:false,deprecated:true},useGroupMode:{type:"boolean",group:"Appearance",defaultValue:false},groupHeaderProperty:{type:"string",group:"Data",defaultValue:null},collapseRecursive:{type:"boolean",defaultValue:true,deprecated:true},rootLevel:{type:"int",group:"Data",defaultValue:0,deprecated:true}},events:{toggleOpenState:{parameters:{rowIndex:{type:"int"},rowContext:{type:"object"},expanded:{type:"boolean"}}}}},renderer:"sap.ui.table.TableRenderer"});u.prototype.init=function(){e.prototype.init.apply(this,arguments);s.Grouping.setTreeMode(this);s.Hook.register(this,s.Hook.Keys.Row.UpdateState,d,this);s.Hook.register(this,s.Hook.Keys.Row.Expand,g,this);s.Hook.register(this,s.Hook.Keys.Row.Collapse,f,this)};u.prototype._bindRows=function(t){if(!t.parameters){t.parameters={}}if(!("rootLevel"in t.parameters)){t.parameters.rootLevel=this.getRootLevel()}if(!("collapseRecursive"in t.parameters)){t.parameters.collapseRecursive=this.getCollapseRecursive()}if(!("numberOfExpandedLevels"in t.parameters)){t.parameters.numberOfExpandedLevels=this.getExpandFirstLevel()?1:0}return e.prototype._bindRows.call(this,t)};function d(e){var t=this.getBinding("rows");var r=e.context;e.context=r.context;if(!e.context){return}e.level=r.level+1;if(t.nodeHasChildren){e.expandable=t.nodeHasChildren(r)}else{e.expandable=t.hasChildren(r.context)}e.expanded=r.nodeState.expanded;if(s.Grouping.isGroupMode(this)){var o=this.getGroupHeaderProperty();if(o){e.title=e.context.getProperty(o)}if(e.expandable){e.type=e.Type.GroupHeader;e.contentHidden=true}}}function g(e){var t=e.getIndex();var r=h(this,t,true);if(typeof r==="boolean"){this._onGroupHeaderChanged(t,r)}}function f(e){var t=e.getIndex();var r=h(this,t,false);if(typeof r==="boolean"){this._onGroupHeaderChanged(t,r)}}function h(e,t,r){var o=[];var n=e.getBinding("rows");if(!n||t==null){return null}if(typeof t==="number"){o=[t]}else if(Array.isArray(t)){if(r==null&&t.length>1){return null}o=t}var i=e._getTotalRowCount();var s=o.filter(function(e){var t=n.isExpanded(e);var o=true;if(n.nodeHasChildren){if(n.getNodeByIndex){o=!n.nodeHasChildren(n.getNodeByIndex(e))}else{o=false}}return e>=0&&e<i&&!o&&r!==t}).sort(function(e,t){return e-t});if(s.length===0){return null}for(var a=s.length-1;a>0;a--){if(r){n.expand(s[a],true)}else{n.collapse(s[a],true)}}if(r===true){n.expand(s[0],false)}else if(r===false){n.collapse(s[0],false)}else{n.toggleIndex(s[0])}return n.isExpanded(s[0])}u.prototype.setFixedRowCount=function(e){p.warning('TreeTable: the property "fixedRowCount" is not supported and will be ignored!');return this};u.prototype.isTreeBinding=function(e){e=e||"rows";if(e==="rows"){return true}return i.prototype.isTreeBinding.apply(this,arguments)};u.prototype.getBinding=function(e){e=e||"rows";var t=i.prototype.getBinding.call(this,e);if(t&&e==="rows"&&!t.getLength){if(t.isA("sap.ui.model.odata.ODataTreeBinding")){o(t,this)}else if(t.isA("sap.ui.model.odata.v2.ODataTreeBinding")){t.applyAdapterInterface()}else if(t.isA("sap.ui.model.ClientTreeBinding")){r.apply(t)}else{p.error("Binding not supported by sap.ui.table.TreeTable")}}return t};u.prototype._getContexts=function(e,t,r){var o=this.getBinding("rows");if(o){return o.getNodes(e,t,r)}else{return[]}};u.prototype._getRowContexts=function(){var t=this._getTotalRowCount();var r=e.prototype._getRowContexts.apply(this,arguments);var o=this._getTotalRowCount();if(s.isVariableRowHeightEnabled(this)&&t!==o){return e.prototype._getRowContexts.apply(this,arguments)}return r};u.prototype._onGroupHeaderChanged=function(e,t){this.fireToggleOpenState({rowIndex:e,rowContext:this.getContextByIndex(e),expanded:t})};u.prototype.expand=function(e){h(this,e,true);return this};u.prototype.collapse=function(e){h(this,e,false);return this};u.prototype.collapseAll=function(){var e=this.getBinding("rows");if(e){e.collapseToLevel(0);this.setFirstVisibleRow(0)}return this};u.prototype.expandToLevel=function(e){var t=this.getBinding("rows");l(t&&t.expandToLevel,"TreeTable.expandToLevel is not supported with your current Binding. Please check if you are running on an ODataModel V2.");if(t&&t.expandToLevel){t.expandToLevel(e)}return this};u.prototype.isExpanded=function(e){var t=this.getBinding("rows");if(t){return t.isExpanded(e)}return false};u.prototype.getContextByIndex=function(e){var t=this.getBinding("rows");if(t){return t.getContextByIndex(e)}};u.prototype.setRootLevel=function(e){this.setFirstVisibleRow(0);var t=this.getBinding("rows");if(t){l(t.setRootLevel,"rootLevel is not supported by the used binding");if(t.setRootLevel){t.setRootLevel(e)}}this.setProperty("rootLevel",e,true);return this};u.prototype.setCollapseRecursive=function(e){var t=this.getBinding("rows");if(t){l(t.setCollapseRecursive,"Collapse Recursive is not supported by the used binding");if(t.setCollapseRecursive){t.setCollapseRecursive(e)}}this.setProperty("collapseRecursive",!!e,true);return this};u.prototype.setUseGroupMode=function(e){this.setProperty("useGroupMode",!!e);if(!!e){s.Grouping.setGroupMode(this)}else{s.Grouping.setTreeMode(this)}return this};u.prototype.setEnableGrouping=function(){p.warning("The property enableGrouping is not supported by the sap.ui.table.TreeTable control");return this};u.prototype.setGroupBy=function(){p.warning("The groupBy association is not supported by the sap.ui.table.TreeTable control");return this};u.prototype.setUseFlatMode=function(e){e=!!e;if(e!=this._bFlatMode){this._bFlatMode=e;if(this.getDomRef()&&s.Grouping.isTreeMode(this)){this.invalidate()}}return this};u.prototype._createLegacySelectionPlugin=function(){return new a};return u});