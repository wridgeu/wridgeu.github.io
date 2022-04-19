/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/preprocessors/RegistrationDelegator","sap/ui/fl/Utils","sap/ui/fl/Layer","sap/ui/core/library","sap/m/library"],function(e,i,r){"use strict";var a=sap.ui.getCore().initLibrary({name:"sap.ui.fl",version:"1.101.0",controls:["sap.ui.fl.variants.VariantManagement","sap.ui.fl.util.IFrame"],dependencies:["sap.ui.core","sap.m"],designtime:"sap/ui/fl/designtime/library.designtime",extensions:{flChangeHandlers:{"sap.ui.fl.util.IFrame":"sap/ui/fl/util/IFrame"},"sap.ui.support":{diagnosticPlugins:["sap/ui/fl/support/Flexibility"],publicRules:true}}});a.Scenario={AppVariant:"APP_VARIANT",VersionedAppVariant:"VERSIONED_APP_VARIANT",AdaptationProject:"ADAPTATION_PROJECT",FioriElementsFromScratch:"FE_FROM_SCRATCH",UiAdaptation:"UI_ADAPTATION"};a.Versions={Original:"-1",Draft:"0",UrlParameter:"sap-ui-fl-version"};a.condenser={Classification:{LastOneWins:"lastOneWins",Reverse:"reverse",Move:"move",Create:"create",Destroy:"destroy"}};e.registerAll();function s(){var e=i.getUshellContainer();if(e){return e.getLogonSystem().isTrial()}return false}if(s()){sap.ui.getCore().getConfiguration().setFlexibilityServices([{connector:"LrepConnector",url:"/sap/bc/lrep",layers:[]},{connector:"LocalStorageConnector",layers:[r.CUSTOMER,r.PUBLIC,r.USER]}])}return a});