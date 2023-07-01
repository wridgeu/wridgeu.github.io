/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/DataType","sap/ui/Global","sap/ui/core/library","sap/m/library","sap/f/library","sap/ui/unified/library","sap/ui/layout/library"],function(t){"use strict";var e=sap.ui.getCore().initLibrary({name:"sap.ui.integration",version:"1.115.0",dependencies:["sap.ui.core","sap.f","sap.m","sap.ui.unified","sap.ui.layout"],types:["sap.ui.integration.CardActionType","sap.ui.integration.CardDataMode","sap.ui.integration.CardMenuAction","sap.ui.integration.CardDesign","sap.ui.integration.CardBlockingMessageType"],controls:["sap.ui.integration.widgets.Card","sap.ui.integration.cards.filters.FilterBar","sap.ui.integration.cards.Header","sap.ui.integration.cards.NumericHeader","sap.ui.integration.controls.ListContentItem","sap.ui.integration.controls.BlockingMessage"],elements:["sap.ui.integration.ActionDefinition","sap.ui.integration.Host","sap.ui.integration.Extension"],customElements:{card:"sap/ui/integration/customElements/CustomElementCard"}});e.CardActionType={Navigation:"Navigation",Submit:"Submit",Custom:"Custom",DateChange:"DateChange",MonthChange:"MonthChange",ShowCard:"ShowCard",HideCard:"HideCard"};e.CardDataMode={Active:"Active",Inactive:"Inactive",Auto:"Auto"};e.CardDesign={Solid:"Solid",Transparent:"Transparent"};e.CardActionArea={None:"None",Content:"Content",ContentItem:"ContentItem",ActionsStrip:"ActionsStrip",ContentItemDetail:"ContentItemDetail",Header:"Header"};e.CardBlockingMessageType={Error:"Error",NoData:"NoData",Information:"Information"};e.CardArea={Header:"Header",Filters:"Filters",Content:"Content"};e.CardPreviewMode={Off:"Off",MockData:"MockData",Abstract:"Abstract"};e.AttributesLayoutType={OneColumn:"OneColumn",TwoColumns:"TwoColumns"};e.CardMenuAction=t.createType("sap.ui.integration.CardMenuAction",{isValid:function(t){var e=["type","text","icon","tooltip","buttonType","enabled","visible","action","parameters","target","url"];return Object.keys(t).every(function(t){return e.indexOf(t)!==-1})}},"object");return e});
//# sourceMappingURL=library.js.map