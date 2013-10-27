define(['Chance', 'mocha', 'chai', 'underscore'], function (Chance, mocha, chai, _) {
    var expect = chai.expect;

    describe("Person", function () {
        var age, name, first, last, prefix, chance = new Chance();

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

            it("can get full prefix", function () {
                _(1000).times(function () {
                    prefix = chance.name_prefix({full: true});
                    expect(prefix).to.be.a('string');
                    expect(prefix).to.have.length.above(3);
                });
            });
        });
    });
});
