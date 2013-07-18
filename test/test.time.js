define(['Chance', 'mocha', 'chai', 'underscore'], function (Chance, mocha, chai, _) {
    var expect = chai.expect;

    describe("Time", function () {
        var hour, minute, time, timestamp, month, year, chance = new Chance();

        it("hour() returns a hour", function () {
            _(1000).times(function () {
                hour = chance.hour();
                expect(hour).to.be.a('number');
                expect(hour).to.be.within(1, 12);
            });
        });

        it("minute() returns a minute", function () {
            _(1000).times(function () {
                minute = chance.minute();
                expect(minute).to.be.a('number');
                expect(minute).to.be.within(0, 59);
            });
        });

        it("month() returns a month", function () {
            _(1000).times(function () {
                month = chance.month();
                expect(month).to.be.a('string');
            });
        });

        it("month() will return a raw month", function () {
            _(1000).times(function () {
                month = chance.month({raw: true});
                expect(month).to.not.be.a('string');
                expect(month).to.be.an('object');
            });
        });

        it("timestamp() returns a timestamp", function () {
            _(1000).times(function () {
                timestamp = chance.timestamp();
                expect(timestamp).to.be.a('number');
                expect(timestamp).to.be.within(1, parseInt(new Date().getTime() / 1000, 10));
            });
        });

        it("year() returns a year, default between today and a century after", function () {
            _(1000).times(function () {
                year = chance.year();
                expect(year).to.be.a('string');
                expect(year).to.be.within(new Date().getFullYear(), new Date().getFullYear() + 100);
            });
        });

        it("year() returns a year, can specify min and max", function () {
            _(1000).times(function () {
                year = chance.year({min: 2500, max: 2600});
                expect(year).to.be.a('string');
                expect(year).to.be.within(2500, 2600);
            });
        });

        it("year() returns a year, can specify just min", function () {
            _(1000).times(function () {
                year = chance.year({min: 2500});
                expect(year).to.be.a('string');
                expect(year).to.be.above(2499);
            });
        });

        it("year() returns a year, can specify just max", function () {
            _(1000).times(function () {
                year = chance.year({max: 2500});
                expect(year).to.be.below(2501);
                // Ensure year not negative. Perhaps add BCE/AD and such later,
                // but for now just positive is good enough.
                expect(year).to.be.above(0);
            });
        });

    });
});
