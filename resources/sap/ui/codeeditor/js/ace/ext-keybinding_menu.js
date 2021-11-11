ace.define("ace/ext/menu_tools/overlay_page",["require","exports","module","ace/lib/dom"],function(e,o,t){"use strict";var n=e("../../lib/dom");var r="#ace_settingsmenu, #kbshortcutmenu {background-color: #F7F7F7;color: black;box-shadow: -5px 4px 5px rgba(126, 126, 126, 0.55);padding: 1em 0.5em 2em 1em;overflow: auto;position: absolute;margin: 0;bottom: 0;right: 0;top: 0;z-index: 9991;cursor: default;}.ace_dark #ace_settingsmenu, .ace_dark #kbshortcutmenu {box-shadow: -20px 10px 25px rgba(126, 126, 126, 0.25);background-color: rgba(255, 255, 255, 0.6);color: black;}.ace_optionsMenuEntry:hover {background-color: rgba(100, 100, 100, 0.1);transition: all 0.3s}.ace_closeButton {background: rgba(245, 146, 146, 0.5);border: 1px solid #F48A8A;border-radius: 50%;padding: 7px;position: absolute;right: -8px;top: -8px;z-index: 100000;}.ace_closeButton{background: rgba(245, 146, 146, 0.9);}.ace_optionsMenuKey {color: darkslateblue;font-weight: bold;}.ace_optionsMenuCommand {color: darkcyan;font-weight: normal;}.ace_optionsMenuEntry input, .ace_optionsMenuEntry button {vertical-align: middle;}.ace_optionsMenuEntry button[ace_selected_button=true] {background: #e7e7e7;box-shadow: 1px 0px 2px 0px #adadad inset;border-color: #adadad;}.ace_optionsMenuEntry button {background: white;border: 1px solid lightgray;margin: 0px;}.ace_optionsMenuEntry button:hover{background: #f0f0f0;}";n.importCssString(r);t.exports.overlayPage=function e(o,t,n){var r=document.createElement("div");var a=false;function i(e){if(e.keyCode===27){c()}}function c(){if(!r)return;document.removeEventListener("keydown",i);r.parentNode.removeChild(r);if(o){o.focus()}r=null;n&&n()}function d(e){a=e;if(e){r.style.pointerEvents="none";t.style.pointerEvents="auto"}}r.style.cssText="margin: 0; padding: 0; "+"position: fixed; top:0; bottom:0; left:0; right:0;"+"z-index: 9990; "+(o?"background-color: rgba(0, 0, 0, 0.3);":"");r.addEventListener("click",function(e){if(!a){c()}});document.addEventListener("keydown",i);t.addEventListener("click",function(e){e.stopPropagation()});r.appendChild(t);document.body.appendChild(r);if(o){o.blur()}return{close:c,setIgnoreFocusOut:d}}});ace.define("ace/ext/menu_tools/get_editor_keyboard_shortcuts",["require","exports","module","ace/lib/keys"],function(e,o,t){"use strict";var n=e("../../lib/keys");t.exports.getEditorKeybordShortcuts=function(e){var o=n.KEY_MODS;var t=[];var r={};e.keyBinding.$handlers.forEach(function(e){var o=e.commandKeyBinding;for(var n in o){var a=n.replace(/(^|-)\w/g,function(e){return e.toUpperCase()});var i=o[n];if(!Array.isArray(i))i=[i];i.forEach(function(e){if(typeof e!="string")e=e.name;if(r[e]){r[e].key+="|"+a}else{r[e]={key:a,command:e};t.push(r[e])}})}});return t}});ace.define("ace/ext/keybinding_menu",["require","exports","module","ace/editor","ace/ext/menu_tools/overlay_page","ace/ext/menu_tools/get_editor_keyboard_shortcuts"],function(e,o,t){"use strict";var n=e("../editor").Editor;function r(o){if(!document.getElementById("kbshortcutmenu")){var t=e("./menu_tools/overlay_page").overlayPage;var n=e("./menu_tools/get_editor_keyboard_shortcuts").getEditorKeybordShortcuts;var r=n(o);var a=document.createElement("div");var i=r.reduce(function(e,o){return e+'<div class="ace_optionsMenuEntry"><span class="ace_optionsMenuCommand">'+o.command+"</span> : "+'<span class="ace_optionsMenuKey">'+o.key+"</span></div>"},"");a.id="kbshortcutmenu";a.innerHTML="<h1>Keyboard Shortcuts</h1>"+i+"</div>";t(o,a)}}t.exports.init=function(e){n.prototype.showKeyboardShortcuts=function(){r(this)};e.commands.addCommands([{name:"showKeyboardShortcuts",bindKey:{win:"Ctrl-Alt-h",mac:"Command-Alt-h"},exec:function(e,o){e.showKeyboardShortcuts()}}])}});(function(){ace.require(["ace/ext/keybinding_menu"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();