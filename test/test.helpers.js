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
        });

    });
});
