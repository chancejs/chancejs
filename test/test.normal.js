/* jshint newcap:false */
/// <reference path="../chance.js" />
/// <reference path="../node_modules/underscore/underscore-min.js" />

var expect = chai.expect;

describe("Normal Distribution", function () {
    var mean, stddev, norm, group, chance = new Chance();
    var pool = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    Math.mean = function(arr){
        return arr.reduce(function(a, b){return a+b;})/arr.length;
    };

    Math.stddev = function(arr){
        var mean = Math.mean(arr),
            deviation = arr.map(function(item){return (item-mean)*(item-mean);});
        return Math.sqrt(deviation.reduce(function(a, b){return a+b;})/arr.length);
    };

    describe("normal() works as expected with no parameters", function () {
        it("returns a number", function () {
            stddev = 1;
            mean = 0;

            _(1000).times(function () {
                norm = chance.normal();
                expect(norm).to.be.a('number');
            });
        });

        it("returns values fairly close to the expected standard deviation and mean", function () {
            stddev = 1;
            mean = 0;
            group = chance.n(chance.normal, 10000);

            expect(Math.abs(Math.mean(group) - mean)).to.be.below(stddev);
            expect(Math.abs(Math.stddev(group) - stddev)).to.be.below(stddev *0.05);
        });
    });

    describe("normal() works as expected with a custom mean and standard deviation", function () {
        it("returns a number", function () {
            stddev = 5;
            mean = 10;

            _(1000).times(function () {
                norm = chance.normal({ mean: mean, dev: stddev});
                expect(norm).to.be.a('number');
            });
        });

        it("returns values fairly close to the expected standard deviation and mean", function () {
            stddev = 5;
            mean = 10;
            group = chance.n(chance.normal, 10000, { mean: mean, dev: stddev});

            expect(Math.abs(Math.mean(group) - mean)).to.be.below(stddev);
            expect(Math.abs(Math.stddev(group) - stddev)).to.be.below(stddev *0.05);
        });
    });

    describe("normal() works as expected with a pool of custom values provided", function () {
        it("returns a string from a pool if passed a pool of strings", function () {
            stddev = 0.0000000001;
            mean = 2;

            _(1000).times(function () {
                norm = chance.normal({ mean: mean, dev: stddev, pool: pool});
                expect(pool).to.include(norm);
            });
        });

        it("recalculates and returns a value even if the normal() results in indexes outside the bounds of the pool", function () {
            stddev = 1.5;
            mean = 3;

            _(1000).times(function () {
                norm = chance.normal({ mean: mean, dev: stddev, pool: pool});
                expect(pool).to.include(norm);
            });
        });

        it("can be used with other chance functions", function () {
            stddev = 1;
            mean = 3;
            group = chance.n(chance.normal, 1000, { mean: mean, dev: stddev, pool: pool});

            expect(group).to.have.length(1000);
            expect(pool).to.include(group[0]);
            expect(pool).to.include(group[999]);
        });

        it("should produce a correctly distributed group of pool items", function () {
            stddev = 2;
            mean = 6;

            group = chance.n(chance.normal, 10000, {mean: mean, dev: stddev, pool: pool});
            var counts = _.countBy(group);

            expect(counts["Sunday"])
                .to.be.above(counts["Saturday"])
                .to.be.above(counts["Friday"])
                .to.be.above(counts["Thursday"])
                .to.be.above(counts["Wednesday"])
                .to.be.above(counts["Tuesday"])
                .to.be.above(counts["Monday"]);
        });

        it("should throw an error quickly if the user has provided bad pool/mean/dev values", function () {
            stddev = 5;
            mean = 200;
            var fn = function() {
                chance.normal({ mean: mean, dev: stddev, pool: pool});
            };

            expect(fn).to.throw(RangeError);
        });

        it("should throw an error if the pool provided is not an array", function () {
            var fn = function() {
                chance.normal({ pool: 'not an array'});
            };

            expect(fn).to.throw(RangeError);
        });

        it("should work with objects", function () {
            stddev = 1;
            mean = 1;
            group = chance.n(chance.normal, 50, { mean: mean, dev: stddev, pool: [
                { a: 1, b: 10},
                { a: 2, b: 20},
                { a: 3, b: 30}
            ]});

            expect(group).to.have.length(50);
            expect(group[0]).to.include.keys('a');
        });

    });

});
