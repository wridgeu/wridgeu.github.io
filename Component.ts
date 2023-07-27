import UIComponent from "sap/ui/core/UIComponent";
import Device from "sap/ui/Device";
import deviceModelCreator from "./model/models";

// import additional dependencies to bundle them properly
import "sap/ui/core/ComponentSupport";
import "sap/ui/core/date/Gregorian";

/**
 * Configures the UI5 Module Loader to handle marked
 * and map marked to the default namespace.
 *
 * https://openui5.hana.ondemand.com/#/api/sap.ui.loader/methods/sap.ui.loader.config
 */
sap.ui.loader.config({
	map: {
		"*": {
			marked:
				"sapmarco/projectpages/resources/thirdparty/marked/lib/marked.umd",
		},
	},
	async: true,
	shim: {
		"sapmarco/projectpages/resources/thirdparty/marked/lib/marked.umd": {
			amd: true,
			deps: [],
			exports: "marked",
		},
	},
});

/**
 * @namespace sapmarco.projectpages
 */
export default class Component extends UIComponent {
	private _contentDensityClass: string;

	public static metadata = {
		// marker to identify async content creation
		// makes async: true for rootView obsolete!
		interfaces: ["sap.ui.core.IAsyncContentCreation"],
		manifest: "json",
	};

	public init(): void {
		// call the base component's init function
		super.init();

		// enable routing
		this.getRouter().initialize();

		// set the device model
		this.setModel(deviceModelCreator(), "device");
	}

	/**
	 * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
	 * design mode class should be set, which influences the size appearance of some controls.
	 *
	 * @public
	 * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
	 */
	public getContentDensityClass(): string {
		if (this._contentDensityClass === undefined) {
			// check whether FLP has already set the content density class; do nothing in this case
			if (
				document.body.classList.contains("sapUiSizeCozy") ||
				document.body.classList.contains("sapUiSizeCompact")
			) {
				this._contentDensityClass = "";
			} else if (!Device.support.touch) {
				// apply "compact" mode if touch is not supported
				this._contentDensityClass = "sapUiSizeCompact";
			} else {
				// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
				this._contentDensityClass = "sapUiSizeCozy";
			}
		}
		return this._contentDensityClass;
	}
}
