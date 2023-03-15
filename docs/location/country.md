# country

```js
// usage
chance.country()
chance.country({ full: true })
chance.country({ alpha3: true })
```

Return a random country.

```js
chance.country();
=> 'LT'
```

By default, returns only the 2 letter ISO 3166-1 code for the country.

Optionally specify that it ought to return a full country name.

```js
chance.country({ full: true });
=> 'Venezuela'
```

Optionally specify that it ought to return a 3 letter ISO 3166-1 country code.

```js
chance.country({ alpha3: true });
=> 'VEN'
```
