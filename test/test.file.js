/// <reference path="../chance.js" />
/// <reference path="../node_modules/underscore/underscore-min.js" />

var expect = chai.expect;

describe("File", function () {

    var file,
        chance = new Chance();

    var fileExtensions = {
        "raster"    : ["bmp", "gif", "gpl", "ico", "jpeg", "psd", "png", "psp", "raw", "tiff"],
        "vector"    : ["3dv", "amf", "awg", "ai", "cgm", "cdr", "cmx", "dxf", "e2d", "egt", "eps", "fs", "odg", "svg", "xar"],
        "3d"        : ["3dmf", "3dm", "3mf", "3ds", "an8", "aoi", "blend", "cal3d", "cob", "ctm", "iob", "jas", "max", "mb", "mdx", "obj", "x", "x3d"],
        "document"  : ["doc", "docx", "dot", "html", "xml", "odt", "odm", "ott", "csv", "rtf", "tex", "xhtml", "xps"]
    };

    var arrayExtensionCollection = ["bmp", "3dv", "3dmf", "doc"];

    var objectExtensionCollection = {
        "one"   : ["extension_one_1", "extension_one_2", "extension_one_3"],
        "two"   : ["extension_two_1", "extension_two_2", "extension_two_3" ],
        "three" : ["extension_three_1", "extension_three_2", "extension_three_3"]
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

                var extensionTypeCollection = ['raster', 'vector', '3d', ''];
                var firstExtensionType = extensionTypeCollection[0];

                file = chance.file({fileType : firstExtensionType});
                expect(file).to.be.a('string');
                var fileExtension = file.split('.')[1];

                expect(fileExtensions[firstExtensionType]).to.contain(fileExtension);
            });
        });

        it("returns filename with specific extension", function () {
            _(1000).times(function () {

                var specificExtension = 'doc';
                var failTestExtension = 'xml';

                file = chance.file({extension : specificExtension});
                var fileExtension = file.split('.')[1];

                expect(fileExtension).to.be.a('string');
                expect(fileExtension).to.equal(specificExtension);
                expect(fileExtension).to.not.equal(failTestExtension);
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

        it("returns filename with random extension provided by external array collection", function() {
            
            _(1000).times(function() {
                
                var arrayExtensionCollection = ["bmp", "3dv", "3dmf", "doc"];
                file = chance.file({ extensions : arrayExtensionCollection});
                var fileExtension = file.split('.')[1];

                expect(arrayExtensionCollection).to.include(fileExtension);
            });
        });


        it("returns filename with random extension provided by external object collection", function() {
            
            _(1000).times(function() {

                file = chance.file({ extensions : objectExtensionCollection});
                var fileExtension = file.split('.')[1];

                var extensionCount = 0;
                for(var index in objectExtensionCollection) {
                    
                    var collection = objectExtensionCollection[index];
                    var length     = collection.length;
                    var i = 0;

                    for(i; i < length; i++) {
                        if(collection[i] === fileExtension) {
                            extensionCount++;
                        }
                    }
                }

                expect(fileExtension).to.be.a('string');
                expect(extensionCount).to.be.equal(1);
            });
        });

        it("returns error if user provides wrong argument type to extensions property", function() {
            
            _(1000).times(function() {
                
                expect(function() {
                    chance({ extensions : 10});
                }).to.throw(Error);
            });  
        });

        it("doesnot returns error if user provides correct array argument type to extensions property", function() {
            
            _(1000).times(function() {
                
                expect(function() {
                    chance.file({ extensions : arrayExtensionCollection});
                }).to.not.throw(Error);
            });  
        });        

        it("doesnot returns error if user provides correct object argument type to extensions property", function() {
            
            _(1000).times(function() {
                
                expect(function() {
                    chance.file({ extensions : objectExtensionCollection});
                }).to.not.throw(Error);
            });  
        });                


    });
});