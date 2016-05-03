# Chance

[![Chance Logo](http://chancejs.com/logo.png)](http://chancejs.com)

[![Build Status](https://travis-ci.org/chancejs/chancejs.svg?branch=develop)](https://travis-ci.org/chancejs/chancejs) [![GitHub license](https://img.shields.io/github/license/chancejs/chancejs.svg)](https://github.com/chancejs/chancejs) [![GitHub stars](https://img.shields.io/github/stars/chancejs/chancejs.svg)](https://github.com/chancejs/chancejs) [![npm](https://img.shields.io/npm/dm/chance.svg)](https://npmjs.com/package/chance) [![npm](https://img.shields.io/npm/v/chance.svg)](https://npmjs.com/package/chance) [![Coverage Status](https://coveralls.io/repos/chancejs/chancejs/badge.svg?branch=master)](https://coveralls.io/r/chancejs/chancejs?branch=master) [![awesomeness](https://img.shields.io/badge/awesomeness-maximum-red.svg)](https://github.com/chancejs/chancejs)

Chance - Random generator helper for JavaScript

Homepage: [http://chancejs.com](http://chancejs.com)

Many more details on [http://chancejs.com](http://chancejs.com) but this single
library can generate random numbers, characters, strings, names, addresses,
dice, and pretty much anything else.

It includes the basic building blocks for all these items and is built on top
of a Mersenne Twister so it can generate these things with repeatability, if
desired.

## Packages

### Bower

It can also be used with [Bower](http://bower.io)

```
bower install chance
```

then in the HTML of your app:

```html
<!-- Load Chance -->
<script type="text/javascript" src="app/bower_components/chance/chance.min.js"></script>
<script>
    // Use Chance immediately!
    alert(chance.string());
</script>
```

### Component

It can also be used with [Component](http://component.io)

```
component install chancejs/chancejs
```

then in the HTML of your app:

```html
<!-- Load Chance -->
<script type="text/javascript" src="components/chancejs-chancejs/chance.js"></script>
<script>
    // Use Chance immediately!
    alert(chance.string());
</script>
```

### npm

```shell
npm install chance
```

### spm [![](http://spmjs.io/badge/chance)](http://spmjs.io/package/chance)

It can also be used with [spm](http://spmjs.io/package/chance).

```
spm install chance
```

## Usage

### Browser

Chance instantiates itself onto the window. This means that in the simplest case you can just include the script tag then use an instance of Chance immediately.

```html
<script src="chance.js"></script>
<script>
    console.log(chance.string());
</script>
```

[More info](http://chancejs.com#browser)

### CLI

Chance CLI has moved to its [own project](https://github.com/chancejs/chancejs-cli)!

### Node.js

And it can be used in Node.js.

```js
var Chance = require('chance'),
    chance = new Chance();

// Get a random zip code
chance.zip();
```

### RequireJS

Chance also includes an AMD define so it can be used with RequireJS.

```js
require(['Chance'], function(Chance) {
    // Instantiate
    var chance = new Chance();
       
    // Then just use it:
    var my_random_integer = chance.integer();
});
```

## Dependent tools

* [Chance CLI](https://github.com/chancejs/chance-cli) - Use Chance on the command line.
* [Chance Token Replacer](https://github.com/drewbrokke/chance-token-replacer) - Replace tokens in a string with Chance generated items.
* [Dream.js](https://github.com/adleroliveira/dreamjs) - Lightweight json data generator
* [Fake JSON Schema](https://github.com/pateketrueke/json-schema-faker/) - Use chance generators to populate JSON Schema samples.
* [Mocker Data Generator](https://github.com/danibram/mocker-data-generator/) - Minimal JSON data generator.

*Know a library that uses Chance that isn't here? Update the README and submit a PR!*

## Author
### Victor Quinn
[http://victorquinn.com](http://victorquinn.com)

Please feel free to reach out to me if you have any questions or suggestions.

### Contributors

THANK YOU!

```
 project  : chancejs
 repo age : 2 years, 10 months
 active   : 184 days
 commits  : 654
 files    : 28
 authors  :
   434	Victor Quinn                66.4%
    26	Oliver Salzburg             4.0%
    13	Tim Petricola               2.0%
    12	Alex DiLiberto              1.8%
    11	Matteo Fogli                1.7%
    11	davmillar                   1.7%
     7	Jan Tojnar                  1.1%
     7	AminaG                      1.1%
     6	Matt Klaber                 0.9%
     6	Patrick Mowrer              0.9%
     5	Michael Cordingley          0.8%
     4	anio                        0.6%
     4	Geoff Russel                0.6%
     4	Abhijeet Pawar              0.6%
     4	Avishaan                    0.6%
     4	spayton                     0.6%
     4	leesei                      0.6%
     4	Chris Villarreal            0.6%
     4	Kevin Garnett               0.6%
     4	Dominic Barnes              0.6%
     3	Alexandr Lozovyuk           0.5%
     3	Nicholas Johnson            0.5%
     3	qjcg                        0.5%
     3	Nate Clark                  0.5%
     2	xshyamx                     0.3%
     2	Adam Krebs                  0.3%
     2	Andreas Koeberle            0.3%
     2	Daniel Biedma               0.3%
     2	Franco Victorio             0.3%
     2	Iskren Chernev              0.3%
     2	Kris Van Houten             0.3%
     2	Mihail Petrov               0.3%
     2	Nathan MacInnes             0.3%
     2	Ng Patrick                   0.3%
     2	Pascal Borreli              0.3%
     2	Rafael Andrade de Oliveira  0.3%
     2	SeeSchloss                  0.3%
     2	Stefan Penner               0.3%
     2	The Usual Coder             0.3%
     2	dhilipsiva                  0.3%
     2	max4ever                    0.3%
     2	path411                     0.3%
     2	shyam                       0.3%
     2	somejeff                    0.3%
     2	vird                        0.3%
     1	Billy Moon                  0.2%
     1	Eu Rafa                     0.2%
     1	Tomasz Ducin                0.2%
     1	Drew Brokke                 0.2%
     1	Winker Xiao                 0.2%
     1	afc163                      0.2%
     1	Doug Lawrence               0.2%
     1	Danny Yates                 0.2%
     1	ddunning                    0.2%
     1	tsc                         0.2%
     1	flaviolivolsi               0.2%
     1	flrent                      0.2%
     1	kiran                       0.2%
     1	kkroner                     0.2%
     1	Brian.Barnett               0.2%
     1	Matt Altermatt              0.2%
     1	Joshua Bemenderfer          0.2%
     1	lkptrzk                     0.2%
     1	Johannes Stein              0.2%
     1	Piotrek Dąbrowski           0.2%
     1	mamrehn                     0.2%
     1	Richard Anaya               0.2%
     1	Ryan Tenney                 0.2%
     1	Samuel Greene               0.2%
     1	Adam Pointer                0.2%
     1	Bitdeli Chef                0.2%
```

### Contribute! 

Be a part of this project! You can run the test using the following.

1. Install dependencies from package.json by running `npm install`
2. Run the test via `npm test`
3. Make some fun new modules!

*Note: Formerly, there was a `develop` branch where active development would
happen, but now it's all on `master` baby. Just submit PRs directly to `master`.
Sorry if the `develop` branch going away caused any trouble, but it was time to
rip the bandaid off.*

This project is licensed under the [MIT License](http://en.wikipedia.org/wiki/MIT_License) so feel free to hack away :)

Proudly written in Washington, D.C.

