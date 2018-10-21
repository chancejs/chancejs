# tempo

```js
// usage
chance.tempo()
chance.tempo({ min: 20, max: 300 })
```

Generate a random tempo. By default it generates a number between 40 and 320

```js
chance.tempo()
=> 159
```

To override the output range set `min` and `max` options

```js
chance.tempo({ min: 20, max: 300 })
=> 108
```
