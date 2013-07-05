define(['Chance', 'mocha', 'chai', 'underscore'], function (Chance, mocha, chai, _) {
    var expect = chai.expect;

    describe("Dice", function () {
        var die, chance = new Chance();

        it("returns a properly bounded d4", function () {
            _(1000).times(function () {
                die = chance.d4();
                expect(die).to.be.within(1, 4);
            });
        });

        it("returns a properly bounded d6", function () {
            _(1000).times(function () {
                die = chance.d6();
                expect(die).to.be.within(1, 6);
            });
        });

        it("returns a properly bounded d8", function () {
            _(1000).times(function () {
                die = chance.d8();
                expect(die).to.be.within(1, 8);
            });
        });

        it("returns a properly bounded d10", function () {
            _(1000).times(function () {
                die = chance.d10();
                expect(die).to.be.within(1, 10);
            });
        });

        it("returns a properly bounded d12", function () {
            _(1000).times(function () {
                die = chance.d12();
                expect(die).to.be.within(1, 12);
            });
        });

        it("returns a properly bounded d20", function () {
            _(1000).times(function () {
                die = chance.d20();
                expect(die).to.be.within(1, 20);
            });
        });

        it("returns a properly bounded d100", function () {
            _(1000).times(function () {
                die = chance.d100();
                expect(die).to.be.within(1, 100);
            });
        });
    });

    describe("Guid", function () {
        var guid, chance = new Chance();

        it("returns a proper guid", function () {
            _(1000).times(function () {
                guid = chance.guid();
                expect(guid).to.match(/([0-9a-fA-F]){8}(-([0-9a-fA-F]){4}){3}-([0-9a-fA-F]){12}/);
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
});
