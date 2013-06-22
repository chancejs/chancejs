define(['Chance', 'mocha', 'chai', 'underscore'], function (Chance, mocha, chai, _) {
    var assert = chai.assert,
        expect = chai.expect;

    describe("Basics", function () {
        var bool, integer, natural;
        describe("Bool", function () {
            it("returns a random boolean", function () {
                bool = Chance.bool();
                assert.isBoolean(bool);
                assert.isNotNumber(bool);
                assert.isNotString(bool);
            });

            it("is within the bounds of what we'd call random", function () {
                var true_count = 0;
                _(1000).times(function () {
                    bool = Chance.bool();
                    if (bool) {
                        true_count++;
                    }
                });

                // Note: In very extreme circumstances this test may fail as, by its
                // nature it's random. But it's a low enough percentage that I'm
                // willing to accept it.
                expect(true_count).to.be.above(200);
                expect(true_count).to.be.below(800);
            });
        });

        describe("Integer", function () {
            it("returns a random integer", function () {
                integer = Chance.integer();
                assert.isNotBoolean(integer);
                assert.isNumber(integer);
                assert.isNotString(integer);
            });

            it("is sometimes negative, sometimes positive", function () {
                var positive_count = 0;
                _(1000).times(function () {
                    integer = Chance.integer();
                    if (integer > 0) {
                        positive_count++;
                    }
                });

                // Note: In very extreme circumstances this test may fail as, by its
                // nature it's random. But it's a low enough percentage that I'm
                // willing to accept it.
                expect(positive_count).to.be.above(200);
                expect(positive_count).to.be.below(800);
            });
        });

        describe("Natural", function () {
            it("returns a random natural", function () {
                natural = Chance.natural();
                assert.isNotBoolean(natural);
                assert.isNumber(natural);
                assert.isNotString(natural);
            });

            it("is always positive", function () {
                var positive_count = 0;
                _(1000).times(function () {
                    natural = Chance.natural();
                    if (natural > 0) {
                        positive_count++;
                    }
                });

                expect(positive_count).to.equal(1000);
            });
        });
    });
});
