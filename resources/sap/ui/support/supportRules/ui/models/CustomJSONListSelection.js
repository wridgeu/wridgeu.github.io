/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./CustomListSelection","sap/ui/support/supportRules/Storage","sap/ui/support/supportRules/ui/models/SelectionUtils","sap/ui/support/supportRules/Constants"],function(e,t,i,o){"use strict";var n=e.extend("sap.ui.support.supportRules.ui.models.CustomJSONListSelection",{constructor:function(t,i,o){e.call(this,t,o);this._dependent=i},_updateModelAfterSelectionChange:function(e){var n=this._getBinding();var s=n.getModel();var r=s.getData();var l=e.getParameter("rowIndices")||[];var a=this._getSelectionModel();var u=this;function d(e,t,i){var o=s.getProperty(e+"/nodes");if(u._isTree()&&u._dependent){if(o&&o.length){for(var n=0;n<o.length;n++){d(e+"/nodes/"+n+"",t,true);u.updateModelAfterChangedSelection(r,e,t)}}else{if(!t&&!i){var l=e.split("/");l.pop();l.pop();var a=l.join("/");u._setSelectionForContext(s,s.createBindingContext(a),t)}}}u.updateModelAfterChangedSelection(r,e,t);u._setSelectionForContext(s,s.createBindingContext(e),t)}for(var p=0;p<l.length;p++){var c=this._getContextByIndex(l[p]);if(c){d(c.getPath(),a.isSelectedIndex(l[p]))}}this.syncParentNodeSelectionWithChildren(r,n.getModel("treeModel"));this._finalizeSelectionUpdate();i.getSelectedRules();if(t.readPersistenceCookie(o.COOKIE_NAME)){i.persistSelection();var f=t.getRules();i.getRulesSelectionState().forEach(function(e){if(e.libName==="temporary"){f.forEach(function(t){if(e.ruleId===t.id){t.selected=e.selected}})}});t.setRules(f)}}});return n});