# cnpj

```js
// usage
chance.cnpj();
```

Generate a random Brazilian tax id for companies.

```js
chance.cnpj();
=> '23.732.754/0001-31'
```

Default cnpj is formatted, to get only numbers:

```js
chance.cnpj({ formatted: false });
=> '23732754000131'
```
