# Chance

[![Chance Logo](http://chancejs.com/logo.png)](http://chancejs.com)

[![Build Status](https://travis-ci.org/victorquinn/chancejs.svg?branch=develop)](https://travis-ci.org/victorquinn/chancejs) [![GitHub license](https://img.shields.io/github/license/victorquinn/chancejs.svg)](https://github.com/victorquinn/chancejs) [![GitHub stars](https://img.shields.io/github/stars/victorquinn/chancejs.svg)](https://github.com/victorquinn/chancejs) [![npm](https://img.shields.io/npm/dm/chance.svg)](https://npmjs.com/package/chance) [![npm](https://img.shields.io/npm/v/chance.svg)](https://npmjs.com/package/chance) [![Coverage Status](https://coveralls.io/repos/victorquinn/chancejs/badge.svg?branch=master)](https://coveralls.io/r/victorquinn/chancejs?branch=master) [![awesomeness](https://img.shields.io/badge/awesomeness-maximum-red.svg)](https://github.com/victorquinn/chancejs)

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
component install victorquinn/chancejs
```

then in the HTML of your app:

```html
<!-- Load Chance -->
<script type="text/javascript" src="components/victorquinn-chancejs/chance.js"></script>
<script>
    // Use Chance immediately!
    alert(chance.string());
</script>

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

Chance CLI has moved to its [own repository](https://github.com/victorquinn/chancejs-cli)!

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

### Fake JSON Schema

Use chance generators to populate JSON Schema samples.
See: https://github.com/pateketrueke/json-schema-faker/

## Author
### Victor Quinn
[http://victorquinn.com](http://victorquinn.com)

Please feel free to reach out to me if you have any questions or suggestions.

### Contributors

THANK YOU!

```
project  : chancejs
 repo age : 2 years
 active   : 143 days
 commits  : 508
 files    : 23
 authors  :
   346	Victor Quinn        68.1%
    26	Oliver Salzburg     5.1%
    13	Tim Petricola       2.6%
    12	Alex DiLiberto      2.4%
    11	davmillar           2.2%
     7	Jan Tojnar          1.4%
     6	Patrick Mowrer      1.2%
     5	Michael Cordingley  1.0%
     5	Matt Klaber         1.0%
     4	Abhijeet Pawar      0.8%
     4	Kevin Garnett       0.8%
     4	Avishaan            0.8%
     4	Chris Villarreal    0.8%
     3	Alexandr Lozovyuk   0.6%
     3	Nate Clark          0.6%
     3	leesei              0.6%
     3	Dominic Barnes      0.6%
     3	qjcg                0.6%
     3	Nicholas Johnson    0.6%
     2	Stefan Penner       0.4%
     2	Adam Krebs          0.4%
     2	Andreas Koeberle    0.4%
     2	Iskren Chernev      0.4%
     2	Nathan MacInnes     0.4%
     2	Pascal Borreli      0.4%
     2	SeeSchloss          0.4%
     2	dhilipsiva          0.4%
     2	path411             0.4%
     2	shyam               0.4%
     2	somejeff            0.4%
     2	xshyamx             0.4%
     1	mamrehn             0.2%
     1	Doug Lawrence       0.2%
     1	Tomasz Ducin        0.2%
     1	Danny Yates         0.2%
     1	afc163              0.2%
     1	Brian.Barnett       0.2%
     1	ddunning            0.2%
     1	Adam Pointer        0.2%
     1	flrent              0.2%
     1	kiran               0.2%
     1	kkroner             0.2%
     1	Billy Moon          0.2%
     1	Ng Patrick          0.2%
     1	lkptrzk             0.2%
     1	Matt Altermatt      0.2%
     1	Richard Anaya       0.2%
     1	Ryan Tenney         0.2%
     1	Samuel Greene       0.2%
     1	Johannes Stein      0.2%
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

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/victorquinn/chancejs/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

Proudly written in Washington, D.C.

