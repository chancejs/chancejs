/// <reference path="../chance.js" />
/// <reference path="../node_modules/underscore/underscore-min.js" />

var expect = chai.expect;

describe("Time", function () {
    var ampm, date, hammertime, hour, minute, timestamp, month, weekday, year, bounds, chance = new Chance();

    it("ampm() returns am or pm", function () {
        _(1000).times(function () {
            ampm = chance.ampm();
            expect(ampm).to.be.a('string');
            expect(ampm).to.match(/^([ap]m)$/m);
        });
    });

    it("date() returns a date", function () {
        _(1000).times(function () {
            date = chance.date();
            expect(date).to.be.a('Date');
            expect(date.getTime()).to.be.ok;
        });
    });

    it("date() accepts an american option", function () {
        _(1000).times(function () {
            date = chance.date({ american: true });
            expect(date).to.be.a('Date');
            expect(date.getTime()).to.be.ok;
        });
    });

    it("hammertime() works", function () {
        _(1000).times(function () {
            hammertime = chance.hammertime();
            expect(hammertime).to.be.a('number');
            expect(hammertime).to.be.within(1, 8640000000000000);
        });
    });

    it("date() can have some defaults provided and obeys them", function () {
        _(1000).times(function () {
            // One of each month type in terms of number of days.
            var month = [0, 1, 3][Math.floor(Math.random() * 3)];

            date = chance.date({year: 1983});
            expect(date).to.be.a('Date');
            expect(date.getFullYear()).to.equal(1983);

            date = chance.date({month: month});
            expect(date).to.be.a('Date');
            expect(date.getMonth()).to.equal(month);

            date = chance.date({day: 21});
            expect(date).to.be.a('Date');
            expect(date.getDate()).to.equal(21);
        });
    });

    it("date() returns a date, can specify min and max", function () {
        _(1000).times(function () {
            bounds = {min: new Date(), max: new Date(new Date().getTime() + 1234567890123)};
            date = chance.date(bounds);
            expect(date).to.be.a('Date');
            expect(date).to.be.within(bounds.min, bounds.max);
        });
    });

    it("date() returns a date, can specify just min", function () {
        _(1000).times(function () {
            bounds = {min: new Date()};
            date = chance.date(bounds);
            expect(date).to.be.a('Date');
            expect(date).to.be.above(bounds.min);
        });
    });

    it("date() returns a date, can specify just max", function () {
        _(1000).times(function () {
            bounds = {max: new Date()};
            date = chance.date(bounds);
            expect(date).to.be.below(bounds.max);
            // Ensure date not negative. Perhaps add BCE/AD and such later,
            // but for now just positive is good enough.
            expect(date).to.be.above(0);
        });
    });

    it("date() can return a string date", function () {
        _(1000).times(function () {
            expect(chance.date({string: true})).to.be.a('string');
            expect(chance.date({string: true})).to.match(/^[0-9][0-9]?\/[0-9][0-9]?\/[0-9]{4}/m);
        });
    });

    it("hour() returns a hour", function () {
        _(1000).times(function () {
            hour = chance.hour();
            expect(hour).to.be.a('number');
            expect(hour).to.be.within(1, 12);
        });
    });

    it("hour() returns a hour in 24 hour format", function () {
        _(1000).times(function () {
            hour = chance.hour({twentyfour: true});
            expect(hour).to.be.a('number');
            expect(hour).to.be.within(0, 23);
        });
    });

    it("hour() returns a hour, can specify min and max", function () {
        _(1000).times(function () {
            hour = chance.hour({min: 7, max: 10});
            expect(hour).to.be.a('number');
            expect(hour).to.be.within(7, 10);
        });
    });

    it("hour() returns a hour, can specify just min", function () {
        _(1000).times(function () {
            hour = chance.hour({min: 5});
            expect(hour).to.be.a('number');
            expect(hour).to.be.within(5, 12);
        });
    });

    it("hour() returns a hour, can specify just max", function () {
        _(1000).times(function () {
            hour = chance.hour({max: 7});
            expect(hour).to.be.a('number');
            expect(hour).to.be.within(1, 7);
        });
    });

    it("minute() returns a minute", function () {
        _(1000).times(function () {
            minute = chance.minute();
            expect(minute).to.be.a('number');
            expect(minute).to.be.within(0, 59);
        });
    });

    it("minute() returns a minute, can specify min and max", function () {
        _(1000).times(function () {
            minute = chance.minute({min: 18, max: 35});
            expect(minute).to.be.a('number');
            expect(minute).to.be.within(18, 35);
        });
    });

    it("minute() returns a minute, can specify just min", function () {
        _(1000).times(function () {
            minute = chance.minute({min: 5});
            expect(minute).to.be.a('number');
            expect(minute).to.be.within(5, 59);
        });
    });

    it("minute() returns a minute, can specify just max", function () {
        _(1000).times(function () {
            minute = chance.minute({max: 32});
            expect(minute).to.be.a('number');
            expect(minute).to.be.within(0, 32);
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

    it("month() returns a month, can specify min and max", function () {
        _(1000).times(function () {
            month = chance.month({raw: true, min: 5, max: 10});
            expect(month).to.not.be.a('string');
            expect(month.numeric).to.be.within(5, 10);
        });
    });

    it("month() returns a month, can specify just min", function () {
        _(1000).times(function () {
            month = chance.month({raw: true, min: 5});
            expect(month).to.not.be.a('string');
            expect(month.numeric).to.be.within(5, 12);
        });
    });

    it("month() returns a month, can specify just max", function () {
        _(1000).times(function () {
            month = chance.month({raw: true, max: 7});
            expect(month).to.not.be.a('string');
            expect(month.numeric).to.be.within(1, 7);
        });
    });


    it("timestamp() returns a timestamp", function () {
        _(1000).times(function () {
            timestamp = chance.timestamp();
            expect(timestamp).to.be.a('number');
            expect(timestamp).to.be.within(1, parseInt(new Date().getTime() / 1000, 10));
        });
    });

    it("weekday() will return a weekday as a string", function () {
        _(1000).times(function () {
            weekday = chance.weekday();
            expect(weekday).to.be.a('string');
        });
    });

    it("weekday() can take work: true and obey it", function () {
        _(1000).times(function () {
            weekday = chance.weekday({weekday_only: true});
            expect(weekday).to.be.a('string');
            expect(weekday).to.not.equal('Saturday');
            expect(weekday).to.not.equal('Sunday');
            console.log(weekday);
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
