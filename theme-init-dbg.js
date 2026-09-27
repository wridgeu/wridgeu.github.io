window["sap-ui-config"] = {};
window["sap-ui-config"]["theme"] = (function () {
	try {
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "sap_horizon_dark" : "sap_horizon";
	} catch {
		console.warn("window.matchMedia not supported - keep default theme");
		return "sap_horizon";
	}
})();
