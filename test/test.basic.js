define(['Chance', 'mocha', 'chai'], function (Chance, mocha, chai) {
    var assert = chai.assert;

    describe("Basics", function() {
        var bool;

        it("returns a random boolean", function() {
            bool = Chance.bool();
            assert.isBoolean(bool);
            assert.isNotNumber(bool);
            assert.isNotString(bool);
        });
    });
});
