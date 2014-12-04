#!/usr/bin/env node

var Chance = require('../chance.js');

// Check which generator the user wants to invoke.
var generator = process.argv[2];
var options = (process.argv[3]) ? JSON.parse(process.argv[3]) : {};
// Use .toString() until #121 is merged.
var chance = new Chance(new Date().getTime().toString());
// Does the given generator exist in Chance?
if(generator && chance[generator]) {
    // Invoke the generator on our Chance instance and print the result.
    process.stdout.write(chance[generator]() + '\n');
} else {
    process.stderr.write('Unknown generator "' + generator + '"\n');
}
