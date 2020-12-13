/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/library","sap/m/library","sap/ui/Device","sap/base/Log","sap/m/Link","sap/m/Text","sap/ui/thirdparty/jquery"],function(e,t,s,i,r,n,o,a){"use strict";var l=t.TextDirection;var d=s.BackgroundDesign;var p=t.TitleLevel;var c={apiVersion:2};c._isEmptyObject=function(e){if(!e){return true}if((!e._isEmpty||!e._isEmpty())&&(!e.getVisible||e.getVisible())){return false}return true};c._isEmptyArray=function(e){if(e){for(var t=0;t<e.length;t++){if(!c._isEmptyObject(e[t])){return false}}}return true};c._isEmptyRow=function(e,t){return c._isEmptyObject(e)&&c._isEmptyArray(t)};c._renderObjects=function(t,s,i){for(var r=0;r<s.length;r++){if(s[r]instanceof e){this._renderChildControl(t,i,s[r])}}};c._computeChildControlsToBeRendered=function(e){e.__controlsToBeRendered={};var t=e.getAttributes();for(var s=0;s<t.length;s++){e.__controlsToBeRendered[t[s].getId()]=t[s]}t=e.getStatuses();for(var s=0;s<t.length;s++){e.__controlsToBeRendered[t[s].getId()]=t[s]}var i=e.getFirstStatus();if(i){e.__controlsToBeRendered[i.getId()]=i}i=e.getSecondStatus();if(i){e.__controlsToBeRendered[i.getId()]=i}i=e.getAggregation("_objectNumber");if(i){e.__controlsToBeRendered[i.getId()]=i}};c._cleanupNotRenderedChildControls=function(e,t){for(var s in t.__controlsToBeRendered){e.cleanupControlWithoutRendering(t.__controlsToBeRendered[s])}delete t.__controlsToBeRendered};c._getMarkers=function(e){return e._getVisibleMarkers()};c._renderIntro=function(e,t,s,i){if(t.getIntroActive()){t._introText=new n(t.getId()+"-intro");t._introText.setText(t.getIntro());t._introText.setHref(t.getIntroHref());t._introText.setTarget(t.getIntroTarget());t._introText.press=t.introPress}else{t._introText=new o(t.getId()+"-intro");t._introText.setText(t.getIntro());t._introText.setMaxLines(3)}t._introText.setTextDirection(t.getIntroTextDirection());e.openStart("div");e.class(s);if(t.getIntroActive()){e.class(i)}e.openEnd();this._renderChildControl(e,t,t._introText);e.close("div")};c._renderAttribute=function(e,t,s,i){e.openStart("div");e.class("sapMOHAttr");if(i){e.style("width","100%")}e.openEnd();this._renderChildControl(e,t,s);e.close("div")};c._getVisibleStatuses=function(e){var t=[];if(e.getFirstStatus()&&e.getFirstStatus().getVisible()){t.push([e.getFirstStatus()])}if(e.getSecondStatus()&&e.getSecondStatus().getVisible()){t.push([e.getSecondStatus()])}if(e.getStatuses()){var s=e.getStatuses();for(var i=0;i<s.length;i++){if(!s[i].getVisible||s[i].getVisible()){if(s[i]instanceof sap.m.ObjectStatus&&!s[i]._isEmpty()||s[i]instanceof sap.m.ProgressIndicator){t.push([s[i]])}else{r.warning('Only sap.m.ObjectStatus or sap.m.ProgressIndicator are allowed in "sap.m.ObjectHeader.statuses" aggregation.'+" Current object is "+s[i].constructor.getMetadata().getName()+' with id "'+s[i].getId()+'"')}}}}return t};c._getVisibleAttribsAndStatuses=function(e){var t=[],s=e.getAttributes(),i=[];for(var r=0;r<s.length;r++){if(s[r].getVisible()&&!s[r]._isEmpty()){i.push(s[r])}}var n=this._getVisibleStatuses(e);t[0]=i;t[1]=n;return t};c._renderRow=function(e,t,s,i){if(c._isEmptyRow(s,i)){return}e.openStart("div");e.class("sapMOHAttrRow");e.openEnd();if(!c._isEmptyObject(s)){this._renderAttribute(e,t,s,c._isEmptyArray(i))}else if(c._isEmptyObject(s)&&!c._isEmptyArray(i)){if(i[0]instanceof sap.m.ProgressIndicator){e.openStart("div");e.class("sapMOHAttr");e.openEnd();e.close("div")}}if(!c._isEmptyArray(i)){e.openStart("div");if(i[0]instanceof sap.m.ProgressIndicator){e.class("sapMOHStatusFixedWidth")}else if(i[0]instanceof sap.m.ObjectMarker){e.class("sapMOHStatusFixedWidth");e.class("sapMObjStatusMarker")}else{e.class("sapMOHStatus")}e.openEnd();c._renderObjects(e,i,t);e.close("div")}e.close("div")};c._renderAttributesAndStatuses=function(e,t){var s=t.getAttributes();var i=[];for(var r=0;r<s.length;r++){if(s[r].getVisible()){i.push(s[r])}}var n=i.length;var o=[];var a=c._getMarkers(t);if(!t.getResponsive()&&!c._isEmptyArray(a)){o.push(a)}var l=this._getVisibleStatuses(t);o=o.concat(l);var d=o.length;var p=n>d?n:d;if(!t.getResponsive()){for(var g=0;g<p;g++){this._renderRow(e,t,i[g],o[g])}}};c._renderNumber=function(e,t){var s=t.getAdditionalNumbers();if(!t.getNumber()&&(s&&!s.length)){return}e.openStart("div",t.getId()+"-numberdiv");e.class("sapMOHNumberDiv");e.openEnd();var i=t.getAggregation("_objectNumber");if(i&&i.getNumber()){i.setTextDirection(t.getNumberTextDirection());this._renderChildControl(e,t,i)}e.close("div");if(!t.getCondensed()){this._renderAdditionalNumbers(e,t)}};c._renderAdditionalNumbers=function(e,t){var s=t.getAdditionalNumbers();if(s&&!s.length){return}if(s.length===1){e.openStart("div");e.class("additionalOHNumberSeparatorDiv");e.openEnd();e.close("div")}for(var i=0;i<s.length;i++){e.openStart("div",t.getId()+"-additionalNumber"+i);e.class("sapMOHNumberDiv");e.class("additionalOHNumberDiv");if(s.length===1){e.class("sapMOHOnlyANumber")}e.openEnd();s[i].setTextDirection(t.getNumberTextDirection());this._renderChildControl(e,t,s[i]);e.close("div")}};c._renderTitle=function(e,t){t._oTitleArrowIcon.setVisible(t.getShowTitleSelector());if(t.getShowTitleSelector()&&t._oTitleArrowIcon.getVisible()){e.openStart("div");e.class("sapMOHTitleAndArrow");e.openEnd()}if(t.getTitle()){var s=t.getTitleLevel()===p.Auto?p.H1:t.getTitleLevel();s=s.toLowerCase();t._titleText.setText(t.getTitle());t._titleText.setTextDirection(t.getTitleTextDirection());if(t.getTitleActive()){e.openStart("a",t.getId()+"-title");if(t.getTitleHref()){e.attr("href",t.getTitleHref());if(t.getTitleTarget()){e.attr("target",t.getTitleTarget())}}e.accessibilityState({role:"link"})}else{e.openStart("div",t.getId()+"-title")}e.class("sapMOHTitle");if(t.getTitleActive()){e.attr("tabindex","0");e.class("sapMOHTitleActive")}if(t.getShowTitleSelector()){e.class("sapMOHTitleFollowArrow")}e.openEnd();e.openStart(s);e.openEnd();this._renderChildControl(e,t,t._titleText);e.close(s);if(t.getTitleActive()){e.close("a")}else{e.close("div")}}if(t.getShowTitleSelector()){e.openStart("span");e.class("sapMOHTitleArrow");e.openEnd();this._renderChildControl(e,t,t._oTitleArrowIcon);e.close("span")}if(t.getShowTitleSelector()&&t._oTitleArrowIcon.getVisible()){e.close("div")}};c._renderFullTitle=function(e,t){var s=t.getAdditionalNumbers();if(!t.getNumber()&&(s&&!s.length)){e.class("sapMOHTitleDivFull")}};c._renderFullOH=function(e,t){if(t.getIntro()){this._renderIntro(e,t,"sapMOHIntro","sapMOHIntroActive")}e.openStart("div");e.class("sapMOHTopRow");e.openEnd();e.openStart("div",t.getId()+"-titlediv");e.class("sapMOHTitleDiv");if(t._hasIcon()){e.class("sapMOHTitleIcon")}this._renderFullTitle(e,t);e.openEnd();if(t._hasIcon()){e.openStart("div");e.class("sapMOHIcon");e.class("sapMOHIcon"+t.getImageShape());if(t.getIconActive()){e.class("sapMPointer")}e.openEnd();this._renderChildControl(e,t,t._getImageControl());e.close("div")}this._renderTitle(e,t);e.close("div");this._renderNumber(e,t);e.openStart("div");e.class("sapMOHDivider");e.openEnd();e.close("div");e.close("div");if(t._hasBottomContent()){e.openStart("div");e.class("sapMOHBottomRow");e.openEnd();this._renderAttributesAndStatuses(e,t);e.openStart("div");e.class("sapMOHDivider");e.openEnd();e.close("div");e.close("div")}};c._renderCondensedOH=function(e,t){e.openStart("div",t.getId()+"-titlediv");e.class("sapMOHTitleDiv");this._renderFullTitle(e,t);e.openEnd();this._renderTitle(e,t);e.close("div");this._renderNumber(e,t);var s=t.getAttributes()[0];if(s&&!s._isEmpty()){this._renderAttribute(e,t,s)}};c.render=function(e,t){if(t.getResponsive()){this._renderResponsive(e,t);return}this._computeChildControlsToBeRendered(t);var s=t.getCondensed();e.openStart("div",t);e.openEnd();e.openStart("div");e.class("sapMOH");if(t._getBackground()!==d.Transparent){e.class("sapContrastPlus")}if(s){e.class("sapMOHC")}e.class("sapMOHBg"+t._getBackground());var i=t.getTooltip_AsString();if(i){e.attr("title",i)}e.accessibilityState({role:"region",labelledby:{value:t.getId()+"-titleText-inner",append:true}});e.openEnd();if(s){this._renderCondensedOH(e,t)}else{this._renderFullOH(e,t)}e.openStart("div");e.class("sapMOHLastDivider");e.openEnd();e.close("div");e.close("div");e.close("div");this._cleanupNotRenderedChildControls(e,t)};c._renderChildControl=function(e,t,s){e.renderControl(s);if(!t.getResponsive()&&t.__controlsToBeRendered){t.__controlsToBeRendered[s.getId()]=undefined}};c._renderResponsive=function(e,t){var s=this._hasResponsiveStates(t),n=this._hasResponsiveTabs(t),o=t.getHeaderContainer();e.openStart("div",t);e.class("sapMOHROuter");var a=t.getTooltip_AsString();if(a){e.attr("title",a)}e.accessibilityState({role:"region",labelledby:{value:t.getId()+"-txt",append:true}});e.openEnd();e.openStart("div");e.class("sapMOHR");if(t._getBackground()!==d.Transparent){e.class("sapContrastPlus")}if(n){e.class("sapMOHRNoBorder")}e.class("sapMOHRBg"+t._getBackground());e.openEnd();e.openStart("div");if(i.system.desktop&&t._isMediaSize("Desktop")&&t.getFullScreenOptimized()&&t._iCountVisAttrStat>=1&&t._iCountVisAttrStat<=3){e.class("sapMOHRStatesOneOrThree")}e.openEnd();this._renderResponsiveTitleBlock(e,t);if(s){this._renderResponsiveStates(e,t)}e.close("div");if(n){this._renderResponsiveTabs(e,t)}e.close("div");if(o&&o instanceof sap.m.IconTabBar){this._renderChildControl(e,t,o)}e.close("div");if(!t.getTitle()){if(!t.getBinding("title")){r.warning("The title shouldn't be empty!")}}};c._renderResponsiveTitleBlock=function(e,t){e.openStart("div",t.getId()+"-titlenumdiv");e.class("sapMOHRTitleNumberDiv");e.openEnd();e.openStart("div",t.getId()+"-titlediv");e.class("sapMOHRTitleDiv");if(t._hasIcon()){if(i.system.phone||t._isMediaSize("Phone")){if(i.orientation.landscape||t._isMediaSize("Phone")&&!i.system.phone){e.class("sapMOHRTitleIcon")}}else{e.class("sapMOHRTitleIcon")}}if(!t.getNumber()){e.class("sapMOHRTitleDivFull")}e.openEnd();this._renderResponsiveTitle(e,t);if(t._hasIcon()){e.openStart("div",t.getId()+"-titleIcon");e.class("sapMOHRIcon");e.class("sapMOHRIcon"+t.getImageShape());if(i.system.phone&&i.orientation.portrait){e.class("sapMOHRHideIcon")}if(t.getIconActive()){e.class("sapMPointer")}e.openEnd();this._renderChildControl(e,t,t._getImageControl());e.close("div")}e.close("div");this._renderResponsiveNumber(e,t);e.close("div")};c._renderResponsiveStates=function(e,t){e.openStart("div",t.getId()+"-states");e.class("sapMOHRStates");e.openEnd();this._renderResponsiveRow(e,t);e.close("div")};c._renderResponsiveRow=function(e,t){var s=[];s=this._getVisibleAttribsAndStatuses(t);var r=s[0].concat(s[1]),n=s[0].length,o=r.length,a=1,l="";if(o===0){return}if(i.system.desktop){if(!t.getFullScreenOptimized()){if(o>=1&&o<=4){a=2;l="sapMOHRTwoCols"}if(o>=5){a=3;l="sapMOHRThreeCols"}}else{if(o>=1&&o<=3){a=1;l="sapMOHROneCols"}if(o>=4){a=4;l="sapMOHRFourCols"}}}if(i.system.tablet&&!i.system.desktop||i.system.desktop&&t._isMediaSize("Tablet")){if(!t.getFullScreenOptimized()||i.orientation.portrait&&t.getFullScreenOptimized()){a=2;l="sapMOHRTwoCols"}else{if(t.getFullScreenOptimized()&&(i.orientation.landscape||i.system.desktop&&t._isMediaSize("Tablet"))){if(o>=1&&o<=2){a=2;l="sapMOHRTwoCols"}if(o>=3){a=3;l="sapMOHRThreeCols"}}}}if(i.system.phone||i.system.desktop&&t._isMediaSize("Phone")){a=1;l="sapMOHROneCols"}this._renderResponsiveStatesColumn(e,t,a,r,n,l)};c._renderResponsiveStatesColumn=function(e,t,s,i,r,n){var o=Math.floor(i.length/s);var a=i.length%s;var l=0;var d=1;for(var p=0;p<i.length;p++){if(l==0){e.openStart("div");e.class("sapMOHRStatesCont"+d);e.class(n);e.openEnd()}if(p<r){this._renderResponsiveAttribute(e,t,i[p])}else{this._renderResponsiveStatus(e,t,i[p])}l++;if(l==o&&d>a||l==o+1&&d<=a||p==i.length-1){e.close("div");l=0;d++}}};c._renderResponsiveAttribute=function(e,t,s){e.openStart("div");e.class("sapMOHRAttr");e.openEnd();this._renderChildControl(e,t,s);e.close("div")};c._renderResponsiveStatus=function(e,t,s){e.openStart("div");e.class("sapMOHRStatus");e.openEnd();this._renderChildControl(e,t,s[0]);e.close("div")};c._renderResponsiveMarkers=function(e,t){var s=[],i=t.getTitleTextDirection(),r=sap.ui.getCore().getConfiguration().getRTL();s=t._getVisibleMarkers();e.openStart("span",t.getId()+"-markers");e.class("sapMObjStatusMarker");if(i===l.LTR&&r||i===l.RTL&&!r){e.class("sapMObjStatusMarkerOpposite")}e.openEnd();for(var n=0;n<s.length;n++){this._renderChildControl(e,t,s[n])}e.close("span")};c._renderResponsiveNumber=function(e,t){var s=t.getAggregation("_objectNumber");if(s&&s.getNumber()){s.setTextDirection(t.getNumberTextDirection());this._renderChildControl(e,t,s)}};c._hasResponsiveStates=function(e){var t=e.getAttributes(),s=[];if(!(e._hasAttributes()||e._hasStatus())){e._iCountVisAttrStat=0;return false}for(var i=0;i<t.length;i++){if(t[i].getVisible()){s.push(t[i])}}var r=this._getVisibleStatuses(e);e._iCountVisAttrStat=s.length+r.length;return!!(s.length+r.length)};c._hasResponsiveTabs=function(e){var t=e.getHeaderContainer(),s;if(t){if(t instanceof sap.m.IconTabBar){s=t._getIconTabHeader();if(s.getVisible()){e._iCountVisTabs=s.getItems().length;return!!s.getItems().length}}else if(t.getMetadata().getName()==="sap.m.HeaderContainer"){return!!t.getContent().length}else if(t.getMetadata().getName()==="sap.suite.ui.commons.HeaderContainer"){return!!t.getItems().length}}return false};c._renderResponsiveTabs=function(e,t){var s=t.getHeaderContainer(),i;e.openStart("div");e.class("sapMOHRTabs");if(s instanceof sap.m.IconTabBar){e.class("sapMOHRTabsITB")}e.openEnd();if(s){if(s instanceof sap.m.IconTabBar){i=s._getIconTabHeader();this._renderChildControl(e,t,i);s._bHideHeader=true}else if(s.getMetadata().getName()==="sap.m.HeaderContainer"||s.getMetadata().getName()==="sap.suite.ui.commons.HeaderContainer"){this._renderChildControl(e,t,s)}else{r.warning("The control "+s+' is not supported for aggregation "headerContainer"')}}e.close("div")};c._renderResponsiveTitle=function(e,t){var s;t._oTitleArrowIcon.setVisible(t.getShowTitleSelector());e.openStart("div",t.getId()+"-title");e.class("sapMOHRTitle");if(t.getTitle().length&&t.getTitleActive()){e.class("sapMOHRTitleActive")}if(t.getShowTitleSelector()){e.class("sapMOHRTitleFollowArrow")}e.openEnd();if(i.system.phone&&i.orientation.portrait){s=50}else{s=80}e.openStart("div",t.getId()+"-title-arrow");e.style("display","inline-block");e.openEnd();this._renderResponsiveTitleAndArrow(e,t,s);e.close("div");if(t.getIntro()){this._renderIntro(e,t,"sapMOHRIntro","sapMOHRIntroActive")}e.close("div")};c._rerenderTitle=function(e,t,s){var i=t.getId();this._renderResponsiveTitleAndArrow(e,t,s);e.flush(a(document.getElementById(i+"-title-arrow")))};c._renderResponsiveTitleAndArrow=function(e,t,s){var i,r="",n=t.getTitleTextDirection();var o=!!t._getVisibleMarkers().length;var a=t.getTitleLevel()===p.Auto?p.H1:t.getTitleLevel();a=a.toLowerCase();e.openStart(a);e.openEnd();e.openStart("span");e.class("sapMOHRTitleTextContainer");if(n!=l.Inherit){e.attr("dir",n.toLowerCase())}e.openEnd();if(t.getTitle().length&&t.getTitleActive()){e.openStart("a",t.getId()+"-txt");if(t.getTitleHref()){e.attr("href",t.getTitleHref());if(t.getTitleTarget()){e.attr("target",t.getTitleTarget())}}e.attr("tabindex","0");e.accessibilityState({role:"link"})}else{e.openStart("span",t.getId()+"-txt")}e.class("sapMOHRTitleText");e.openEnd();e.openStart("span",t.getId()+"-titletxtwrap");e.class("sapMOHRTitleTextWrappable");e.openEnd();if(t.getTitle().length>s){i=t.getTitle().substr(0,s).trim();r="..."}else{i=t.getTitle()}if(o){var d=i.substr(i.lastIndexOf(" ")+1);var c=i.substr(0,i.lastIndexOf(" ")+1);if(d.length===1){d=i;c=""}e.text(c);e.close("span");e.text(d);e.text(r);if(t.getTitleActive()){e.close("a")}else{e.close("span")}this._renderResponsiveMarkers(e,t);e.close("span")}else{if(!r){e.text(i)}else{e.text(i+r)}if(t.getTitleActive()){e.close("span");e.close("a");e.close("span")}else{e.close("span");e.close("span");e.close("span")}}if(t.getShowTitleSelector()){e.openStart("span");e.class("sapMOHRTitleArrow");e.openEnd();this._renderChildControl(e,t,t._oTitleArrowIcon);e.close("span")}e.close(a)};c._rerenderResponsiveStates=function(e,t){var s=t.getId(),r=this._getVisibleAttribsAndStatuses(t),n=r[0].concat(r[1]),o=r[0].length,l=n.length,d=1,p="";if(l===0){return}if(i.orientation.portrait){d=2;p="sapMOHRTwoCols"}else{if(l>=1&&l<=2){d=2;p="sapMOHRTwoCols"}if(l>=3){d=3;p="sapMOHRThreeCols"}}this._renderResponsiveStatesColumn(e,t,d,n,o,p);e.flush(a(document.getElementById(s+"-states"))[0])};return c},true);