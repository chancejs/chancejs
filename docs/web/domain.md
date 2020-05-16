# domain

```js
// usage
chance.domain()
chance.domain({tld: 'com'})
```

Return a random domain with a random [tld](#tld).

```js
chance.domain()
=> 'onaro.net'
```

Optionally specify a tld and the domain will be random but the tld will not.

```js
chance.domain({tld: 'ie'})
=> 'gotaujo.ie'
```

Or you can set an array for tld key to choose random one between them as well.
```js
chance.domain({tld: ['com', 'org', 'net']})
=> 'sojuaie.org'
```

