/// <reference path="../chance.js" />
/// <reference path="../node_modules/underscore/underscore-min.js" />

var expect = chai.expect;

describe("File", function () {

    var file,
        chance = new Chance();

    var fileExtension = {
        "raster"    : ["bmp", "gif", "gpl", "ico", "jpeg", "psd", "png", "psp", "raw", "tiff"],
        "vector"    : ["3dv", "amf", "awg", "ai", "cgm", "cdr", "cmx", "dxf", "e2d", "egt", "eps", "fs", "odg", "svg", "xar"],
        "3d"        : ["3dmf", "3dm", "3mf", "3ds", "an8", "aoi", "blend", "cal3d", "cob", "ctm", "iob", "jas", "max", "mb", "mdx", "obj", "x", "x3d"],
        "document"  : ["doc", "docx", "dot", "html", "xml", "odt", "odm", "ott", "csv", "rtf", "tex", "xhtml", "xps"]
    };

    var arrayExtentionCollection = ["bmp", "3dv", "3dmf", "doc"];

    var objectExtentionCollection = {
        "one"   : ["extention_one_1", "extention_one_2", "extention_one_3"],
        "two"   : ["extention_two_1", "extention_two_2", "extention_two_3" ],
        "three" : ["extention_three_1", "extention_three_2", "extention_three_3"]
    };



    describe("file()", function() {

        it("return random file length with random extension", function () {
            
            _(1000).times(function () {

                file = chance.file();
                expect(file).to.be.a('string');
                expect(file.split('.').length).to.equal(2);
            });
        });

        it("return error if wrong extension is provided", function () {

            _(1000).times(function () {
                expect(function() {
                    chance.file({ fileType : 'not_specifaid'});
                }).to.throw(Error);
            });
        });

        it("does not return error if wrong extension is provided", function () {

            _(1000).times(function () {
                expect(function() {
                    chance.file({ fileType : 'raster'});
                }).to.not.throw(Error);
            });
        });

        it("return filename with specific extension type", function () {

            _(1000).times(function() {

                var extentionTypeCollection = ['raster', 'vector', '3d', ''];
                var firstExtentionType = extentionTypeCollection[0];

                file = chance.file({fileType : firstExtentionType});
                expect(file).to.be.a('string');
                var fileExtention = file.split('.')[1];

                expect(fileExtension[firstExtentionType]).to.contain(fileExtention);
            });
        });

        it("returns filename with specific extension", function () {
            _(1000).times(function () {

                var specificExtention = 'doc';
                var failTestExtention = 'xml';

                file = chance.file({extention : specificExtention});
                var fileExtention = file.split('.')[1];

                expect(fileExtention).to.be.a('string');
                expect(fileExtention).to.equal(specificExtention);
                expect(fileExtention).to.not.equal(failTestExtention);
            });
        });

        it("returns filename with specific length", function() {
            
            _(1000).times(function() {
                
                var expectedLength = 10;
                var failTestLength = 7;

                file = chance.file({length : expectedLength});
                var fileName = file.split('.')[0];

                expect(fileName.length).to.equal(expectedLength);
                expect(fileName.length).to.not.equal(failTestLength);
            });
        });

        it("returns filename with random extention provided by external array collection", function() {
            
            _(1000).times(function() {
                
                var arrayExtentionCollection = ["bmp", "3dv", "3dmf", "doc"];
                file = chance.file({ extentions : arrayExtentionCollection});
                var fileExtention = file.split('.')[1];

                expect(arrayExtentionCollection).to.include(fileExtention);
            });
        });


        it("returns filename with random extension provided by external object collection", function() {
            
            _(1000).times(function() {

                file = chance.file({ extentions : objectExtentionCollection});
                var fileExtention = file.split('.')[1];

                var extentionCount = 0;
                for(var index in objectExtentionCollection) {
                    
                    var collection = objectExtentionCollection[index];
                    var length     = collection.length;
                    var i = 0;

                    for(i; i < length; i++) {
                        if(collection[i] === fileExtention) {
                            extentionCount++;    
                        }
                    }
                }

                expect(fileExtention).to.be.a('string');
                expect(extentionCount).to.be.equal(1);
            });
        });

        it("returns error if user provides wrong argument type to extentions property", function() {
            
            _(1000).times(function() {
                
                expect(function() {
                    chance({ extentions : 10});    
                }).to.throw(Error);
            });  
        });

        it("doesnot returns error if user provides correct array argument type to extentions property", function() {
            
            _(1000).times(function() {
                
                expect(function() {
                    chance.file({ extentions : arrayExtentionCollection});
                }).to.not.throw(Error);
            });  
        });        

        it("doesnot returns error if user provides correct object argument type to extentions property", function() {
            
            _(1000).times(function() {
                
                expect(function() {
                    chance.file({ extentions : objectExtentionCollection});
                }).to.not.throw(Error);
            });  
        });                


    });
});