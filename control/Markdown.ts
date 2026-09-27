import Control from "sap/ui/core/Control";
import RenderManager from "sap/ui/core/RenderManager";
import type { MetadataOptions } from "sap/ui/base/ManagedObject";
import Button from "sap/m/Button";
import { ButtonType } from "sap/m/library";
import includeStylesheet from "sap/ui/dom/includeStylesheet";
import DOMPurify from "dompurify";

// The id dedupes if the module is loaded more than once.
includeStylesheet(
	sap.ui.require.toUrl("sapmarco/projectpages/control/Markdown.css"),
	"sapmarco-projectpages-control-Markdown",
);

/**
 * Renders pre-converted markdown HTML, sanitized with DOMPurify unless
 * {@link #getSanitize sanitize} is off, and adds a copy button to each `<pre>`.
 *
 * @namespace sapmarco.projectpages.control
 */
export default class Markdown extends Control {
	static readonly metadata: MetadataOptions = {
		properties: {
			content: { type: "string", defaultValue: "" },
			sanitize: { type: "boolean", defaultValue: true },
			copyCodeTooltip: { type: "string", defaultValue: "Copy to clipboard" },
			copyCodeCopiedText: { type: "string", defaultValue: "Copied!" },
		},
		aggregations: {
			// held here so the framework destroys them with the control
			_copyButtons: {
				type: "sap.m.Button",
				multiple: true,
				visibility: "hidden",
			},
		},
	};

	declare getContent: () => string;
	declare setContent: (content: string) => this;
	declare getSanitize: () => boolean;
	declare setSanitize: (sanitize: boolean) => this;
	declare getCopyCodeTooltip: () => string;
	declare setCopyCodeTooltip: (copyCodeTooltip: string) => this;
	declare getCopyCodeCopiedText: () => string;
	declare setCopyCodeCopiedText: (copyCodeCopiedText: string) => this;

	private _revertTimers = new Map<Button, ReturnType<typeof setTimeout>>();

	static renderer = {
		apiVersion: 4,
		render(rm: RenderManager, control: Markdown): void {
			const content = control.getContent();
			rm.openStart("div", control);
			rm.class("wikiMarkdown");
			rm.openEnd();
			rm.unsafeHtml(
				control.getSanitize()
					? // keep the service's new-tab links; they carry rel="noopener noreferrer"
						DOMPurify.sanitize(content, { ADD_ATTR: ["target"] })
					: content,
			);
			rm.close("div");
		},
	};

	onBeforeRendering(): void {
		this._clearRevertTimers();
		this.destroyAggregation("_copyButtons", true);
	}

	onAfterRendering(): void {
		const dom = this.getDomRef();
		// Clipboard API is only available in secure contexts.
		if (!dom || !navigator.clipboard?.writeText) {
			return;
		}

		const copyLabel = this.getCopyCodeTooltip();
		const copiedLabel = this.getCopyCodeCopiedText();

		// Not placeAt: that creates a UIArea per button and leaks one per re-render.
		// @ts-expect-error constructor is typed protected, but it replaces the
		// deprecated Core#createRenderManager.
		const rm = new RenderManager();
		dom.querySelectorAll("pre").forEach((pre, index) => {
			const wrapper = document.createElement("div");
			wrapper.className = "wikiCodeBlock";
			pre.parentNode.insertBefore(wrapper, pre);
			wrapper.appendChild(pre);

			const button = new Button(`${this.getId()}-copy-${index}`, {
				icon: "sap-icon://copy",
				type: ButtonType.Transparent,
				tooltip: copyLabel,
			});
			button.addStyleClass("wikiCopyButton");
			button.attachPress(() => this._copyCode(pre, button, copyLabel, copiedLabel));
			this.addAggregation("_copyButtons", button, true);
			rm.render(button, wrapper);
		});
		rm.destroy();
	}

	exit(): void {
		this._clearRevertTimers();
	}

	private _copyCode(pre: HTMLElement, button: Button, copyLabel: string, copiedLabel: string): void {
		// drop the trailing newline marked appends to every code block
		const code = (pre.querySelector("code")?.textContent ?? pre.textContent ?? "").replace(/\n$/, "");
		void navigator.clipboard.writeText(code).then(
			() => {
				// a re-render may have destroyed the button meanwhile
				if (button.isDestroyed()) {
					return;
				}
				button.setType(ButtonType.Accept);
				button.setIcon("sap-icon://accept");
				button.setTooltip(copiedLabel);
				const pending = this._revertTimers.get(button);
				if (pending) {
					clearTimeout(pending);
				}
				this._revertTimers.set(
					button,
					setTimeout(() => {
						button.setType(ButtonType.Transparent);
						button.setIcon("sap-icon://copy");
						button.setTooltip(copyLabel);
						this._revertTimers.delete(button);
					}, 1500),
				);
			},
			() => {
				/* permission denied: nothing to confirm */
			},
		);
	}

	private _clearRevertTimers(): void {
		this._revertTimers.forEach((timer) => clearTimeout(timer));
		this._revertTimers.clear();
	}
}
