/// <reference path="../chance.js" />
/// <reference path="../node_modules/underscore/underscore-min.js" />

var expect = chai.expect;

describe("Text", function () {
    var syllable, word, sentence, paragraph, chance = new Chance();

    describe("Syllable", function () {
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
                expect(syllable).to.have.length.within(2, 9);
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

    describe("Sentence", function () {
        it("returns a random sentence", function () {
            _(1000).times(function () {
                sentence = chance.sentence();
                expect(sentence).to.be.a('string');
                expect(sentence.split(' ')).to.have.length.within(12, 18);
            });
        });

        it("will obey bounds", function () {
            _(1000).times(function () {
                sentence = chance.sentence({words: 5});
                expect(sentence).to.be.a('string');
                expect(sentence.split(' ')).to.have.length(5);
            });
        });
    });

    describe("Paragraph", function () {
        it("returns a random paragraph", function () {
            _(100).times(function () {
                paragraph = chance.paragraph();
                expect(paragraph).to.be.a('string');
                // Have to account for the fact that the period at the end will add
                // to the count of sentences. This is the fault of our hackish way
                // of detecting sentences -- by splitting on '.'
                expect(paragraph.split('.')).to.have.length.within(3, 8);
            });
        });

        it("will obey bounds", function () {
            _(100).times(function () {
                paragraph = chance.paragraph({sentences: 5});
                expect(paragraph).to.be.a('string');
                // Have to account for the fact that the period at the end will add
                // to the count of sentences. This is the fault of our hackish way
                // of detecting sentences -- by splitting on '.'
                expect(paragraph.split('.')).to.have.length(6);
            });
        });
    });
});
