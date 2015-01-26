define(['Chance', 'mocha', 'chai', 'underscore', 'phoneTest'], function (Chance, mocha, chai, _, phoneTest) {
    var expect = chai.expect;

    describe("Address", function () {
        var zip, suffix, suffixes, state, address, country, chance = new Chance();

        describe("Zip", function () {
            it("returns a valid basic zip code", function () {
                _(1000).times(function () {
                    zip = chance.zip();
                    expect(zip.length).to.equal(5);
                    expect(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip)).to.be.true;
                });
            });

            it("returns a valid zip+4 code", function () {
                _(1000).times(function () {
                    zip = chance.zip({plusfour: true});
                    expect(zip.length).to.equal(10);
                    expect(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip)).to.be.true;
                });
            });
        });

        describe("Street", function () {
            it("street suffixes returns the suffix array", function () {
                suffixes = chance.street_suffixes();
                expect(suffixes).to.be.an('array');
                _.each(suffixes, function (suffix) {
                    expect(suffix).to.have.keys('name', 'abbreviation');
                });

            });

            it("street suffixes are short", function () {
                suffixes = chance.street_suffixes();
                _.each(suffixes, function (suffix) {
                    expect(suffix.abbreviation).to.have.length.below(5);
                });
            });

            it("full street suffixes are longish", function () {
                suffixes = chance.street_suffixes();
                _.each(suffixes, function (suffix) {
                    expect(suffix.name).to.have.length.above(2);
                });
            });

            it("street suffix returns a single suffix", function () {
                _(1000).times(function () {
                    suffix = chance.street_suffix();
                    expect(suffix).to.be.an('object');
                    expect(suffix.name).to.be.a('string');
                    expect(suffix.abbreviation).to.be.a('string');
                });
            });
        });

        describe("State", function () {
            it("states() returns an array of states", function () {
                expect(chance.states()).to.be.an('array');
            });

            it("state() returns a random (short) state name", function () {
                _(1000).times(function () {
                    state = chance.state();
                    expect(state.length).to.be.below(3);
                });
            });

            it("state({full: true}) returns a random (long) state name", function () {
                _(1000).times(function () {
                    state = chance.state({full: true});
                    expect(state.length).to.be.above(2);
                });
            });

            it("states() returns all 50 US States and DC", function () {
                expect(chance.states()).to.have.length(51);
            });

            it("states({territories: true}) returns 50 US States, DC, and 7 US Territories", function () {
                expect(chance.states({territories: true})).to.have.length(58);
            });

            it("states({armed_forces: true}) returns 50 US States, DC, and 3 Armed Forces Military States", function () {
                expect(chance.states({armed_forces: true})).to.have.length(54);
            });

            it("states({territories: true, armed_forces: true}) returns 50 US States, DC, 7 US Territories, and 3 Armed Forces Military States", function () {
                expect(chance.states({territories: true, armed_forces: true})).to.have.length(61);
            });
        });

        describe("Province", function () {
            it("provinces() returns an array of provinces", function () {
                expect(chance.provinces()).to.be.an('array');
            });

            it("province() returns a random (short) province name", function () {
                _(1000).times(function () {
                    expect(chance.province()).to.have.length.below(3);
                });
            });

            it("province({full: true}) returns a random (long) province name", function () {
                _(1000).times(function () {
                    expect(chance.province({full: true})).to.have.length.above(2);
                });
            });
        });

        describe("Address", function () {
            it("address() returns a string", function () {
                expect(chance.address()).to.be.an('string');
            });

            it("address() starts with a number", function () {
                _(1000).times(function () {
                    expect(chance.address()).to.match(/[0-9]+.+/);
                });
            });

            it("address() can take short_suffix arg and obey it", function () {
                _(1000).times(function () {
                    address = chance.address({short_suffix: true});
                    expect(address.split(' ')[2].length).to.be.below(5);
                });
            });
        });

        describe("Phone Number", function () {
            it("areacode() looks right", function () {
                expect(chance.areacode()).to.be.a('string');
                _(1000).times(function () {
                    expect(chance.areacode()).to.match(/^\(([2-9][0-8][0-9])\)$/);
                });
            });

            it("areacode({parens: false}) looks right", function () {
                _(1000).times(function () {
                    expect(chance.areacode({parens: false})).to.be.a('string');
                    expect(chance.areacode({parens: false})).to.match(/^([2-9][0-8][0-9])$/);
                });
            });

            it("phone() returns a string", function () {
                expect(chance.phone()).to.be.a('string');
            });

            it("phone() looks like an actual phone number", function () {
                _(1000).times(function () {
                    expect(chance.phone()).to.match(/^\(([2-9][0-8][0-9])\)?[\-. ]?([2-9][0-9]{2,2})[\-. ]?([0-9]{4,4})$/);
                });
            });

            it('phone({formatted: false}) looks right', function () {
                _(1000).times(function () {
                    expect(chance.phone({formatted : false})).to.be.a('string');
                    expect(chance.phone({formatted : false})).to.match(/^[2-9][0-8]\d[2-9]\d{6,6}$/);
                });
            });

            it('phone({formatted: false, parens: true}) is unformatted', function () {
                _(1000).times(function () {
                    expect(chance.phone({formatted : false, parens: true})).to.be.a('string');
                    expect(chance.phone({formatted : false, parens: true})).to.match(/^[2-9][0-8]\d[2-9]\d{6,6}$/);
                });
            });

            it("phone({country: 'uk'}) returns a string", function () {
                expect(chance.phone({country: 'uk'})).to.be.a('string');
            });

            it("phone({country: 'uk', mobile: true}) returns a string", function () {
                expect(chance.phone({country: 'uk', mobile: true})).to.be.a('string');
            });

            it('phone({country: "uk"}) looks right', function () {
                _(1000).times(function () {
                    expect(phoneTest.isValid(chance.phone({country: 'uk'}))).to.be.true;
                });
            });

            it('phone({country: "uk", formatted: false}) looks right', function () {
                _(1000).times(function () {
                    expect(phoneTest.isValid(phoneTest.format(chance.phone({country: 'uk', formatted: false})))).to.be.true;
                });
            });

            it('phone({country: "uk", mobile: true}) looks right', function () {
                _(1000).times(function () {
                    expect(phoneTest.isValid(chance.phone({country: 'uk', mobile: true}))).to.be.true;
                });
            });

            it('phone({country: "uk", mobile: true, formatted: false}) looks right', function () {
                _(1000).times(function () {
                    expect(phoneTest.isValid(phoneTest.format(chance.phone({country: 'uk', mobile: true, formatted: false})))).to.be.true;
                });
            });

            it("phone({country: 'fr'}) returns a string", function () {
                expect(chance.phone({country: 'fr'})).to.be.a('string');
            });

            it("phone({country: 'fr', mobile: true}) returns a string", function () {
                expect(chance.phone({country: 'fr', mobile: true})).to.be.a('string');
            });

            it('phone({country: "fr"}) looks right', function () {
                _(1000).times(function () {
                    expect(chance.phone({country: 'fr'})).match(/0[123459] .. .. .. ../);
                });
            });

            it('phone({country: "fr", formatted: false}) looks right', function () {
                _(1000).times(function () {
                    expect(chance.phone({country: 'fr', formatted: false})).match(/0........./);
                });
            });

            it('phone({country: "fr", mobile: true}) looks right', function () {
                _(1000).times(function () {
                    expect(chance.phone({country: 'fr', mobile: true})).match(/0[67] .. .. .. ../);
                });
            });

            it('phone({country: "fr", mobile: true, formatted: false}) looks right', function () {
                _(1000).times(function () {
                    expect(chance.phone({country: 'fr', mobile: true, formatted: false})).match(/0[67]......../);
                });
            });
        });

        describe("Country", function () {
            it("countries() returns an array of countries", function () {
                expect(chance.countries()).to.be.an('array');
            });

            it("country() returns a random (short) country name", function () {
                _(1000).times(function () {
                    country = chance.country();
                    expect(country.length).to.equal(2);
                });
            });

            it("country({full: true}) returns a random country name", function () {
                _(1000).times(function () {
                    country = chance.country({full: true});
                    expect(country.length).to.be.above(2);
                });
            });
        });

        describe("City", function () {
            it("city() looks right", function () {
                expect(chance.city()).to.be.a('string');
            });
        });

        describe("Latitude", function () {
            it("latitude() looks right", function () {
                expect(chance.latitude()).to.be.a('number');
            });

            it("latitude() is in the right range", function () {
                _(1000).times(function () {
                    expect(chance.latitude()).to.be.within(-90, 90);
                });
            });

            it("latitude() will accept a min and obey it", function () {
                _(1000).times(function () {
                    var min = chance.floating({min: -90, max: 90});
                    expect(chance.latitude({min: min})).to.be.within(min, 90);
                });
            });

            it("latitude() will accept a max and obey it", function () {
                _(1000).times(function () {
                    var max = chance.floating({min: -90, max: 90});
                    expect(chance.latitude({max: max})).to.be.within(-90, max);
                });
            });
        });

        describe("Longitude", function () {
            it("longitude() looks right", function () {
                expect(chance.longitude()).to.be.a('number');
            });

            it("longitude() is in the right range", function () {
                _(1000).times(function () {
                    expect(chance.longitude()).to.be.within(-180, 180);
                });
            });

            it("longitude() will accept a min and obey it", function () {
                _(1000).times(function () {
                    var min = chance.floating({min: -180, max: 180});
                    expect(chance.longitude({min: min})).to.be.within(min, 180);
                });
            });

            it("longitude() will accept a max and obey it", function () {
                _(1000).times(function () {
                    var max = chance.floating({min: -180, max: 180});
                    expect(chance.longitude({max: max})).to.be.within(-180, max);
                });
            });
        });

        describe("Geohash", function () {
            it("geohash() looks right", function() {
                expect(chance.geohash()).to.be.a('string');
                expect(chance.geohash()).to.have.length(7);
            });

            it("geohash() will accept a length and obey it", function() {
                _(1000).times(function () {
                    var length = chance.d10();
                    expect(chance.geohash({ length: length })).to.have.length(length);
                });
            });
        });

        describe("Coordinates", function () {
            it("coordinates() looks about right", function () {
                _(1000).times(function () {
                    expect(chance.coordinates()).to.be.a('string');
                    expect(chance.coordinates().split(',')).to.have.length(2);
                });
            });
        });
    });
});
