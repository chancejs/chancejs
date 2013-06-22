define(['Chance', 'mocha', 'chai', 'underscore'], function (Chance, mocha, chai, _) {
    var assert = chai.assert,
        expect = chai.expect;

    describe("Basics", function () {
        var bool;

        it("returns a random boolean", function () {
            bool = Chance.bool();
            assert.isBoolean(bool);
            assert.isNotNumber(bool);
            assert.isNotString(bool);
        });

        it("is within the bounds of what we'd call random", function () {
            var true_count = 0;
            _(100).times(function () {
                bool = Chance.bool();
                if (bool) {
                    true_count++;
                }
            });

            // Note: In very extreme circumstances this test may fail as, by its
            // nature it's random. But it's a low enough percentage that I'm
            // willing to accept it.
            expect(true_count).to.be.above(20);
            expect(true_count).to.be.below(80);
        });
    });
});
