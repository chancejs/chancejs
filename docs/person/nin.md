Generate a random National identification number.

By default the nationality is set to `'us'`
```js
chance.nin();
```
you can explicitly specify the nationality
```js
chance.nin({nationality:'ca'}) 
``` 
Note, currently support for nationality is limited to: `'en', 'uk', 'br' , 'gr' , 'jp' ,'ch' ,'in' ,'ru', 'it'`. 
