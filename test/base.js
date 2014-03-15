require.config({
    paths: {
        'Chance': '../chance',
        'chai': 'lib/chai/chai',
        'mocha': 'lib/mocha/mocha',
        'underscore': 'lib/lodash/dist/lodash'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'mocha': {
            init: function () {
                this.mocha.setup({
                    ui: 'bdd',
                    ignoreLeaks: true,
                    timeout: 5000 // ms
                });
                return this.mocha;
            }
        }
    }
});

require(['mocha', 'chai'], function (mocha, chai) {
    var assert = chai.assert;
    require(['test.address', 'test.basic', 'test.finance', 'test.helpers', 'test.misc', 'test.person', 'test.text', 'test.time', 'test.web'], function () {
        mocha.reporter('html');

        // Start runner
        if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
        else { mocha.run(); }
    });
}, function (err) {
    console.log(err);
});
