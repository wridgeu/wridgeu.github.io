import Page from "sap/m/Page";
import Component from "../Component";
import { WIKI_PAGE_URL, getSelectedContent, getWikiIndex, getContentEditLink } from "../util/githubService";
import { markdownService } from "../util/markdownService";
import BaseController from "./Base.controller";
import SplitContainer from "sap/m/SplitContainer";
import type { ListItemBase$PressEvent } from "sap/m/ListItemBase";
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

		this._viewStateModel = new JSONModel({ busy: false, pages: [] });
		this.getView().setModel(this._viewStateModel, "viewState");

		this.getRouter().getRoute("RouteWiki").attachMatched(this._onRouteMatched, this);
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
			const wikiIndex = await getWikiIndex();
			// read real links, so anchors, titles and autolinks need no special casing
			const sidebar = new DOMParser().parseFromString(markdownService.parse(wikiIndex), "text/html");
			const pages = [...sidebar.querySelectorAll<HTMLAnchorElement>(`a[href^="${WIKI_PAGE_URL}"]`)].map((link) => ({
				name: decodeURIComponent(link.href.slice(WIKI_PAGE_URL.length).split(/[#?]/)[0]),
			}));
			this._viewStateModel.setProperty("/pages", pages);
		} finally {
			this._viewStateModel.setProperty("/busy", false);
		}
	}

	/**
	 * Event-handler for sidebar item press
	 */
	public onSidebarSelection(event: ListItemBase$PressEvent): void {
		const name = event.getSource().getBindingContext("viewState").getProperty("name") as string;
		void this._showPage(name);
	}

	private async _showPage(sMarkdownFileName: string): Promise<void> {
		// a later tap supersedes this one; see the token checks below
		const token = ++this._selectionToken;
		this._viewStateModel.setProperty("/busy", true);
		try {
			const markdownPage = await getSelectedContent(sMarkdownFileName);
			const parsedMarkdown = markdownService.parse(markdownPage);

			if (token !== this._selectionToken) {
				return;
			}

			this._wikiContentModel.setData({
				markdown: parsedMarkdown,
				title: sMarkdownFileName,
				edit: getContentEditLink(sMarkdownFileName),
			});

			//improve UX by always starting at the top when opening up new content & jumping to new pane
			const markdownSection = this.byId("markdownSection") as Page;
			if (Device.system.phone) {
				(this.byId("wikiSplit") as SplitContainer).toDetail(markdownSection.getId(), "show");
			}
			markdownSection.scrollTo(0, 0);
		} finally {
			if (token === this._selectionToken) {
				this._viewStateModel.setProperty("/busy", false);
			}
		}
	}
}
