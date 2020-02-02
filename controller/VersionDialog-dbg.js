sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/core/Fragment",
	"sap/ui/core/syncStyleClass"
], function (ManagedObject, Fragment, syncStyleClass) {
	"use strict";
	return ManagedObject.extend("sapmarco.projectpages.controller.VersionDialog", {

		constructor : function (oView) {
			this._oView = oView;
		},

		exit : function () {
			delete this._oView;
		},

		open : function () {
			var oView = this._oView;

			// create dialog lazily
			if (!oView.byId("VersionDialog")) {
				var oFragmentController = {
					onCloseDialog : function (oEvt) {
						oEvt.getSource().getParent().close();
						oEvt.getSource().getParent().getModel("versionInfo").destroy();
					}
				};
				// load asynchronous XML fragment
				Fragment.load({ 
                    type: "XML",
					id: oView.getId(),
					name: "sapmarco.projectpages.view.VersionDialog",
					controller: oFragmentController
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
                    oView.addDependent(oDialog)

                    sap.ui.require(['sap/ui/VersionInfo'], function(oVersInfo) {
                        oVersInfo.load().then(function(oVersion){
                            var oVersionData = new sap.ui.model.json.JSONModel(oVersion);
                            oDialog.setModel(oVersionData, "versionInfo");
                        });
                    });                    
					// forward compact/cozy style into dialog
					syncStyleClass(oView.getController().getOwnerComponent().getContentDensityClass(), oView, oDialog);
					oDialog.open();
				});
			} else {
				oView.byId("VersionDialog").open();
			}
		}

	});

});