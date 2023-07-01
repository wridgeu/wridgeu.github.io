sap.ui.define(["sap/ui/Device"], function(Device) {

	"use strict";
	return {
		name: "TestSuite for Topic: Theming",
		defaults: {
			loader: {
				paths: {
					"sap/ui/testlib": "test-resources/sap/ui/core/qunit/testdata/uilib/",
					"testlibs/themeParameters": "test-resources/sap/ui/core/qunit/testdata/libraries/themeParameters",
					"testdata/core": "test-resources/sap/ui/core/qunit/"
				}
			},
			module: "test-resources/sap/ui/core/qunit/{name}.qunit"
		},
		tests: {
			CustomThemeFallback: {
				title: "sap.ui.core: Custom Theme Fallback",
				ui5: {
					theme: "customcss",
					themeRoots: {
						"customcss": {
							"sap.ui.core": "test-resources/sap/ui/core/qunit/testdata/customcss/"
						},
						"legacy": {
							"sap.ui.core": "test-resources/sap/ui/core/qunit/testdata/customcss/"
						}
					}
				}
			},
			ThemeManager: {
				title: "sap.ui.core.theming.ThemeManager",
				ui5: {
					libs: "sap.ui.core,sap.ui.testlib",
					themeRoots: {
						"legacy": {
							"sap.ui.core": "test-resources/sap/ui/core/qunit/testdata/customcss/"
						},
						"customcss": {
							"sap.ui.core": "test-resources/sap/ui/core/qunit/testdata/customcss/"
						},
						"customTheme": {
							"sap.ui.core": "test-resources/sap/ui/core/qunit/testdata/libraries/customCss/"
						}
					}
				},
				loader: {
					paths: {
							"sap/ui/customthemefallback/testlib" : "test-resources/sap/ui/core/qunit/testdata/uilib-custom-theme-fallback/",
							"sap/ui/failingcssimport/testlib" : "test-resources/sap/ui/core/qunit/testdata/uilib-failing-css-import/",
							"testlibs/customCss/lib1" : "test-resources/sap/ui/core/qunit/testdata/libraries/customCss/lib1/"
					}
				}
			},
			ThemeParameters: {
				title: "sap.ui.core.theming.Parameters",
				ui5: {
					libs: "sap.ui.legacy.testlib",
					theme: "sap_hcb"
				},
				qunit: {
					reorder: false
				},
				loader: {
					paths: {
						"sap/ui/legacy/testlib": "test-resources/sap/ui/core/qunit/testdata/legacy-uilib_legacyAPIs/",
						"testlibs/themeParameters": "test-resources/sap/ui/core/qunit/testdata/libraries/themeParameters"
					}
				}
			},
			"ThemeHelper": {
				title: "sap.ui.core.theming.ThemeHelper",
				ui5: {
					theme: "sap_hcb"
				},
				qunit: {
					reorder: false
				},
				loader: {
					paths: {
						"testlibs/themeParameters": "test-resources/sap/ui/core/qunit/testdata/libraries/themeParameters"
					}
				}
			}
		}
	};
});
