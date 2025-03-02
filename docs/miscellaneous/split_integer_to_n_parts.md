# split_integer_to_n_parts

```js
// usage
chance.split_integer_to_n_parts(100, 20)
chance.split_integer_to_n_parts(100, 30, {min: -5, max: 30})
```

Given a number `(number)` and the desired number of parts `(n)`, `split_integer_to_n_parts(number, n)` generates an array of integers whose sum equals the provided number.

For example, to split 100 into 30 random numbers:

```js
chance.split_integer_to_n_parts(100, 10);
=> [
  27, 10, 25, 4, 21,
   5,  2,  5, 0,  1
]
```

Can optionally provide min and max. (exclusive on both sides)


```js
chance.split_integer_to_n_parts(100, 10, {min: 5, max: 20});
=> [
  15, 12, 16,  6, 13,
   7,  7,  9, 10,  5
]

chance.split_integer_to_n_parts(100, 30, {min: -5, max: 30});
=> [
   0, 24,  8, 23, 27, -2, 26, 18,  1,
   7, 11, -5, 19, -4,  8, -1,  0, -4,
  -1, -5, -5, -5, -5, -5, -5, -5, -5,
  -5, -5, -5
]
```

Note, Please make sure to include minimum possible value in the range (if provided)

```js
chance.split_integer_to_n_parts(100, 10, {min: 11, max: 20});
=> RangeError: Chance: Range does not include Min possible number: 10.
```


for the possible values for max and min values, see [`chance.integer()`](../basics/integer.md)
