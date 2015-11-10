/// <reference path="../chance.js" />
/// <reference path="../node_modules/underscore/underscore-min.js" />

var expect = chai.expect;

describe("Web", function () {
    var avatar, tld, domain, email, hashtag, ip, ipv6, tracking_code, twitter, url, chance = new Chance();

    describe("avatar()", function() {
        it("returns a legit avatar", function () {
            _(1000).times(function () {
                avatar = chance.avatar();
                expect(avatar).to.be.a('string');
                expect(avatar.split('/').length).to.equal(5);
            });
        });

        it("can take and ignore an invalid protocol", function () {
            _(1000).times(function () {
                avatar = chance.avatar({ protocol: 'invalid' });
                expect(avatar).to.be.a('string');
                expect(avatar.indexOf('//')).to.eql(0);
            });
        });

        it("can take and respect a protocol", function () {
            var PROTOCOLS = [
                'http',
                'https'
            ];
            _(500).times(function () {
                _(PROTOCOLS.length).times(function(n){
                    avatar = chance.avatar({ protocol: PROTOCOLS[n] });
                    expect(avatar).to.be.a('string');
                    expect(avatar.indexOf(PROTOCOLS[n] + ':')).to.eql(0);
                });
            });
        });

        it("can take and respect an email", function () {
            _(1000).times(function () {
                avatar = chance.avatar({ email: chance.email() });
                expect(avatar).to.be.a('string');
                expect(avatar.split('/').length).to.eql(5);
            });
        });


        it("can take and ignore an invalid fileExtension", function () {
            _(1000).times(function () {
                avatar = chance.avatar({ fileExtension: 'invalid' });
                expect(avatar).to.be.a('string');
                expect(avatar).to.not.contain('.jpg');
                expect(avatar).to.not.contain('.bmp');
                expect(avatar).to.not.contain('.png');
            });
        });

        it("can take and respect a fileExtension", function () {
            var FILE_TYPES = [
                'bmp',
                'gif',
                'jpg',
                'png'
            ];
            _(250).times(function () {
                _(FILE_TYPES.length).times(function(n){
                    avatar = chance.avatar({ fileExtension: FILE_TYPES[n] });
                    expect(avatar).to.be.a('string');
                    expect(avatar).to.contain('.' + FILE_TYPES[n]);
                });
            });
        });

        it("can take and ignore an invalid size", function () {
            _(1000).times(function () {
                avatar = chance.avatar({ size: 'abc' });
                expect(avatar).to.be.a('string');
                expect(avatar).to.not.contain('&s=');
            });
        });

        it("can take and respect a size", function () {
            _(1000).times(function (n) {
                avatar = chance.avatar({ size: n + 1 });
                expect(avatar).to.be.a('string');
                expect(avatar).to.contain('&s=' + (n + 1).toString());
            });
        });

        it("can take and ignore an invalid rating", function () {
            _(1000).times(function () {
                avatar = chance.avatar({ rating: 'invalid' });
                expect(avatar).to.be.a('string');
                expect(avatar).to.not.contain('&r=');
            });
        });

        it("can take and respect a rating", function () {
            var RATINGS = ['g', 'pg', 'r', 'x'];
            _(250).times(function(){
                _(RATINGS.length).times(function (n) {
                    avatar = chance.avatar({ rating: RATINGS[n] });
                    expect(avatar).to.be.a('string');
                    expect(avatar).to.contain('&r=' + RATINGS[n].toString());
                });
            });
        });

        it("can take and ignore an invalid fallback image", function () {
            _(1000).times(function () {
                avatar = chance.avatar({ fallback: 'invalid' });
                expect(avatar).to.be.a('string');
                expect(avatar).to.not.contain('&d=');
            });
        });

        it("can take and respect a fallback image", function () {
            var FALLBACKS = [
                '404', // Return 404 if not found
                'mm', // Mystery man
                'identicon', // Geometric pattern based on hash
                'monsterid', // A generated monster icon
                'wavatar', // A generated face
                'retro', // 8-bit icon
                'blank' // A transparent png
            ];
            _(100).times(function(){
                _(FALLBACKS.length).times(function (n) {
                    avatar = chance.avatar({ fallback: FALLBACKS[n] });
                    expect(avatar).to.be.a('string');
                    expect(avatar).to.contain('&d=' + FALLBACKS[n].toString());
                });
            });
        });
    });

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

        it("({format: 'rgba'}) returns what looks a rgba color", function () {
            _(1000).times(function () {
                var color = chance.color({format: 'rgba'});
                expect(color).to.be.a('string');
                var matchColors = /rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),([01]\.?\d*?)\)/;
                var match = matchColors.exec(color);
                expect(match).to.have.length.of(5);
                expect(match[1]).to.be.within(0, 255);
                expect(match[2]).to.be.within(0, 255);
                expect(match[3]).to.be.within(0, 255);
                expect(match[4]).to.be.within(0, 1);
            });
        });

        it("({format: 'rgba', grayScale: true}) returns what looks a gray scale rgba color", function () {
            _(1000).times(function () {
                var color = chance.color({format: 'rgba', grayscale: true});
                expect(color).to.be.a('string');
                var matchColors = /rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),([01]\.?\d*?)\)/;
                var match = matchColors.exec(color);
                expect(match).to.have.length.of(5);
                expect(match[1]).to.be.within(0, 255);
                expect(match[1]).to.equal(match[2]);
                expect(match[1]).to.equal(match[3]);
                expect(match[4]).to.be.within(0, 1);
            });
        });

        it("({format: '0x'}) returns what looks a 0x color", function () {
            _(1000).times(function () {
                var color = chance.color({format: '0x'});
                expect(color).to.be.a('string');
                expect(color).to.have.length(8);
                expect(color).to.match(/0x[a-z0-9]+/m);
            });
        });

        it("(format : 'name') returns a valide color name", function() {
            _(1000).times(function() {
                
                var color = chance.color({format : 'name'});
                expect(color).to.be.a('string');
            });
        });        

        it("({casing: upper}) returns upper cased color", function () {
            _(1000).times(function () {
                var color = chance.color({format: 'hex', casing: 'upper'});
                expect(color).to.be.a('string');
                expect(color).to.have.length(7);
                expect(color.charAt(1).toUpperCase()).to.equal(color.charAt(1));
                expect(color.charAt(2).toUpperCase()).to.equal(color.charAt(2));
                expect(color.charAt(3).toUpperCase()).to.equal(color.charAt(3));
                expect(color.charAt(4).toUpperCase()).to.equal(color.charAt(4));
                expect(color.charAt(5).toUpperCase()).to.equal(color.charAt(5));
                expect(color.charAt(6).toUpperCase()).to.equal(color.charAt(6));
            });
        });

        it("bogus format throws an error", function () {
            expect(function() { chance.color({ format: "banana" }); }).to.throw(RangeError);
        });
    });

    describe("url()", function() {
        it("returns a legit url", function () {
            _(1000).times(function () {
                url = chance.url();
                expect(url).to.be.a('string');
                expect(url.split('.')).to.have.length.above(1);
                expect(url.split('://')).to.have.length.above(1);
            });
        });

        it("can take and respect a domain", function () {
            _(1000).times(function () {
                url = chance.url({ domain: "socialradar.com" });
                expect(url).to.be.a('string');
                expect(url.split('.')).to.have.length.above(1);
                expect(url.split('://')).to.have.length.above(1);
                expect(url.split('socialradar.com')).to.have.length.above(1);
            });
        });

        it("can take and respect a domain prefix", function () {
            _(1000).times(function () {
                url = chance.url({ domain_prefix: "www" });
                expect(url).to.be.a('string');
                expect(url.split('.')).to.have.length.above(1);
                expect(url.split('://')).to.have.length.above(1);
                expect(url.split('www.')).to.have.length.above(1);
            });
        });

        it("can take and respect a path", function () {
            _(1000).times(function () {
                url = chance.url({ path: "images" });
                expect(url).to.be.a('string');
                expect(url.split('.')).to.have.length.above(1);
                expect(url.split('://')).to.have.length.above(1);
                expect(url.split('/images')).to.have.length.above(1);
            });
        });

        it("can take and respect extensions", function () {
            _(1000).times(function () {
                url = chance.url({ extensions: ["html"] });
                expect(url).to.be.a('string');
                expect(url.split('.')).to.have.length.above(1);
                expect(url.split('://')).to.have.length.above(1);
                expect(url.indexOf('.html')).to.not.equal(-1);
            });
        });
    });

    describe('md5()', function () {
        it('should create a hex-encoded MD5 hash of a random ASCII value when passed nothing', function () {
            var md5 = chance.md5();
            expect(md5.length).to.be.eql('2063c1608d6e0baf80249c42e2be5804'.length);
        });

        it('should create a hex-encoded MD5 hash of an ASCII value when passed a string', function () {
            expect(chance.md5('value')).to.be.eql('2063c1608d6e0baf80249c42e2be5804');
        });

        it('should create a hex-encoded MD5 hash of an ASCII value when passed an object', function () {
            expect(chance.md5({ str: 'value' })).to.be.eql('2063c1608d6e0baf80249c42e2be5804');
        });

        it('should create a hex-encoded MD5 hash of an UTF-8 value', function () {
            expect(chance.md5('日本')).to.be.eql('4dbed2e657457884e67137d3514119b3');
        });

        it('should create a hex-encoded HMAC-MD5 hash of an ASCII value and key', function () {
            expect(chance.md5({ str: 'value', key: 'key' })).to.be.eql('01433efd5f16327ea4b31144572c67f6');
        });

        it('should create a hex-encoded HMAC-MD5 hash of an UTF-8 value and key', function () {
            expect(chance.md5({ str: '日本', key: '日本' })).to.be.eql('c78b8c7357926981cc04740bd3e9d015');
        });

        it('should create a raw MD5 hash of an ASCII value', function () {
            expect(chance.md5({ str: 'value', key: null, raw: true })).to.be.eql(' c\xc1`\x8dn\x0b\xaf\x80$\x9cB\xe2\xbeX\x04');
        });

        it('should create a raw MD5 hash of an UTF-8 value', function () {
            expect(chance.md5({ str: '日本', key: null, raw: true })).to.be.eql('M\xbe\xd2\xe6WEx\x84\xe6q7\xd3QA\x19\xb3');
        });

        it('should create a raw HMAC-MD5 hash of an ASCII value and key', function () {
            expect(chance.md5({ str: 'value', key: 'key', raw: true })).to.be.eql('\x01C>\xfd_\x162~\xa4\xb3\x11DW,g\xf6');
        });

        it('should create a raw HMAC-MD5 hash of an UTF-8 value and key', function () {
            expect(chance.md5({ str: '日本', key: '日本', raw: true })).to.be.eql('\xc7\x8b\x8csW\x92i\x81\xcc\x04t\x0b\xd3\xe9\xd0\x15');
        });
    });

});
