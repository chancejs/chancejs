define(['Chance', 'mocha', 'chai', 'underscore'], function (Chance, mocha, chai, _) {
    var expect = chai.expect;

    describe("Web", function () {
        var tld, domain, email, hashtag, ip, ipv6, tracking_code, twitter, chance = new Chance();

        it("tld() returns a tld", function () {
            _(1000).times(function () {
                tld = chance.tld();
                expect(tld).to.be.a('string');
                expect(tld).to.have.length.below(6);
            });
        });

        it("domain() returns a domain", function () {
            _(1000).times(function () {
                domain = chance.domain();
                expect(domain).to.be.a('string');
                expect(domain.split('.')).to.have.length.above(1);
            });
        });

        it("domain() obeys tld, if specified", function () {
            _(1000).times(function () {
                domain = chance.domain({tld: 'com'});
                expect(domain).to.be.a('string');
                expect(domain.split('.')[1]).to.equal('com');
            });
        });

        it("email() returns what looks like an email", function () {
            _(1000).times(function () {
                email = chance.email();
                expect(email).to.be.a('string');
                expect(email.split('@')).to.have.length.above(1);
            });
        });

        it("email() obeys domain, if specified", function () {
            _(1000).times(function () {
                email = chance.email({domain: 'example.com'});
                expect(email).to.be.a('string');
                expect(email.split('@')[1]).to.equal('example.com');
            });
        });

        it("email() has a length specified, it should generate a string before the domain with an equal length", function () {
            _(1000).times(function () {
                email = chance.email({length: 5});
                expect(email.split('@')[0].length).to.equal(5);
            });
        });

        it("fbid() returns what looks like a Facebook id", function () {
            _(1000).times(function () {
                expect(chance.fbid()).to.be.a('number');
            });
        });

        it("google_analytics() returns what looks like a valid tracking code", function () {
            _(1000).times(function () {
                tracking_code = chance.google_analytics();
                expect(tracking_code).to.be.a('string');
                expect(tracking_code).to.have.length(12);
                expect(tracking_code.indexOf('UA-')).to.not.equal(-1);
            });
        });

        it("hashtag() returns what looks like a hashtag", function () {
            _(1000).times(function () {
                hashtag = chance.hashtag();
                expect(hashtag).to.be.a('string');
                expect(hashtag).to.match(/^\#\w+$/m);
            });
        });

        it("ip() returns what looks like an IP address", function () {
            _(1000).times(function () {
                ip = chance.ip();
                expect(ip).to.be.a('string');
                expect(ip.split('.')).to.have.length(4);
            });
        });

        it("ipv6() returns what looks like an IP address (v6)", function () {
            _(1000).times(function () {
                ipv6 = chance.ipv6();
                expect(ipv6).to.be.a('string');
                expect(ipv6.split(':')).to.have.length(8);
            });
        });

        it("klout() returns what looks like a legit Klout score", function () {
            _(1000).times(function () {
                expect(chance.klout()).to.be.a('number');
                expect(chance.klout()).to.be.within(1, 100);
            });
        });

        it("twitter() returns what looks like a Twitter handle", function () {
            _(1000).times(function () {
                twitter = chance.twitter();
                expect(twitter).to.be.a('string');
                expect(twitter).to.match(/\@[A-Za-z]+/m);
            });
        });

        describe('color', function () {

            it("({format: 'hex'}) returns what looks a hex color", function () {
                _(1000).times(function () {
                    var color = chance.color({format: 'hex'});
                    expect(color).to.be.a('string');
                    expect(color).to.have.length(7);
                    expect(color).to.match(/#[a-z0-9]+/m);
                });
            });

            it("({format: 'hex', grayScale: true}) returns what looks a gray scale hex color", function () {
                _(1000).times(function () {
                    var color = chance.color({format: 'hex', grayscale: true});
                    expect(color).to.be.a('string');
                    expect(color).to.have.length(7);
                    expect(color).to.match(/#[a-z0-9]+/m);
                    expect(color.slice(1, 3)).to.equal(color.slice(3, 5));
                    expect(color.slice(1, 3)).to.equal(color.slice(5, 7));
                });
            });

            it("({format: 'shorthex'}) returns what looks a short hex color", function () {
                _(1000).times(function () {
                    var color = chance.color({format: 'shorthex'});
                    expect(color).to.be.a('string');
                    expect(color).to.have.length(4);
                    expect(color).to.match(/#[a-z0-9]+/m);
                });
            });

            it("({format: 'shorthex', grayScale: true}) returns what looks a gray scale short hex color", function () {
                _(1000).times(function () {
                    var color = chance.color({format: 'shorthex', grayscale: true});
                    expect(color).to.be.a('string');
                    expect(color).to.have.length(4);
                    expect(color).to.match(/#[a-z0-9]+/m);
                    expect(color.slice(1, 2)).to.equal(color.slice(2, 3));
                    expect(color.slice(1, 2)).to.equal(color.slice(3, 4));
                });
            });

            it("({format: 'rgb'}) returns what looks a rgb color", function () {
                _(1000).times(function () {
                    var color = chance.color({format: 'rgb'});
                    expect(color).to.be.a('string');
                    var matchColors = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
                    var match = matchColors.exec(color);
                    expect(match).to.have.length.of(4);
                    expect(match[1]).to.be.within(0, 255);
                    expect(match[2]).to.be.within(0, 255);
                    expect(match[3]).to.be.within(0, 255);
                });
            });

            it("({format: 'rgb', grayScale: true}) returns what looks a gray scale rgb color", function () {
                _(1000).times(function () {
                    var color = chance.color({format: 'rgb', grayscale: true});
                    expect(color).to.be.a('string');
                    var matchColors = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
                    var match = matchColors.exec(color);
                    expect(match).to.have.length.of(4);
                    expect(match[1]).to.be.within(0, 255);
                    expect(match[1]).to.equal(match[2]);
                    expect(match[1]).to.equal(match[3]);
                });
            });
        });
    });
});
