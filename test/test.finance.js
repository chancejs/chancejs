define(['Chance', 'mocha', 'chai', 'underscore'], function (Chance, mocha, chai, _) {
    var expect = chai.expect;

    describe("Credit Card", function () {
        var type, number, exp, month, year, chance = new Chance();

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
                    expect(type).to.have.property('short_name').with.a('string');
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
                    number = chance.cc();
                    expect(chance.luhn_check(number)).to.equal(true);
                });
            });

            it("cc() can take a type arg and obey to it", function () {
                _(1000).times(function () {
                    type = chance.cc_type({ raw: true });
                    number = chance.cc({ type: type.name });
                    expect(number).to.have.length(type.length);
                });
            });

            it("cc() can take a short_name type arg and obey to it", function () {
                _(1000).times(function () {
                    type = chance.cc_type({ raw: true });
                    number = chance.cc({ type: type.short_name });
                    expect(number).to.have.length(type.length);
                });
            });
        });

        describe("Dollar", function () {
            var dollar, chance = new Chance();

            it("returns a proper dollar amount", function () {
                _(1000).times(function () {
                    dollar = chance.dollar();
                    expect(dollar).to.match(/\$[0-9]+\.[0-9]+/);
                    dollar = parseFloat(dollar.substring(1, dollar.length));
                    expect(dollar).to.be.below(10001);
                });
            });

            it("obeys min and max", function () {
                _(1000).times(function () {
                    dollar = chance.dollar({max: 20});
                    dollar = parseFloat(dollar.substring(1, dollar.length));
                    expect(dollar).to.not.be.above(20);
                });
            });
        });

        describe("currency", function () {
            var currency, chance = new Chance();

            it("returns a currency", function () {
                _(1000).times(function () {
                    currency = chance.currency();
                    expect(currency).to.be.an("object");
                    expect(currency.code).to.exist;
                    expect(currency.code.length).to.equal(3);
                    expect(currency.name).to.be.ok;
                });
            });

            it("returns a currency pair", function () {
                _(1000).times(function () {
                    var currency_pair = chance.currency_pair();
                    expect(currency_pair).to.be.an("array");
                    expect(currency_pair.length).to.equal(2);
                    expect(currency_pair[0].code).to.not.equal(currency_pair[1].code);
                });
            });
        });

        describe("Expiration", function () {
            it("exp() looks correct", function () {
                _(1000).times(function () {
                    exp = chance.exp();
                    expect(exp).to.be.a('string');
                    expect(exp).to.have.length(7);
                    expect(exp).to.match(/([0-9]{2})\/([0-9]{4})/);
                });
            });

            it("exp() will respect object argument", function () {
                _(1000).times(function () {
                    exp = chance.exp({raw: true});
                    expect(exp).to.be.an('object');
                    expect(exp).to.have.property('month').with.a('string');
                    expect(exp).to.have.property('year').with.a('string');
                });
            });

            it("exp_month() returns a numeric month with leading 0", function () {
                _(1000).times(function () {
                    month = chance.exp_month();
                    expect(month).to.be.a('string');
                    expect(month).to.have.length(2);
                });
            });

            it("exp_year() returns an expiration year", function () {
                _(1000).times(function () {
                    year = chance.exp_year();
                    expect(year).to.be.within(new Date().getFullYear(), new Date().getFullYear() + 10);
                });
            });
        });
    });
});
