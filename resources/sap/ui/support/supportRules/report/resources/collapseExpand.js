/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
window.sapUiSupportReport=window.sapUiSupportReport||{};window.sapUiSupportReport.collapseExpand=function(){"use strict";function e(e){var t=this.getAttribute("data-expandableElement");var s=document.getElementById(t);var a=s.classList.contains("collapsed");if(a){s.classList.remove("collapsed");s.classList.add("expanded");this.classList.remove("collapsed-content");this.classList.add("expanded-content")}else{s.classList.remove("expanded");s.classList.add("collapsed");this.classList.remove("expanded-content");this.classList.add("collapsed-content")}}function t(){try{var t=document.getElementsByClassName("expandable-control");if(!t){return}for(var s=0;s<t.length;s++){t[s].addEventListener("click",e);var a=t[s].getAttribute("data-expandableElement");var n=document.getElementById(a);if(t[s].classList.contains("collapsed-content")){n.classList.add("collapsed")}else{n.classList.add("expanded")}t[s].setAttribute("style","cursor: pointer;")}}catch(e){console.log("There was a problem initializing collapse/expand functionality.")}}return{init:t}}();