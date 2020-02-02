sap.ui.define([
	"sap/ui/test/Opa5",
	"sapmarco/projectpages/test/integration/arrangements/Startup",
	"sapmarco/projectpages/test/integration/BasicJourney"
], function(Opa5, Startup) {
	"use strict";

	Opa5.extendConfig({
		arrangements: new Startup(),
		pollingInterval: 1
	});

});
