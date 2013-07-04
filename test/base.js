require.config({
    paths: {
        'Chance': '../chance',
        'chai': '../node_modules/chai/chai',
        'mocha': '../node_modules/mocha/mocha',
        'underscore': '../node_modules/underscore/underscore'
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
    require(['test.basic', 'test.text', 'test.address', 'test.misc', 'test.web', 'test.name', 'test.helpers', 'test.finance', 'test.time'], function () {
        mocha.reporter('html');

        // Start runner
        if (window.mochaPhantomJS) {
            mochaPhantomJS.run();
        } else {
            mocha.run();
        }
    });
}, function (err) {
    console.log(err);
});
