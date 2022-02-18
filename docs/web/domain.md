# domain

```js
// usage
chance.domain()
chance.domain({ tld: 'com' })
```

Return a random domain with a random [TLD](#tld).

```js
chance.domain()
=> 'onaro.net'
```

Optionally specify a TLD and the domain will be random but the TLD will not.

```js
chance.domain({ tld: 'ie' })
=> 'gotaujo.ie'
```
