# birthday

```js
// usage
chance.birthday()
chance.birthday({ string: true })
chance.birthday({ type: 'child' })
```

Generate a random birthday

```js
chance.birthday();
=> Fri Aug 16 1985 00:00:00 GMT-0400 (EDT)
```

By default, returns an actual JavaScript [Date][Date] object.

Optionally specify it be returned as a string.

```js
chance.birthday({string: true});
=> '4/1/1968'
```

By default returns in MM/DD/YYYY format. Can specify DD/MM/YYYY as follows:

```js
chance.birthday({string: true, american: false});
=> '28/6/1993'
```

For more complex date formats, use the [Moment][Moment] library.

Can specify the type, same types as with [age](#age).

```js
chance.birthday({type: 'child'});
=> Sat Sep 08 2001 00:00:00 GMT-0400 (EDT)
```

You can compose with `chance.year` for interesting combinations. For example, let's say we want to get the birthdays of some renaissance artists (born between 1450 and 1500). We can generate a year and then get a birthday from that year:

```js
var year = chance.year({ min: 1450, max: 1500 });
chance.birthday({ year: year });
=> Wed Aug 27 1484 11:24:14 GMT-0400 (EDT)

// Could be simplified down to one line
chance.birthday({ year: chance.year({ min: 1450, max: 1500 }) });
=> Fri Nov 26 1469 09:17:13 GMT-0500 (EST)
```

Can specify maxAge and/or minAge. This will return a date which yields to an age between the given range. Attention on limits: the full day of birthdays are considered to be part of the allowed range (from the first millisecond of the minimum date to the last second of the maximum date).

```js
chance.birthday({minAge: 18, maxAge: 21});
=> Thu Apr 18 2002 13:48:34 GMT-0400 (EDT)
```


[Date]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[Moment]: http://momentjs.com
