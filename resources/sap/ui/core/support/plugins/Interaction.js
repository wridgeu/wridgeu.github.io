/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/support/Plugin","sap/ui/core/support/controls/InteractionSlider","sap/ui/core/support/controls/InteractionTree","sap/ui/core/support/controls/TimelineOverview","sap/m/MessageToast","sap/ui/thirdparty/jszip","sap/ui/core/util/File","sap/ui/performance/trace/Interaction","sap/ui/performance/Measurement","sap/ui/core/date/UI5Date"],function(jQuery,t,e,r,i,n,s,o,a,p,c){"use strict";var d=t.extend("sap.ui.core.support.plugins.Interaction",{constructor:function(n){t.apply(this,["sapUiSupportInteraction","Interaction",n]);this._oStub=n;if(this.runsAsToolPlugin()){this._aEventIds=[this.getId()+"SetMeasurements",this.getId()+"SetActive",this.getId()+"Export",this.getId()+"Import",this.getId()+"SetQueryString"];var s=function(t,e){return("000"+String(t)).slice(-e)};this._fnFormatTime=function(t){var e=c.getInstance(t),r=Math.floor((t-Math.floor(t))*1e3);return s(e.getHours(),2)+":"+s(e.getMinutes(),2)+":"+s(e.getSeconds(),2)+"."+s(e.getMilliseconds(),3)+s(r,3)};this._oInteractionSlider=new e;this._oInteractionTree=new r({});this._oTimelineOverview=new i}else{this._aEventIds=[this.getId()+"Refresh",this.getId()+"Clear",this.getId()+"Start",this.getId()+"Stop",this.getId()+"Activate",this.getId()+"Export",this.getId()+"Import",this.getId()+"SetQueryString"]}}});d.prototype.init=function(e){t.prototype.init.apply(this,arguments);if(this.runsAsToolPlugin()){u.call(this,e)}else{h.call(this,e)}};d.prototype.exit=function(e){t.prototype.exit.apply(this,arguments)};function u(t){var e=sap.ui.getCore().createRenderManager();e.openStart("div").class("sapUiSupportToolbar").openEnd();e.openStart("button",this.getId()+"-record").class("sapUiSupportIntToggleRecordingBtn").openEnd().close("button");e.openStart("label").class("sapUiSupportIntODataLbl").openEnd();e.voidStart("input",this.getId()+"-odata").attr("type","checkbox").voidEnd();e.text("Enable OData Statistics");e.close("label");e.openStart("div").class("sapUiSupportIntFupInputMask").openEnd();e.voidStart("input",this.getId()+"-fileImport").attr("tabindex","-1").attr("size","1").attr("accept","application/zip").attr("type","file").voidEnd();e.close("div");e.openStart("button",this.getId()+"-import").class("sapUiSupportIntImportExportBtn").class("sapUiSupportIntImportBtn").class("sapUiSupportRoundedButton").openEnd().text("Import").close("button");e.openStart("button",this.getId()+"-export").class("sapUiSupportIntImportExportBtn").class("sapUiSupportIntExportBtn").class("sapUiSupportRoundedButton").class("sapUiSupportIntHidden").openEnd().text("Export").close("button");e.openStart("span",this.getId()+"-info").class("sapUiSupportIntRecordingInfo").openEnd().close("span");e.close("div");e.openStart("div").class("sapUiSupportInteractionCntnt").openEnd();e.close("div");e.openStart("div").class("sapUiPerformanceStatsDiv").class("sapUiSupportIntHidden").openEnd();e.openStart("div").class("sapUiPerformanceTimeline").openEnd().close("div");e.openStart("div").class("sapUiPerformanceTop").openEnd();e.close("div");e.openStart("div").class("sapUiPerformanceBottom").openEnd();e.close("div");e.close("div");e.flush(this.dom());e.destroy();e=sap.ui.getCore().createRenderManager();this._oTimelineOverview.render(e);e.flush(this.dom(".sapUiPerformanceStatsDiv .sapUiPerformanceTimeline"));e.destroy();e=sap.ui.getCore().createRenderManager();this._oInteractionSlider.render(e);e.flush(this.dom(".sapUiPerformanceStatsDiv .sapUiPerformanceTop"));e.destroy();this._oInteractionSlider._registerEventListeners();this.$().find(".sapUiPerformanceTop").on("InteractionSliderChange",{},function(t,e,r){this._oInteractionTree.setRange(e,r)}.bind(this));this.dom("export").addEventListener("click",function(t){this.onsapUiSupportInteractionExport()}.bind(this));this.dom("fileImport").addEventListener("change",function(t){this.onsapUiSupportInteractionImport()}.bind(this));this.dom("odata").checked=this._bODATA_Stats_On;this.dom("odata").addEventListener("click",function(t){jQuery.sap.statistics(!jQuery.sap.statistics())});this.dom("record").dataset.state=!this._bFesrActive?"Start recording":"Stop recording";this.dom("record").addEventListener("click",function(t){var e=this.dom("record");if(e.dataset.state==="Stop recording"){this._oStub.sendEvent(this.getId()+"Refresh");this._oStub.sendEvent(this.getId()+"Activate",{active:false});e.dataset.state="Start recording";this._showPerfData()}else if(this.dom("record").dataset.state==="Start recording"){this._hidePerfData();this._oStub.sendEvent(this.getId()+"Clear");this._oStub.sendEvent(this.getId()+"Activate",{active:true});e.dataset.state="Stop recording"}}.bind(this))}function h(t){var e=/sap-ui-xx-fesr=(true|x|X)/.test(window.location.search);var r=jQuery.sap.statistics()||/sap-statistics=(true|x|X)/.test(window.location.search);this._oStub.sendEvent(this.getId()+"SetQueryString",{queryString:{bFesrActive:e,bODATA_Stats_On:r}});l.call(this)}function l(t,e){var r=a.getActive()||this._bFesrActive;var i=[];if(r||e){i=e||a.getAll(true);var n=window.performance.timing.fetchStart;for(var s=0;s<i.length;s++){var o=i[s];for(var p=0;p<o.requests.length;p++){var c=o.requests[p];o.requests[p]={connectEnd:c.connectEnd,connectStart:c.connectStart,domainLookupEnd:c.domainLookupEnd,domainLookupStart:c.domainLookupStart,duration:c.duration,entryType:c.entryType,fetchStart:c.fetchStart,initiatorType:c.initiatorType,name:c.name,redirectEnd:c.redirectEnd,redirectStart:c.redirectStart,requestStart:c.requestStart,responseEnd:c.responseEnd,responseStart:c.responseStart,secureConnectionStart:c.secureConnectionStart,startTime:c.startTime,workerStart:c.workerStart,fetchStartOffset:n}}}}this._oStub.sendEvent(this.getId()+"SetMeasurements",{measurements:i});this._oStub.sendEvent(this.getId()+"SetActive",{active:r})}d.prototype.onsapUiSupportInteractionSetQueryString=function(t){var e=t.getParameter("queryString");this._bFesrActive=e.bFesrActive;this._bODATA_Stats_On=e.bODATA_Stats_On;this.dom("odata").checked=this._bODATA_Stats_On;this.dom("record").dataset.state=!this._bFesrActive?"Start recording":"Stop recording"};d.prototype.onsapUiSupportInteractionSetMeasurements=function(t){this._setMeasurementsData(t.getParameter("measurements"))};d.prototype.onsapUiSupportInteractionSetActive=function(t){};d.prototype.onsapUiSupportInteractionRefresh=function(t){l.call(this)};d.prototype.onsapUiSupportInteractionClear=function(t){a.clear();this._oStub.sendEvent(this.getId()+"SetMeasurements",{measurements:[]})};d.prototype.onsapUiSupportInteractionStart=function(t){p.start(this.getId()+"-perf","Measurement by support tool")};d.prototype.onsapUiSupportInteractionEnd=function(t){d.end(true)};d.prototype.onsapUiSupportInteractionActivate=function(t){var e=t.getParameter("active");if(a.getActive()!=e){a.setActive(e)}};d.prototype.onsapUiSupportInteractionExport=function(t){var e=this.measurements||[];if(e.length>0){var r=new s;r.file("InteractionsSteps.json",JSON.stringify(e).replace(/,"isExpanded":true/g,""));var i=r.generate({type:"blob"});this._openGeneratedFile(i)}};d.prototype.onsapUiSupportInteractionImport=function(t){var e=this.dom("fileImport").files;if(e.length===0){n.show("Select a file for import first!",{autoClose:true,duration:3e3});return}if(!window.FileReader){n.show("Use a modern browser which supports FileReader!",{autoClose:true,duration:3e3});return}var r=new window.FileReader,i=e[0],o=this;r.onload=function(t){return function(t){var e=new s(t.target.result);var r=e.files["InteractionsSteps.json"]&&e.files["InteractionsSteps.json"].asText();if(r){o._setMeasurementsData(JSON.parse(r.replace(/,"isExpanded":true/g,"")))}else{n.show("Imported data does not contain interaction measures",{autoClose:true,duration:3e3})}}}(i);r.readAsArrayBuffer(i)};d.prototype._openGeneratedFile=function(t){o.save(t,"InteractionSteps","zip","application/zip")};d.prototype._setMeasurementsData=function(t){var e=0,r=100,i=function(t){var e=function(t,e){var r=0;if(t.length===0){return r}for(var i=t.length-1;i>=0;i--){if(t[i].startTime<e.startTime){r=i+1;break}}return r},i=function(t,e){return t.filter(function(t){return t.timing.startTime===e})},n=function(t,e){var r=0;if(t.length===0){return r}for(var i=t.length-1;i>=0;i--){if(t[i].start<e.fetchStartOffset+e.startTime){r=i;break}}return r},s=0;t.forEach(function(t,o,a){var p=t.requests;for(var c=p.length-1;c>=0;c--){var d=p[c];if(o>0&&t.start-r>d.fetchStartOffset+d.startTime){var u=n(a,d);var h=a[u].requests;s=e(h,d);h.splice(s,0,d);p.splice(c,1);var l=i(t.sapStatistics,d.startTime);if(l.length>0){a[u].sapStatistics=a[u].sapStatistics.concat(l)}}}})};i(t);this.measurements=t;for(var n=0;n<t.length;n++){e+=t[n].requests.length}if(t.length>0){this._showPerfData();this.dom("info").textContent="Total "+e+" Requests in "+t.length+" Interactions"}else{this._hidePerfData();this.dom("info").textContent=""}var s=this.dom(".sapUiPerformanceStatsDiv .sapUiPerformanceTimeline");var o=sap.ui.getCore().createRenderManager();this._oTimelineOverview.setInteractions(t);this._oTimelineOverview.render(o);o.flush(s);o.destroy();this._oInteractionSlider._initSlider();this._oInteractionSlider.setDuration(t);var a=this.dom(".sapUiPerformanceStatsDiv .sapUiPerformanceBottom");this._oInteractionTree.setInteractions(t);this._oInteractionTree.renderAt(a)};d.prototype._showPerfData=function(){this.dom(".sapUiPerformanceStatsDiv").classList.remove("sapUiSupportIntHidden");this.dom("export").classList.remove("sapUiSupportIntHidden")};d.prototype._hidePerfData=function(){this.dom(".sapUiPerformanceStatsDiv").classList.add("sapUiSupportIntHidden");this.dom("export").classList.add("sapUiSupportIntHidden")};return d});
//# sourceMappingURL=Interaction.js.map