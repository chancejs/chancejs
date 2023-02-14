# @chancejs/coin

Note: This is a WIP proof of concept. DO NOT USE YET. I will remove this once it's ready for prime time :)

## Installation
Install with npm
`npm install @chancejs/coin`

Install with yarn
`yarn add @chancejs/coin`

## Usage

In your code, include it as follows:

### CommonJS

```js
// Require
let chance = require('@chancejs/coin');

// Use
console.log(chance.coin()); // will output "heads" or "tails"
```

### ES Module
```js
import * as chance from '@chancejs/coin';

console.log(chance.coin()); // will output "heads" or "tails"
```

## Examples

```js
// usage
chance.coin()
```

Flip a coin!

```js
chance.coin();
=> 'heads'

chance.coin();
=> 'tails'
```
