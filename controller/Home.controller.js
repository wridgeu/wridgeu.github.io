sap.ui.define(["./Base.controller"],function(n){function o(n){return n&&n.__esModule&&typeof n.default!=="undefined"?n.default:n}const t=o(n);const e=t.extend("sapmarco.projectpages.controller.HomeController",{onInit:function n(){this._ownerComponent=this.getOwnerComponent();this.getView().addStyleClass(this._ownerComponent.getContentDensityClass())},onUI5IconPress:async function n(){await this.openVersionDialog(this.getView())},onWiki:function n(){this.navTo("RouteWiki")},onUI5con:function n(){this.navTo("RouteUI5Con")}});return e});