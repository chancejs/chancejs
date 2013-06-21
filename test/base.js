require.config({
    paths: {
        'Chance': '../chance',
        'mocha': '../node_modules/mocha/mocha',
        'chai': '../node_modules/chai/chai',

        // Test libraries
        'test.basic.js': 'test.basic'
    },
    shim: {
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
    require(['test.basic.js'], function () {
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
