# license plate

```js
// usage
chance.license_plate()
chance.license_plate({pattern: "LLLNLNN"})
chance.license_plate({pattern: "LLL NNNN-LNL"})
```

Returns a random vehicle license plate that matches the pattern, where 'L' stands for letter and 'N' for number.

```js
chance.license_plate({pattern: "LLLNLNN"})
=> "ITL 8M86"
```

```js
chance.license_plate({pattern: "LLL NNNN-LNL"})
=> "EPR 0331-D5N"
```

- Does not matter the patterns characters case.
- Only spaces and hyphens will be kept. All others character will be removed.
- Pattern must be a string.
- Default pattern is "LLLNLNN" (Brazil Mercosur Pattern)

```js
chance.license_plate({pattern: "LlL-NnNXN9"})
=> "OHD-4916"
```
