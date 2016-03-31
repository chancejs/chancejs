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

    describe("Italian Specific", function (){
        var vat;

        describe("Luhn Check on Italian VAT number", function () {
            it("checks if number passes Luhn algorithm", function () {
                expect(chance.luhn_check(11203700015)).to.be.true;
                expect(chance.luhn_check('10384030010')).to.be.true;
                expect(chance.luhn_check(11401610016)).to.be.true;
                expect(chance.luhn_check(09105080015)).to.be.true;
                expect(chance.luhn_check(11203700011)).to.be.false;
                expect(chance.luhn_check(09105080010)).to.be.false;
            });
        });

        describe("Italian VAT number", function () {
            it("returns a VAT code of 11 digits", function () {
                _(1000).times(function () {
                    vat = chance.vat( { country: 'it' });
                    expect(vat).to.be.a("string");
                    expect(vat).to.have.length(11);
                    expect(vat[0]).to.be.within(0,1);
                });
            });
        });

        describe("Italian Codice Fiscale (SSN)", function () {
            it("returns a random CF", function () {
                _(1000).times(function () {
                    var cf = chance.cf();
                    expect(cf).to.be.a("string");
                    expect(cf).to.have.length(16);
                    expect(cf).to.match(/[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]/);
                });
            });
            it("checks the consistency of a specific CF", function () {
                expect(chance.cf( { first: 'Aldo', last: 'Fabrizi', gender: 'Male', birthday: new Date(1905,10,1), city: 'h501' } )).to.equal("FBRLDA05S01H501A");
                expect(chance.cf( { first: 'Sophia', last: 'Loren', gender: 'Female', birthday: new Date(1934,8,20), city: 'h501' } )).to.equal("LRNSPH34P60H501G");
                expect(chance.cf( { first: 'Claudia', last: 'Cardinale', gender: 'Female', birthday: new Date(1938,3,15), city: 'z352' } )).to.equal("CRDCLD38D55Z352Q");
                expect(chance.cf( { first: 'Sergio', last: 'Leone', gender: 'Male', birthday: new Date(1929,0,3), city: 'h501' } )).to.equal("LNESRG29A03H501W");
                expect(chance.cf( { first: 'Claudio', last: 'Marchisio', gender: 'Male', birthday: new Date(1986,0,19), city: 'l219' } )).to.equal("MRCCLD86A19L219F");
                expect(chance.cf( { first: 'Eu', last: 'Ho', gender: 'Male', birthday: new Date(2012,3,12), city: 'z210' } )).to.equal("HOXEUX12D12Z210Q");
            });
        });
    });
});
