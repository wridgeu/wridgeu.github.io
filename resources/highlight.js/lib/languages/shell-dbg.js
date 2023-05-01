sap.ui.define((function () { 'use strict';

    (function() {
        const env = {"NODE_ENV":"production"};
        try {
            if (process) {
                process.env = Object.assign({}, process.env);
                Object.assign(process.env, env);
                return;
            }
        } catch (e) {} // avoid ReferenceError: process is not defined
        globalThis.process = { env:env };
    })();

    /** @type LanguageFn */
    function shell(hljs) {
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
            begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,
            starts: {
              end: /[^\\](?=\s*$)/,
              subLanguage: 'bash'
            }
          }
        ]
      };
    }

    var shell_1 = shell;

    Object.defineProperty(shell_1, "__" + "esModule", { value: true });

    return shell_1;

}));
