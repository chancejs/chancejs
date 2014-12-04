var LineByLineReader = require("line-by-line");

var args = process.argv.slice(2);
if(!args || !args.length) {
    process.stderr.write("Missing filename\n");
}

var filename = args[0];
var threshold = parseInt(args[1]) || 0;
var inputFile = new LineByLineReader(filename);

var result = {
    firstNames: {
        male: [],
        female: []
    }
};

inputFile.on("error", process.stderr.write);
inputFile.on("line", function parseLine(line) {
    var elements = line.split(",");
    if(elements.length < 3) {
        return;
    }

    var name = elements[0];
    var gender = elements[1];
    var count = elements[2];

    if(count < threshold) {
        return;
    }

    if("M" == gender) {
        result.firstNames.male.push(name);
    } else if("F" == gender) {
        result.firstNames.female.push(name);
    } else {
        process.stderr.write("Invalid gender '" + gender + "' for name '" + name + "'!\n");
    }
});
inputFile.on("end", function parsingComplete() {
    process.stdout.write(JSON.stringify(result));
});
