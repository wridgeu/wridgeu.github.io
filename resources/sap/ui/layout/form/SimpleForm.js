/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/base/ManagedObjectObserver","sap/ui/core/ResizeHandler","sap/ui/layout/library","./Form","./FormContainer","./FormElement","./FormLayout","./SimpleFormRenderer","sap/base/Log","sap/ui/thirdparty/jquery"],function(e,t,a,i,s,r,n,o,l,u,jQuery){"use strict";var h=i.BackgroundDesign;var g=i.form.SimpleFormLayout;var f;var d;var y;var p;var m;var v;var c;var L=e.extend("sap.ui.layout.form.SimpleForm",{metadata:{library:"sap.ui.layout",properties:{maxContainerCols:{type:"int",group:"Appearance",defaultValue:2},minWidth:{type:"int",group:"Appearance",defaultValue:-1},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},editable:{type:"boolean",group:"Misc",defaultValue:null},labelMinWidth:{type:"int",group:"Misc",defaultValue:192},layout:{type:"sap.ui.layout.form.SimpleFormLayout",group:"Misc",defaultValue:g.ResponsiveLayout},labelSpanXL:{type:"int",group:"Misc",defaultValue:-1},labelSpanL:{type:"int",group:"Misc",defaultValue:4},labelSpanM:{type:"int",group:"Misc",defaultValue:2},labelSpanS:{type:"int",group:"Misc",defaultValue:12},adjustLabelSpan:{type:"boolean",group:"Misc",defaultValue:true},emptySpanXL:{type:"int",group:"Misc",defaultValue:-1},emptySpanL:{type:"int",group:"Misc",defaultValue:0},emptySpanM:{type:"int",group:"Misc",defaultValue:0},emptySpanS:{type:"int",group:"Misc",defaultValue:0},columnsXL:{type:"int",group:"Misc",defaultValue:-1},columnsL:{type:"int",group:"Misc",defaultValue:2},columnsM:{type:"int",group:"Misc",defaultValue:1},singleContainerFullSize:{type:"boolean",group:"Misc",defaultValue:true},breakpointXL:{type:"int",group:"Misc",defaultValue:1440},breakpointL:{type:"int",group:"Misc",defaultValue:1024},breakpointM:{type:"int",group:"Misc",defaultValue:600},backgroundDesign:{type:"sap.ui.layout.BackgroundDesign",group:"Appearance",defaultValue:h.Translucent}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Element",multiple:true,singularName:"content"},form:{type:"sap.ui.layout.form.Form",multiple:false,visibility:"hidden"},title:{type:"sap.ui.core.Title",altTypes:["string"],multiple:false},toolbar:{type:"sap.ui.core.Toolbar",multiple:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},designtime:"sap/ui/layout/designtime/form/SimpleForm.designtime"},renderer:l});L.prototype.init=function(){this._iMaxWeight=8;this._iLabelWeight=3;this._iCurrentWidth=0;var e=new s(this.getId()+"--Form");e.getTitle=function(){return this.getParent().getTitle()};e._origInvalidate=e.invalidate;e.invalidate=function(e){if(this.bOutput){this._origInvalidate(e)}if(this._bIsBeingDestroyed){return}var t=this.getParent();if(t){t._formInvalidated(e)}};e.getAriaLabelledBy=function(){var e=this.getParent();if(e){return e.getAriaLabelledBy()}else{return null}};e._origOnLayoutDataChange=e.onLayoutDataChange;e.onLayoutDataChange=function(e){this._origOnLayoutDataChange(e);var t=this.getParent();if(t){t._onLayoutDataChange(e)}};this.setAggregation("form",e);this._aElements=null;this._aLayouts=[];this._changedFormContainers=[];this._changedFormElements=[];this._oObserver=new t(H.bind(this))};L.prototype.exit=function(){var e=this.getAggregation("form");e.invalidate=e._origInvalidate;z.call(this);for(var t=0;t<this._aLayouts.length;t++){var a=sap.ui.getCore().byId(this._aLayouts[t]);if(a&&a.destroy){a.destroy()}}this._aLayouts=[];this._aElements=null;this._changedFormContainers=[];this._changedFormElements=[];this._oObserver.disconnect();this._oObserver=undefined};L.prototype.onBeforeRendering=function(){z.call(this);var e=this.getAggregation("form");var t=this.getLayout();if(!this._bResponsiveLayoutRequested&&t===g.ResponsiveLayout||!this._bGridLayoutRequested&&t===g.GridLayout||!this._bResponsiveGridLayoutRequested&&t===g.ResponsiveGridLayout||!this._bColumnLayoutRequested&&t===g.ColumnLayout){var a=true;if(!e.getLayout()){a=b.call(this)}if(a){B.call(this)}}};L.prototype.onAfterRendering=function(){if(this.getLayout()==g.ResponsiveLayout){this._bChangedByMe=true;this.$().css("visibility","hidden");this._applyLinebreaks();this._sResizeListenerId=a.register(this.getDomRef(),jQuery.proxy(this._resize,this));this._bChangedByMe=false}};L.prototype.setEditable=function(e){this._bChangedByMe=true;this.setProperty("editable",e,true);var t=this.getAggregation("form");t.setEditable(e);this._bChangedByMe=false;return this};L.prototype.setToolbar=function(e){this._bChangedByMe=true;var t=this.getAggregation("form");t.setToolbar(e);this._bChangedByMe=false;return this};L.prototype.getToolbar=function(){var e=this.getAggregation("form");return e.getToolbar()};L.prototype.destroyToolbar=function(){this._bChangedByMe=true;var e=this.getAggregation("form");e.destroyToolbar();this._bChangedByMe=false;return this};L.prototype.setLabelMinWidth=function(e){this.setProperty("labelMinWidth",e,true);if(this.getLayout()==g.ResponsiveLayout){this._bLayoutDataChangedByMe=true;var t=this.getContent();for(var a=0;a<t.length;a++){var i=t[a];if(i.isA("sap.ui.core.Label")){var s=k.call(this,i);if(s&&s.isA("sap.ui.layout.ResponsiveFlowLayoutData")&&A.call(this,s)){s.setMinWidth(e)}}}this._bLayoutDataChangedByMe=false}return this};L.prototype.indexOfContent=function(e){var t=this._aElements;if(t){for(var a=0;a<t.length;a++){if(t[a]==e){return a}}}return-1};L.prototype.addContent=function(e){e=this.validateAggregation("content",e,true);if(this.indexOfContent(e)>=0){u.warning("SimpleForm.addContent: Content element '"+e+"' already assigned. Please remove before adding!",this);this.removeContent(e)}if(!this._aElements){this._aElements=[]}this._bChangedByMe=true;var t=this._aElements.length;var a;var i=this.getAggregation("form");var s;var o;var l;var h;var f=this.getLayout();if(e.isA(["sap.ui.core.Title","sap.ui.core.Toolbar"])){s=V.call(this,e);i.addFormContainer(s);this._changedFormContainers.push(s)}else if(e.isA("sap.ui.core.Label")){if(t>0){a=this._aElements[t-1];l=a.getParent();if(l instanceof n){s=l.getParent()}else if(l instanceof r){s=l}}if(!s){s=V.call(this);i.addFormContainer(s);this._changedFormContainers.push(s)}o=I.call(this,s,e)}else{if(t>0){a=this._aElements[t-1];l=a.getParent();if(l instanceof n){s=l.getParent();o=l;h=k.call(this,e);if(h&&h.isA("sap.ui.layout.ResponsiveFlowLayoutData")&&f===g.ResponsiveLayout&&!A.call(this,h)&&h.getLinebreak()){o=I.call(this,s)}}else if(l instanceof r){s=l;o=I.call(this,s)}}else{s=V.call(this);i.addFormContainer(s);this._changedFormContainers.push(s);o=I.call(this,s)}w.call(this,e,5,false,true);o.addField(e);j(this._changedFormElements,o)}this._aElements.push(e);this._oObserver.observe(e,{properties:["visible"]});this.invalidate();this._bChangedByMe=false;return this};L.prototype.insertContent=function(e,t){e=this.validateAggregation("content",e,true);if(this.indexOfContent(e)>=0){u.warning("SimpleForm.insertContent: Content element '"+e+"' already assigned. Please remove before insert!",this);this.removeContent(e)}if(!this._aElements){this._aElements=[]}var a=this._aElements.length;var i;if(t<0){i=0}else if(t>a){i=a}else{i=t}if(i!==t){u.warning("SimpleForm.insertContent: index '"+t+"' out of range [0,"+a+"], forced to "+i)}if(i==a){this.addContent(e);return this}this._bChangedByMe=true;var s=this._aElements[i];var r=this.getAggregation("form");var n;var o;var l;var h;var f;var d=0;var y;var p;var m;var v;var c=0;var L;var b;var _=this.getLayout();if(e.isA(["sap.ui.core.Title","sap.ui.core.Toolbar"])){n=V.call(this,e);if(t==0&&!s.isA(["sap.ui.core.Title","sap.ui.core.Toolbar"])){l=s.getParent().getParent();m=l.getFormElements();for(c=0;c<m.length;c++){n.addFormElement(m[c])}l.destroy();f=0}else if(s.isA(["sap.ui.core.Title","sap.ui.core.Toolbar"])){l=s.getParent();f=r.indexOfFormContainer(l)}else{h=s.getParent();l=h.getParent();f=r.indexOfFormContainer(l)+1;d=l.indexOfFormElement(h);if(!s.isA("sap.ui.core.Label")){y=h.indexOfField(s);if(y>0||h.getLabel()){o=I.call(this,n);this._changedFormElements.push(o);j(this._changedFormElements,h);p=h.getFields();for(c=y;c<p.length;c++){L=p[c];o.addField(L)}d++}}m=l.getFormElements();for(c=d;c<m.length;c++){n.addFormElement(m[c])}}r.insertFormContainer(n,f);this._changedFormContainers.push(n)}else if(e.isA("sap.ui.core.Label")){if(s.isA(["sap.ui.core.Title","sap.ui.core.Toolbar"])){l=s.getParent();f=r.indexOfFormContainer(l);v=r.getFormContainers();if(f==0){n=V.call(this);r.insertFormContainer(n,f);this._changedFormContainers.push(n)}else{n=v[f-1]}o=I.call(this,n,e)}else if(s.isA("sap.ui.core.Label")){l=s.getParent().getParent();d=l.indexOfFormElement(s.getParent());o=O.call(this,l,e,d)}else{h=s.getParent();l=h.getParent();d=l.indexOfFormElement(h)+1;y=h.indexOfField(s);p=h.getFields();o=O.call(this,l,e,d);for(c=y;c<p.length;c++){L=p[c];o.addField(L)}if(y==0&&!h.getLabel()){h.destroy()}else{j(this._changedFormElements,h)}}this._changedFormElements.push(o)}else{b=k.call(this,e);if(s.isA(["sap.ui.core.Title","sap.ui.core.Toolbar"])){l=s.getParent();f=r.indexOfFormContainer(l);if(f==0){n=V.call(this);r.insertFormContainer(n,f);this._changedFormContainers.push(n)}else{v=r.getFormContainers();n=v[f-1]}m=n.getFormElements();if(m.length==0){o=I.call(this,n)}else if(b&&b.isA("sap.ui.layout.ResponsiveFlowLayoutData")&&_===g.ResponsiveLayout&&!A.call(this,b)&&b.getLinebreak()){o=I.call(this,n)}else{o=m[m.length-1]}o.addField(e)}else if(s.isA("sap.ui.core.Label")){h=s.getParent();n=h.getParent();d=n.indexOfFormElement(h);if(d==0){o=O.call(this,n,null,0)}else if(b&&b.isA("sap.ui.layout.ResponsiveFlowLayoutData")&&_===g.ResponsiveLayout&&!A.call(this,b)&&b.getLinebreak()){o=O.call(this,n,null,d)}else{m=n.getFormElements();o=m[d-1]}o.addField(e)}else{o=s.getParent();y=o.indexOfField(s);if(b&&b.isA("sap.ui.layout.ResponsiveFlowLayoutData")&&_===g.ResponsiveLayout&&!A.call(this,b)&&b.getLinebreak()&&y>0){n=o.getParent();d=n.indexOfFormElement(o);j(this._changedFormElements,o);p=o.getFields();o=O.call(this,n,undefined,d+1);o.addField(e);for(c=y;c<p.length;c++){L=p[c];o.addField(L)}}else{o.insertField(e,y)}}j(this._changedFormElements,o);w.call(this,e,5,false,true)}this._aElements.splice(i,0,e);this._oObserver.observe(e,{properties:["visible"]});this.invalidate();this._bChangedByMe=false;return this};L.prototype.removeContent=function(e){var t=null;var a=-1;var i=0;if(this._aElements){if(typeof e=="string"){e=sap.ui.getCore().byId(e)}if(typeof e=="object"){for(i=0;i<this._aElements.length;i++){if(this._aElements[i]==e){e=i;break}}}if(typeof e=="number"){if(e<0||e>=this._aElements.length){u.warning("Element.removeAggregation called with invalid index: Items, "+e)}else{a=e;t=this._aElements[a]}}}if(t){this._bChangedByMe=true;var s=this.getAggregation("form");var r;var n;var o;var l;if(t.isA(["sap.ui.core.Title","sap.ui.core.Toolbar"])){r=t.getParent();r.setTitle(null);r.setToolbar(null);o=r.getFormElements();if(a>0||o.length>0){var h=s.indexOfFormContainer(r);var g;if(a===0){g=V.call(this);s.insertFormContainer(g,h)}else{g=s.getFormContainers()[h-1];if(o.length>0&&!o[0].getLabel()){var f=g.getFormElements();var d=f[f.length-1];l=o[0].getFields();for(i=0;i<l.length;i++){d.addField(l[i])}j(this._changedFormElements,d);r.removeFormElement(o[0]);o[0].destroy();o.splice(0,1)}}for(i=0;i<o.length;i++){g.addFormElement(o[i])}j(this._changedFormContainers,g);s.removeFormContainer(r);r.destroy()}else{s.removeFormContainer(r);r.destroy()}}else if(t.isA("sap.ui.core.Label")){n=t.getParent();r=n.getParent();n.setLabel(null);l=n.getFields();var y=r.indexOfFormElement(n);var p;if(y===0){if(l.length===0){r.removeFormElement(n);n.destroy();if(r.getFormElements().length==0&&!r.getTitle()&&!r.getToolbar()){s.removeFormContainer(r);r.destroy()}}else{p=O.call(this,r,null,0)}}else{o=r.getFormElements();p=o[y-1];j(this._changedFormElements,p)}for(i=0;i<l.length;i++){p.addField(l[i])}r.removeFormElement(n);n.destroy()}else{n=t.getParent();n.removeField(t);if(n.getFields().length==0&&!n.getLabel()){r=n.getParent();r.removeFormElement(n);n.destroy();if(r.getFormElements().length==0&&!r.getTitle()&&!r.getToolbar()){s.removeFormContainer(r);r.destroy()}}else{j(this._changedFormElements,n)}}this._aElements.splice(a,1);t.setParent(null);this._oObserver.unobserve(t);q.call(this,t);this.invalidate();this._bChangedByMe=false;return t}return null};L.prototype.removeAllContent=function(){var e=0;if(this._aElements){this._bChangedByMe=true;var t=this.getAggregation("form");var a=t.getFormContainers();for(e=0;e<a.length;e++){var i=a[e];i.setTitle(null);i.setToolbar(null);var s=i.getFormElements();for(var r=0;r<s.length;r++){var n=s[r];n.setLabel(null);n.removeAllFields()}i.destroyFormElements()}t.destroyFormContainers();for(e=0;e<this._aElements.length;e++){var o=this._aElements[e];q.call(this,o);this._oObserver.unobserve(o)}var l=this._aElements;this._aElements=null;this.invalidate();this._bChangedByMe=false;return l}else{return[]}};L.prototype.destroyContent=function(){var e=this.removeAllContent();if(e){this._bChangedByMe=true;for(var t=0;t<e.length;t++){e[t].destroy()}this.invalidate();this._bChangedByMe=false}return this};L.prototype.getContent=function(){if(!this._aElements){this._aElements=this.getAggregation("content",[])}return this._aElements.slice()};L.prototype.setLayout=function(e){var t=this.getLayout();if(e!=t){R.call(this)}this.setProperty("layout",e);if(e!=t){var a=b.call(this);if(a){D.call(this)}}return this};L.prototype.clone=function(t){this._bChangedByMe=true;var a=e.prototype.clone.apply(this,arguments);var i=this.getContent();for(var s=0;s<i.length;s++){var r=i[s];var n=r.getLayoutData();this._oObserver.unobserve(r);var o=r.clone(t);this._oObserver.observe(r,{properties:["visible"]});if(n){if(n.isA("sap.ui.core.VariantLayoutData")){var l=n.getMultipleLayoutData();for(var u=0;u<l.length;u++){if(A.call(this,l[u])){a._aLayouts.push(o.getLayoutData().getMultipleLayoutData()[u].getId())}}}else if(A.call(this,n)){a._aLayouts.push(o.getLayoutData().getId())}}a.addContent(o)}this._bChangedByMe=false;return a};function b(){var e=this.getAggregation("form");if(e.getLayout()){this._bChangedByMe=true;e.destroyLayout();z.call(this);this._bChangedByMe=false}var t;switch(this.getLayout()){case g.ResponsiveLayout:if((!f||!d)&&!this._bResponsiveLayoutRequested){f=sap.ui.require("sap/ui/layout/form/ResponsiveLayout");d=sap.ui.require("sap/ui/layout/ResponsiveFlowLayoutData");if(!f||!d){sap.ui.require(["sap/ui/layout/form/ResponsiveLayout","sap/ui/layout/ResponsiveFlowLayoutData"],_.bind(this));this._bResponsiveLayoutRequested=true}}if(f&&d){t=new f(this.getId()+"--Layout")}break;case g.GridLayout:if((!p||!m||!v)&&!this._bGridLayoutRequested){p=sap.ui.require("sap/ui/layout/form/GridLayout");m=sap.ui.require("sap/ui/layout/form/GridContainerData");v=sap.ui.require("sap/ui/layout/form/GridElementData");if(!p||!m||!v){sap.ui.require(["sap/ui/layout/form/GridLayout","sap/ui/layout/form/GridContainerData","sap/ui/layout/form/GridElementData"],C.bind(this));this._bGridLayoutRequested=true}}if(p&&m&&v){t=new p(this.getId()+"--Layout")}break;case g.ResponsiveGridLayout:if(!y&&!this._bResponsiveGridLayoutRequested){y=sap.ui.require("sap/ui/layout/form/ResponsiveGridLayout");if(!y){sap.ui.require(["sap/ui/layout/form/ResponsiveGridLayout"],F.bind(this));this._bResponsiveGridLayoutRequested=true}}if(y){t=new y(this.getId()+"--Layout")}break;case g.ColumnLayout:if(!c&&!this._bColumnLayoutRequested){c=sap.ui.require("sap/ui/layout/form/ColumnLayout");if(!c){sap.ui.require(["sap/ui/layout/form/ColumnLayout"],E.bind(this));this._bColumnLayoutRequested=true}}if(c){t=new c(this.getId()+"--Layout")}break}if(t){this._bChangedByMe=true;e.setLayout(t);this._bChangedByMe=false;return true}return false}function _(e,t){f=e;d=t;this._bResponsiveLayoutRequested=false;if(this.getLayout()==g.ResponsiveLayout){M.call(this)}}function C(e,t,a){p=e;m=t;v=a;this._bGridLayoutRequested=false;if(this.getLayout()==g.GridLayout){M.call(this)}}function F(e){y=e;this._bResponsiveGridLayoutRequested=false;if(this.getLayout()==g.ResponsiveGridLayout){M.call(this)}}function E(e){c=e;this._bColumnLayoutRequested=false;if(this.getLayout()==g.ColumnLayout){M.call(this)}}function M(){if(!this._bIsBeingDestroyed){b.call(this);D.call(this);if(this.getDomRef()){B.call(this)}}}function R(){this._bChangedByMe=true;var e=this.getAggregation("form");var t=e.getFormContainers();for(var a=0;a<t.length;a++){var i=t[a];j(this._changedFormContainers,i);if(i.getLayoutData()){i.destroyLayoutData()}var s=i.getFormElements();for(var r=0;r<s.length;r++){var n=s[r];j(this._changedFormElements,n);if(n.getLayoutData()){n.destroyLayoutData()}var o=n.getLabel();if(o){q.call(this,o)}var l=n.getFields();for(var u=0;u<l.length;u++){var h=l[u];q.call(this,h)}}}this._bChangedByMe=false}function D(){this._bChangedByMe=true;var e=this.getAggregation("form");var t=e.getFormContainers();for(var a=0;a<t.length;a++){var i=t[a];j(this._changedFormContainers,i);P.call(this,i);var s=i.getFormElements();for(var r=0;r<s.length;r++){var n=s[r];j(this._changedFormElements,n);G.call(this,n);var o=n.getLabel();if(o){w.call(this,o,this._iLabelWeight,false,true,this.getLabelMinWidth())}var l=n.getFields();for(var u=0;u<l.length;u++){var h=l[u];w.call(this,h,5,false,true)}}}this._bChangedByMe=false}function B(){this._bChangedByMe=true;this._changedFormContainers=[];var e=this.getLayout();var t=this.getAggregation("form").getLayout();t.setBackgroundDesign(this.getBackgroundDesign());switch(e){case g.ResponsiveLayout:this._applyLinebreaks();for(var a=0;a<this._changedFormElements.length;a++){var i=this._changedFormElements[a];W.call(this,i)}break;case g.GridLayout:X.call(this);break;case g.ResponsiveGridLayout:t.setLabelSpanXL(this.getLabelSpanXL());t.setLabelSpanL(this.getLabelSpanL());t.setLabelSpanM(this.getLabelSpanM());t.setLabelSpanS(this.getLabelSpanS());t.setAdjustLabelSpan(this.getAdjustLabelSpan());t.setEmptySpanXL(this.getEmptySpanXL());t.setEmptySpanL(this.getEmptySpanL());t.setEmptySpanM(this.getEmptySpanM());t.setEmptySpanS(this.getEmptySpanS());t.setColumnsXL(this.getColumnsXL());t.setColumnsL(this.getColumnsL());t.setColumnsM(this.getColumnsM());t.setSingleContainerFullSize(this.getSingleContainerFullSize());t.setBreakpointXL(this.getBreakpointXL());t.setBreakpointL(this.getBreakpointL());t.setBreakpointM(this.getBreakpointM());break;case g.ColumnLayout:t.setColumnsXL(this.getColumnsXL()>0?this.getColumnsXL():this.getColumnsL());t.setColumnsL(this.getColumnsL());t.setColumnsM(this.getColumnsM());t.setLabelCellsLarge(this.getLabelSpanL());t.setEmptyCellsLarge(this.getEmptySpanL());break}this._changedFormElements=[];this._bChangedByMe=false}function A(e){var t=e.getId(),a=" "+this._aLayouts.join(" ")+" ";return a.indexOf(" "+t+" ")>-1}function S(e,t,a,i){var s=new d({weight:e,linebreak:t===true,linebreakable:a===true});if(i){s.setMinWidth(i)}this._aLayouts.push(s.getId());return s}function k(e){var t;switch(this.getLayout()){case g.ResponsiveLayout:t=o.prototype.getLayoutDataForElement(e,"sap.ui.layout.ResponsiveFlowLayoutData");break;case g.GridLayout:t=o.prototype.getLayoutDataForElement(e,"sap.ui.layout.form.GridElementData");break;case g.ResponsiveGridLayout:t=o.prototype.getLayoutDataForElement(e,"sap.ui.layout.GridData");break;case g.ColumnLayout:t=o.prototype.getLayoutDataForElement(e,"sap.ui.layout.form.ColumnElementData");break}return t}function T(){var e=this.getLayout();if(e===g.ResponsiveLayout&&this._bResponsiveLayoutRequested||e===g.GridLayout&&this._bGridLayoutRequested||e===g.ResponsiveGridLayout&&this._bResponsiveGridLayoutRequested||e===g.ColumnLayout&&this._bColumnLayoutRequested){return false}if(!this.getAggregation("form").getLayout()){var t=this._bChangedByMe;var a=b.call(this);this._bChangedByMe=t;if(!a){return false}}return true}function w(e,t,a,i,s){if(this.getLayout()!=g.ResponsiveLayout){return}if(!T.call(this)){return}this._bLayoutDataChangedByMe=true;var r=k.call(this,e);if(!r||!A.call(this,r)){r=e.getLayoutData();if(r&&r.isA("sap.ui.core.VariantLayoutData")){r.addMultipleLayoutData(S.call(this,t,a,i,s))}else if(!r){e.setLayoutData(S.call(this,t,a,i,s))}else{u.warning("ResponsiveFlowLayoutData can not be set on Field "+e.getId(),"_createFieldLayoutData","SimpleForm")}}this._bLayoutDataChangedByMe=false}function G(e){if(this.getLayout()!=g.ResponsiveLayout){return}if(!T.call(this)){return}this._bLayoutDataChangedByMe=true;e.setLayoutData(new d({linebreak:true,margin:false}));this._bLayoutDataChangedByMe=false}function P(e){var t=this.getLayout();if(t!=g.ResponsiveLayout&&t!=g.GridLayout){return}if(!T.call(this)){return}this._bLayoutDataChangedByMe=true;switch(t){case g.ResponsiveLayout:e.setLayoutData(new d({minWidth:280}));break;case g.GridLayout:if(this.getMaxContainerCols()>1){e.setLayoutData(new m({halfGrid:true}))}else{e.setLayoutData(new m({halfGrid:false}))}break}this._bLayoutDataChangedByMe=false}function q(e){this._bLayoutDataChangedByMe=true;var t=k.call(this,e);if(t){var a=t.getId();for(var i=0;i<this._aLayouts.length;i++){var s=this._aLayouts[i];if(a==s){t.destroy();this._aLayouts.splice(i,1);break}}}this._bLayoutDataChangedByMe=false}function I(e,t){var a=x.call(this,t,e);e.addFormElement(a);return a}function O(e,t,a){var i=x.call(this,t,e);e.insertFormElement(i,a);return i}function x(e,t){var a;var i={};if(e){a=e.getId()+"--FE";e.addStyleClass("sapUiFormLabel-CTX");if(!k.call(this,e)){w.call(this,e,this._iLabelWeight,false,true,this.getLabelMinWidth())}i["label"]=e}else{a=t.getId()+"--FE-NoLabel";if(sap.ui.getCore().byId(a)){a=undefined}}var s=new n(a,i);G.call(this,s);s.isVisible=function(){var e=this.getFields();var t=false;for(var a=0;a<e.length;a++){var i=e[a];if(i.getVisible()){t=true;break}}return t};return s}function V(e){var t;var a={};if(e){t=e.getId()+"--FC";if(e.isA("sap.ui.core.Title")){a["title"]=e}else if(e.isA("sap.ui.core.Toolbar")){a["toolbar"]=e}}else{t=this.getId()+"--FC-NoHead"}var i=new r(t,a);P.call(this,i);i.getAriaLabelledBy=function(){var e=this.getToolbar();if(e){return e.getAriaLabelledBy()}else{return[]}};return i}function W(e){var t=this._iMaxWeight;var a=e.getFields();var i;var s=a.length;var r=e.getLabel();var n;var o=0;this._bLayoutDataChangedByMe=true;if(r&&k.call(this,r)){t=t-k.call(this,r).getWeight()}for(o=0;o<a.length;o++){i=a[o];n=k.call(this,i);if(n&&n.isA("sap.ui.layout.ResponsiveFlowLayoutData")&&!A.call(this,n)){t=t-n.getWeight();s--}}var l=Math.floor(t/s);var u=t%s;for(o=0;o<a.length;o++){i=a[o];n=k.call(this,i);var h=l;if(!n){w.call(this,i,h,false,o==0)}else if(A.call(this,n)&&n.isA("sap.ui.layout.ResponsiveFlowLayoutData")){if(u>0){h++;u--}n.setWeight(h)}}this._bLayoutDataChangedByMe=false}L.prototype._applyLinebreaks=function(){if(!f||this._bResponsiveLayoutRequested){return}this._bLayoutDataChangedByMe=true;var e=this.getAggregation("form"),t=e.getFormContainers();var a=this.getDomRef();var i=this.$();for(var s=1;s<t.length;s++){var r=t[s],n=r.getLayoutData();if(!a||i.outerWidth(true)>this.getMinWidth()){if(s%this.getMaxContainerCols()==0){n.setLinebreak(true)}else{n.setLinebreak(false)}}else{n.setLinebreak(true)}}if(a&&i.css("visibility")=="hidden"){var o=this;setTimeout(function(){if(o.getDomRef()){o.$().css("visibility","")}},10)}this._bLayoutDataChangedByMe=false};function X(){this._bLayoutDataChangedByMe=true;var e=this.getAggregation("form");var t=e.getFormContainers();var a=t.length;for(var i=0;i<a;i++){var s=t[i];if(this.getMaxContainerCols()<=1||i==a-1&&a%2>0){s.getLayoutData().setHalfGrid(false)}else if(!s.getLayoutData().getHalfGrid()){s.getLayoutData().setHalfGrid(true)}}this._bLayoutDataChangedByMe=false}L.prototype._resize=function(e){this._bChangedByMe=true;if(this._iCurrentWidth==e.size.width){return}this._iCurrentWidth=e.size.width;this._applyLinebreaks();this._bChangedByMe=false};function z(){if(this._sResizeListenerId){a.deregister(this._sResizeListenerId);this._sResizeListenerId=null}}function j(e,t){var a=false;for(var i=0;i<e.length;i++){var s=e[i];if(s==t){a=true;break}}if(!a){e.push(t)}}function H(e){if(e.name=="visible"){var t=e.object.getParent();t.invalidate()}}function N(e){var t=[];var a=e.getFormContainers();for(var i=0;i<a.length;i++){var s=a[i];var r=s.getTitle();if(r){t.push(r)}else{var n=s.getToolbar();if(n){t.push(n)}}var o=s.getFormElements();for(var l=0;l<o.length;l++){var u=o[l];var h=u.getLabel();if(h){t.push(h)}var g=u.getFields();for(var f=0;f<g.length;f++){var d=g[f];t.push(d)}}}return t}L.prototype._formInvalidated=function(e){if(!this._bChangedByMe){var t=N(this.getAggregation("form"));var a=0;var i=0;var s=false;if(!this._aElements||t.length<this._aElements.length){s=true}else{for(a=0;a<t.length;a++){var r=t[a];var n=this._aElements[i];if(r===n){i++}else{var o=t[a+1];if(o===n){this.insertContent(r,a);break}o=this._aElements[i+1];if(o===r){s=true;break}break}}}if(s){this.removeAllContent();for(a=0;a<t.length;a++){var l=t[a];this.addContent(l)}}}};L.prototype._onLayoutDataChange=function(e){if(!this._bLayoutDataChangedByMe&&!this._bIsBeingDestroyed){switch(this.getLayout()){case g.ResponsiveLayout:var t=e.srcControl;var a=t.getParent();if(a instanceof n){var i=this.indexOfContent(t);this.removeContent(t);this.insertContent(t,i)}break}}};L.prototype._suggestTitleId=function(e){var t=this.getAggregation("form");t._suggestTitleId(e);return this};return L});
//# sourceMappingURL=SimpleForm.js.map