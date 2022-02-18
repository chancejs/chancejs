# age

```js
// usage
chance.age()
chance.age({ type: 'child' })
```

Generate a random age.

```js
chance.age();
=> 45
```

Default range is between 18 and 65.

Optionally specify one of a handful of enumerated age types.

```js
chance.age({ type: 'child' });
=> 9
```

Allowed types are: `child` (0-12), `teen` (13-19), `adult` (18-65), `senior` (65-100) and `all` (0-100).
