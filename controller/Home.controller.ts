import Component from "../Component";
import BaseController from "./Base.controller";

/**
 * @namespace sapmarco.projectpages.controller
 */
export default class HomeController extends BaseController {
	private _ownerComponent: Component;

	public onInit(): void {
		this._ownerComponent = this.getOwnerComponent() as Component;
		this.getView().addStyleClass(this._ownerComponent.getContentDensityClass());
	}

	public async onUI5IconPress(): Promise<void> {
		await this.openVersionDialog(this.getView());
	}

	public onWiki(): void {
		this.navTo("RouteWiki");
	}

	public onUI5con(): void {
		this.navTo("RouteUI5Con");
	}
}
