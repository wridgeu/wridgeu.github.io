import Page from "sap/m/Page";
import Component from "../Component";
import {
	getSelectedContent,
	getWikiIndex,
	getContentEditLink
} from "../util/githubService";
import { markdownService } from "../util/markdownService";
import BaseController from "./Base.controller";
import List from "sap/m/List";
import ActionListItem from "sap/m/ActionListItem";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResponsiveSplitter from "sap/ui/layout/ResponsiveSplitter";
import Device from "sap/ui/Device";

/**
 * @namespace sapmarco.projectpages.controller
 */
export default class WikiController extends BaseController {
	private _wikiContentModel: JSONModel;

	public onInit(): void {
		this.getView().addStyleClass(
			(this.getOwnerComponent() as Component).getContentDensityClass()
		);

		this._wikiContentModel = new JSONModel({
			markdown: "",
			title: "",
			edit: ""
		});

		this.getView().setModel(this._wikiContentModel, "convertedmarkdown");

		this.getRouter()
			.getRoute("RouteWiki")
			.attachMatched(this._onRouteMatched.bind(this), this);
	}

	/**
	 * Event-handler for theme toggle
	 */
	public onThemeSwap(): void {
		this.toggleTheme();
	}

	/**
	 * Event-handler for route matched
	 */
	private async _onRouteMatched(): Promise<void> {
		await this._initializeSidebar();
	}

	/**
	 * Initialization of sidebar
	 */
	private async _initializeSidebar(): Promise<void> {
		//get sidebar from actual github-wiki
		const wikiIndex = await getWikiIndex();
		//parse markdown to html
		const parsedMarkdown = markdownService.parse(wikiIndex);
		const matches = [...parsedMarkdown.matchAll(/\wiki\/(.*?)\"/g)];
		matches.forEach(element => {
			(this.byId("sidebar") as List).addItem(
				new ActionListItem({
					text: `${element[1]}`,
					press: this.onSidebarSelection.bind(
						this,
						element[1],
						this._wikiContentModel,
						Device.system.phone
					)
				})
			);
		});
	}

	/**
	 * @param  {string} sMarkdownFileName name of markdown file
	 */
	private onSidebarSelection(
		sMarkdownFileName: string,
		jsonModel: JSONModel,
		isOpenedOnPhone: boolean
	): void {
		// fix eslint issue in press event handler of ActionListItem:
		// see: https://stackoverflow.com/a/63488201
		// also: https://typescript-eslint.io/rules/no-floating-promises/
		void (async () => {
			//get markdown page and encode - to %20
			const markdownPage = await getSelectedContent(sMarkdownFileName);
			const editLink = getContentEditLink(sMarkdownFileName);

			jsonModel.setData({
				markdown: `<div class="container">${markdownService.parse(
					markdownPage
				)}</div>`,
				title: sMarkdownFileName,
				edit: editLink
			});

			//improve UX by always starting at the top when opening up new content & jumping to new pane
			if (isOpenedOnPhone)
				setTimeout(() => {
					(this.byId("responsiveSplitter") as ResponsiveSplitter)._activatePage(
						1
					);
				}, 0);
			if (this.byId("markdownSection"))
				(this.byId("markdownSection") as Page).scrollTo(0, 0);
		})();
	}
}
