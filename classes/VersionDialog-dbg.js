sap.ui.define(["sap/ui/core/Fragment", "sap/ui/core/syncStyleClass", "sap/ui/model/json/JSONModel", "sap/ui/base/Object"], function (Fragment, syncStyleClass, JSONModel, Object) {
  /**
   * @namespace sapmarco.projectpages.classes
   */
  const VersionDialog = Object.extend("sapmarco.projectpages.classes.VersionDialog", {
    constructor: function _constructor(oView) {
      Object.prototype.constructor.call(this);
      this._view = oView;
    },
    open: function _open() {
      try {
        const _this = this;
        const _temp = function () {
          if (!_this._view.byId("VersionDialog")) {
            // load asynchronous XML fragment
            return Promise.resolve(Fragment.load({
              id: _this._view.getId(),
              //prefix to actual given id from within fragment
              name: "sapmarco.projectpages.view.popup.VersionDialog",
              controller: _this
            })).then(function (_Fragment$load) {
              const fragment = _Fragment$load;
              _this._view.addDependent(fragment);
              sap.ui.require(["sap/ui/VersionInfo"], function (oVersInfo) {
                try {
                  return Promise.resolve(oVersInfo.load( /* no args */).then(oVersion => {
                    fragment.setModel(new JSONModel(oVersion, true), "versionInfo");
                  }));
                } catch (e) {
                  return Promise.reject(e);
                }
              });
              syncStyleClass(_this._view.getController().getOwnerComponent().getContentDensityClass(), _this._view, fragment);
              return Promise.resolve(fragment.open()).then(function () {});
            });
          } else {
            return Promise.resolve(_this._view.byId("VersionDialog").open()).then(function () {});
          }
        }();
        // create dialog lazily
        return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
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