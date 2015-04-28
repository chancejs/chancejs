/// <reference path="../chance.js" />
/// <reference path="../node_modules/underscore/underscore-min.js" />

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

    it("rpg without a die roll throws an error", function () {
        expect(function() { chance.rpg(); }).to.throw(RangeError);
    });
});

describe("tv and radio", function() {
    it("radio works", function() {
        var radio;
        _(1000).times(function () {
            radio = chance.radio();
            expect(radio).to.be.a.string;
            expect(radio).to.have.length(4);
            expect(radio).to.match(/^[KW][A-Z][A-Z][A-Z]/);
        });
    });

    it("radio accepts east", function() {
        var radio;
        _(1000).times(function () {
            radio = chance.radio({ side: 'east' });
            expect(radio).to.be.a.string;
            expect(radio).to.have.length(4);
            expect(radio).to.match(/^W[A-Z][A-Z][A-Z]/);
        });
    });

    it("radio accepts west", function() {
        var radio;
        _(1000).times(function () {
            radio = chance.radio({ side: 'west' });
            expect(radio).to.be.a.string;
            expect(radio).to.have.length(4);
            expect(radio).to.match(/^K[A-Z][A-Z][A-Z]/);
        });
    });

    it("tv works", function() {
        var tv;
        _(1000).times(function () {
            tv = chance.tv();
            expect(tv).to.be.a.string;
            expect(tv).to.have.length(4);
            expect(tv).to.match(/^[KW][A-Z][A-Z][A-Z]/);
        });
    });
});

describe("Mac Address", function () {
    var mac, chance = new Chance();

    it("returns a proper mac address", function () {
        _(1000).times(function () {
            mac = chance.mac_address();
            expect(mac).to.match(/([0-9a-fA-F]){2}:([0-9a-fA-F]){2}:([0-9a-fA-F]){2}:([0-9a-fA-F]){2}:([0-9a-fA-F]){2}:([0-9a-fA-F]){2}/);
        });
    });

    it("returns a proper colon separated mac address", function () {
        _(1000).times(function () {
            mac = chance.mac_address({separator: ":"});
            expect(mac).to.match(/([0-9a-fA-F]){2}:([0-9a-fA-F]){2}:([0-9a-fA-F]){2}:([0-9a-fA-F]){2}:([0-9a-fA-F]){2}:([0-9a-fA-F]){2}/);
        });
    });

    it("returns a proper hyphen separated mac address", function () {
        _(1000).times(function () {
            mac = chance.mac_address({separator:"-"});
            expect(mac).to.match(/([0-9a-fA-F]){2}-([0-9a-fA-F]){2}-([0-9a-fA-F]){2}-([0-9a-fA-F]){2}-([0-9a-fA-F]){2}-([0-9a-fA-F]){2}/);
        });
    });

    it("returns a proper network version mac address", function () {
        _(1000).times(function () {
            mac = chance.mac_address({networkVersion:true});
            expect(mac).to.match(/([0-9a-fA-F]){4}.([0-9a-fA-F]){4}.([0-9a-fA-F]){4}/);
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

    it("returns a proper version 1 guid", function () {
        _(1000).times(function () {
            guid = chance.guid({version: 1});
            expect(guid).to.match(/([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-1([0-9a-fA-F]){3}-([ab89])([0-9a-fA-F]){3}-([0-9a-fA-F]){12}/);
        });
    });

    it("returns a proper version 2 guid", function () {
        _(1000).times(function () {
            guid = chance.guid({version: 2});
            expect(guid).to.match(/([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-2([0-9a-fA-F]){3}-([ab89])([0-9a-fA-F]){3}-([0-9a-fA-F]){12}/);
        });
    });

    it("returns a proper version 3 guid", function () {
        _(1000).times(function () {
            guid = chance.guid({version: 3});
            expect(guid).to.match(/([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-3([0-9a-fA-F]){3}-([ab89])([0-9a-fA-F]){3}-([0-9a-fA-F]){12}/);
        });
    });

    it("returns a proper version 4 guid", function () {
        _(1000).times(function () {
            guid = chance.guid({version: 4});
            expect(guid).to.match(/([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-4([0-9a-fA-F]){3}-([ab89])([0-9a-fA-F]){3}-([0-9a-fA-F]){12}/);
        });
    });

    it("returns a proper version 5 guid", function () {
        _(1000).times(function () {
            guid = chance.guid({version: 5});
            expect(guid).to.match(/([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-5([0-9a-fA-F]){3}-([ab89])([0-9a-fA-F]){3}-([0-9a-fA-F]){12}/);
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

describe("Mixin", function () {
    var chance = new Chance();
    it("exists", function () {
        expect(chance).to.have.property('mixin');
    });

    it("works with a simple function", function () {
        chance.mixin({
            'user': function () {
                return {
                    first: chance.first(),
                    last: chance.last(),
                    email: chance.email()
                };
            }
        });
        expect(chance).to.have.property('user');
        _(1000).times(function () {
            expect(chance.user()).to.be.ok;
            expect(chance.user()).to.have.property('first');
        });
    });

    it("multiple mixins work, can call previously defined mixins", function () {
        chance.mixin({
            'user': function () {
                return {
                    first: chance.first(),
                    last: chance.last(),
                    email: chance.email()
                };
            },
            'social_user': function () {
                var user = chance.user();
                user.network = chance.pick(['facebook', 'twitter']);
                return user;
            }
        });
        expect(chance).to.have.property('social_user');
        _(1000).times(function () {
            expect(chance.social_user()).to.be.ok;
            expect(chance.social_user()).to.have.property('first');
            expect(chance.social_user()).to.have.property('network');
        });
    });
});

describe("CNPJ", function () {
    var chance = new Chance();
    var cnpj;

    it("returns a valid Brazil company ID (CNPJ)", function () {
        _(1000).times(function () {
            cnpj = chance.cnpj();
            expect(cnpj).to.be.a('string');
            expect(cnpj).to.match(/^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/m);
            expect(cnpj).to.have.length(18);
        });
    });

});
