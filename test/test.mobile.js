define(['Chance', 'mocha', 'chai', 'underscore'], function (Chance, mocha, chai, _) {
    var expect = chai.expect;

    describe("Android Registration ID", function(){
        var android_id, chance = new Chance();

        it("returns a proper android id", function () {
            _(1000).times(function () {
                android_id = chance.android_id();
                expect(android_id).to.match(/APA91([0-9a-zA-Z-_]){178}/);
            });
        });
    });

    describe("Apple Token", function(){
        var apple_token, chance = new Chance();

        it("returns a proper apple token", function () {
            _(1000).times(function () {
                apple_token = chance.apple_token();
                expect(apple_token).to.match(/([0-9a-fA-F]){64}/);
            });
        });
    });

    describe("Windows Phone 8 ANID2", function(){
        var wp8_anid2, chance = new Chance();

        it("returns a proper windows phone 8 anid2", function () {
            _(1000).times(function () {
                wp8_anid2 = chance.wp8_anid2();
                expect(wp8_anid2).to.match(/^([0-9a-zA-Z]){43}=$/);
            });
        });
    });

    describe("Windows Phone 7 ANID", function(){
        var wp7_anid, chance = new Chance();

        it("returns a proper windows phone 7 anid", function () {
            _(1000).times(function () {
                wp7_anid = chance.wp7_anid();
                expect(wp7_anid).to.match(/^A=[0-9A-F]{32}&E=[0-9a-f]{3}&W=\d$/);
            });
        });
    });

    describe("BlackBerry Device PIN", function(){
        var bb_pin, chance = new Chance();

        it("returns a proper blackberry pin", function () {
            _(1000).times(function () {
                bb_pin = chance.bb_pin();
                expect(bb_pin).to.match(/([0-9a-f]){8}/);
            });
        });
    });
});
