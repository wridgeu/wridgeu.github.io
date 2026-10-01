sap.ui.define(["sap/ui/core/Control", "sap/m/Button", "sap/m/library", "sap/ui/dom/includeStylesheet", "sapmarco/projectpages/thirdparty/dompurify"], function (Control, Button, sap_m_library, includeStylesheet, __DOMPurify) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const ButtonType = sap_m_library["ButtonType"];
  const DOMPurify = _interopRequireDefault(__DOMPurify); // The id dedupes if the module is loaded more than once.
  includeStylesheet(sap.ui.require.toUrl("sapmarco/projectpages/control/Markdown.css"), "sapmarco-projectpages-control-Markdown");

  /**
   * Renders pre-converted markdown HTML, sanitized with DOMPurify, and renders
   * a copy button next to each `<pre>`.
   *
   * @namespace sapmarco.projectpages.control
   */
  const Markdown = Control.extend("sapmarco.projectpages.control.Markdown", {
    renderer: {
      apiVersion: 4,
      render(rm, control) {
        // absent when the clipboard is unavailable
        const buttons = control.getAggregation("_copyButtons") ?? [];
        let next = 0;
        // Plain HTML goes out as is; only the path down to each <pre> is written
        // element by element, so the copy button can sit next to it.
        const renderNode = node => {
          if (node.nodeName === "PRE") {
            rm.openStart("div").class("wikiCodeBlock").openEnd();
            rm.unsafeHtml(node.outerHTML);
            if (buttons[next]) {
              rm.renderControl(buttons[next++]);
            }
            rm.close("div");
          } else if (node instanceof Element && node.querySelector("pre")) {
            rm.openStart(node.localName);
            for (const {
              name,
              value
            } of node.attributes) {
              // rm.attr rejects names like xml:lang, which DOMPurify allows
              if (name !== "class" && name !== "style" && /^[a-z_][\w-]*$/.test(name)) {
                rm.attr(name, value);
              }
            }
            node.classList.forEach(name => rm.class(name));
            const style = node.style;
            for (let i = 0; i < style.length; i++) {
              rm.style(style[i], style.getPropertyValue(style[i]));
            }
            rm.openEnd();
            node.childNodes.forEach(renderNode);
            rm.close(node.localName);
          } else if (node instanceof Element) {
            rm.unsafeHtml(node.outerHTML);
          } else if (node.nodeType === Node.TEXT_NODE) {
            rm.text(node.textContent);
          }
        };
        rm.openStart("div", control);
        rm.class("wikiMarkdown");
        rm.openEnd();
        control._fragment.childNodes.forEach(renderNode);
        rm.close("div");
      }
    },
    metadata: {
      properties: {
        content: {
          type: "string",
          defaultValue: ""
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
    constructor: function _constructor(id, settings) {
      Control.prototype.constructor.call(this, id, settings);
      this._revertTimers = new Map();
    },
    onBeforeRendering: function _onBeforeRendering() {
      this._clearRevertTimers();
      this.destroyAggregation("_copyButtons", true);

      // keep the service's new-tab links; they carry rel="noopener noreferrer"
      this._fragment = DOMPurify.sanitize(this.getContent(), {
        ADD_ATTR: ["target"],
        RETURN_DOM_FRAGMENT: true
      });

      // Clipboard API is only available in secure contexts.
      if (!navigator.clipboard?.writeText) {
        return;
      }
      const copyLabel = this.getCopyCodeTooltip();
      const copiedLabel = this.getCopyCodeCopiedText();
      // a nested <pre> goes out inside its parent's outerHTML, so it gets no button
      this._fragment.querySelectorAll("pre:not(pre pre)").forEach((pre, index) => {
        // drop the trailing newline marked appends to every code block
        const code = (pre.querySelector("code") ?? pre).textContent.replace(/\n$/, "");
        const button = new Button(`${this.getId()}-copy-${index}`, {
          icon: "sap-icon://copy",
          type: ButtonType.Transparent,
          tooltip: copyLabel
        });
        button.addStyleClass("wikiCopyButton");
        button.attachPress(() => this._copyCode(code, button, copyLabel, copiedLabel));
        this.addAggregation("_copyButtons", button, true);
      });
    },
    exit: function _exit() {
      this._clearRevertTimers();
    },
    _copyCode: function _copyCode(code, button, copyLabel, copiedLabel) {
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
