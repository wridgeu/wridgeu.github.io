sap.ui.define(function(){"use strict";(function(){const e={NODE_ENV:"production"};try{if(process){process.env=Object.assign({},process.env);Object.assign(process.env,e);return}}catch(e){}globalThis.process={env:e}})();const e="[A-Za-z$_][0-9A-Za-z$_]*";const n=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"];const t=["true","false","null","undefined","NaN","Infinity"];const a=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"];const s=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"];const c=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"];const r=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"];const o=[].concat(c,a,s);function i(i){const l=i.regex;const u=(e,{after:n})=>{const t="</"+e[0].slice(1);const a=e.input.indexOf(t,n);return a!==-1};const b=e;const d={begin:"<>",end:"</>"};const g=/<[A-Za-z0-9\\._:-]+\s*\/>/;const m={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(e,n)=>{const t=e[0].length+e.index;const a=e.input[t];if(a==="<"||a===","){n.ignoreMatch();return}if(a===">"){if(!u(e,{after:t})){n.ignoreMatch()}}let s;const c=e.input.substring(t);if(s=c.match(/^\s*=/)){n.ignoreMatch();return}if(s=c.match(/^\s+extends\s+/)){if(s.index===0){n.ignoreMatch();return}}}};const E={$pattern:e,keyword:n,literal:t,built_in:o,"variable.language":r};const f="[0-9](_?[0-9])*";const A=`\\.(${f})`;const y=`0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;const _={className:"number",variants:[{begin:`(\\b(${y})((${A})|\\.)?|(${A}))`+`[eE][+-]?(${f})\\b`},{begin:`\\b(${y})\\b((${A})\\b|\\.)?|(${A})\\b`},{begin:`\\b(0|[1-9](_?[0-9])*)n\\b`},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0};const h={className:"subst",begin:"\\$\\{",end:"\\}",keywords:E,contains:[]};const N={begin:"html`",end:"",starts:{end:"`",returnEnd:false,contains:[i.BACKSLASH_ESCAPE,h],subLanguage:"xml"}};const p={begin:"css`",end:"",starts:{end:"`",returnEnd:false,contains:[i.BACKSLASH_ESCAPE,h],subLanguage:"css"}};const v={begin:"gql`",end:"",starts:{end:"`",returnEnd:false,contains:[i.BACKSLASH_ESCAPE,h],subLanguage:"graphql"}};const S={className:"string",begin:"`",end:"`",contains:[i.BACKSLASH_ESCAPE,h]};const w=i.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:true,excludeBegin:true,relevance:0},{className:"variable",begin:b+"(?=\\s*(-)|$)",endsParent:true,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]});const O={className:"comment",variants:[w,i.C_BLOCK_COMMENT_MODE,i.C_LINE_COMMENT_MODE]};const R=[i.APOS_STRING_MODE,i.QUOTE_STRING_MODE,N,p,v,S,{match:/\$\d+/},_];h.contains=R.concat({begin:/\{/,end:/\}/,keywords:E,contains:["self"].concat(R)});const k=[].concat(O,h.contains);const I=k.concat([{begin:/\(/,end:/\)/,keywords:E,contains:["self"].concat(k)}]);const T={className:"params",begin:/\(/,end:/\)/,excludeBegin:true,excludeEnd:true,keywords:E,contains:I};const x={variants:[{match:[/class/,/\s+/,b,/\s+/,/extends/,/\s+/,l.concat(b,"(",l.concat(/\./,b),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,b],scope:{1:"keyword",3:"title.class"}}]};const C={relevance:0,match:l.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...a,...s]}};const M={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/};const B={variants:[{match:[/function/,/\s+/,b,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[T],illegal:/%/};const $={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function Z(e){return l.concat("(?!",e.join("|"),")")}const D={match:l.concat(/\b/,Z([...c,"super","import"]),b,l.lookahead(/\(/)),className:"title.function",relevance:0};const z={begin:l.concat(/\./,l.lookahead(l.concat(b,/(?![0-9A-Za-z$_(])/))),end:b,excludeBegin:true,keywords:"prototype",className:"property",relevance:0};const U={match:[/get|set/,/\s+/,b,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},T]};const L="(\\("+"[^()]*(\\("+"[^()]*(\\("+"[^()]*"+"\\)[^()]*)*"+"\\)[^()]*)*"+"\\)|"+i.UNDERSCORE_IDENT_RE+")\\s*=>";const P={match:[/const|var|let/,/\s+/,b,/\s*/,/=\s*/,/(async\s*)?/,l.lookahead(L)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[T]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:E,exports:{PARAMS_CONTAINS:I,CLASS_REFERENCE:C},illegal:/#(?![$_A-z])/,contains:[i.SHEBANG({label:"shebang",binary:"node",relevance:5}),M,i.APOS_STRING_MODE,i.QUOTE_STRING_MODE,N,p,v,S,O,{match:/\$\d+/},_,C,{className:"attr",begin:b+l.lookahead(":"),relevance:0},P,{begin:"("+i.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[O,i.REGEXP_MODE,{className:"function",begin:L,returnBegin:true,end:"\\s*=>",contains:[{className:"params",variants:[{begin:i.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:true},{begin:/\(/,end:/\)/,excludeBegin:true,excludeEnd:true,keywords:E,contains:I}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:d.begin,end:d.end},{match:g},{begin:m.begin,"on:begin":m.isTrulyOpeningTag,end:m.end}],subLanguage:"xml",contains:[{begin:m.begin,end:m.end,skip:true,contains:["self"]}]}]},B,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+i.UNDERSCORE_IDENT_RE+"\\("+"[^()]*(\\("+"[^()]*(\\("+"[^()]*"+"\\)[^()]*)*"+"\\)[^()]*)*"+"\\)\\s*\\{",returnBegin:true,label:"func.def",contains:[T,i.inherit(i.TITLE_MODE,{begin:b,className:"title.function"})]},{match:/\.\.\./,relevance:0},z,{match:"\\$"+b,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[T]},D,$,x,U,{match:/\$[(.]/}]}}var l=i;Object.defineProperty(l,"__"+"esModule",{value:true});return l});
//# sourceMappingURL=javascript.js.map