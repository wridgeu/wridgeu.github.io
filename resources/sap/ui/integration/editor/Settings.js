/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/m/ResponsivePopover","sap/ui/model/json/JSONModel","sap/m/Button","sap/m/SegmentedButton","sap/m/SegmentedButtonItem","sap/m/VBox","sap/m/HBox","sap/m/Select","sap/ui/core/ListItem","sap/m/Label","sap/m/Text","sap/m/Title","sap/m/CheckBox","sap/m/Menu","sap/m/MenuItem","sap/m/Input","sap/ui/integration/util/ParameterMap","sap/base/util/merge","sap/ui/core/Core","sap/m/Table","sap/m/Column","sap/m/ColumnListItem","sap/m/ScrollContainer","sap/base/util/ObjectPath","sap/ui/integration/util/BindingHelper"],function(e,t,a,s,n,i,l,r,o,d,u,g,c,p,f,m,y,_,h,v,S,b,T,I,x,w){"use strict";var P=e.extend("sap.ui.integration.editor.Settings",{metadata:{library:"sap.ui.integration"},renderer:null});var D=v.getLibraryResourceBundle("sap.ui.integration"),E,C,V=null,M,O,R,A,N,L,$,U,j,B,F,H;P.prototype.setConfiguration=function(e){this._originalConfig=e;e=h({},e);var t=new a(e);this.setModel(t,"currentSettings");this.bindElement({path:"currentSettings>/"})};P.prototype.open=function(e,t,a,s,n,i,l){var r=this.getModel("currentSettings").getData();if(r.values){this.prepareFieldsInKey(r)}V=this;H=K(r,n);this.addDependent(H);this.oHost=s;this.fnApply=i;this.fnCancel=l;this._oOpener=n;C=true;e.addDependent(this);if(!r.allowDynamicValues&&r.values){v.byId("settings_scroll_container").setHeight("155px")}this.getModel("currentSettings").checkUpdate(true,true);ie(D.getText("EDITOR_SELECT_FROM_LIST"),[]);if(t){var o=!a||a.getDomRef()===null||a.getDomRef().offsetWidth===0?270:a.getDomRef().offsetWidth;var d=!a||a.getDomRef()===null||a.getDomRef().offsetHeight===0?350:a.getDomRef().offsetHeight;H.setContentWidth(o+"px");H.setContentHeight(d-50+"px");if(a&&a.getSettings().preview.position==="right"){H.setPlacement("Right")}else{H.setPlacement("Left")}A.setValue(e._label);H.openBy(e)}else{H.open()}E=this.getModel("currentSettings");if(E.getProperty("/_hasDynamicValue")){Y()}else if(E.getProperty("/_hasSettings")){q()}else if(E.getProperty("/allowDynamicValues")){Y()}else if(E.getProperty("/allowSettings")){q()}};P.prototype._applyCurrentSettings=function(){this.fnApply(E.getData())};P.prototype._cancelCurrentSettings=function(){this.fnCancel(this._originalConfig)};P.prototype.destroy=function(){this.removeDependent(H);return e.prototype.destroy.apply(this,arguments)};function K(e,a){var n=k(),i=z(e),l=X(),r=ee(),o=te(e,a),d=new t({id:"settings_popover",showArrow:true,contentWidth:"400px",showHeader:false,horizontalScrolling:false,verticalScrolling:false,modal:false,endButton:new s({text:D.getText("EDITOR_MORE_CANCEL"),press:function(){d.close()}}),beginButton:new s({text:D.getText("EDITOR_MORE_OK"),type:"Emphasized",press:function(){if(e.values){var t=v.byId("settings_pav_table"),a=t.getSelectedContexts(),s=[];if(E.getProperty("/selectedValues")==="Partion"){for(var n=0;n<a.length;n++){var i=V.getKeyFromItem(a[n].getObject());s.push(i)}Z("pageAdminValues",s)}else{Z("pageAdminValues",[])}}V._applyCurrentSettings();C=false;d.close()}}),afterClose:function(){if(C){V._cancelCurrentSettings()}C=true;d.destroy()},afterOpen:function(){var t=this.getDomRef().querySelector("footer");var a=i.getDomRef(),s=t.querySelector("button").parentNode;if(a){s.insertBefore(a,s.firstChild)}window.requestAnimationFrame(function(){d.getDomRef()&&(d.getDomRef().style.opacity="1")});if(e.values){var n=v.byId("settings_pav_table"),l=E.getProperty("/_next/pageAdminValues");if(l!==undefined&&l.length>0){n.removeSelections();E.setProperty("/selectedValues","None");var r=E.getProperty("/_next/pageAdminValues"),o=n.getItems();for(var u=0;u<r.length;u++){for(var g=0;g<o.length;g++){var c=V.getKeyFromItem(o[g].getBindingContext().getObject());if(r[u]===c){n.setSelectedItem(o[g])}}}E.setProperty("/selectedValues","Partion")}else{n.selectAll();E.setProperty("/selectedValues","All")}}}});d.setCustomHeader(n);d.addContent(i);d.addContent(l);d.addContent(r);d.addContent(o);d.addStyleClass("sapUiIntegrationFieldSettings");return d}function G(){j=new i({text:D.getText("EDITOR_MORE_SETTINGS"),key:"settings",icon:"sap-icon://action-settings",width:"50%",press:q}).addStyleClass("setbtn");return j}function W(){j=G();B=new n("settings_Segment_btn",{width:"100%",visible:"{= ${currentSettings>allowDynamicValues} && ${currentSettings>allowSettings}}",items:[new i({text:D.getText("EDITOR_MORE_DYNAMICVALUES"),key:"dynamic",icon:"{= ${currentSettings>_hasDynamicValue} ? 'sap-icon://display-more' : 'sap-icon://enter-more'}",width:"50%",press:Y}).addStyleClass("dynbtn sel"),j]});return B}function k(){B=W();var e=new g({text:D.getText("EDITOR_MORE_DYNAMICVALUES"),visible:"{= ${currentSettings>allowDynamicValues} && !${currentSettings>allowSettings}}"}).addStyleClass("sapUiTinyMagin");var t=new g({text:D.getText("EDITOR_MORE_SETTINGS"),visible:"{= !${currentSettings>allowDynamicValues} && ${currentSettings>allowSettings}}"}).addStyleClass("sapUiTinyMagin");var a=new r({width:"100%",items:[B,e,t]}).addStyleClass("headertitle");return a}function z(e){F=new s("settings_reset_to_default_btn",{type:"Transparent",text:D.getText("EDITOR_MORE_RESET"),enabled:"{= ${currentSettings>_next/visible} === (typeof(${currentSettings>visibleToUser}) === 'undefined' ? false : !${currentSettings>visibleToUser}) || ${currentSettings>_next/editable} === (typeof(${currentSettings>editableToUser}) === 'undefined' ? false : !${currentSettings>editableToUser}) || ${currentSettings>_next/allowDynamicValues} === (typeof(${currentSettings>allowDynamicValues}) === 'undefined' ? false : !${currentSettings>allowDynamicValues}) || ${currentSettings>_beforeValue} !== ${currentSettings>value}}",tooltip:D.getText("EDITOR_MORE_SETTINGS_P_ADMIN_RESET"),press:function(){var t=typeof E.getProperty("/visibleToUser")==="undefined"?true:E.getProperty("/visibleToUser");var a=typeof E.getProperty("/editableToUser")==="undefined"?true:E.getProperty("/editableToUser");var s=typeof E.getProperty("/allowDynamicValues")==="undefined"?true:E.getProperty("/allowDynamicValues");var n=v.byId("settings_popover");Z("visible",t);Z("editable",a);Z("allowDynamicValues",s);if(E.getProperty("/translatable")){if(E.getProperty("/_translatedDefaultValue")&&E.getProperty("/_translatedDefaultValue")!==""){E.setProperty("/value",E.getProperty("/_translatedDefaultValue"))}else if(E.getProperty("/_translatedDefaultPlaceholder")&&E.getProperty("/_translatedDefaultPlaceholder")!==""){E.setProperty("/value",E.getProperty("/_translatedDefaultPlaceholder"))}E.setProperty("/_changed",false)}else{E.setProperty("/value",E.getProperty("/_beforeValue"))}if(e.values){var i=v.byId("settings_pav_table"),l=E.getProperty("/_next/pageAdminValues"),r=i.getItems();if(l!==undefined&&l.length>0&&l.length<r.length){i.removeSelections();for(var o=0;o<l.length;o++){for(var d=0;d<r.length;d++){var u=V.getKeyFromItem(r[d].getBindingContext().getObject());if(l[o]===u){i.setSelectedItem(r[d])}}}E.setProperty("/selectedValues","Partion")}else{i.selectAll();E.setProperty("/selectedValues","All")}}n.getBeginButton().firePress()}}).addStyleClass("resetbutton");return F}function q(){O.setVisible(true);M.setVisible(false);v.byId("settings_Segment_btn").setSelectedKey("settings");var e=v.byId("settings_current_value");e.setVisible(false)}function Y(){O.setVisible(false);M.setVisible(true);v.byId("settings_Segment_btn").setSelectedKey("dynamic");var e=V.getModel("contextflat"),t=e._getValueObject(E.getProperty("/value"));if(t&&t.object.label){A.setValue(t.object.label);ie(t.object.description,t.object.tags);if(t.path==="empty"){A.setValue(t.object.label)}re(t)}var a=v.byId("settings_current_value");a.setVisible(true)}function Z(e,t){if(!E.getProperty("/_next")){E.setProperty("/_next",{})}E.setProperty("/_next/"+e,t)}function J(e,t){var a=[];for(var s in e){if(e[s]&&e[s].label){var n=new m({text:e[s].label});n.__data=e[s];e[s].pathvalue=(t+"/"+s).substring(1);a.push(n);var i=J(e[s],t+"/"+s);for(var l=0;l<i.length;l++){n.addItem(i[l])}}}return a}var Q=[{formatMethod:"format.DateTime",sourceTypes:["datetime","date"],label:"Relative date/datetime text of the value",description:"Should be applied to dynamic values of type date or datetime or string values that represent a datetime in the format 'yyyy-MM-ddZhh:mm:ss'",example:"4 weeks ago",syntax:"handlebars",binding:"{= format.dateTime('__|VALUE|__',{relative:true})}"},{formatMethod:"format.DateTime",sourceTypes:["datetime","date"],label:"Short date/datetime text of the value",description:"Should be applied to dynamic values of type date, date-time or text values that represent a datetime in the format 'yyyy-MM-ddZhh:mm:ss.sss'",example:"9/18/20, 2:09 PM",binding:"{= format.dateTime('__|VALUE|__',{style:'short'})}"},{formatMethod:"format.DateTime",sourceTypes:["datetime","date"],label:"Medium date/datetime text of the value",description:"Should be applied to dynamic values of type date, date-time or text values that represent a datetime in the format 'yyyy-MM-ddThh:mm:ss.sssZ'",example:"Sep 18, 2020, 2:09:04 PM",binding:"{= format.dateTime('__|VALUE|__',{style:'medium'})}"},{formatMethod:"format.DateTime",sourceTypes:["datetime","date"],label:"Long date, date-time text of the value",description:"Should be applied to dynamic values of type date or date-time or string values that represent a datetime in the format 'yyyy-MM-ddThh:mm:ss.sssZ'",example:"Sep 18, 2020, 2:09:04 PM",binding:"{= format.dateTime('__|VALUE|__',{style:'long'})}"}];function X(){M=new l({visible:true});M.addStyleClass("sapUiSmallMargin");A=new y({width:"100%",showValueHelp:true,valueHelpOnly:true,valueHelpRequest:function(){if(N){N.destroy()}N=new f({});L=J(M.getModel("context").getData(),"");for(var e=0;e<L.length;e++){N.addItem(L[e])}N.attachItemSelected(function(e){var t=e.getParameter("item").__data;ie(t.description||"",t.tags||[]);A.setValue(t.placeholder||t.label);var a=V.getModel("contextflat");re(a._getPathObject(t.pathvalue))});A.addDependent(N);N.addStyleClass("sapUiIntegrationFieldSettingsMenu");N.openBy(A,false,null,null,"1 0")}});A.addStyleClass("selectvariable");var e=new l({items:[new u({text:"Select a dynamic value"}),A]});M.addItem(e);R=new g({text:"",maxLines:6,renderWhitespace:true});e=new l({width:"100%",items:[R]});R.addStyleClass("description");M.addItem(e);if(Q.length===-1){$=new o({width:"100%",enabled:true,change:function(){U.setText($.getSelectedItem()._data.description)}});e=new l({visible:false,items:[new u({text:"Customize the value..."}),$]});M.addItem(e);U=new g({text:"",maxLines:4,renderWhitespace:true});U.addStyleClass("description");e=new l({width:"100%",items:[U]});M.addItem(e);M.getItems()[2].getItems()[0].addStyleClass("sapUiTinyMarginTop")}M.getItems()[0].getItems()[0].addStyleClass("sapUiTinyMarginTop");return M}function ee(){var e=new l("settings_current_value",{width:"100%",items:[new g({text:D.getText("EDITOR_ACTUAL_VALUE")}),new y({value:{path:"currentSettings>_currentContextValue"},editable:false})]});e.addStyleClass("currentval");return e}function te(e,t){O=new l({visible:false});var n=(new l).addStyleClass("commonSettings");O.addItem(n);n.addItem(new c({text:D.getText("EDITOR_MORE_SETTINGS_P_ADMIN")}).addStyleClass("stitle"));n.addItem(new r({items:[new u({text:D.getText("EDITOR_MORE_SETTINGS_P_ADMIN_VISIBLE")}),new p({selected:"{= ${currentSettings>_next/visible} !== false}",select:function(e){Z("visible",e.getParameter("selected"))}})]}).addStyleClass("cbrow"));n.addItem(new r({items:[new u({text:D.getText("EDITOR_MORE_SETTINGS_P_ADMIN_EDIT")}),new p({selected:"{= ${currentSettings>_next/editable} !== false}",enabled:"{= ${currentSettings>_next/visible} !== false}",select:function(e){Z("editable",e.getParameter("selected"))}})]}).addStyleClass("cbrow"));n.addItem(new r({visible:"{= ${currentSettings>allowDynamicValues}!== false}",items:[new u({text:D.getText("EDITOR_MORE_SETTINGS_P_ADMIN_DYN")}),new p({selected:"{= ${currentSettings>_next/allowDynamicValues} !== false}",enabled:"{= ${currentSettings>_next/visible} !== false && ${currentSettings>_next/editable} !== false}",select:function(e){Z("allowDynamicValues",e.getParameter("selected"))}})]}).addStyleClass("cbrow"));if(e.values){var i;if(e.values.data){var o=e.values.data.path,d;if(o&&o!=="/"){if(o.startsWith("/")){o=o.substring(1)}if(o.endsWith("/")){o=o.substring(0,o.length-1)}d=o.split("/");i=x.get(["_values",d],e)}else{i=x.get(["_values"],e)}}else if(t.getParent().getParent().getAggregation("_extension")){var f=e.values.path;if(f.length>1){f=f.substring(1)}i=x.get([f],t.getModel().getData())}n.addItem(new r({visible:"{= ${currentSettings>_next/visible} !== false && ${currentSettings>_next/editable} !== false}",items:[new u({text:D.getText("EDITOR_MORE_SETTINGS_P_ADMIN_VALUES_LIST"),tooltip:D.getText("EDITOR_MORE_SETTINGS_P_ADMIN_VALUES_LIST_TOOLTIPS"),wrapping:false}),new s({type:"Transparent",enabled:i!==undefined,icon:{path:"currentSettings>selectedValues",formatter:function(e){if(e==="All"){return"sap-icon://multiselect-all"}else if(e==="Partion"){return"sap-icon://multi-select"}else if(e==="None"){return"sap-icon://multiselect-none"}}},tooltip:{path:"currentSettings>selectedValues",formatter:function(e){if(e==="All"){return D.getText("EDITOR_MORE_SETTINGS_P_ADMIN_DESELECT_ALL")}else{return D.getText("EDITOR_MORE_SETTINGS_P_ADMIN_SELECT_ALL")}}},press:ae})]}).addStyleClass("cbrow"));var m=new S({id:"settings_pav_table",mode:"MultiSelect",width:"84%",select:se,columns:[new b]}).addStyleClass("tableHdr");var y=e.values.item.text,_=new a(i);m.setModel(_);var h=(new T).addStyleClass("pavlistItem");if(i){for(var v=0;v<i.length;v++){h.addCell(new r({items:[new g({text:w.createBindingInfos(y)}).addStyleClass("pavTblCellText")]})).addStyleClass("pavlistItem")}}m.bindItems("/",h);var P=new I({id:"settings_scroll_container",height:"125px",width:"94%",vertical:true,horizontal:false,visible:"{= ${currentSettings>_next/visible} !== false && ${currentSettings>_next/editable} !== false}",content:[m]}).addStyleClass("SettingsPAVTable");O.addItem(P)}return O}function ae(){var e=v.byId("settings_pav_table"),t=v.byId("settings_reset_to_default_btn"),a=E.getProperty("/selectedValues");if(a==="All"){e.removeSelections();E.setProperty("/selectedValues","None")}else{e.selectAll();E.setProperty("/selectedValues","All")}if(!t.getEnabled()){t.setEnabled(true)}}function se(e){var t=e.getSource(),a=t.getSelectedItems(),s=t.getItems(),n=v.byId("settings_reset_to_default_btn");if(a.length===s.length){E.setProperty("/selectedValues","All")}else if(a.length<s.length&&a.length>0){E.setProperty("/selectedValues","Partion")}else{E.setProperty("/selectedValues","None")}if(!n.getEnabled()){n.setEnabled(true)}}function ne(e,t){e=e||[];$.removeAllItems();var a=[];$.addItem(new d({text:"No customizing needed",key:""}));for(var s=0;s<Q.length;s++){var n=Q[s],i=new d({text:n.label,key:"key"+s});i._data=n;if(n.sourceTypes.indexOf(t)>-1||e.indexOf(n.formatMethod)>-1){$.addItem(i)}else{a.push(i)}}for(var s=0;s<a.length;s++){$.addItem(a[s])}}function ie(e,t){t=t||[];if(t.indexOf("technical")>-1){e=e+"\n"+D.getText("EDITOR_MORE_DYNAMICVALUES_TECHHINT")}R.setText(e)}function le(e){if(Q.length===-1){if(!e){$.removeAllItems();$.addItem(new d({text:"No customizing available for this value"}));U.setText("");$.setEnabled(false)}else{ne(e.customize,e.type);$.setEnabled(true)}}}function re(e){if(e){E.setProperty("/_hasDynamicValue",true);var t=e.value;E.setProperty("/value",t);E.setProperty("/_contextpath",e.path);if(e.object&&e.object.value&&e.object.value.indexOf("{{")===0){E.setProperty("/_currentContextValue",_.processPredefinedParameter(e.object.value));le(e.object)}else{if(e.path==="empty"){E.setProperty("/value","");E.setProperty("/_currentContextValue","");E.setProperty("/_hasDynamicValue",false);le()}else{le(e.object);if(e.object&&e.object.hasOwnProperty("value")){E.setProperty("/_currentContextValue",e.object.value)}else{V.oHost.getContextValue(e.path+"/value").then(function(t){if(t===null){E.setProperty("/_currentContextValue","(not available)")}else{E.setProperty("/_currentContextValue",t)}e.object&&(e.object.value=t)})}}}}}P._private=function(){return{oPopover:H,oSegmentedButton:B,oSettingsButton:j,oDynamicPanel:M,oSettingsPanel:O,oCurrentModel:E,updateCurrentValue:re,oCurrentInstance:V,oDynamicValueField:A,oResetToDefaultButton:F,getMenuItems:function(){return L},getMenu:function(){return N}}};P.prototype.prepareFieldsInKey=function(e){this._sKeySeparator=e.values.keySeparator;if(!this._sKeySeparator){this._sKeySeparator="#"}var t=e.values.item.key;this._aFields=t.split(this._sKeySeparator);for(var a in this._aFields){if(this._aFields[a].startsWith("{")){this._aFields[a]=this._aFields[a].substring(1)}if(this._aFields[a].endsWith("}")){this._aFields[a]=this._aFields[a].substring(0,this._aFields[a].length-1)}}};P.prototype.getKeyFromItem=function(e){var t="";this._aFields.forEach(function(a){t+=e[a].toString()+this._sKeySeparator}.bind(this));if(t.endsWith(this._sKeySeparator)){t=t.substring(0,t.length-this._sKeySeparator.length)}return t};return P});