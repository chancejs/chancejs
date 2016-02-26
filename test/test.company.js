/// <reference path="../chance.js" />
/// <reference path="../node_modules/underscore/underscore-min.js" />

var expect = chai.expect;

describe("Company", function () {
    var chance = new Chance();

    describe("cnpj()", function () {
        var cnpj;
        it("returns a random valid taxpayer number for Brazil companies (CNPJ)", function () {
            _(1000).times(function () {
                cnpj = chance.cnpj();
                expect(cnpj).to.be.a('string');
                expect(cnpj).to.match(/^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/m);
                expect(cnpj).to.have.length(18);
            });
        });
    });
});
