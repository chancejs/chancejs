define(['Chance', 'mocha', 'chai', 'underscore'], function (Chance, mocha, chai, _) {
    var expect = chai.expect;

    describe("Interpolation", function () {
    	// TODO: don't do repeatable tests, expect patterns instead of fixed strings
        var chance = new Chance(1);



        describe("_parseFunction", function () {
            it("returns a function name without arguments or properties", function () {
                expect(chance._parseFunction("nameHere")).to.eql({func:"nameHere",args:[],props:[]},"nameHere");
                expect(chance._parseFunction("nameHere()")).to.eql({func:"nameHere",args:[],props:[]},"nameHere()");
            });
            
            it("returns a function name with arguments, no properties", function () {
                expect(chance._parseFunction("nameHere(\"arg1\")")).to.eql({func:"nameHere",args:['arg1'],props:[]},"nameHere(\"arg1\")");
                expect(chance._parseFunction('nameHere("arg1")')).to.eql({func:"nameHere",args:['arg1'],props:[]},'nameHere("arg1")');
                // test with a comma in the arg string
                expect(chance._parseFunction('nameHere("ar,g1")')).to.eql({func:"nameHere",args:['ar,g1'],props:[]},'nameHere("ar,g1")');
                // test with an escaped quote in the arg string, but this is pushing it
                expect(chance._parseFunction('nameHere("ar,\\\"g1")')).to.eql({func:"nameHere",args:['ar,"g1'],props:[]},'nameHere("ar,\\\"g1")');
                // test with a number
                expect(chance._parseFunction("nameHere(1)")).to.eql({func:"nameHere",args:[1],props:[]},"nameHere(1)");
                // test with arrays
                expect(chance._parseFunction("nameHere([1,2,3],[\"a\"])")).to.eql({func:"nameHere",args:[[1,2,3],['a']],props:[]},"nameHere([1,2,3],[\"a\"])");
                // test passing an object
                expect(chance._parseFunction("nameHere({\"num\":1,\"text\":\"Hi\"})"))
                	.to.eql({func:"nameHere",args:[{num:1,text:"Hi"}],props:[]},
                	"nameHere({\"num\":1,\"text\":\"Hi\"})");
            });
            it("returns a function name with properties", function () {
                expect(chance._parseFunction("nameHere.prop"))
                	.to.eql({func:"nameHere",args:[],props:["prop"]},"nameHere.prop");
                expect(chance._parseFunction("nameHere().prop"))
                	.to.eql({func:"nameHere",args:[],props:["prop"]},"nameHere().prop");
                expect(chance._parseFunction("nameHere.prop.subprop"))
                	.to.eql({func:"nameHere",args:[],props:["prop","subprop"]},"nameHere.prop.subprop");
                expect(chance._parseFunction("nameHere().prop.subprop"))
                	.to.eql({func:"nameHere",args:[],props:["prop","subprop"]},"nameHere().prop.subprop");
            });
            it("returns a function name with arguments and properties", function () {
                expect(chance._parseFunction("nameHere(1,2,3).prop.subprop"))
                	.to.eql({func:"nameHere",args:[1,2,3],props:["prop","subprop"]},"nameHere(1,2,3).prop.subprop");
                expect(chance._parseFunction("nameHere({\"key\":\"val\"}).prop.subprop"))
                	.to.eql({func:"nameHere",args:[{'key':'val'}],props:["prop","subprop"]},"nameHere({\"key\":\"val\"}).prop.subprop");
            });
            it("parses with crazy expectations", function () {
                expect(
                	chance._parseFunction('_my_Func$(1,[2,3],"four",{"five":{"six":7,"eight":[9,0]}})._prop.prop2.prop3'))
                	.to.eql({func:"_my_Func$",args:[1,[2,3],"four",{five:{six:7,eight:[9,0]}}],props:["_prop","prop2","prop3"]});
                 });

        });
        describe("interpolate", function () {
            it("no tags", function () {
                expect(chance.interpolate("Hello World!")).to.equal("Hello World!");
                expect(chance.interpolate("   (Hello) \"World\" \` ")).to.equal("   (Hello) \"World\" \` ");
            });

            it("basic tags", function () {
            	expect(chance.interpolate("`name`")).to.equal("Landon Glover","One tag");
            	expect(chance.interpolate("`first``last`")).to.equal("MaryHoward","Two tags");
            	expect(chance.interpolate("`prefix``first``last`")).to.equal("Mr.EthelMarshall","Three tags");
            	expect(chance.interpolate("`name` is awesome!")).to.equal("Phillip Gonzales is awesome!","Leading tag");
            	expect(chance.interpolate("... so is `name`")).to.equal("... so is Russell Barber","Trailing tag");
            	expect(chance.interpolate("`name` and `name`")).to.equal("Francisco Curtis and Henrietta Rose","Leading and trailing tags");
            	expect(chance.interpolate("with `name` make a `word`.")).to.equal("with Evelyn Hamilton make a hamoki.","inner tags");
            });

            it("tags with arguments", function () {
            	expect(chance.interpolate("`bool()` and `bool`")).to.equal("false and true","no args");
            	expect(chance.interpolate("`bool({\"likelihood\": 10})` -> `bool({\"likelihood\": 50})` -> `bool({\"likelihood\": 90})`"))
            		.to.equal("false -> false -> true","object arguments");
            	expect(chance.interpolate("`rpg(\"1d7\")`")).to.equal("6","string arg");
            	expect(chance.interpolate('`pick(["alpha", "bravo", "charlie", "delta", "echo"])`')).to.equal("echo","array arg");
            	expect(chance.interpolate("... so is `name`")).to.equal("... so is Madge Quinn","Trailing tag");
            	expect(chance.interpolate("`name` and `name`")).to.equal("Joshua Santos and Lina McBride","Leading and trailing tags");
            	expect(chance.interpolate("with `name` make a `word`.")).to.equal("with Gussie Roberts make a jairsi.","inner tags");
            });
            
            it("tags with properties", function () {

            	expect(chance.interpolate("I was told that `street_suffix.abbreviation` is short for `street_suffix.name`"))
            		.to.equal("I was told that Plz is short for View");
            	
	            // prepare a mixin
            	chance.mixin({
        		  'user': function () {
        		    return {
        		      first: chance.first(),
        		      last: chance.last(),
        		      email: chance.email()
        		    };
        		  },
        		  'social_user': function () {
        		    var user = chance.user();
        		    user.network = chance.pick(['facebook', 'twitter']);
        		    return user;
        		  }
        		});
            	expect(chance.interpolate("Dear `user.first`, is your email: \"`user.email`\"? Does `social_user.last` do the '`social_user.network`'? "))
    			.to.equal("Dear Melvin, is your email: \"dewda@cogug.edu\"? Does Allen do the 'facebook'? ","user properties");
            	

            	// deep mixin
            	chance.mixin({
            		'deepUser': function () {
        		    return {
        		    	'user': chance.user(),
        		    	'social_user': chance.social_user()
        		    };
        		  }
            	});
            	
            	expect(chance.interpolate("Deep: `deepUser.user.first` `deepUser.user.last` and `deepUser.social_user.network` "))
    			.to.equal("Deep: Alfred Weaver and twitter ","Deep User");
            });
            
        	
        	
        });
    });

});
