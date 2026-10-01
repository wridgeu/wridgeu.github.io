import Page from "sap/m/Page";
import Component from "../Component";
import { getSelectedContent, getWikiIndex, getContentEditLink } from "../util/githubService";
import { markdownService } from "../util/markdownService";
import BaseController from "./Base.controller";
import SplitContainer from "sap/m/SplitContainer";
import type { ListItemBase$PressEvent } from "sap/m/ListItemBase";
import JSONModel from "sap/ui/model/json/JSONModel";
import Device from "sap/ui/Device";
import type { Route$MatchedEvent } from "sap/ui/core/routing/Route";
import type ResourceModel from "sap/ui/model/resource/ResourceModel";

/**
 * @namespace sapmarco.projectpages.controller
 */
export default class WikiController extends BaseController {
	private _wikiContentModel: JSONModel;
	private _viewStateModel: JSONModel;
	private _selectionToken = 0;
	private _page: string | undefined;

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
	 * Event-handler for route matched; `#/wiki/<page>` opens that page
	 */
	private async _onRouteMatched(event: Route$MatchedEvent): Promise<void> {
		this._page = (event.getParameter("arguments") as { page?: string }).page;
		// the sidebar is the route table: a deep link waits for it, and fails with it
		if (!this._viewStateModel.getProperty("/pages").length) {
			await this._initializeSidebar();
		}
		if (this._page) {
			await this._showPage(this._page);
		}
	}

	/**
	 * Initialization of sidebar
	 */
	private async _initializeSidebar(): Promise<void> {
		this._viewStateModel.setProperty("/busy", true);
		try {
			const wikiIndex = await getWikiIndex();
			// read the rendered links, which markdownService already turned into wiki routes
			const sidebar = new DOMParser().parseFromString(markdownService.parse(wikiIndex), "text/html");
			const pages = [...sidebar.querySelectorAll<HTMLAnchorElement>('a[href^="#/wiki/"]')].map((link) => ({
				name: decodeURIComponent(link.getAttribute("href").slice("#/wiki/".length)),
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
		if (name === this._page) {
			// unchanged hash fires no route match, e.g. re-tapping on phone after stepping back
			void this._showPage(name);
			return;
		}
		// replace, so the back button leaves the wiki instead of walking every page read
		this.navTo("RouteWiki", { page: name }, undefined, true);
	}

	private async _showPage(sMarkdownFileName: string): Promise<void> {
		// a later tap supersedes this one; see the token checks below
		const token = ++this._selectionToken;
		this._viewStateModel.setProperty("/busy", true);
		try {
			const pages = this._viewStateModel.getProperty("/pages") as { name: string }[];
			let markdown: string | undefined;
			let edit = "";
			try {
				// only pages the sidebar lists are routable; anything else never reaches GitHub
				const content = pages.some((p) => p.name === sMarkdownFileName)
					? await getSelectedContent(sMarkdownFileName)
					: undefined;
				if (content !== undefined) {
					markdown = markdownService.parse(content);
					edit = getContentEditLink(sMarkdownFileName);
				}
			} catch {
				// the i18n model loads async, so the bundle may still be a promise
				const bundle = await (this.getOwnerComponent().getModel("i18n") as ResourceModel).getResourceBundle();
				markdown = `<p>${bundle.getText("wikiPageLoadError")}</p>`;
			}

			if (token !== this._selectionToken) {
				return;
			}

			if (markdown === undefined) {
				// keep the hash, so the URL still shows what was asked for
				void this.getRouter().getTargets().display("TargetNotFound");
				return;
			}

			this._wikiContentModel.setData({ markdown, title: sMarkdownFileName, edit });

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
