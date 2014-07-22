# Chance

[![Chance Logo](http://chancejs.com/logo.png)](http://chancejs.com)

[![Build Status](https://travis-ci.org/victorquinn/chancejs.png)](https://travis-ci.org/victorquinn/chancejs)

Chance - Random generator helper for JavaScript

Homepage: [http://chancejs.com](http://chancejs.com)

Many more details on [http://chancejs.com](http://chancejs.com) but this single
library can generate random numbers, characters, strings, names, addresses,
dice, and pretty much anything else.

It includes the basic building blocks for all these items and is built on top
of a Mersenne Twister so it can generate these things with repeatability, if
desired.

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
```

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

## Author
### Victor Quinn
[http://victorquinn.com](http://victorquinn.com)

Please feel free to reach out to me if you have any questions or suggestions.

### Contributors

THANK YOU!

```
 project  : chancejs
 repo age : 1 year
 active   : 77 days
 commits  : 306
 files    : 21
 authors  :
   230	Victor Quinn            75.2%
    13	Tim Petricola           4.2%
    11	davmillar               3.6%
     5	Michael Cordingley      1.6%
     5	Alex DiLiberto          1.6%
     5	Matt Klaber             1.6%
     4	Kevin Garnett           1.3%
     3	Alexandr Lozovyuk       1.0%
     3	qjcg                    1.0%
     2	xshyamx                 0.7%
     2	Andreas Koeberle        0.7%
     2	Iskren Chernev          0.7%
     2	Nicholas Johnson        0.7%
     2	Pascal Borreli          0.7%
     2	dhilipsiva              0.7%
     2	path411                 0.7%
     2	shyam                   0.7%
     2	Adam Krebs              0.7%
     1	Ng, Patrick             0.3%
     1	Doug Lawrence           0.3%
     1	Dominic Barnes          0.3%
     1	leesei                  0.3%
     1	lkptrzk                 0.3%
     1	Richard Anaya           0.3%
     1	Ryan Tenney             0.3%
     1	Samuel Greene           0.3%
     1	Johannes Stein          0.3%
```

This project is licensed under the [MIT License](http://en.wikipedia.org/wiki/MIT_License) so feel free to hack away :)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/victorquinn/chancejs/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

Proudly written in Washington, D.C.

