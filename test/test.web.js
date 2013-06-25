define(['Chance', 'mocha', 'chai', 'underscore'], function (Chance, mocha, chai, _) {
    var expect = chai.expect;

    describe("Web", function () {
        var tld, domain, email, ip, chance = new Chance();

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

        it("ip() returns what looks like an IP address", function () {
            _(1000).times(function () {
                ip = chance.ip();
                expect(ip).to.be.a('string');
                expect(ip.split('.')).to.have.length(4);
            });
        });
    });
});
