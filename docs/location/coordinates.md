# coordinates

```js
// usage
chance.coordinates()
chance.coordinates({fixed: 2})
chance.coordinates({format: 'dms'})
```

Generate random coordinates, which are latitude and longitude, comma separated.

```js
chance.coordinates();
=> "-29.52974, 24.52815"
```

By default includes 5 fixed digits after decimal, can specify otherwise.

```js
chance.coordinates({fixed: 2});
=> "-49.16, 68.81"
```

By default cooridnates' format is dd, can specify otherwise.

```js
chance.coordinates({format: 'ddm'});
=> "41°44.9592, 25°56.2622"
```

```js
chance.coordinates({format: 'dms'});
=> "56°2’9.8187”, 79°55’40.6812”"
```
