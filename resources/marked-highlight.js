sap.ui.define(["exports"],function(t){"use strict";var e={};function n(t){if(typeof t==="function"){t={highlight:t}}if(!t||typeof t.highlight!=="function"){throw new Error("Must provide highlight function")}if(typeof t.langPrefix!=="string"){t.langPrefix="language-"}return{async:!!t.async,walkTokens(e){if(e.type!=="code"){return}const n=r(e);if(t.async){return Promise.resolve(t.highlight(e.text,n)).then(i(e))}const o=t.highlight(e.text,n);if(o instanceof Promise){throw new Error("markedHighlight is not set to async but the highlight function is async. Set the async option to true on markedHighlight to await the async highlight function.")}i(e)(o)},renderer:{code(e,n,r){const i=(n||"").match(/\S*/)[0];const o=i?` class="${t.langPrefix}${g(i)}"`:"";e=e.replace(/\n$/,"");return`<pre><code${o}>${r?e:g(e,true)}\n</code></pre>`}}}}function r(t){return(t.lang||"").match(/\S*/)[0]}function i(t){return e=>{if(typeof e==="string"&&e!==t.text){t.escaped=true;t.text=e}}}const o=/[&<>"']/;const c=new RegExp(o.source,"g");const s=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;const h=new RegExp(s.source,"g");const a={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};const u=t=>a[t];function g(t,e){if(e){if(o.test(t)){return t.replace(c,u)}}else{if(s.test(t)){return t.replace(h,u)}}return t}var f=e.markedHighlight=n;try{Object.defineProperty(e,"__"+"esModule",{value:true})}catch(t){}t.default=e;t.markedHighlight=f;Object.defineProperty(t,"__esModule",{value:true})});
//# sourceMappingURL=marked-highlight.js.map