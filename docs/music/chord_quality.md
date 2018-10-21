# chord_quality

```js
// usage
chance.chord_quality()
chance.chord_quality({ jazz: false })
```

Generate a random [chord quality](https://en.wikipedia.org/wiki/Chord_names_and_symbols_(popular_music)#Chord_quality)

If called with no options or if called with `jazz: true` it will pick a chord quality from the following pool:

```js
['maj7', 'min7', '7', 'sus', 'dim', 'ø']
```

```js
chance.chord_quality()
=> 'ø'
```

Otherwise it will pick a value from the following set:

```js
['maj', 'min', 'aug', 'dim']
```

```js
chance.chord_quality({ jazz: false })
=> 'dim'
```
