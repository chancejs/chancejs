define(['Chance', 'mocha', 'chai', 'underscore'], function (Chance, mocha, chai, _) {
    var expect = chai.expect;

    describe("Person", function () {
        var name, first, last, prefix, suffix, ssn, chance = new Chance();

        describe("age()", function () {
            it("returns a random age within expected bounds", function () {
                _(1000).times(function () {
                    expect(chance.age()).to.be.a('number');
                    expect(chance.age()).to.be.within(1, 120);
                });
            });

            it("can have the type specified", function () {
                _(1000).times(function () {
                    expect(chance.age({type: 'child'})).to.be.within(1, 13);
                    expect(chance.age({type: 'senior'})).to.be.within(65, 120);
                });
            });
        });

        describe("birthday()", function () {
            it("returns a random birthday", function () {
                _(1000).times(function () {
                    expect(chance.birthday()).to.be.a('Date');
                    expect(chance.birthday().getFullYear()).to.be.within((new Date().getFullYear() - 120), (new Date().getFullYear()));
                });
            });

            it("can have a string returned", function () {
                _(1000).times(function () {
                    expect(chance.birthday({string: true})).to.be.a('string');
                    expect(chance.birthday({string: true})).to.match(/^[0-9][0-9]?\/[0-9][0-9]?\/[0-9]{4}/m);
                });
            });

            it("can have a year specified", function () {
                _(1000).times(function () {
                    expect(chance.birthday({year: 1983}).getFullYear()).to.equal(1983);
                });
            });

            it("can have an age range specified", function () {
                _(1000).times(function () {
                    expect(chance.birthday({type: 'child'}).getFullYear()).to.be.within((new Date().getFullYear() - 13), (new Date().getFullYear()));
                });
            });
        });

        describe("gender()", function () {
            it("returns a random gender", function () {
                _(1000).times(function () {
                    expect(chance.gender()).to.be.match(/(Male|Female)/);
                });
            });
        });

        describe("name()", function () {
            it("returns a random name", function () {
                _(1000).times(function () {
                    name = chance.name();
                    expect(name).to.be.a('string');
                    expect(name).to.have.length.within(2, 30);
                    expect(name.split(' ')).to.have.length(2);
                });
            });

            it("can have the middle name specified", function () {
                _(1000).times(function () {
                    name = chance.name({middle: true});
                    expect(name).to.be.a('string');
                    expect(name.split(' ')).to.have.length(3);
                });
            });

            it("can have the middle initial specified", function () {
                _(1000).times(function () {
                    name = chance.name({middle_initial: true});
                    expect(name).to.be.a('string');
                    expect(name.split(' ')).to.have.length(3);
                    expect(name.split(' ')[1]).to.match(/[A-Z]\./);
                    expect(name.indexOf('.')).to.be.ok;
                });
            });
            it("can have the prefix specified", function () {
                _(1000).times(function () {
                    name = chance.name({prefix: true});
                    expect(name).to.be.a('string');
                    expect(name.split(' ')).to.have.length(3);
                });
            });

        });

        describe("first()", function () {
            it("returns a random first name", function () {
                _(1000).times(function () {
                    first = chance.first();
                    expect(first).to.be.a('string');
                    expect(first).to.have.length.within(2, 20);
                    expect(first.split(' ')).to.have.length(1);
                });
            });

        });

        describe("last()", function () {
            it("returns a random last name", function () {
                _(1000).times(function () {
                    last = chance.last();
                    expect(last).to.be.a('string');
                    expect(last).to.have.length.within(2, 20);
                    expect(last.split(' ')).to.have.length(1);
                });
            });

        });

        describe("name_prefix()", function () {
            it("returns a random prefix", function () {
                _(1000).times(function () {
                    prefix = chance.name_prefix();
                    expect(prefix).to.be.a('string');
                    expect(prefix).to.have.length.below(5);
                });
            });

            it("returns a correctly gendered prefix", function () {
                _(1000).times(function () {
                    prefix = chance.name_prefix({ gender: "female" });
                    expect(prefix).to.not.equal("Mr.");
                    prefix = chance.name_prefix({ gender: "male" });
                    expect(prefix).to.not.equal("Mrs.");
                    expect(prefix).to.not.equal("Miss");
                });
            });

            it("can get full prefix", function () {
                _(1000).times(function () {
                    prefix = chance.name_prefix({full: true});
                    expect(prefix).to.be.a('string');
                    expect(prefix).to.have.length.above(3);
                });
            });
        });

        describe("name_suffix()", function () {
            it("returns a random suffix", function () {
                _(1000).times(function () {
                    suffix = chance.name_suffix();
                    expect(suffix).to.be.a('string');
                    expect(suffix).to.have.length.below(7);
                });
            });

            it("can get full suffix", function () {
                _(1000).times(function () {
                    suffix = chance.name_suffix({full: true});
                    expect(suffix).to.be.a('string');
                    expect(suffix).to.have.length.above(5);
                });
            });
        });

        describe("ssn()", function () {
            it("returns a random socal security number", function () {
                _(1000).times(function () {
                    ssn = chance.ssn();
                    expect(ssn).to.be.a('string');
                    expect(ssn).to.match(/^\d{3}-\d{2}-\d{4}$/m);
                    expect(ssn).to.have.length(11);
                });
            });
        });

        describe("cpf()", function () {
            var cpf;
            it("returns a random valid taxpayer number for Brazil citizens (CPF)", function () {
                _(1000).times(function () {
                    cpf = chance.cpf();
                    expect(cpf).to.be.a('string');
                    expect(cpf).to.match(/^\d{3}.\d{3}.\d{3}-\d{2}$/m);
                    expect(cpf).to.have.length(14);
                });
            });
        });
    });
});
