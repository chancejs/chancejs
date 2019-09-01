import { integer } from './main'
import test from 'ava'

test('integer() returns a random boolean', (t) => {
  t.is(typeof integer(), 'number')
})

test('integer() returns a random integer', (t) => {
  t.is(typeof integer(), 'number')
})

test('integer() is sometimes negative, sometimes positive', (t) => {
  let positiveCount = 0
  for (let i = 0; i < 1000; i++) {
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
  for (let i = 0; i < 1000; i++) {
    t.true(integer(0) > 0)
  }
})

test('integer() can take a negative min and obey it', (t) => {
  for (let i = 0; i < 1000; i++) {
    t.true(integer(-25) > -26)
  }
})

test('integer() can take a negative min and max and obey both', (t) => {
  for (let i = 0; i < 1000; i++) {
    const int = integer(-25, -1)
    t.true((int > -26) && int < 0)
  }
})

test('integer() can take a min with absolute value less than max and return in range above', (t) => {
  let count = 0
  for (let i = 0; i < 1000; i++) {
    // With a range this large we'd expect most values to be
    // greater than 1 if this works correctly.
    if (Math.abs(integer(-1, 1000000)) < 2) {
      count++
    }
  }
  t.true(count < 900)
})

test('integer() throws an error when min > max', (t) => {
  const fn = () => integer(1000, 500)
  t.throws(fn, 'Chance: Min cannot be greater than Max.')
})
