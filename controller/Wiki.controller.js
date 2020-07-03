sap.ui.define(["./Base","sapmarco/projectpages/model/marked","sap/m/ActionListItem","sapmarco/projectpages/model/githubService"],function(e,t,i,n){"use strict";var a,o;return e.extend("sapmarco.projectpages.controller.Wiki",{onInit:function(){this.initializeViewTheme();this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());this.getRouter().getRoute("RouteWiki").attachMatched(this._onRouteMatched,this)},onThemeSwap:function(e){this.toggleTheme(e)},onBackHome:function(){this.onNavBack();this.byId("wikiPage").setTitle(this.getView().getModel("i18n").getResourceBundle().getText("wiki"))},onSidebarSelection:async function(e){const i=await n.getSelectedContent(this.getText());a.setTitle(this.getText());o.getDomRef().innerHTML=await t(i)},_onRouteMatched:function(e){this._initializeSidebar();a=this.byId("wikiPage");o=this.byId("markdownContainer")},_initializeSidebar:async function(){const e=await n.getWikiIndex();const a=await t(e);let o=[...a.matchAll(/\wiki\/(.*?)\"/g)];for(let e=0;e<o.length;e++){this.byId("sidebar").addItem(new i({text:`${o[e][1]}`,press:this.onSidebarSelection}))}}})});