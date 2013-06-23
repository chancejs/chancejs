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
});
