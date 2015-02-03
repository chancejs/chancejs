#!/usr/bin/env node

var Chance = require('../chance.js');
var argv = require('minimist')(process.argv.slice(2),{string:"pool"});

// Check which generator the user wants to invoke.
var generator = process.argv[2];
var options = argv;
// Use .toString() until #121 is merged.
var chance = new Chance(new Date().getTime().toString());
// Does the given generator exist in Chance?
if(generator && chance[generator]) {
    // Invoke the generator on our Chance instance and print the result.
    process.stdout.write(chance[generator](options));
    if (process.stdout.isTTY) process.stdout.write('\n');
} else {
    process.stderr.write('Unknown generator "' + generator + '"');
    if (process.stderr.isTTY) process.stderr.write('\n');
}
