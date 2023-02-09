/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/library","sap/ui/core/Control","sap/m/HBox","sap/m/Image","sap/m/ToggleButton","sap/ui/integration/widgets/Card","sap/ui/core/Core","sap/ui/dom/includeStylesheet","sap/ui/integration/util/CardMerger"],function(e,t,i,r,o,a,s,n,d){"use strict";var g=e.CardDataMode;var c=t.extend("sap.ui.integration.designtime.editor.CardPreview",{metadata:{library:"sap.ui.integration",properties:{settings:{type:"any"},card:{type:"object"}},aggregations:{cardPreview:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}}},renderer:{apiVersion:2,render:function(e,t){if(t._getCurrentMode()==="None"){e.openStart("div",t);e.openEnd();e.close("div");return}e.openStart("div",t);e.class("sapUiIntegrationDTPreview");if(l()){e.class("sapUiIntegrationDTPreviewDark")}if(t.getSettings().preview.position&&(t.getSettings().preview.position==="top"||t.getSettings().preview.position==="bottom")){var i=s.getConfiguration().getLanguage().replaceAll("_","-");if(i.startsWith("ar")||i.startsWith("he")){e.class("sapUiIntegrationDTPreviewMarginForAlignTopAndBottomSpec")}else{e.class("sapUiIntegrationDTPreviewMarginForAlignTopAndBottom")}}e.openEnd();e.openStart("div",t.getId()+"-before");e.attr("tabindex","-1");if(!t.getSettings().preview.interactive){e.class("before");e.style("z-index",t.getParent()._iZIndex+1)}e.openEnd();e.close("div");e.renderControl(t._getCardPreview());e.openStart("div",t.getId()+"-after");e.attr("tabindex","-1");e.openEnd();e.close("div");if(t._getModes().indexOf("Live")>-1&&t._getModes().indexOf("Abstract")>-1||t._getModes().indexOf("Mock")>-1&&t._getModes().indexOf("Abstract")>-1){e.renderControl(t._getModeToggleButton())}e.close("div")}}});c.prototype.init=function(){this._oResourceBundle=s.getLibraryResourceBundle("sap.ui.integration");s.attachThemeChanged(function(){if(this.getDomRef()){if(l()){this.getDomRef().classList.add("sapUiIntegrationDTPreviewDark")}else{this.getDomRef().classList.remove("sapUiIntegrationDTPreviewDark")}}else{this.update()}}.bind(this))};c.prototype.destroy=function(){if(this._oModeToggleButton){this._oModeToggleButton.destroy()}if(this._oCardPreview){this._oCardPreview.destroy()}if(this._oImagePlaceholder){this._oImagePlaceholder.destroy()}if(this._oCardPlaceholder){this._oCardPlaceholder.destroy()}t.prototype.destroy.apply(this,arguments)};c.prototype.onAfterRendering=function(){var e=this.getAggregation("cardPreview"),t=this._getModes();if((t.indexOf("Live")>-1||t.indexOf("Mock")>-1)&&e&&e.getDomRef()&&e.getDomRef().getElementsByClassName("sapVizFrame")){window.setTimeout(function(){try{var t=e.getDomRef().getElementsByClassName("sapVizFrame")[0].id;var i=s.byId(t);if(i.getVizProperties()&&i.getVizProperties().legendGroup.layout.position==="bottom"&&i.getVizProperties().legendGroup.layout.alignment==="center"){e.getDomRef().getElementsByClassName("v-m-legend")[0].transform.baseVal[0].matrix.e=110}}catch(e){}},500)}};c.prototype._getCardPreview=function(){var e=null;if(this._getCurrentMode()==="Abstract"){if(this.getSettings().preview.src){e=this._getImagePlaceholder()}else{e=this._getCardPlaceholderPreview()}}else if(this._getCurrentMode()==="Live"||this._getCurrentMode()==="Mock"){e=this._getCardRealPreview()}if(e){this.setAggregation("cardPreview",e);if(!this.getSettings().preview||this.getSettings().preview.scaled!==false){e.removeStyleClass("sapUiIntegrationDTPreviewScale");e.removeStyleClass("sapUiIntegrationDTPreviewScaleSpec");var t=s.getConfiguration().getLanguage().replaceAll("_","-");if(t.startsWith("ar")||t.startsWith("he")){e.addStyleClass("sapUiIntegrationDTPreviewScaleSpec")}else{e.addStyleClass("sapUiIntegrationDTPreviewScale")}}else{e.addStyleClass("sapUiIntegrationDTPreviewNoScale")}}return e};c.prototype._getCardPlaceholderPreview=function(){var e=this.getCard(),t;function i(t,i){return e.getManifestEntry(t)?i||"{bound}":null}var r=null;if(e.getManifestEntry("/sap.card/header")){var o=e.getManifestEntry("/sap.card/header/type");if(o&&o.toUpperCase()==="NUMERIC"){r={title:i("/sap.card/header/title"),type:"Numeric",subTitle:i("/sap.card/header/subTitle"),unitOfMeasurement:i("/sap.card/header/unitOfMeasurement"),mainIndicator:i("/sap.card/header/mainIndicator",{number:"{bound}",unit:"{bound}",trend:"{bound}",state:"{bound}"}),details:i("/sap.card/header/details"),sideIndicators:[i("/sap.card/header/sideIndicators/0",{title:"Deviation",number:"{bound}",unit:"{bound}"}),i("/sap.card/header/sideIndicators/1",{title:"Target",number:"{bound}",unit:"{bound}"})]}}else{r={title:i("/sap.card/header/title"),subTitle:i("/sap.card/header/subTitle"),status:i("/sap.card/header/status"),icon:i("/sap.card/header/icon",{src:"{bound}"})}}}var s=this.getParent().getCurrentSettings();t={"sap.app":{type:"card",id:e.getManifestEntry("/sap.app/id")+".abstractPreview"},"sap.card":{type:e.getManifestEntry("/sap.card/type")==="List"?"List":"Component",header:r,content:{maxItems:Math.min(s["/sap.card/content/maxItems"]||6,6),item:{title:{value:i("/sap.card/content/item/value")},icon:i("/sap.card/content/item/icon",{src:"{bound}"}),description:i("/sap.card/content/item/description"),info:{value:i("/sap.card/content/item/info")}}}}};if(!this._oCardPlaceholder){this._oCardPlaceholder=new a({dataMode:g.Active});this._oCardPlaceholder._setPreviewMode(true)}this._oCardPlaceholder.setManifest(t);this._oCardPlaceholder.refresh();return this._oCardPlaceholder};c.prototype.getTransformContentInfo=function(){return{transformStyle:"scale3d(0.45, 0.45, 1)",transformFactor:.45,transformOriginStyle:"0 0",widthStyle:"400px + 10rem",heightStyle:"700px - 1.5rem",zIndex:this.getParent()._iZIndex}};c.prototype._getCardRealPreview=function(){if(!this._oCardPreview){this._oCardPreview=new a({dataMode:g.Active});this._oCardPreview.setBaseUrl(this.getCard().getBaseUrl());if(this._currentMode==="Mock"){this._oCardPreview.setProperty("useMockData",true)}}this._initalChanges=this._initalChanges||this._oCardPreview.getManifestChanges()||[];var e=this._initalChanges.concat([this.getParent().getCurrentSettings()]);this._oCardPreview.setManifestChanges(e);this._oCardPreview.setManifest(this.getCard()._oCardManifest._oManifest.getRawJson());this._oCardPreview.setHost(this.getCard().getHost());this._oCardPreview.refresh();this._oCardPreview.editor=this._oCardPreview.editor||{};this._oCardPreview.preview=this._oCardPreview.editor.preview=this;return this._oCardPreview};c.prototype._getImagePlaceholder=function(){var e=this.getSettings();if(e.preview.src){if(!this._oImagePlaceholder){var t=new i;t.addStyleClass("sapFCard");t.setWidth("500px");var o=this.getCard().getBaseUrl();if(!o&&typeof this.getCard().getManifest()==="string"){o=this.getCard().getManifest();o=o.substring(0,o.lastIndexOf("/")+1)}var a=o+"/"+e.preview.src;var s=new r({src:a});s.addStyleClass("sapUiIntegrationDTPreviewImg");s.setWidth("500px");s.setHeight("600px");t.addItem(s);this._oImagePlaceholder=t}}return this._oImagePlaceholder};c.prototype._getModes=function(){var e=this.getSettings();e.preview=e.preview||{};e.preview.modes=e.preview.modes||"Abstract";var t=this.getCard().getManifestEntry("/sap.card/type");if(t!=="Component"){e.preview.modes=e.preview.modes.replace("Mock","Live")}return e.preview.modes};c.prototype._getCurrentMode=function(){var e=this._getModes();if(!this._currentMode){switch(e){case"Abstract":case"AbstractLive":case"AbstractMock":this._currentMode="Abstract";break;case"Live":case"LiveAbstract":this._currentMode="Live";break;case"Mock":case"MockAbstract":this._currentMode="Mock";break;default:this._currentMode="None"}}return this._currentMode};c.prototype._toggleCurrentMode=function(){var e=this._getModes();if(e.indexOf("Live")>-1&&e.indexOf("Abstract")>-1){this._currentMode=this._getCurrentMode()==="Abstract"?"Live":"Abstract"}else if(e.indexOf("Mock")>-1&&e.indexOf("Abstract")>-1){this._currentMode=this._getCurrentMode()==="Abstract"?"Mock":"Abstract"}};c.prototype._getModeToggleButton=function(){var e=s.getLibraryResourceBundle("sap.ui.integration");if(!this._oModeToggleButton){this._oModeToggleButton=new o;this._oModeToggleButton.setTooltip();this._oModeToggleButton.attachPress(function(){this._toggleCurrentMode();this.update()}.bind(this))}this._oModeToggleButton.removeStyleClass("sapUiIntegrationDTPreviewButton");this._oModeToggleButton.removeStyleClass("sapUiIntegrationDTPreviewButtonSpec");var t=s.getConfiguration().getLanguage().replaceAll("_","-");if(t.startsWith("ar")||t.startsWith("he")){this._oModeToggleButton.addStyleClass("sapUiIntegrationDTPreviewButtonSpec")}else{this._oModeToggleButton.addStyleClass("sapUiIntegrationDTPreviewButton")}var i=this._oModeToggleButton,r=this._getCurrentMode();if(r==="None"){i.setVisible(false)}if(r==="Abstract"){i.setIcon("sap-icon://media-play");i.setPressed(false);if(this._getModes().indexOf("Mock")>-1){i.setTooltip(e.getText("CARDEDITOR_PREVIEW_BTN_MOCKPREVIEW"))}else{i.setTooltip(e.getText("CARDEDITOR_PREVIEW_BTN_LIVEPREVIEW"))}}else if(r==="Live"||r==="Mock"){i.setIcon("sap-icon://media-pause");i.setPressed(true);i.setTooltip(e.getText("CARDEDITOR_PREVIEW_BTN_SAMPLEPREVIEW"))}return this._oModeToggleButton};c.prototype.update=function(){this.invalidate()};function l(e){e=e||window.getComputedStyle(document.body).backgroundColor;var t=/rgb\((\d+).*?(\d+).*?(\d+)\)/.exec(e);if(!t){return false}var i=parseInt(t[1]),r=parseInt(t[2]),o=parseInt(t[3]),a=(i*299+r*587+o*114)/1e3;return a<=128}c.prototype.onfocusin=function(e){if(!this.getSettings().preview.interactive){if(!this._focusinByTabPrevious&&e.srcControl!==this._oModeToggleButton){if(this._oModeToggleButton){this._oModeToggleButton.focus()}else{this.getDomRef("after").focus()}}this._focusinByTabPrevious=false}};c.prototype.onsaptabnext=function(e){if(!this.getSettings().preview.interactive){if(e.srcControl!==this._oModeToggleButton){this.getDomRef("after").focus()}}};c.prototype.onsaptabprevious=function(e){if(!this.getSettings().preview.interactive){this._focusinByTabPrevious=true;if(!this._oModeToggleButton||e.srcControl===this._oModeToggleButton){this.getDomRef("before").focus()}}};c.init=function(){var e=sap.ui.require.toUrl("sap.ui.integration.designtime.editor.css.CardPreview".replace(/\./g,"/")+".css");n(e);this.init=function(){}};c.init();return c});
//# sourceMappingURL=CardPreview.js.map