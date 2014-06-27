define(['Chance', 'mocha', 'chai', 'underscore'], function (Chance, mocha, chai, _) {
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

                _.forEach(positions, function(position, index) {
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
                _(1000).times(function () {
                    var arr = chance.unique(chance.email, 25, {domain: "example.com"});
                    expect(arr).to.be.an('array');
                    expect(arr[0]).to.match(/example\.com$/);
                    expect(_.uniq(arr).length).to.equal(25);
                });
            });

            it("throws a RangeError when num is likely out of range", function () {
                _(1000).times(function () {
                    expect(function () {
                        chance.unique(chance.character, 10, {pool: 'abcde'});
                    }).to.throw(RangeError, /too large/);
                });
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
});
