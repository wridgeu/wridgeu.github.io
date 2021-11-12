sap.ui.define(["../util/githubService","../util/markdownService","./Base.controller","sap/m/ActionListItem"],function(t,e,i,n){function o(t){return t&&t.__esModule&&typeof t.default!=="undefined"?t.default:t}const s=t["getSelectedContent"];const a=t["getWikiIndex"];const c=e["markdownService"];const d=o(i);const r=d.extend("sapmarco.projectpages.controller.WikiController",{onInit:function t(){this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());this.getRouter().getRoute("RouteWiki").attachMatched(this._onRouteMatched.bind(this),this)},onThemeSwap:function t(){this.toggleTheme()},_onRouteMatched:async function t(){await this._initializeSidebar()},onBackHome:function t(){this.onNavBack();this.byId("wikiPage").setTitle(this.getView().getModel("i18n").getResourceBundle().getText("wiki"))},_initializeSidebar:async function t(){const e=await a();const i=c.parse(e);const o=[...i.matchAll(/\wiki\/(.*?)\"/g)];o.forEach(t=>{this.byId("sidebar").addItem(new n({text:`${t[1]}`,press:this.onSidebarSelection.bind(this,t[1])}))})},onSidebarSelection:async function t(e){const i=await s(e);this.byId("wikiPage").setTitle(e);this.byId("markdownContainer").getDomRef().innerHTML=c.parse(i);this.byId("markdownSection").scrollTo(0,0)}});return r});