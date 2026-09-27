sap.ui.define((function () { 'use strict';

  /*
  Language: Plain text
  Author: Egor Rogov (e.rogov@postgrespro.ru)
  Description: Plain text without any highlighting.
  Category: common
  */

  function plaintext$1(hljs) {
    return {
      name: 'Plain text',
      aliases: [
        'text',
        'txt'
      ],
      disableAutodetect: true
    };
  }

  var namedExports = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: plaintext$1
  });

  const defaultExports = Object.isFrozen(plaintext$1) ? Object.assign({}, plaintext$1?.default || plaintext$1 || { __emptyModule: true }) : plaintext$1;
  Object.keys(namedExports || {}).filter((key) => !defaultExports[key]).forEach((key) => defaultExports[key] = namedExports[key]);
  Object.defineProperty(defaultExports, "__" + "esModule", { value: true });
  var plaintext = Object.isFrozen(plaintext$1) ? Object.freeze(defaultExports) : defaultExports;

  return plaintext;

}));
