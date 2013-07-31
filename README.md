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

### Bower

It can also be used with [Bower](http://bower.io)

    bower install chance

then in the HTML of your app:

    <!-- Load Chance -->
    <script type="text/javascript" src="components/chance/chance.min.js"></script>
    <script>
        // Use Chance immediately!
        alert(chance.string());
    </script>

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
 repo age : 6 weeks
 active   : 35 days
 commits  : 186
 files    : 19
 authors  :
   140	Victor Quinn            75.3%
    11	Tim Petricola           5.9%
    11	davmillar               5.9%
     5	Matt Klaber             2.7%
     5	Michael Cordingley      2.7%
     3	qjcg                    1.6%
     2	dhilipsiva              1.1%
     2	Kevin Garnett           1.1%
     2	path411                 1.1%
     2	Andreas Koeberle        1.1%
     1	Richard Anaya           0.5%
     1	leesei                  0.5%
     1	Ryan Tenney             0.5%
```

This project is licensed under the [MIT License](http://en.wikipedia.org/wiki/MIT_License) so feel free to hack away :)
