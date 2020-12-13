/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","./SuggestionsListRenderer","sap/ui/core/Control"],function(e,t,i){"use strict";var r=i.extend("sap.m.SuggestionsList",{metadata:{library:"sap.m",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"auto"},maxWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"}},associations:{parentInput:{type:"sap.ui.core.Control",multiple:false,singularName:"parentInput"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}}},renderer:t});r.prototype.init=function(){this._iSelectedItem=-1};r.prototype.onBeforeRendering=function(){this.$().off()};r.prototype.onAfterRendering=function(){this.$().on("mousedown",function(e){e.preventDefault()})};r.prototype.getItems=function(){try{return sap.ui.getCore().byId(this.getParentInput()).getSuggestionItems()}catch(e){return[]}};r.prototype.update=function(){var e;var t=this.getDomRef();if(t){e=sap.ui.getCore().createRenderManager();this.getRenderer().renderItems(e,this);e.flush(t);e.destroy()}return this};r.prototype.selectByIndex=function(e,t){var i=this.getItems();var r;var o;var n;var s=sap.ui.getCore().byId(this.getParentInput());var a="aria-activedescendant";if(isNaN(parseInt(e))){e=-1;t=false}if(!i.length||t&&e===0||!t&&e<0){r=-1}else{if(t){if(this._iSelectedItem<0){r=(e<0?i.length:-1)+e}else{r=this._iSelectedItem+e}}else{r=e}r=Math.min(Math.max(r,0),i.length-1)}this._iSelectedItem=r;if(i.length){this.$().children("li").removeClass("sapMSelectListItemBaseSelected").attr("aria-selected","false").eq(r).addClass("sapMSelectListItemBaseSelected").attr("aria-selected","true")}if(s){if(r>=0){o=s.getSuggestionItems()[r];if(o){n=o.getId();this._scrollToItem(o)}}if(n){s.$("I").attr(a,n)}else{s.$("I").removeAttr(a);s.$("SuggDescr").text("")}}return this._iSelectedItem};r.prototype._scrollToItem=function(e){var t=this.getParent().$().find(".sapMPopoverCont")[0],i,r,o,n;if(!e||!e.getDomRef()||!t){return}r=e.getDomRef().getBoundingClientRect();i=t.getBoundingClientRect();o=i.top-r.top;n=r.bottom-i.bottom;if(o>0){t.scrollTop=Math.max(t.scrollTop-o,0)}else if(n>0){t.scrollTop=t.scrollTop+n}};r.prototype.getSelectedItemIndex=function(){return this._iSelectedItem};return r});