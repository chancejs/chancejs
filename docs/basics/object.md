# object

```js
// usages
chance.object()
chance.object({ key: 'food' })
chance.object({ value: ['apples', 'oranges', 'pickles'] })
```

Return an object with a random key/value
```js
chance.object()
=> { zutuc: 'ko' }
```

Optionally include a key
```js
chance.object({ key: 'food' })
=> { food: 'vuj'}
```

Optionally include a value
```js
chance.object({ value: ['apples', 'oranges', 'pickles'] })
=> { trup: ['apples', 'oranges', 'pickles'] }

chance.object({ value: 3.14159 })
=> { qwop: 3.14159 }

chance.object({ value: chance.object() })
=> { svit: { kozra: 'ciknebaz' } }
```
