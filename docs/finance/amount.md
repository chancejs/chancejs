# amount

```js
// usage
chance.amount()
```

Generates a random number representing a monetary value

```js
chance.amount()  // => EGP 6223.05

chance.amount({min: 10, max: 100}) // => USD 10.5

chance.amount({currency: 'INR'}) // => INR 1000.4
```
