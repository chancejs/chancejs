# note

```js
// usage
chance.note()
chance.note({ notes: 'flats' })
chance.note({ notes: 'sharps' })
```

Generate a random musical note

```js
chance.note()
=> 'G♭'
```

To restrict the type of notes generated set the `notes` option to any of the options below:

`flatKey` restricts output to chromatic scale with flats (default)

```js
chance.note({ notes: 'flatKey' })
=> 'C'
```

`sharpKey` restricts output to chromatic scale with sharps

```js
chance.note({ notes: 'sharpKey' })
=> 'C♯'
```

`flats` restricts output to just flats

```js
chance.note({ notes: 'flats' })
=> 'G♭'
```

`sharps` restricts output to just sharps

```js
chance.note({ notes: 'sharps' })
=> 'A#'
```

`naturals` restricts output to just naturals

```js
chance.note({ notes: 'naturals' })
=> 'A'
```

`all` uses all available notes

```js
chance.note({ notes: 'all' })
=> 'F♯'
```
