# emoji

```js
// usage
chance.emoji();
chance.emoji({ category: "smileys_and_emotions" });
chance.emoji({ length: 5 });
```

Return a random emoji.

```js
  chance.emoji();
  => '😀'
```

Default is a single random emoji from a randomly selected category.

Can optionally specify a length to increase the number of emojis from a single randomly selected category.

```js
  chance.emoji({ length: 5 });
  => '🍈🍍🫐🫒🌽'
```

Can optionally specify a category of emoji.

```js
  chance.emoji({ category: "symbols" });
  => '🚾'
```

Available emoji categories are:

```
"smileys_and_emotion", "people_and_body", "animals_and_nature", "food_and_drink", "travel_and_places", "activities", "objects", "symbols", "flags"
```

The default category, `"all"`, will result in a category from the options above being chosen at random.
