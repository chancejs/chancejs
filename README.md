# Chance

[![Chance Logo](http://chancejs.com/logo.png)](http://chancejs.com)

[![Build Status](https://travis-ci.org/victorquinn/chancejs.png)](https://travis-ci.org/victorquinn/chancejs)

Chance - Random generator helper for JavaScript

Homepage: [http://chancejs.com](http://chancejs.com)

Many more details on [http://chancejs.com](http://chancejs.com) but this single
library can generate random numbers, characters, strings, names, addresses,
dice, and pretty much anything else.

It includes the basic building blocks for all these items and is built on top
of a Mersenne Twister so it can generate these things with repeatibility, if
desired.

## Usage

### Browser

Chance instantiates itself onto the window. This means that in the simplest case you can just include the script tag then use an instance of Chance immediately.

    <script src="chance.js"></script>
    <script>
        console.log(chance.string());
    </script>

[More info](http://chancejs.com#browser)

### RequireJS

Chance also includes an AMD define so it can be used with RequireJS.

    require(['Chance'], function(Chance) {
        // Instantiate
        var chance = new Chance();
       
        // Then just use it:
        var my_random_integer = chance.integer();
    });


### Node.js

And it can be used in Node.js.

    var Chance = require('chance'),
        chance = new Chance();
        
    // Get a random zip code
    chance.zip();


## Author
### Victor Quinn
[http://victorquinn.com](http://victorquinn.com)

Please feel free to reach out to me if you have any questions or suggestions.

### Contributors

THANK YOU!

```
 project  : chancejs
 repo age : 5 weeks
 active   : 29 days
 commits  : 162
 files    : 19
 authors  :
   125	Victor Quinn            77.2%
    11	Tim Petricola           6.8%
    10	davmillar               6.2%
     5	Michael Cordingley      3.1%
     3	qjcg                    1.9%
     2	dhilipsiva              1.2%
     2	path411                 1.2%
     2	Kevin Garnett           1.2%
     1	Richard Anaya           0.6%
     1	leesei                  0.6%
```

This project is licensed under the [MIT License](http://en.wikipedia.org/wiki/MIT_License) so feel free to hack away :)
