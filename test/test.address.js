define(['Chance', 'mocha', 'chai', 'underscore'], function (Chance, mocha, chai, _) {
    var assert = chai.assert,
        expect = chai.expect;

    describe("Address", function () {
        var zip, suffix, chance = new Chance();

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

        describe("Street", function () {
            it("street suffixes returns the suffix array", function () {
                suffixes = chance.street_suffixes();
                expect(suffixes).to.be.an('array');
            });

            it("street suffixes are short", function () {
                _(1000).times(function () {
                    suffixes = chance.street_suffixes();
                    expect(suffixes[0].length).to.be.below(5);
                });
            });

            it("full street suffixes returns the suffix array", function () {
                suffixes = chance.street_suffixes({full: true});
                expect(suffixes).to.be.an('array');
            });

            it("full street suffixes are longish", function () {
                _(1000).times(function () {
                    suffixes = chance.street_suffixes();
                    expect(suffixes[0].length).to.be.above(2);
                });
            });

            it("street suffix returns a single suffix", function () {
                _(1000).times(function () {
                    suffix = chance.street_suffix();
                    expect(suffix.length).to.be.below(5);
                });
            });

        });
    });
});
