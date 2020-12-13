/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject"],function(t){"use strict";var i=t.extend("sap.ui.core.support.controls.TimelineOverview",{metadata:{library:"sap.ui.core"}});i.prototype.setInteractions=function(t){this.interactions=JSON.parse(JSON.stringify(t));if(!t||!t.length){return}this.actualStartTime=t[0].start;this.actualEndTime=t[t.length-1].end;this.timeRange=this.actualEndTime-this.actualStartTime;this.maxDuration=0;this.stepCount=60;var i=this;this.interactions.forEach(function(t){t.start=parseFloat((t.start-i.actualStartTime).toFixed(2));t.end=parseFloat((t.end-i.actualStartTime).toFixed(2));t.calculatedDuration=t.end-t.start;if(t.calculatedDuration>i.maxDuration){i.maxDuration=t.calculatedDuration}})};i.prototype.render=function(t){t.write('<div id="sapUiInteractionTimelineOverview"><ol id="'+this.getId()+'"');t.addClass("InteractionTimeline");t.writeClasses();t.write(">");var i,a=this.interactions;if(!a||!a.length){return}var e=this._getTimelineOverviewData(a);var r=this;e.forEach(function(t){if(t.totalDuration>r.maxDuration){r.maxDuration=t.totalDuration}});for(var n=0;n<e.length;n++){i=e[n];this.renderInteractionStep(t,i,n)}t.write("</ol></div>")};i.prototype.renderInteractionStep=function(t,i,a){var e=69,r=Math.ceil(i.totalDuration/this.maxDuration*e);var n="height: "+r+"%;";if(r>0){n+=" min-height: 1px;"}t.write("<li>");t.write('<div class="bars-wrapper" title="Duration: '+i.totalDuration+'ms">');t.write('<div class="duration" style="'+n+'">');var o=i.interactions,s=100;o.forEach(function(a,e){s=i.totalDuration===0?100:Math.ceil(a.calculatedDuration/i.totalDuration*100);t.write('<div class="requestType" style="height: '+s+'%; min-height: 1px;"></div>');if(e!==o.length-1){t.write('<div style="min-height: 1px;"></div>')}});t.write("</div>");t.write("</div>");var u=a+1;var l=u%10===0?"sapUiInteractionTimelineStepRightBold":"sapUiInteractionTimelineStepRight";if(u%2===0){t.write('<div class="'+l+'"></div>')}if(u%10===0&&u!==this.stepCount){t.write('<div class="sapUiInteractionTimelineTimeLbl">'+Math.round(a*this.timeRange/this.stepCount/10)/100+"s</div>")}t.write("</li>")};i.prototype._getTimelineOverviewData=function(t){var i=this.stepCount;var a=this.timeRange/i;var e=[],r={interactions:[]},n=true;for(var o=0;o<i;o++){var s=a*o;var u=s+a;var l=this._filterByTime({start:s,end:u},t);var c={interactions:l,totalDuration:0};l.map(function(t){c.totalDuration+=t.calculatedDuration});n=l.length>0&&r.interactions.length>0&&l[0].start===r.interactions[0].start;if(n){c.interactions=[];c.totalDuration=0}e.push(c);r=c}return e};i.prototype._filterByTime=function(t,i){return i.filter(function(i){return!(i.end<=t.start||i.start>=t.end)}).map(function(i){var a=Math.max(t.start-i.start,0);var e=Math.max(i.start+i.duration-t.end,0);i.duration=i.duration-a-e;i.start=Math.max(i.start,t.start);i.end=Math.min(i.end,t.end);return i})};return i});