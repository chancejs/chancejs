define(['Chance', 'mocha', 'chai', 'underscore'], function (Chance, mocha, chai, _) {
    var expect = chai.expect;

    describe("Credit Card", function () {
        var chance = new Chance();

        describe("Luhn Check", function () {
            it("checks if number passes Luhn algorithm", function () {
                expect(chance.luhn_check(49927398716)).to.equal(true);
                expect(chance.luhn_check(1234567812345670)).to.equal(true);
                expect(chance.luhn_check(49927398717)).to.equal(false);
                expect(chance.luhn_check(1234567812345678)).to.equal(false);
            });
        });

    });

});
