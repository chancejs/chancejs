# url

```js
// usage
chance.url()
chance.url({domain: 'www.socialradar.com'})
chance.url({path: 'images'})
chance.url({extensions: ['gif', 'jpg', 'png']})
```

Return a random url.

```js
chance.url()
=> 'http://vanogsi.io/pateliivi'
```

Optionally specify a domain and the url will be random but the domain will not.

```js
chance.url({domain: 'www.socialradar.com'})
=> 'http://www.socialradar.com/hob'
```

Optionally specify a path and it will be obeyed.

```js
chance.url({path: 'images'})
=> 'http://tainvoz.net/images'
```

Optionally specify an array of extensions and one will be picked at random.

```js
chance.url({extensions: ['gif', 'jpg', 'png']})
=> 'http://vagjiup.gov/udmopke.png'
```
