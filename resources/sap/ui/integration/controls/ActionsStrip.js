/*!
* OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["../library","sap/m/library","sap/ui/core/Core","sap/ui/core/Control","sap/ui/integration/util/CardActions","sap/ui/integration/util/BindingHelper","sap/m/Button","sap/m/OverflowToolbarButton","sap/m/OverflowToolbar","sap/m/OverflowToolbarLayoutData","sap/m/ToolbarSpacer"],function(t,o,e,a,r,i,n,s,p,l,u){"use strict";var c=o.ToolbarStyle;var d=t.CardActionArea;var g=a.extend("sap.ui.integration.controls.ActionsStrip",{metadata:{library:"sap.ui.integration",properties:{},aggregations:{_toolbar:{type:"sap.m.OverflowToolbar",multiple:false}},associations:{card:{type:"sap.ui.integration.widgets.Card",multiple:false}}},renderer:{apiVersion:2,render:function(t,o){t.openStart("div",o).class("sapUiIntActionsStrip").openEnd();t.renderControl(o._getToolbar());t.close("div")}}});g.prototype._getToolbar=function(){var t=this.getAggregation("_toolbar");if(!t){t=new p({style:c.Clear});this.setAggregation("_toolbar",t)}return t};g.prototype._initButtons=function(t){if(!t||!t.length){return null}var o=this._getToolbar(),a=e.byId(this.getCard()),p=new r({card:a}),c=false;t=i.createBindingInfos(t,a.getBindingNamespaces());t.forEach(function(t){if(t.type==="ToolbarSpacer"){c=true;o.addContent(new u);return}var e=t.actions,a=new l({group:t.overflowGroup,priority:t.overflowPriority}),r;if(t.icon){r=new s({icon:t.icon,text:t.text||t.tooltip,tooltip:t.tooltip||t.text,type:t.buttonType,ariaHasPopup:t.ariaHasPopup,visible:t.visible})}else{r=new n({text:t.text,tooltip:t.tooltip,type:t.buttonType,ariaHasPopup:t.ariaHasPopup,visible:t.visible})}r.setLayoutData(a);p.attach({area:d.ActionsStrip,control:r,actions:e,enabledPropertyName:"enabled"});o.addContent(r)});if(!c){o.insertContent(new u,0)}};g.create=function(t,o){var e=new g({card:t});e._initButtons(o);return e};return g});