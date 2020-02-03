sap.ui.define([
    "sap/ui/core/mvc/Controller"
  ], function(Controller) {
    "use strict";    
    var sFiori3DarkTheme = "sap_fiori_3_dark";
    var sSapBelize       = "sap_belize"
    return Controller.extend("Base", {
        initializeViewTheme: function(){
          this._setInvertedStyleOnSocials = function(){
            return this.byId("socialsGrouped").aCustomStyleClasses.indexOf("invertSocials") > -1 ? this.byId("socialsGrouped").removeStyleClass('invertSocials') : this.byId("socialsGrouped").addStyleClass("invertSocials");
          };    
          //check users prefered color scheme
          if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            sap.ui.getCore().applyTheme(sFiori3DarkTheme);
            this.byId("cVRow").removeStyleClass("cV");
            this._setInvertedStyleOnSocials();
            if (this.byId("footerToolbar").aCustomStyleClasses.indexOf("toolbar") > -1){
              this.byId("footerToolbar").removeStyleClass("toolbar");
              this.byId("footerToolbar").addStyleClass("setToolbarDarkMode")
            }
          };
        },
        toggleTheme : function(sTheme){
          if (sap.ui.getCore().getConfiguration().getTheme() === sSapBelize){
            sap.ui.getCore().applyTheme(sTheme);
            this.byId("cVRow").removeStyleClass("cV");
            this._setInvertedStyleOnSocials();
            this.byId("footerToolbar").removeStyleClass("toolbar");
            this.byId("footerToolbar").addStyleClass("setToolbarDarkMode");
          } else {
            sap.ui.getCore().applyTheme(sSapBelize);
            this.byId("cVRow").addStyleClass("cV");        
            this._setInvertedStyleOnSocials();
            this.byId("footerToolbar").removeStyleClass("setToolbarDarkMode");
            this.byId("footerToolbar").addStyleClass("toolbar");
          }
        },
      }
    );
  });
  