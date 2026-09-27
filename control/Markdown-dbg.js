sap.ui.define(["sap/ui/core/Control", "sap/ui/core/RenderManager", "sap/m/Button", "sap/m/library", "sap/ui/dom/includeStylesheet", "sapmarco/projectpages/thirdparty/dompurify"], function (Control, RenderManager, Button, sap_m_library, includeStylesheet, __DOMPurify) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const ButtonType = sap_m_library["ButtonType"];
  const DOMPurify = _interopRequireDefault(__DOMPurify); // The id dedupes if the module is loaded more than once.
  includeStylesheet(sap.ui.require.toUrl("sapmarco/projectpages/control/Markdown.css"), "sapmarco-projectpages-control-Markdown");

  /**
   * Renders pre-converted markdown HTML, sanitized with DOMPurify unless
   * {@link #getSanitize sanitize} is off, and adds a copy button to each `<pre>`.
   *
   * @namespace sapmarco.projectpages.control
   */
  const Markdown = Control.extend("sapmarco.projectpages.control.Markdown", {
    constructor: function constructor() {
      Control.prototype.constructor.apply(this, arguments);
      this._revertTimers = new Map();
    },
    renderer: {
      apiVersion: 4,
      render(rm, control) {
        const content = control.getContent();
        rm.openStart("div", control);
        rm.class("wikiMarkdown");
        rm.openEnd();
        rm.unsafeHtml(control.getSanitize() ?
        // keep the service's new-tab links; they carry rel="noopener noreferrer"
        DOMPurify.sanitize(content, {
          ADD_ATTR: ["target"]
        }) : content);
        rm.close("div");
      }
    },
    metadata: {
      properties: {
        content: {
          type: "string",
          defaultValue: ""
        },
        sanitize: {
          type: "boolean",
          defaultValue: true
        },
        copyCodeTooltip: {
          type: "string",
          defaultValue: "Copy to clipboard"
        },
        copyCodeCopiedText: {
          type: "string",
          defaultValue: "Copied!"
        }
      },
      aggregations: {
        // held here so the framework destroys them with the control
        _copyButtons: {
          type: "sap.m.Button",
          multiple: true,
          visibility: "hidden"
        }
      }
    },
    onBeforeRendering: function _onBeforeRendering() {
      this._clearRevertTimers();
      this.destroyAggregation("_copyButtons", true);
    },
    onAfterRendering: function _onAfterRendering() {
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
          tooltip: copyLabel
        });
        button.addStyleClass("wikiCopyButton");
        button.attachPress(() => this._copyCode(pre, button, copyLabel, copiedLabel));
        this.addAggregation("_copyButtons", button, true);
        rm.render(button, wrapper);
      });
      rm.destroy();
    },
    exit: function _exit() {
      this._clearRevertTimers();
    },
    _copyCode: function _copyCode(pre, button, copyLabel, copiedLabel) {
      // drop the trailing newline marked appends to every code block
      const code = (pre.querySelector("code")?.textContent ?? pre.textContent ?? "").replace(/\n$/, "");
      void navigator.clipboard.writeText(code).then(() => {
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
        this._revertTimers.set(button, setTimeout(() => {
          button.setType(ButtonType.Transparent);
          button.setIcon("sap-icon://copy");
          button.setTooltip(copyLabel);
          this._revertTimers.delete(button);
        }, 1500));
      }, () => {
        /* permission denied: nothing to confirm */
      });
    },
    _clearRevertTimers: function _clearRevertTimers() {
      this._revertTimers.forEach(timer => clearTimeout(timer));
      this._revertTimers.clear();
    }
  });
  return Markdown;
});
//# sourceMappingURL=Markdown-dbg.js.map
