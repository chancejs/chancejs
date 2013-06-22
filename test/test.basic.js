define(['Chance', 'mocha', 'chai', 'underscore'], function (Chance, mocha, chai, _) {
    var assert = chai.assert,
        expect = chai.expect;

    describe("Basics", function () {
        var bool, integer, natural, chance = new Chance();

        describe("Bool", function () {
            it("returns a random boolean", function () {
                bool = chance.bool();
                assert.isBoolean(bool);
                assert.isNotNumber(bool);
                assert.isNotString(bool);
            });

            it("is within the bounds of what we'd call random", function () {
                var true_count = 0;
                _(1000).times(function () {
                    bool = chance.bool();
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
                integer = chance.integer();
                assert.isNotBoolean(integer);
                assert.isNumber(integer);
                assert.isNotString(integer);
            });

            it("is sometimes negative, sometimes positive", function () {
                var positive_count = 0;
                _(1000).times(function () {
                    integer = chance.integer();
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
                natural = chance.natural();
                assert.isNotBoolean(natural);
                assert.isNumber(natural);
                assert.isNotString(natural);
            });

            it("is always positive", function () {
                var positive_count = 0;
                _(1000).times(function () {
                    natural = chance.natural();
                    if (natural > 0) {
                        positive_count++;
                    }
                });

                expect(positive_count).to.equal(1000);
            });
        });
    });

    describe("Seed", function () {
        var seed, chance1, chance2;

        describe("random", function () {
            it("does not return repeatable results if no seed provided", function (done) {
                chance1 = new Chance();
                // Wait 5 ms before creating chance2 else sometimes they happen on the same
                // tick and end up with the same seed!
                setTimeout(function () {
                    chance2 = new Chance();
                    _(1000).times(function () {
                        expect(chance1.random()).to.not.equal(chance2.random());
                    });
                    done();
                }, 5);
            });

            it("returns repeatable results if seed provided on the Chance object", function () {
                seed = new Date().getTime();
                chance1 = new Chance(seed);
                chance2 = new Chance(seed);

                _(1000).times(function () {
                    expect(chance1.random()).to.equal(chance2.random());
                });
            });
        });
    });

});
