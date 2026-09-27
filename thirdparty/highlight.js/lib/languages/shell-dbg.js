sap.ui.define((function () { 'use strict';

  /*
  Language: Shell Session
  Requires: bash.js
  Author: TSUYUSATO Kitsune <make.just.on@gmail.com>
  Category: common
  Audit: 2020
  */

  /** @type LanguageFn */
  function shell$1(hljs) {
    return {
      name: 'Shell Session',
      aliases: [
        'console',
        'shellsession'
      ],
      contains: [
        {
          className: 'meta.prompt',
          // We cannot add \s (spaces) in the regular expression otherwise it will be too broad and produce unexpected result.
          // For instance, in the following example, it would match "echo /path/to/home >" as a prompt:
          // echo /path/to/home > t.exe
          begin: /^\s{0,3}[./~\w\d[\]()@-]*[>%$#][ ]?/,
          starts: {
            end: /[^\\](?=\s*$)/,
            subLanguage: 'bash'
          }
        }
      ]
    };
  }

  var namedExports = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: shell$1
  });

  const defaultExports = Object.isFrozen(shell$1) ? Object.assign({}, shell$1?.default || shell$1 || { __emptyModule: true }) : shell$1;
  Object.keys(namedExports || {}).filter((key) => !defaultExports[key]).forEach((key) => defaultExports[key] = namedExports[key]);
  Object.defineProperty(defaultExports, "__" + "esModule", { value: true });
  var shell = Object.isFrozen(shell$1) ? Object.freeze(defaultExports) : defaultExports;

  return shell;

}));
