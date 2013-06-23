define(['Chance', 'mocha', 'chai', 'underscore'], function (Chance, mocha, chai, _) {
    var expect = chai.expect;

    describe("Text", function () {
        var syllable, word, chance = new Chance();

        describe("Word", function () {
            it("returns a random syllable", function () {
                _(1000).times(function () {
                    syllable = chance.syllable();
                    expect(syllable).to.be.a('string');
                    expect(syllable).to.have.length.within(2, 3);
                });
            });
        });

        describe("Word", function () {
            it("returns a random word", function () {
                _(1000).times(function () {
                    word = chance.word();
                    expect(word).to.be.a('string');
                    expect(syllable).to.have.length.within(2, 12);
                });
            });

            it("can have a set number of syllables", function () {
                _(1000).times(function () {
                    word = chance.word({syllables: 3});
                    expect(word).to.be.a('string');
                    expect(word).to.have.length.within(6, 9);
                });
            });

            it("can have a set length", function () {
                _(1000).times(function () {
                    word = chance.word({length: 5});
                    expect(word).to.be.a('string');
                    expect(word).to.have.length(5);
                });
            });

            it("throws an exception if both syllables and length specified", function () {
                _(1000).times(function () {
                    // This is a bit ugly, but in essence Chai needs to receive
                    // a function here to work as it puts it in its own
                    // try/catch block. So we have to create an anonymous
                    // function to pass along for it to do that.
                    expect(function () { chance.word({syllables: 3, length: 20 }); }).to.throw(RangeError);
                });
            });
        });
    });

});
