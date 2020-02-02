sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function(Controller) {
  "use strict";
  //declare some globals for the themes
  var sFiori3DarkTheme = "sap_fiori_3_dark";
  var sSapBelize       = "sap_belize"
  return Controller.extend("sapmarco.projectpages.controller.Main", {
    onInit: function(){
      this._setInvertedStyleOnSocials = function(){
        return this.byId("socialsGrouped").aCustomStyleClasses.indexOf("invertSocials") > -1 ? this.byId("socialsGrouped").removeStyleClass('invertSocials') : this.byId("socialsGrouped").addStyleClass("invertSocials");
      };
      //set content density
      this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
      
      //check users prefered color scheme
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        sap.ui.getCore().applyTheme(sFiori3DarkTheme);
        this.byId("cVRow").removeStyleClass("cV");
        this._setInvertedStyleOnSocials();
      };
    },
    onUI5IconPress : function () {
			this.getOwnerComponent().openVersionDialog();
    },
    onThemeSwap: function(sTheme){
      //read current theme sap_belize
      if (sap.ui.getCore().getConfiguration().getTheme() === sSapBelize){
        sap.ui.getCore().applyTheme(sTheme);
        this.byId("cVRow").removeStyleClass("cV");
        this._setInvertedStyleOnSocials();
      } else {
        sap.ui.getCore().applyTheme(sSapBelize);
        this.byId("cVRow").addStyleClass("cV");        
        this._setInvertedStyleOnSocials();
      }
    },
  });
});
