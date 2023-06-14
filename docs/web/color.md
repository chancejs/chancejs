# color

```js
// usage
chance.color()
chance.color({format: 'hex'})
chance.color({grayscale: true})
chance.color({casing: 'upper'})
```

Return a random color in a random format.

```js
chance.color()
=> '#79c157'
```

Colors have six base types: `hex`, `shorthex`, `rgb`, `rgba`, `0x`, `name`

These are the kinds usable in HTML or CSS. The type can optionally be specified

```js
chance.color({format: 'hex'})
=> '#d67118'

chance.color({format: 'shorthex'})
=> '#60f'

chance.color({format: 'rgb'})
=> 'rgb(110,52,164)'

chance.color({ format:'rgba' })
=> 'rgba(76,11,110,0.1284)'

chance.color({format: '0x'})
=> '0x67ae0b'

chance.color({ format:'name' })
=> 'DarkOrange' 
```

Can optionally specify that only grayscale colors be generated

```js
chance.color({grayscale: true})
=> '#e2e2e2'
```

Optionally specify casing to get only uppercase letters in the color

```js
chance.color({casing: 'upper'})
=> '#29CFA7'
```
