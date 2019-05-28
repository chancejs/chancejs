import test from 'ava'
import Chance from './main'

const chance = new Chance()

test('bool() returns a random boolean', t => {
    const bool = chance.bool()
    t.is(typeof bool, 'boolean')
})

test('bool() is within the bounds of what we would call random', t => {
    let trueCount = 0
    for (let i=0; i < 1000; i++) {
        if (chance.bool()) {
            trueCount++
        }
    }

    // The probability of this test failing is approximately 4.09e-86.
    // So, in theory, it could give a false negative, but the sun will
    // probably die long before that happens.

    t.true((trueCount > 200) && (trueCount < 800))
})

test('bool() takes and obeys likelihood', t => {
    let trueCount = 0
    for (let i=0; i < 1000; i++) {
        if (chance.bool({ likelihood: 30 })) {
            trueCount++
        }
    }

    // Expect it to average around 300
    t.true((trueCount > 200) && (trueCount < 400))

    trueCount = 0
    for (let i=0; i < 1000; i++) {
        if (chance.bool({ likelihood: 99 })) {
            trueCount++
        }
    }

    // Expect it to average at 990
    t.true(trueCount > 900)
})

// test('bool() throws an error if likelihood < 0 or > 100', t => {
//     const fn1 = () => chance.bool({likelihood: -23})
//     t.throws(fn1, RangeError)
//     const fn2 = () => chance.bool({likelihood: 7933})
//     t.throws(fn2, RangeError)
// })