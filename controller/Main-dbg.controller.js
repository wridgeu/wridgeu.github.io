sap.ui.define([
  "./Base"
], function(BaseController) {
  "use strict";
  return BaseController.extend("sapmarco.projectpages.controller.Main", {
    onInit: function(){
      //set content density
      this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
      this.initializeViewTheme();
    },
    onUI5IconPress : function () {
			this.getOwnerComponent().openVersionDialog();
    },
    onThemeSwap: function(sTheme){
      this.toggleTheme(sTheme);
    },
  });
});
