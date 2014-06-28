define(['Chance', 'mocha', 'chai', 'underscore'], function (Chance, mocha, chai, _) {
    var expect = chai.expect;

    describe("Interpolation", function () {
        var chance = new Chance();

        describe("_parseFunction", function () {
            it("returns a function name without arguments or properties", function () {
                expect(chance._parseFunction("nameHere")).to.equal({func:"nameHere",args:[],props:[]);
                expect(chance._parseFunction("nameHere()")).to.equal({func:"nameHere",args:[],props:[]);
            });
            
            it("returns a function name with arguments, no properties", function () {
                expect(chance._parseFunction("nameHere('arg1')")).to.equal({func:"nameHere",args:['arg1'],props:[]);
                expect(chance._parseFunction("nameHere(1)")).to.equal({func:"nameHere",args:[1],props:[]);
                expect(chance._parseFunction("nameHere({\"num\":1,\"text\":\"Hi\"})")).to.equal({func:"nameHere",args:[{num:1,text:"Hi"}],props:[]);
            });
        });

    });

});
