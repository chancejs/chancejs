define(['Chance', 'mocha', 'chai', 'underscore'], function (Chance, mocha, chai, _) {
    var expect = chai.expect;

    describe("Name", function () {
        var name, prefix, chance = new Chance();

        describe("name()", function () {
            it("returns a random name", function () {
                _(1000).times(function () {
                    name = chance.name();
                    expect(name).to.be.a('string');
                    expect(name).to.have.length.within(2, 20);
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

        });

        describe("prefix()", function () {
            it("returns a random prefix", function () {
                _(1000).times(function () {
                    prefix = chance.prefix();
                    expect(prefix).to.be.a('string');
                    expect(prefix).to.have.length.below(5);
                });
            });

            it("can get full prefix", function () {
                _(1000).times(function () {
                    prefix = chance.prefix({full: true});
                    expect(prefix).to.be.a('string');
                    expect(prefix).to.have.length.above(3);
                });
            });
        });
    });
});
