define(['Chance', 'mocha', 'chai', 'underscore'], function (Chance, mocha, chai, _) {
    var expect = chai.expect;

    describe("Credit Card", function () {
        var type, number, chance = new Chance();

        describe("Luhn Check", function () {
            it("checks if number passes Luhn algorithm", function () {
                expect(chance.luhn_check(49927398716)).to.be.true;
                expect(chance.luhn_check(1234567812345670)).to.be.true;
                expect(chance.luhn_check(49927398717)).to.be.false;
                expect(chance.luhn_check(1234567812345678)).to.be.false;
            });
        });

        describe("Types", function () {
            it("cc_types() returns an array of credit card types", function () {
                expect(chance.cc_types()).to.be.an('array');
            });

            it("cc_type() returns a random credit card type", function () {
                _(1000).times(function () {
                    type = chance.cc_type();
                    expect(type).to.be.a("string");
                });
            });

            it("cc_type() can take a raw arg and obey it", function () {
                _(1000).times(function () {
                    type = chance.cc_type({ raw: true });
                    expect(type).to.have.property('name').with.a('string');
                    expect(type).to.have.property('prefix').with.a('string');
                    expect(type).to.have.property('length').with.a('number');
                });
            });

            it("cc_type() can take a name arg and obey to it", function () {
                _(1000).times(function () {
                    type = chance.cc_type({ name: "Visa", raw: true });
                    expect(type.name).to.equal("Visa");
                });
            });
        });

        describe("Number", function () {

            it("passes the Luhn algorithm", function () {
                _(1000).times(function () {
                    number = chance.cc_number();
                    expect(chance.luhn_check(number)).to.equal(true);
                });
            });

            it("cc_number() can take a type arg and obey to it", function () {
                _(1000).times(function () {
                    type = chance.cc_type({ raw: true });
                    number = chance.cc_number({ type: type.name });
                    expect(number).to.have.length(type.length);
                });
            });

        });

    });

});
