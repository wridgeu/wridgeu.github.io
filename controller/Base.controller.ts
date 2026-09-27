import Controller from "sap/ui/core/mvc/Controller";
import View from "sap/ui/core/mvc/View";
import History from "sap/ui/core/routing/History";
import Router, { ComponentTargetParameters } from "sap/ui/core/routing/Router";
import Theming from "sap/ui/core/Theming";
import UIComponent from "sap/ui/core/UIComponent";
import VersionDialog from "../classes/VersionDialog";

/**
 * @namespace sapmarco.projectpages.controller
 */
export default class BaseController extends Controller {
	private _sLightTheme = "sap_horizon";
	private _sDarkTheme = "sap_horizon_dark";

	/**
	 * @returns {void}
	 */
	public toggleTheme(): void {
		if (Theming.getTheme() === this._sLightTheme) {
			Theming.setTheme(this._sDarkTheme);
		} else {
			Theming.setTheme(this._sLightTheme);
		}
	}

	/**
	 * @param  {string} psTarget Target
	 * @param  {object} pmParameters Parameters
	 * @param  {boolean} pbReplace Replace routing hash?
	 * @returns {void}
	 */
	public navTo(
		psTarget: string,
		pmParameters?: object,
		targetInfo?: Record<string, ComponentTargetParameters>,
		pbReplace?: boolean,
	): void {
		this.getRouter().navTo(psTarget, pmParameters, targetInfo, pbReplace);
	}

	/**
	 * @returns {sap.ui.core.routing.Router} UIComponent router via context
	 */
	public getRouter(): Router {
		return UIComponent.getRouterFor(this);
	}

	/**
	 * @param {typeof sap.ui.core.mvc.View} view
	 * @returns {Promise<void>}
	 */
	public async openVersionDialog(view: View): Promise<void> {
		await new VersionDialog(view).open();
	}

	/**
	 * Event-handler for backwards navigation
	 * @returns {void}
	 */
	public onNavBack(): void {
		const sPreviousHash = History.getInstance().getPreviousHash();

		if (sPreviousHash !== undefined) {
			window.history.back();
		} else {
			this.getRouter().navTo("RouteMain", {}, {}, true /*no history*/);
		}
	}
}
