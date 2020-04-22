# nif

```js
// usage
chance.nif()
```
Generate a random Spanish identification number (NIF).

```js
chance.nif();
=> '74098879D'
```

Optionally specify a separator for the last character (usually '-').

```js
chance.nif({separator: '-'});
=> '11808130-E'
```
