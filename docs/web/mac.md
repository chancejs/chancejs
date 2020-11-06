# ip

```js
// usage
chance.mac()
chance.mac({delimiter: '-'})
```

Return a random MAC Address (EUI-48).

```js
chance.mac()
=> '08:c2:88:ad:49:23'
```

Optionally specify a specific delimiter between octets.

```js
chance.domain({delimiter: '-'})
=> '00-0d-b9-52-f2-f0'
```

