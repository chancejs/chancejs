# string

```js
// usage
chance.string()
chance.string({ length: 5 })
chance.string({ pool: 'abcde' })
```

Return a random string.

```js
  chance.string();
  => 'Z&Q78&fqkPq'
```

By default it will return a string with random length of 5-20 characters and
will contain any of the following characters.

```js
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()[]'
```

Can optionally specify a length and the string will be exactly that length.

```js
  chance.string({ length: 5 });
  => 'YN%fG'
```

Can optionally specify a pool and the string will be generated with characters
only from that pool.

```js
  chance.string({ pool: 'abcde' });
  => 'cccdeeabedebb'
```

Of course these options can also be combined.

```js
  chance.string({ length: 5, pool: 'abcde' });
  => 'cbbdc'
```
