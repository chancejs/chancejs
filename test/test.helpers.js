/// <reference path="../chance.js" />
/// <reference path="../node_modules/underscore/underscore-min.js" />

var expect = chai.expect;

describe("Helpers", function () {
    var word, arr, picked, chance = new Chance();

    describe("capitalize works as expected", function () {
        it("returns a random name", function () {
            _(1000).times(function () {
                word = chance.capitalize(chance.word());
                expect(word).to.be.a('string');
                expect(word[0]).to.match(/[A-Z]/);
            });
        });
    });

    describe("pick()", function () {
        it("returns a single element when called without a count argument", function () {
            arr = ['a', 'b', 'c', 'd'];
            _(1000).times(function () {
                picked = chance.pick(arr);
                expect(picked).to.have.length(1);
            });
        });

        it("returns multiple elements when called with a count argument", function () {
            arr = ['a', 'b', 'c', 'd'];
            _(1000).times(function () {
                picked = chance.pick(arr, 3);
                expect(picked).to.have.length(3);
            });
        });

        it("doesn't destroy the original array when called with a count argument", function () {
            arr = ['a', 'b', 'c', 'd', 'e', 'f'];
            _(1000).times(function () {
                picked = chance.pick(arr, 3);
                expect(arr).to.have.length(6);
            });
        });

        it("throws good error if zero elements in array", function () {
            arr = [];
            expect(function () {
                chance.pick(arr);
            }).to.throw(RangeError, "Chance: Cannot pick() from an empty array");
        });
    });

    describe("pickone()", function () {
        it("returns a single element", function () {
            arr = ['a', 'b', 'c', 'd'];
            _(1000).times(function () {
                picked = chance.pickone(arr);
                expect(picked).to.have.length(1);
                expect(picked).to.not.be.an('array');
            });
        });
  
        it("throws good error if zero elements in array", function () {
            arr = [];
            expect(function () {
                chance.pickone(arr);
            }).to.throw(RangeError, "Chance: Cannot pickone() from an empty array");
        });
    });

    describe("pickset()", function () {
        it("returns an empty array when count is 0", function () {
            arr = ['a', 'b', 'c', 'd'];
            _(1000).times(function () {
                picked = chance.pickset(arr,0);
                expect(picked).to.have.length(0);
                expect(picked).to.be.an('array');
            });
        });

        it("throws good error if zero elements in array", function () {
            arr = [];
            expect(function () {
                chance.pickset(arr);
            }).to.throw(RangeError, "Chance: Cannot pickset() from an empty array");
        });

        it("returns single element array if count is not passed", function () {
            arr = ['a', 'b', 'c', 'd'];
            _(1000).times(function () {
                picked = chance.pickset(arr);
                expect(picked).to.have.length(1);
                expect(picked).to.be.an('array');
            });
        });

        it("throws good error if count is not positive number", function () {
            arr = ['a', 'b', 'c', 'd'];
            expect(function () {
                chance.pickset(arr,-1);
            }).to.throw(RangeError, "Chance: count must be positive number");
        });

        it("returns single element array when called with a count argument == 1", function () {
            arr = ['a', 'b', 'c', 'd'];
            _(1000).times(function () {
                picked = chance.pickset(arr, 1);
                expect(picked).to.have.length(1);
                expect(picked).to.be.an('array');
            });
        });

        it("returns multiple elements when called with a count argument > 1", function () {
            arr = ['a', 'b', 'c', 'd'];
            _(1000).times(function () {
                picked = chance.pickset(arr, 3);
                expect(picked).to.have.length(3);
                expect(picked).to.be.an('array');
            });
        });

        it("doesn't destroy the original array when called with a count argument", function () {
            arr = ['a', 'b', 'c', 'd', 'e', 'f'];
            _(1000).times(function () {
                picked = chance.pickset(arr, 3);
                expect(arr).to.have.length(6);
                expect(picked).to.be.an('array');
            });
        });
    });

    describe("weighted()", function () {
        this.timeout(10000);
        it("returns an element", function () {
            _(1000).times(function () {
                picked = chance.weighted(['a', 'b', 'c', 'd'], [1, 1, 1, 1]);
                expect(picked).to.be.a('string');
            });
        });

        it("works with just 2 items", function() {
            // Use Math.random as the random function rather than our Mersenne twister just to
            //   speed things up here because this test takes awhile to gather enough data to
            //   have a large enough sample size to adequately test. This increases speed
            //   by a few orders of magnitude at the cost of repeatability (which we aren't using here)
            var chance = new Chance(Math.random);
            var picked = { a: 0, b: 0 };
            // This makes it a tad slow, but we need a large enough sample size to adequately test
            _(50000).times(function () {
                picked[chance.weighted(['a', 'b'], [1, 100])]++;
            });

            // This range is somewhat arbitrary, but good enough to test our constraints
            expect(picked.b / picked.a).to.be.within(80, 120);

            picked = { a: 0, b: 0 };
            // This makes it a tad slow, but we need a large enough sample size to adequately test
            _(50000).times(function () {
                picked[chance.weighted(['a', 'b'], [100, 1])]++;
            });

            // This range is somewhat arbitrary, but good enough to test our constraints
            expect(picked.a / picked.b).to.be.within(80, 120);
        });

        it("throws an error if called with an array of weights with length different from options", function() {
            expect(function () {
                chance.weighted(['a', 'b', 'c', 'd'], [1, 2, 3]);
            }).to.throw(RangeError, /length of array and weights must match/);

            expect(function () {
                chance.weighted(['a', 'b', 'c', 'd'], [1, 2, 3, 4]);
            }).to.not.throw(RangeError, /length of array and weights must match/);

            expect(function () {
                chance.weighted(['a', 'b', 'c', 'd'], [1, 2, 3, 4, 5]);
            }).to.throw(RangeError, /length of array and weights must match/);
        });

        it("returns with results properly weighted", function() {
            // Use Math.random as the random function rather than our Mersenne twister just to
            //   speed things up here because this test takes awhile to gather enough data to
            //   have a large enough sample size to adequately test. This increases performance
            //   by a few orders of magnitude
            var chance = new Chance(Math.random);
            _(10).times(function() {
                var picked = { a: 0, b: 0, c: 0, d: 0 };
                // This makes it a tad slow, but we need a large enough sample size to adequately test
                _(50000).times(function () {
                    picked[chance.weighted(['a', 'b', 'c', 'd'], [1, 100, 100, 1])]++;
                });

                // This range is somewhat arbitrary, but good enough to test our constraints
                expect(picked.b / picked.a).to.be.within(60, 140);
                expect(picked.c / picked.d).to.be.within(60, 140);
                expect((picked.c / picked.b) * 100).to.be.within(50, 150);
            });
        });

        it("works with fractional weights", function() {
            // Use Math.random as the random function rather than our Mersenne twister just to
            //   speed things up here because this test takes awhile to gather enough data to
            //   have a large enough sample size to adequately test. This increases performance
            //   by a few orders of magnitude
            var chance = new Chance(Math.random);
            _(10).times(function() {
                var picked = { a: 0, b: 0, c: 0, d: 0 };
                // This makes it a tad slow, but we need a large enough sample size to adequately test
                _(50000).times(function () {
                    picked[chance.weighted(['a', 'b', 'c', 'd'], [0.001, 0.1, 0.1, 0.001])]++;
                });

                // This range is somewhat arbitrary, but good enough to test our constraints
                expect(picked.b / picked.a).to.be.within(60, 140);
                expect(picked.c / picked.d).to.be.within(60, 140);
                expect((picked.c / picked.b) * 100).to.be.within(50, 150);
            });
        });

        it("works with weights of 0", function () {
            picked = chance.weighted(['a', 'b', 'c'], [1, 0, 1]);
            expect(picked).to.be.a('string');
        });

        it("works with negative weights", function () {
            picked = chance.weighted(['a', 'b', 'c'], [1, -2, 1]);
            expect(picked).to.be.a('string');
        });
    });

    describe("shuffle()", function () {
        it("returns an array of the same size", function () {
            arr = ['a', 'b', 'c', 'd', 'e'];
            _(1000).times(function () {
                expect(chance.shuffle(_.clone(arr))).to.have.length(5);
                expect(chance.shuffle(_.clone(arr))).to.contain('a');
                var arr2 = _.clone(arr);
                chance.shuffle(arr2);
                expect(arr2).to.not.be.empty;
            });
        });

        it("returns a well shuffled array", function () {
            // See http://vq.io/1lEhbim checking it isn't doing that!
            arr = ['a', 'b', 'c', 'd', 'e'];
            var positions = {
                a: [0, 0, 0, 0, 0],
                b: [0, 0, 0, 0, 0],
                c: [0, 0, 0, 0, 0],
                d: [0, 0, 0, 0, 0],
                e: [0, 0, 0, 0, 0]
            };

            _(10000).times(function () {
                arr = chance.shuffle(arr);

                // Accumulate the position of the a each time
                arr.forEach(function(item, index) {
                    positions[item][index]++;
                });
            });

            // Divide by the estimated number of a's which should appear in each
            // position
            _.forEach(positions, function(position, index) {
                positions[index] = _.map(position, function(item) {
                    return item/10000;
                });
            });

            _.forEach(positions, function(position) {
                _.forEach(position, function(item) {
                    // This should be around 20% give or take a bit since there are
                    // 5 elements and they should be evenly distributed
                    expect(item).to.be.within(0.18, 0.22);
                });
            });
        });
    });

    describe("unique", function () {
        it("gives a unique array of the selected function", function () {
            _(500).times(function () {
                var arr = chance.unique(chance.character, 25, {pool: "abcdefghijklmnopqrstuvwxyz"});
                expect(arr).to.be.an('array');
                expect(_.uniq(arr).length).to.equal(25);
            });
        });

        it("works properly with options", function () {
            _(500).times(function () {
                var arr = chance.unique(chance.date, 20, { year: 2016 });
                expect(arr).to.be.an('array');
                expect(_.uniq(arr).length).to.equal(20);
            });
        });

        it("throws a RangeError when num is likely out of range", function () {
            expect(function () {
                chance.unique(chance.character, 10, {pool: 'abcde'});
            }).to.throw(RangeError, /too large/);
        });

        it("throws a RangeError when first argument is not a function", function () {
            expect(function () {
                chance.unique(chance.character({pool: 'abcde'}), 10);
            }).to.throw(RangeError, /first argument must be a function/);
        });

        it("will take a custom comparator for comparing complex objects", function () {
            _(1000).times(function () {
                var arr = chance.unique(chance.currency, 25, {
                    comparator: function(arr, val) {
                        // If this is the first element, we know it doesn't exist
                        if (arr.length === 0) {
                            return false;
                        }

                        return arr.reduce(function(acc, item) {
                            // If a match has been found, short circuit check and just return
                            if (acc) {
                                return acc;
                            }
                            return item.name === val.name;
                        }, false);
                    }
                });
                expect(_.uniq(arr).length).to.equal(25);
            });
        });

        it("works without a third argument", function () {
            _(200).times(function() {
                expect(chance.unique(chance.character, 10)).to.be.an('array');
            });
        });
    });

    describe("n random terms", function () {
        it("gives an array of n terms for the given function", function () {
            var arr = chance.n(chance.email, 25, {domain: "example.com"});
            expect(arr).to.be.an('array');
            expect(arr[0]).to.match(/example\.com$/);
            expect(arr.length).to.equal(25);
        });

        it("gives an array of 1 term when n is not given", function () {
            var arr = chance.n(chance.email);
            expect(arr).to.be.an('array');
            expect(arr.length).to.equal(1);
        });

        it("throws a RangeError when first argument is not a function", function () {
            expect(function () {
                chance.n(chance.character({pool: 'abcde'}), 10);
            }).to.throw(RangeError, /first argument must be a function/);
        });

        it("gives an empty array when n is set to 0", function () {
            var arr = chance.n(chance.email, 0);
            expect(arr).to.be.an('array');
            expect(arr.length).to.equal(0);
        });
    });

    describe("pad()", function () {
        it("always returns same number when width same as the length of the number", function () {
            _(1000).times(function () {
                var num = chance.natural({min: 10000, max: 99999});
                expect(chance.pad(num, 5)).to.be.a('string');
                expect(chance.pad(num, 5)).to.have.length(5);
            });
        });

        it("will pad a smaller number to the right width", function () {
            _(1000).times(function () {
                var num = chance.natural({max: 99999});
                expect(chance.pad(num, 10)).to.be.a('string');
                expect(chance.pad(num, 10)).to.have.length(10);
                expect(chance.pad(num, 10).indexOf('00000')).to.not.equal(-1);
            });
        });

        it("can specify pad element", function () {
            _(1000).times(function () {
                var num = chance.natural({max: 99999});
                expect(chance.pad(num, 10, 'V')).to.be.a('string');
                expect(chance.pad(num, 10, 'V')).to.have.length(10);
                expect(chance.pad(num, 10, 'V').indexOf('VVVVV')).to.not.equal(-1);
            });
        });
    });

});
