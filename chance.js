//  Chance.js 0.1
//  http://chancejs.com
//  (c) 2013 Victor Quinn
//  Chance may be freely distributed or modified under the MIT license.

(function () {

    var Chance = {
        VERSION: 0.1,

        // Building Blocks/Basics
        bool: function () {
            return Math.random() * 100 < 50;
        },
        natural: function() {
            // 9007199254740992 is the max integer number.
            return Math.floor(Math.random() * 9007199254740992);
        },
        integer: function() {
            // 9007199254740992 is the max integer number.
            var num = Math.floor(Math.random() * 9007199254740992);
            return this.bool() ? num : num * -1;
        },

        str: function (length) {
            var text = "";
            var possible = "abcdefghijklmnopqrstuvwxyz";

            for (var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            return text;
        }
    };


    // CommonJS module
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Chance;
        }
        exports.Chance = Chance;
    }

    // Register as a named AMD module
    if (typeof define === 'function' && define.amd) {
        define('Chance', [], function () {
            return Chance;
        });
    }

})();
