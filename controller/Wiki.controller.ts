import Page from "sap/m/Page";
import Component from "../Component";
import { getSelectedContent, getWikiIndex, getContentEditLink } from "../util/githubService";
import { markdownService } from "../util/markdownService";
import BaseController from "./Base.controller";
import List from "sap/m/List";
import SplitContainer from "sap/m/SplitContainer";
import ActionListItem from "sap/m/ActionListItem";
import JSONModel from "sap/ui/model/json/JSONModel";
import Device from "sap/ui/Device";

/**
 * @namespace sapmarco.projectpages.controller
 */
export default class WikiController extends BaseController {
	private _wikiContentModel: JSONModel;
	private _viewStateModel: JSONModel;
	private _selectionToken = 0;

	public onInit(): void {
		this.getView().addStyleClass((this.getOwnerComponent() as Component).getContentDensityClass());

		this._wikiContentModel = new JSONModel({
			markdown: "",
			title: "",
			edit: "",
		});

		this.getView().setModel(this._wikiContentModel, "convertedmarkdown");

		this._viewStateModel = new JSONModel({ busy: false });
		this.getView().setModel(this._viewStateModel, "viewState");

		this.getRouter().getRoute("RouteWiki").attachMatched(this._onRouteMatched.bind(this), this);
	}

	/**
	 * Event-handler for theme toggle
	 */
	public onThemeSwap(): void {
		this.toggleTheme();
	}

	/**
	 * On phone, step back from the content to the sidebar instead of leaving the wiki.
	 */
	public onNavBack(): void {
		const split = this.byId("wikiSplit") as SplitContainer;
		if (!split.isMasterShown()) {
			split.toMaster((this.byId("sidebarPage") as Page).getId(), "show");
			return;
		}
		super.onNavBack();
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
		this._viewStateModel.setProperty("/busy", true);
		try {
			//get sidebar from actual github-wiki
			const wikiIndex = await getWikiIndex();
			//parse markdown to html
			const parsedMarkdown = markdownService.parse(wikiIndex);
			const matches = [...parsedMarkdown.matchAll(/\wiki\/(.*?)"/g)];
			// the view is cached, so re-entering the route would append duplicates
			(this.byId("sidebar") as List).destroyItems();
			matches.forEach((element) => {
				(this.byId("sidebar") as List).addItem(
					new ActionListItem({
						text: `${element[1]}`,
						press: this.onSidebarSelection.bind(this, element[1], this._wikiContentModel, Device.system.phone),
					}),
				);
			});
		} finally {
			this._viewStateModel.setProperty("/busy", false);
		}
	}

	/**
	 * @param  {string} sMarkdownFileName name of markdown file
	 */
	private onSidebarSelection(sMarkdownFileName: string, jsonModel: JSONModel, isOpenedOnPhone: boolean): void {
		// a later tap supersedes this one; see the token checks below
		const token = ++this._selectionToken;
		// fix eslint issue in press event handler of ActionListItem:
		// see: https://stackoverflow.com/a/63488201
		// also: https://typescript-eslint.io/rules/no-floating-promises/
		void (async () => {
			this._viewStateModel.setProperty("/busy", true);
			try {
				//get markdown page and encode - to %20
				const markdownPage = await getSelectedContent(sMarkdownFileName);
				const editLink = getContentEditLink(sMarkdownFileName);
				const parsedMarkdown = markdownService.parse(markdownPage);

				if (token !== this._selectionToken) {
					return;
				}

				jsonModel.setData({
					markdown: `<div class="container">${parsedMarkdown}</div>`,
					title: sMarkdownFileName,
					edit: editLink,
				});

				//improve UX by always starting at the top when opening up new content & jumping to new pane
				if (isOpenedOnPhone)
					(this.byId("wikiSplit") as SplitContainer).toDetail((this.byId("markdownSection") as Page).getId(), "show");
				if (this.byId("markdownSection")) (this.byId("markdownSection") as Page).scrollTo(0, 0);
			} finally {
				if (token === this._selectionToken) {
					this._viewStateModel.setProperty("/busy", false);
				}
			}
		})();
	}
}
