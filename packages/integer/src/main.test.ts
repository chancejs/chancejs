import { integer } from './main'
import test from 'ava'

const NUM_TEST_SAMPLES = 1000;

test('integer() returns a value with typeof number', (t) => {
  for (let i = 0; i < NUM_TEST_SAMPLES; i++) {
    t.is(typeof integer(), 'number')
  }
})

test('integer() returns a whole number', (t) => {
  for (let i = 0; i < NUM_TEST_SAMPLES; i++) {
    t.true(Number.isInteger(integer()))
  }
})

test('integer() is sometimes negative, sometimes positive', (t) => {
  let positiveCount = 0
  for (let i = 0; i < NUM_TEST_SAMPLES; i++) {
    if (integer() > 0) {
      positiveCount++
    }
  }

  // Note: In very extreme circumstances this test may fail as, by its
  // nature it's random. But it's a low enough percentage that I'm
  // willing to accept it.
  t.true((positiveCount > 200) && (positiveCount < 800))
})

test('integer() can take a zero min and obey it', (t) => {
  for (let i = 0; i < NUM_TEST_SAMPLES; i++) {
    t.true(integer({ min: 0 }) >= 0)
  }
})

test('integer() can take a negative min and obey it', (t) => {
  for (let i = 0; i < NUM_TEST_SAMPLES; i++) {
    t.true(integer({ min: -25 }) >= -25)
  }
})

test('integer() can take a zero max and obey it', (t) => {
  for (let i = 0; i < NUM_TEST_SAMPLES; i++) {
    t.true(integer({ max: 0 }) <= 0)
  }
})

test('integer() can take a positive max and obey it', (t) => {
  for (let i = 0; i < NUM_TEST_SAMPLES; i++) {
    t.true(integer({ max: 10 }) <= 10)
  }
})

test('integer() can take a negative max and obey it', (t) => {
  for (let i = 0; i < NUM_TEST_SAMPLES; i++) {
    t.true(integer({ max: -9999 }) <= -9999)
  }
})

test('integer() can take a negative min and max and obey both', (t) => {
  for (let i = 0; i < NUM_TEST_SAMPLES; i++) {
    const int = integer({ min: -25, max: -1 })
    t.true((int >= -25) && int <= -1)
  }
})

test('integer() can take a min with absolute value less than max and return in range above', (t) => {
  let count = 0
  for (let i = 0; i < NUM_TEST_SAMPLES; i++) {
    // With a range this large we'd expect most values to be
    // greater than 1 if this works correctly.
    if (Math.abs(integer({ min: -1, max: 1000000 })) < 2) {
      count++
    }
  }
  t.true(count < 900)
})

test('integer() throws an error when min > max', (t) => {
  const fn = () => integer({ min: 1000, max: 500 })
  t.throws(fn, 'Chance: Min cannot be greater than Max.')
})
