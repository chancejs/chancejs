import { falsy } from './main'
import test from 'ava'

test('falsy() should return a falsy value', (t) => {
    for (let i=0; i < 1000; i++) {
        t.falsy(falsy())
    }
})

test('falsy() should return a falsy value using a pool data', (t) => {
    const pool = [null, undefined];
    for (let i=0; i < 1000; i++) {
        t.falsy(falsy({pool}));
    }
})
