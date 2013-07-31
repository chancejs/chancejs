define(['Chance', 'mocha', 'chai', 'underscore'], function (Chance, mocha, chai, _) {
    var expect = chai.expect;

    describe("Dice", function () {
        var die, dice, chance = new Chance();

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

        it("returns a properly bounded d30", function () {
            _(1000).times(function () {
                die = chance.d30();
                expect(die).to.be.within(1, 30);
            });
        });

        it("returns a properly bounded d100", function () {
            _(1000).times(function () {
                die = chance.d100();
                expect(die).to.be.within(1, 100);
            });
        });

        it("rpg() appears to work as expected", function () {
            _(1000).times(function () {
                expect(function () { chance.rpg(); }).to.throw(Error);
                expect(function () { chance.rpg("3"); }).to.throw(Error);
                expect(function () { chance.rpg("hd23"); }).to.throw(Error);
                expect(function () { chance.rpg("3d23d2"); }).to.throw(Error);
                dice = chance.rpg('5d20');
                expect(dice).to.be.an.array;
                expect(dice).to.have.length(5);
                _.map(dice, function (die) {
                    expect(die).to.be.within(1, 20);
                });
            });
        });

        it("rpg() will take and obey a sum", function () {
            var rpg = 0;
            _(1000).times(function () {
                rpg = chance.rpg('4d20', {sum: true});
                expect(rpg).to.be.a.number;
                expect(rpg).to.be.within(4, 80);
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

    describe("Hash", function () {
        var hash, length, chance = new Chance();

        it("returns a proper hash", function () {
            _(1000).times(function () {
                hash = chance.hash();
                expect(hash).to.match(/([0-9a-f]){40}/);
                expect(hash).to.have.length(40);
            });
        });

        it("obeys length, if supplied", function () {
            _(1000).times(function () {
                length = chance.natural({min: 1, max: 64});
                hash = chance.hash({length: length});
                expect(hash).to.have.length(length);
            });
        });
    });
});
