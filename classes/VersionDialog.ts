import Dialog from "sap/m/Dialog";
import Event from "sap/ui/base/Event";
import Control from "sap/ui/core/Control";
import Fragment from "sap/ui/core/Fragment";
import View from "sap/ui/core/mvc/View";
import syncStyleClass from "sap/ui/core/syncStyleClass";
import JSONModel from "sap/ui/model/json/JSONModel";
import VersionInfo from "sap/ui/VersionInfo";
import Component from "../Component";
import Object from "sap/ui/base/Object";

/**
 * @namespace sapmarco.projectpages.classes
 */
export default class VersionDialog extends Object {
	private _view: View;

	constructor(oView: View) {
		super();
		this._view = oView;
	}

	public async open(): Promise<void> {
		// create dialog lazily
		if (!this._view.byId("VersionDialog")) {
			// load asynchronous XML fragment
			const fragment = <Control>await Fragment.load({
				id: this._view.getId(), //prefix to actual given id from within fragment
				name: "sapmarco.projectpages.view.popup.VersionDialog",
				controller: this,
			});

			this._view.addDependent(fragment);

			sap.ui.require(
				["sap/ui/VersionInfo"],
				async function (oVersInfo: VersionInfo) {
					return await oVersInfo.load(/* no args */).then((oVersion) => {
						fragment.setModel(new JSONModel(oVersion, true), "versionInfo");
					});
				}
			);
			syncStyleClass(
				(
					this._view.getController().getOwnerComponent() as Component
				).getContentDensityClass(),
				this._view,
				fragment
			);

			await (fragment as VersionDialog).open();
		} else {
			await (this._view.byId("VersionDialog") as VersionDialog).open();
		}
	}

	public onCloseDialog(oEvt: Event): void {
		((oEvt.getSource() as Control).getParent() as Dialog).close();
	}

	onExit() {
		delete this._view;
	}
}
