/* jshint newcap:false */
/// <reference path="../chance.js" />
/// <reference path="../node_modules/underscore/underscore-min.js" />

var expect = chai.expect;

describe("Basics", function () {
    var bool, integer, natural, floating, character, string, temp, chance = new Chance(),
        data, cData;

    describe("Data", function () {
        it("get data", function () {
            data = chance.get("lastNames");
            expect(data).to.be.an('array');
        });

        it("set custom data", function () {
            cData = {lastNames: ["customName", "testLast"]};
            chance.set(cData);
            data = chance.get("lastNames");
            expect(data).to.be.an('array');
            expect(data).to.have.length(2);
        });
    });

    describe("Bool", function () {
        it("returns a random boolean", function () {
            bool = chance.bool();
            expect(bool).to.be.a('boolean');
        });

        it("is within the bounds of what we'd call random", function () {
            var true_count = 0;
            _(1000).times(function () {
                bool = chance.bool();
                if (bool) {
                    true_count++;
                }
            });

            // Note: In very extreme circumstances this test may fail as, by its
            // nature it's random. But it's a low enough percentage that I'm
            // willing to accept it.
            // Award to anyone that calculates the actual probability of this
            // test failing and submits a pull request adding it to this comment!
            expect(true_count).to.be.within(200, 800);
        });

        it("takes and obeys likelihood", function () {
            var true_count = 0;
            _(1000).times(function () {
                if (chance.bool({likelihood: 30})) {
                    true_count++;
                }
            });

            // Expect it to average around 300
            expect(true_count).to.be.within(200, 400);

            true_count = 0;
            _(1000).times(function () {
                if (chance.bool({likelihood: 99})) {
                    true_count++;
                }
            });

            // Expect it to average at 990
            expect(true_count).to.be.above(900);
        });

        it("throws an error if likelihood < 0 or > 100", function () {
            expect(function () { chance.bool({likelihood: -23}); }).to.throw(RangeError);
            expect(function () { chance.bool({likelihood: 7933}); }).to.throw(RangeError);
        });
    });

    describe("Integer", function () {
        it("returns a random integer", function () {
            integer = chance.integer();
            expect(integer).to.be.a('number');
        });

        it("is sometimes negative, sometimes positive", function () {
            var positive_count = 0;
            _(1000).times(function () {
                integer = chance.integer();
                if (integer > 0) {
                    positive_count++;
                }
            });

            // Note: In very extreme circumstances this test may fail as, by its
            // nature it's random. But it's a low enough percentage that I'm
            // willing to accept it.
            expect(positive_count).to.be.within(200, 800);
        });

        it("can take a zero min and obey it", function () {
            _(1000).times(function () {
                integer = chance.integer({min: 0});
                expect(integer).to.be.above(0);
            });
        });

        it("can take a negative min and obey it", function () {
            _(1000).times(function () {
                integer = chance.integer({min: -25});
                expect(integer).to.be.above(-26);
            });
        });

        it("can take a negative min and negative max and obey both", function () {
            _(1000).times(function () {
                integer = chance.integer({min: -25, max: -1});
                expect(integer).to.be.within(-26, 0);
            });
        });

        it("can take a min with absolute value less than the max and return in range above", function () {
            var count = 0;
            _(1000).times(function () {
                // With a range this large we'd expect most values to be
                // greater than 1 if this works correctly.
                integer = chance.integer({min: -1, max: 1000000});
                if (Math.abs(integer) < 2) {
                    count++;
                }
            });
            expect(count).to.not.be.above(900);
        });

        it("throws an error if min > max", function () {
            expect(function () { chance.natural({min: 1000, max: 500}); }).to.throw(RangeError);
        });
    });

    describe("Natural", function () {
        it("returns a random natural", function () {
            natural = chance.natural();
            expect(natural).to.be.a('number');
        });

        it("throws an error if min < 0", function () {
            expect(function () { chance.natural({min: -23}); }).to.throw(RangeError);
        });

        it("is always positive", function () {
            var positive_count = 0;
            _(1000).times(function () {
                natural = chance.natural();
                if (natural > 0) {
                    positive_count++;
                }
            });

            expect(positive_count).to.equal(1000);
        });

        it("can take just a min and obey it", function () {
            _(1000).times(function () {
                natural = chance.natural({min: 9007199254740991});
                expect(natural).to.be.above(9007199254740990);
            });
        });

        it("can take just a max and obey it", function () {
            _(1000).times(function () {
                natural = chance.natural({max: 100});
                expect(natural).to.be.below(101);
            });
        });

        it("can take both a max and min and obey them both", function () {
            _(1000).times(function () {
                natural = chance.natural({min: 90, max: 100});
                expect(natural).to.be.within(89, 101);
            });
        });

        it("works with both bounds 0", function () {
            _(1000).times(function () {
                natural = chance.natural({min: 0, max: 0});
                expect(natural).to.equal(0);
            });
        });

        it("throws an error if min > max", function () {
            expect(function () { chance.natural({min: 1000, max: 500}); }).to.throw(RangeError);
        });
    });

    describe("Floating", function () {
        it("returns a random floating", function () {
            floating = chance.floating();
            expect(floating).to.be.a('number');
        });

        it("can take both a max and min and obey them both", function () {
            _(1000).times(function () {
                floating = chance.floating({min: 90, max: 100});
                expect(floating).to.be.within(90, 100);
            });
        });

        it("won't take fixed + min that would be out of range", function () {
            expect(function () { chance.floating({fixed: 13, min: -9007199254740992}); }).to.throw(RangeError);
        });

        it("won't take fixed + max that would be out of range", function () {
            expect(function () { chance.floating({fixed: 13, max: 9007199254740992}); }).to.throw(RangeError);
        });

        it("obeys the fixed parameter, when present", function () {
            _(100).times(function () {
                floating = chance.floating({fixed: 4});
                floating = floating.toString().split('.')[1] ? floating.toString().split('.')[1] : '';
                expect(floating).to.have.length.below(5);
            });
        });

        it("can take fixed and obey it", function () {
            _(1000).times(function () {
                floating = chance.floating({fixed: 3});
                temp = parseFloat(floating.toFixed(3));
                expect(floating).to.equal(temp);
            });
        });

        it("won't take both fixed and precision", function () {
            expect(function () { chance.floating({fixed: 2, precision: 8}); }).to.throw(RangeError);
        });
    });

    describe("Character", function () {
        it("returns a character", function () {
            character = chance.character();
            expect(character).to.be.a('string');
            expect(character).to.have.length(1);
        });

        it("pulls only from pool, when specified", function () {
            var pool = 'abcde';
            _(1000).times(function () {
                character = chance.character({pool: pool});
                expect(character).to.match(/[abcde]/);
            });
        });

        it("allows only alpha", function () {
            _(1000).times(function () {
                character = chance.character({alpha: true});
                expect(character).to.match(/[a-zA-Z]/);
            });

            expect(function () { chance.character({alpha: true, symbols: true}); }).to.throw(RangeError);
        });

        it("obeys case", function () {
            _(1000).times(function () {
                character = chance.character({alpha: true});
                expect(character).to.match(/[a-zA-Z]/);
            });

            _(1000).times(function () {
                character = chance.character({alpha: true, casing: 'upper'});
                expect(character).to.match(/[A-Z]/);
            });

            _(1000).times(function () {
                character = chance.character({alpha: true, casing: 'lower'});
                expect(character).to.match(/[a-z]/);
            });
        });

    });

    describe("String", function () {
        it("returns a string", function () {
            string = chance.string();
            expect(string).to.be.a('string');
        });

        it("obeys length, when specified", function () {
            var length;
            _(1000).times(function () {
                // Generate a random length from 1-25
                length = chance.natural({min: 1, max: 25});
                string = chance.string({length: length});
                expect(string).to.have.length(length);
            });
        });

        it("throws an error if length < 0", function () {
            expect(function () { chance.string({length: -23}); }).to.throw(RangeError);
        });

        it("obeys case", function () {
            _(1000).times(function () {
                string = chance.string({alpha: true});
                expect(string).to.match(/[a-zA-Z]+/);
            });

            _(1000).times(function () {
                string = chance.string({alpha: true, casing: 'upper'});
                expect(string).to.match(/[A-Z]+/);
            });

            _(1000).times(function () {
                string = chance.string({alpha: true, casing: 'lower'});
                expect(string).to.match(/[a-z]+/);
            });

        });

        it("obeys symbol", function () {
            _(1000).times(function () {
                string = chance.string({symbols: true});
                expect(string).to.match(/[\!\@\#\$\%\^\&\*\(\)\[\]]+/);
            });
        });

    });
});

describe("Seed", function () {
    var seed, chance1, chance2;

    describe("null works", function () {
        it("works with a null seed", function(done) {
            chance1 = Chance(null);

            // Wait 5 ms before creating chance2 else sometimes they happen on the same
            // tick and end up with the same seed!
            setTimeout(function () {
                chance2 = Chance(null);
                expect(chance1.random()).to.not.equal(chance2.random());
                done();
            }, 5);
        });
    });

    describe("random", function () {
        it("does return differing results if differing seeds provided", function (done) {
            chance1 = new Chance(12345);
            // Wait 5 ms before creating chance2 else sometimes they happen on the same
            // tick and end up with the same seed!
            setTimeout(function () {
                chance2 = new Chance(54321);
                expect(chance1.random()).to.not.equal(chance2.random());
                done();
            }, 5);
        });

        it("does not return repeatable results if no seed provided", function (done) {
            chance1 = new Chance();
            // Wait 5 ms before creating chance2 else sometimes they happen on the same
            // tick and end up with the same seed!
            setTimeout(function () {
                chance2 = new Chance();
                _(1000).times(function () {
                    expect(chance1.random()).to.not.equal(chance2.random());
                });
                done();
            }, 5);
        });

        it("returns repeatable results if seed provided on the Chance object", function () {
            seed = new Date().getTime();
            chance1 = new Chance(seed);
            chance2 = new Chance(seed);

            _(1000).times(function () {
                expect(chance1.random()).to.equal(chance2.random());
            });
        });

        it("returns repeatable results if a string is provided as a seed", function () {
            seed = "foo";
            chance1 = new Chance(seed);
            chance2 = new Chance(seed);

            _(1000).times(function () {
                expect(chance1.random()).to.equal(chance2.random());
            });
        });

        it("returns different results if two different strings are provided", function () {
            chance1 = new Chance("foo");
            chance2 = new Chance("baz");

            _(1000).times(function () {
                expect(chance1.random()).to.not.equal(chance2.random());
            });
        });

        it("returns different results if multiple arguments are provided", function () {
            seed = new Date().getTime();
            chance1 = new Chance(seed, "foo");
            chance2 = new Chance(seed, "bar");

            _(1000).times(function () {
                expect(chance1.random()).to.not.equal(chance2.random());
            });
        });
    });

    describe("arbitrary function", function () {
        it("will take an arbitrary function for random, use it", function () {
            var chance = new Chance(function () { return 123; });
            _(1000).times(function () {
                expect(chance.random()).to.equal(123);
            });
        });
    });
});
