/**
 * Any copyright is dedicated to the Public Domain. http://creativecommons.org/publicdomain/zero/1.0/
 *
 * Code copied from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
 */
(function(){"use strict";if(typeof window.CustomEvent==="function"){return false}function e(e,t){t=t||{bubbles:false,cancelable:false,detail:null};var n=document.createEvent("CustomEvent");n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail);return n}window.CustomEvent=e})();