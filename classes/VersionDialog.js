sap.ui.define(["sap/ui/core/Fragment", "sap/ui/core/syncStyleClass", "sap/ui/model/json/JSONModel", "sap/ui/base/Object"], function (Fragment, syncStyleClass, JSONModel, Object) {
  /**
   * @namespace sapmarco.projectpages.classes
   */
  const VersionDialog = Object.extend("sapmarco.projectpages.classes.VersionDialog", {
    constructor: function _constructor(oView) {
      Object.prototype.constructor.call(this);
      this._view = oView;
    },
    open: async function _open() {
      // create dialog lazily
      if (!this._view.byId("VersionDialog")) {
        // load asynchronous XML fragment
        const fragment = await Fragment.load({
          id: this._view.getId(),
          //prefix to actual given id from within fragment
          name: "sapmarco.projectpages.view.popup.VersionDialog",
          controller: this
        });
        this._view.addDependent(fragment);
        sap.ui.require(["sap/ui/VersionInfo"], async function (oVersInfo) {
          return await oVersInfo.load( /* no args */).then(oVersion => {
            fragment.setModel(new JSONModel(oVersion, true), "versionInfo");
          });
        });
        syncStyleClass(this._view.getController().getOwnerComponent().getContentDensityClass(), this._view, fragment);
        await fragment.open();
      } else {
        await this._view.byId("VersionDialog").open();
      }
    },
    onCloseDialog: function _onCloseDialog(oEvt) {
      oEvt.getSource().getParent().close();
    },
    onExit: function _onExit() {
      delete this._view;
    }
  });
  return VersionDialog;
});