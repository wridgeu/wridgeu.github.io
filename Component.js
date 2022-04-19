sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","./controller/VersionDialog","./model/models"],function(e,t,s,i){function o(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}const n=t["support"];const a=o(s);const r=o(i);sap.ui.loader.config({map:{"*":{marked:"sapmarco/projectpages/resources/thirdparty/marked/lib/marked.umd"}},shim:{"sapmarco/projectpages/resources/thirdparty/marked/lib/marked.umd":{amd:true,deps:[],exports:"marked"}}});const c=e.extend("sapmarco.projectpages.Component",{metadata:{manifest:"json"},init:function t(){e.prototype.init.call(this);this._versionDialog=new a(this.getRootControl());this.getRouter().initialize();this.setModel(r(),"device")},getContentDensityClass:function e(){if(this._contentDensityClass===undefined){if(document.body.classList.contains("sapUiSizeCozy")||document.body.classList.contains("sapUiSizeCompact")){this._contentDensityClass=""}else if(!n.touch){this._contentDensityClass="sapUiSizeCompact"}else{this._contentDensityClass="sapUiSizeCozy"}}return this._contentDensityClass},openVersionDialog:async function e(){await this._versionDialog.open()},exit:function e(){this._versionDialog.destroy();delete this._versionDialog}});return c});