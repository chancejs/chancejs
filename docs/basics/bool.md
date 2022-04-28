# bool

## ES Module

```ts
// tree-shakeable import
import { bool } from "chance";

// returns either `true` or `false` with a 50/50 likelihood
bool();
// returns either `true` or `false` with a 30/70 likelihood
bool({ likelihood: 30 });
```

Return a random boolean value (`true` or `false`).

```ts
bool();
=> true
```

The default likelihood of success (returning `true`) is 50%.
Can optionally specify the likelihood in percent:

```ts
bool({likelihood: 30});
=> false
```

In this case only a 30% likelihood of `true`, and a 70% likelihood of `false`.

## Class Instantiation

Alternatively, you can create an instance of a `Chance` class and call the `bool` method.
This approach avoids instantiating a new PRNG instance on every function call.

```ts
// import the Chance class
import { Chance } from "chance";

const chance = new Chance("my-random-seed");

// returns either `true` or `false` with a 50/50 likelihood
chance.bool();
// returns either `true` or `false` with a 30/70 likelihood
chance.bool({ likelihood: 30 });
```
