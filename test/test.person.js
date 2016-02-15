/// <reference path="../chance.js" />
/// <reference path="../node_modules/underscore/underscore-min.js" />

var expect = chai.expect;

describe("Person", function () {
    var name, first, last, nationality, prefix, suffix, ssn, chance = new Chance();

    describe("age()", function () {
        it("returns a random age within expected bounds", function () {
            _(1000).times(function () {
                expect(chance.age()).to.be.a('number');
                expect(chance.age()).to.be.within(1, 100);
            });
        });

        describe("ranges", function() {
            var age;

            it("child", function () {
                _(1000).times(function () {
                    age = chance.age({ type: 'child' });
                    expect(age).to.be.a('number');
                    expect(age).to.be.within(1, 12);
                });
            });

            it("teen", function () {
                _(1000).times(function () {
                    age = chance.age({ type: 'teen' });
                    expect(age).to.be.a('number');
                    expect(age).to.be.within(13, 19);
                });
            });

            it("adult", function () {
                _(1000).times(function () {
                    age = chance.age({ type: 'adult' });
                    expect(age).to.be.a('number');
                    expect(age).to.be.within(18, 65);
                });
            });

            it("senior", function () {
                _(1000).times(function () {
                    age = chance.age({ type: 'senior' });
                    expect(age).to.be.a('number');
                    expect(age).to.be.within(65, 100);
                });
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

        it("can have the suffix specified", function () {
            _(1000).times(function () {
                name = chance.name({suffix: true});
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

    describe("nationality()", function () {
        it("returns a nationality that looks right", function () {
            _(1000).times(function () {
                nationality = chance.nationality();
                expect(nationality).to.be.a('string');
                expect(nationality).to.have.length.above(3);
                expect(nationality).to.have.length.below(26);
            });
        });
    });

    describe("suffix()", function () {
        it("returns a random suffix", function () {
            _(1000).times(function () {
                suffix = chance.suffix();
                expect(suffix).to.be.a('string');
                expect(suffix).to.have.length.below(7);
            });
        });

        it("can get full suffix", function () {
            _(1000).times(function () {
                suffix = chance.suffix({full: true});
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

        it("can get just last 4", function () {
            _(1000).times(function () {
                ssn = chance.ssn({ ssnFour: true });
                expect(ssn).to.be.a('string');
                expect(ssn).to.match(/^\d{4}$/m);
                expect(ssn).to.have.length(4);
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

    describe("israelId()",function(){
        it("Should return a valid israel ID",function(){
            _(1000).times(function () {
                var x=chance.israelId();
                expect(x).to.have.length(9);
                var y=0;
                for (var i=0;i<8;i++){
                        var thisDigit=  x[i] *  (i/2===parseInt(i/2) ? 1 : 2);
                        thisDigit=chance.pad(thisDigit,2).toString();
                        thisDigit=parseInt(thisDigit[0]) + parseInt(thisDigit[1]);
                        y=y+thisDigit;
                        }
                var lastDigit=(10-parseInt(y.toString().slice(-1)).toString().slice(-1)).toString().slice(-1);
                expect(x[8]).to.equal(lastDigit);
            });
        });
    });

    describe('mrz()', function() {
        it('should return a valid passport number when given valid inputs', function() {
            var sample = "P<GBRFOLKS<<JOANNE<<<<<<<<<<<<<<<<<<<<<<<<<<2321126135GBR6902069F1601013<<<<<<<<<<<<<<02",
                actual = chance.mrz({
                    first: 'Joanne',
                    last: 'Folks',
                    gender: 'F',
                    dob: '690206',
                    expiry: '160101',
                    passportNumber: '232112613',
                });

            expect(actual).to.equal(sample);

            sample = "P<GBRKELLY<<LIDA<<<<<<<<<<<<<<<<<<<<<<<<<<<<3071365913GBR6606068F2003131<<<<<<<<<<<<<<04";
            actual = chance.mrz({
                first: 'Lida',
                last: 'Kelly',
                gender: 'F',
                dob: '660606',
                expiry: '200313',
                passportNumber: '307136591',
            });

            expect(actual).to.equal(sample);
        });
        it('should return a valid random passport number when not given any inputs', function() {
            var actual = chance.mrz();
            expect(actual).to.be.a.string;
            expect(actual.substr(0, 5)).to.equal('P<GBR');
            expect(actual).to.have.length(88);
            expect(actual.substr(44)).to.match(/^[A-Z0-9<]{9}[0-9]{1}[A-Z]{3}[0-9]{7}[A-Z]{1}[0-9]{7}[A-Z0-9<]{14}[0-9]{2}$/);
        });
    });
});
