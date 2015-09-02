/// <reference path="../chance.js" />
/// <reference path="../node_modules/underscore/underscore-min.js" />

var expect = chai.expect;

describe("Regional", function () {
    var chance = new Chance();

    describe("Polish Specific", function () {
        var pesel, nip, regon;

        it("checks if generated PESEL numbers are correct", function () {
            _(1000).times(function () {
                pesel = chance.pl_pesel();
                expect(pesel).to.be.a('string');
                expect(pesel).to.have.length(11);
            });
        });

        it("checks if generated NIP numbers are correct", function () {
            _(1000).times(function () {
                nip = chance.pl_nip();
                expect(nip).to.be.a("string");
                expect(nip).to.have.length(10);
            });
        });

        it("checks if generated REGON numbers are correct", function () {
            _(1000).times(function () {
                regon = chance.pl_regon();
                expect(regon).to.be.a("string");
                expect(regon).to.have.length(9);
            });
        });
    });
});
