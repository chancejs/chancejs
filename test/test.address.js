define(['Chance', 'mocha', 'chai', 'underscore'], function (Chance, mocha, chai, _) {
    var assert = chai.assert,
        expect = chai.expect;

    describe("Address", function () {
        var zip, chance = new Chance();

        describe("Zip", function () {
            it("returns a valid basic zip code", function () {
                _(1000).times(function () {
                    zip = chance.zip();
                    expect(zip.length).to.equal(5);
                    expect(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip)).to.be.true;
                });
            });

            it("returns a valid zip+4 code", function () {
                _(1000).times(function () {
                    zip = chance.zip({plusfour: true});
                    expect(zip.length).to.equal(10);
                    expect(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip)).to.be.true;
                });
            });
        });
    });
});
